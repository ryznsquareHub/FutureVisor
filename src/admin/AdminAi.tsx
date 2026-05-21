import { useMemo, useState } from 'react'
import type { PageView } from './types'

type Props = {
  rows: PageView[]
  adminToken: string
  rangeDays: number
}

type Mode = 'yesterday-summary' | 'channel-compare'

const AI_SERVER = 'http://localhost:3001'

function classifySource(r: PageView): string {
  if (r.utm_source) return `utm:${r.utm_source}${r.utm_medium ? `/${r.utm_medium}` : ''}`
  const host = (r.referrer_host || '').toLowerCase()
  if (!host) return 'direct'
  if (host.includes('google')) return 'Google'
  if (host.includes('naver')) return 'Naver'
  if (host.includes('daum') || host.includes('kakao')) return 'Daum/Kakao'
  if (host.includes('bing')) return 'Bing'
  if (host.includes('youtube')) return 'YouTube'
  if (host.includes('facebook') || host.includes('instagram') || host.includes('threads'))
    return 'Meta'
  if (host.includes('linkedin')) return 'LinkedIn'
  if (host.includes('t.co') || host.includes('x.com') || host.includes('twitter')) return 'X/Twitter'
  return host
}

function startOfKstDay(d: Date): Date {
  // 한국 시각 0시 → UTC로 표현
  const utc = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  utc.setHours(0, 0, 0, 0)
  // 위 변환은 정확하지 않을 수 있어 안전하게 KST 기준으로 직접 만든다
  const kstParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d)
  const y = Number(kstParts.find((p) => p.type === 'year')!.value)
  const m = Number(kstParts.find((p) => p.type === 'month')!.value)
  const day = Number(kstParts.find((p) => p.type === 'day')!.value)
  return new Date(Date.UTC(y, m - 1, day, -9, 0, 0, 0)) // KST 0시 = UTC 전날 15시
}

function aggregateBasics(rows: PageView[]) {
  const visitors = new Set(rows.map((r) => r.visitor_id)).size
  const sessions = new Set(rows.map((r) => r.session_id)).size
  const withDur = rows.filter((r) => r.duration_ms != null && r.duration_ms > 0)
  const avgDurSec = withDur.length
    ? Math.round(withDur.reduce((a, r) => a + (r.duration_ms || 0), 0) / withDur.length / 1000)
    : 0

  const bySession = new Map<string, PageView[]>()
  for (const r of rows) {
    const arr = bySession.get(r.session_id) || []
    arr.push(r)
    bySession.set(r.session_id, arr)
  }
  let bounced = 0
  for (const [, arr] of bySession) {
    if (arr.length === 1 && (arr[0].is_bounce || (arr[0].duration_ms || 0) < 5000)) bounced++
  }
  const bounceRate = sessions > 0 ? Math.round((bounced / sessions) * 1000) / 10 : 0

  return {
    pageViews: rows.length,
    visitors,
    sessions,
    avgDurationSec: avgDurSec,
    bounceRate,
  }
}

function topN<T>(arr: T[], key: (x: T) => string, n: number) {
  const m = new Map<string, number>()
  for (const x of arr) {
    const k = key(x)
    m.set(k, (m.get(k) || 0) + 1)
  }
  return Array.from(m.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k, v]) => ({ key: k, count: v }))
}

function buildYesterdayPayload(rows: PageView[]) {
  const now = new Date()
  const todayKst0 = startOfKstDay(now)
  const yesterdayKst0 = new Date(todayKst0.getTime() - 24 * 60 * 60 * 1000)
  const yest = rows.filter((r) => {
    const t = new Date(r.entered_at).getTime()
    return t >= yesterdayKst0.getTime() && t < todayKst0.getTime()
  })

  const basics = aggregateBasics(yest)
  const dateLabel = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(yesterdayKst0)

  const hourly = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: yest.filter((r) => {
      const d = new Date(r.entered_at)
      const kstHour = Number(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Seoul',
          hour: '2-digit',
          hour12: false,
        }).format(d),
      )
      return kstHour === h
    }).length,
  })).filter((x) => x.count > 0)

  return {
    dateLabel,
    basics,
    topPaths: topN(yest, (r) => r.path + (r.search || ''), 8),
    topSources: topN(yest, classifySource, 8),
    topCountries: topN(yest, (r) => `${r.country || '미확인'}/${r.city || '-'}`, 8),
    devices: topN(yest, (r) => r.device_type || 'unknown', 5),
    browsers: topN(yest, (r) => r.browser || 'unknown', 5),
    hourlyDistribution: hourly,
  }
}

