import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { PageView } from './types'
import { buildPrompt, type AiMode } from './aiPrompts'

type Props = {
  rows: PageView[]
  adminToken: string
  rangeDays: number
}

// 공용 AI 게이트웨이 (D:\2026_workspace\Ai-docker). 로컬 dev는 localhost,
// 그 외에는 Tailscale Serve로 노출된 HTTPS 엔드포인트.
const AI_GATEWAY =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3001'
    : 'https://gj.tail93fb94.ts.net'

// 가벼운 마크다운 → React 노드 변환 (### 헤딩, **bold**, `code`, - 불릿, | 표)
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split('\n')
  const out: React.ReactNode[] = []
  let list: string[] = []
  let tableRows: string[][] = []

  const flushList = () => {
    if (list.length === 0) return
    out.push(
      <ul key={`ul-${out.length}`} className="my-2 list-disc space-y-1 pl-5 text-slate-700">
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    list = []
  }
  const flushTable = () => {
    if (tableRows.length === 0) return
    const [head, ...body] = tableRows
    out.push(
      <div key={`tbl-${out.length}`} className="my-2 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-100">
              {head.map((c, i) => (
                <th key={i} className="px-2 py-1.5 text-left font-semibold text-slate-700">
                  {renderInline(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((r, ri) => (
              <tr key={ri} className="border-b border-slate-100">
                {r.map((c, ci) => (
                  <td key={ci} className="px-2 py-1.5 text-slate-700">
                    {renderInline(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    )
    tableRows = []
  }

  const isTableRow = (l: string) => /^\s*\|.*\|\s*$/.test(l)
  const isTableSep = (l: string) => /^\s*\|[\s:|-]+\|\s*$/.test(l)
  const splitCells = (l: string) =>
    l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd()
    if (isTableRow(line)) {
      if (isTableSep(line)) return
      flushList()
      tableRows.push(splitCells(line))
      return
    }
    flushTable()
    if (line.startsWith('### ')) {
      flushList()
      out.push(
        <h4 key={idx} className="mt-4 text-sm font-semibold text-slate-900">
          {line.slice(4)}
        </h4>,
      )
    } else if (line.startsWith('## ')) {
      flushList()
      out.push(
        <h3 key={idx} className="mt-4 text-base font-semibold text-slate-900">
          {line.slice(3)}
        </h3>,
      )
    } else if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ''))
    } else if (line.trim() === '') {
      flushList()
    } else if (/^>\s?/.test(line)) {
      flushList()
      out.push(
        <p
          key={idx}
          className="my-1.5 border-l-2 border-slate-300 pl-3 text-slate-500"
        >
          {renderInline(line.replace(/^>\s?/, ''))}
        </p>,
      )
    } else {
      flushList()
      out.push(
        <p key={idx} className="my-1.5 text-slate-700">
          {renderInline(line)}
        </p>,
      )
    }
  })
  flushList()
  flushTable()
  return out
}

function renderInline(s: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|`([^`]+)`/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push(s.slice(last, m.index))
    if (m[1]) parts.push(<strong key={key++} className="text-slate-900">{m[1]}</strong>)
    else if (m[2])
      parts.push(
        <code key={key++} className="rounded bg-slate-100 px-1 py-0.5 text-xs">
          {m[2]}
        </code>,
      )
    last = m.index + m[0].length
  }
  if (last < s.length) parts.push(s.slice(last))
  return parts
}

const MODE_LABELS: Record<AiMode, string> = {
  'today-summary': '오늘 데이터',
  'yesterday-summary': '어제 데이터',
  'today-vs-yesterday': '오늘 ↔ 어제 비교',
  'weekly-trend': '7일 트렌드',
  'monthly-trend': '30일 트렌드',
  'channel-compare': '채널 데이터',
}

export function AdminAi({ rows, adminToken, rangeDays }: Props) {
  const [mode, setMode] = useState<AiMode | null>(null)
  const [loading, setLoading] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [serverOk, setServerOk] = useState<boolean | null>(null)

  async function ping() {
    try {
      const res = await fetch(`${AI_GATEWAY}/healthz`, { method: 'GET' })
      setServerOk(res.ok)
    } catch {
      setServerOk(false)
    }
  }

  async function run(which: AiMode) {
    setMode(which)
    setLoading(true)
    setError(null)
    setMarkdown(null)
    try {
      let workRows = rows
      // 트렌드 분석은 더 긴 윈도우가 필요 — 현재 필터 범위가 부족하면 별도 fetch
      const needDays = which === 'weekly-trend' ? 14 : which === 'monthly-trend' ? 60 : 0
      if (needDays > 0 && rangeDays < needDays && supabase) {
        const since = new Date(Date.now() - needDays * 24 * 60 * 60 * 1000).toISOString()
        const { data, error } = await supabase.rpc('fv_admin_page_views', {
          p_token: adminToken,
          p_since: since,
          p_limit: 20000,
        })
        if (error) throw error
        workRows = (data || []) as PageView[]
      }

      const prompt = buildPrompt(which, workRows, rangeDays)

      const res = await fetch(`${AI_GATEWAY}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        throw new Error(j?.error || `HTTP ${res.status}`)
      }
      const j = (await res.json()) as { markdown: string }
      setMarkdown(j.markdown)
    } catch (e) {
      const msg = (e as Error).message || String(e)
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setError(
          `AI 게이트웨이 연결 실패. PC에서 ai-gateway 컨테이너(Ai-docker)와 Tailscale이 떠 있는지 확인해주세요. 다른 디바이스에서 접근 중이면 그 디바이스도 Tailscale에 연결돼 있어야 합니다.`,
        )
        setServerOk(false)
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-700">
          🤖 AI 분석{' '}
          <span className="ml-1 font-normal text-xs text-slate-400">
            (공용 AI 게이트웨이 · Claude 구독 세션 사용 · 별도 비용 없음)
          </span>
        </h2>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={ping}
            className="rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
          >
            서버 상태 확인
          </button>
          {serverOk === true && <span className="text-emerald-600">● 연결됨</span>}
          {serverOk === false && <span className="text-rose-600">● 연결 실패</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => run('today-summary')}
          disabled={loading}
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          오늘 트래픽 요약
        </button>
        <button
          onClick={() => run('yesterday-summary')}
          disabled={loading}
          className="rounded-lg border border-brand-600 bg-white px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-50"
        >
          어제 트래픽 요약
        </button>
        <button
          onClick={() => run('today-vs-yesterday')}
          disabled={loading}
          className="rounded-lg border border-emerald-600 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
        >
          오늘 ↔ 어제 비교
        </button>
        <button
          onClick={() => run('weekly-trend')}
          disabled={loading}
          className="rounded-lg border border-violet-600 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100 disabled:opacity-50"
        >
          7일 트렌드 분석
        </button>
        <button
          onClick={() => run('monthly-trend')}
          disabled={loading}
          className="rounded-lg border border-violet-700 bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
        >
          한 달 트렌드 분석
        </button>
        <button
          onClick={() => run('channel-compare')}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          유입 채널 비교 ({rangeDays}일)
        </button>
      </div>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-brand-500" />
          Claude가 분석 중…{' '}
          <span className="text-xs">
            (5~20초 소요 · {mode ? MODE_LABELS[mode] : ''} 처리 중)
          </span>
        </div>
      )}

      {error && (
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      {markdown && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
          {renderMarkdown(markdown)}
        </div>
      )}
    </section>
  )
}