function buildChannelPayload(rows: PageView[], rangeDays: number) {
  const grouped = new Map<string, PageView[]>()
  for (const r of rows) {
    const k = classifySource(r)
    const arr = grouped.get(k) || []
    arr.push(r)
    grouped.set(k, arr)
  }

  const channels = Array.from(grouped.entries())
    .map(([channel, arr]) => {
      const b = aggregateBasics(arr)
      return {
        channel,
        pageViews: b.pageViews,
        visitors: b.visitors,
        sessions: b.sessions,
        pvPerSession: b.sessions > 0 ? Math.round((b.pageViews / b.sessions) * 100) / 100 : 0,
        avgDurationSec: b.avgDurationSec,
        bounceRate: b.bounceRate,
        topPaths: topN(arr, (r) => r.path, 3).map((x) => `${x.key}(${x.count})`),
      }
    })
    .sort((a, b) => b.visitors - a.visitors)

  return {
    dateRange: `최근 ${rangeDays}일`,
    totals: aggregateBasics(rows),
    channels,
  }
}

// 아주 가벼운 마크다운 → React 노드 변환 (### 헤딩, **bold**, - 불릿, 빈 줄)
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split('\n')
  const out: React.ReactNode[] = []
  let list: string[] = []
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
  lines.forEach((raw, idx) => {
    const line = raw.trimEnd()
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

export function AdminAi({ rows, adminToken, rangeDays }: Props) {
  const [mode, setMode] = useState<Mode | null>(null)
  const [loading, setLoading] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [serverOk, setServerOk] = useState<boolean | null>(null)

  const isLocalhost = useMemo(
    () =>
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
    [],
  )

  async function ping() {
    try {
      const res = await fetch(`${AI_SERVER}/healthz`, { method: 'GET' })
      setServerOk(res.ok)
    } catch {
      setServerOk(false)
    }
  }

  async function run(which: Mode) {
    setMode(which)
    setLoading(true)
    setError(null)
    setMarkdown(null)
    try {
      const body =
        which === 'yesterday-summary'
          ? buildYesterdayPayload(rows)
          : buildChannelPayload(rows, rangeDays)

      const res = await fetch(`${AI_SERVER}/api/ai/${which}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-fv-admin': adminToken,
        },
        body: JSON.stringify(body),
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
        setError(`로컬 AI 서버에 연결 실패. 터미널에서 \`npm run ai:server\` 를 실행했는지 확인해주세요.`)
        setServerOk(false)
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isLocalhost) {
    return (
      <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500">
        <div className="font-medium text-slate-700">AI 분석 위젯</div>
        <p className="mt-1">
          이 위젯은 로컬 개발 모드에서만 동작합니다. 터미널에서{' '}
          <code className="rounded bg-white px-1 py-0.5 font-mono">npm run dev</code> 와{' '}
          <code className="rounded bg-white px-1 py-0.5 font-mono">npm run ai:server</code> 를 함께 실행한 뒤{' '}
          <code className="rounded bg-white px-1 py-0.5 font-mono">http://localhost:5173/admin</code> 으로 접속하세요.
        </p>
        <p className="mt-1">
          (프로덕션 HTTPS 페이지에서 로컬 HTTP 서버를 호출하는 것은 브라우저가 차단합니다.)
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-700">
          🤖 AI 분석{' '}
          <span className="ml-1 font-normal text-xs text-slate-400">
            (로컬 Claude Code 세션 사용 · 별도 비용 없음)
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
          onClick={() => run('yesterday-summary')}
          disabled={loading}
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          어제 트래픽 요약
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
            (5~20초 소요 · {mode === 'yesterday-summary' ? '어제 데이터' : '채널 데이터'} 처리 중)
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
