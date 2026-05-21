import { useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { PageView } from './types'
import { TimeSeriesChart } from './charts/TimeSeriesChart'
import { HourDayHeatmap } from './charts/HourDayHeatmap'
import { BarRanking } from './charts/BarRanking'
import { DurationHistogram } from './charts/DurationHistogram'
import { DonutChart } from './charts/DonutChart'
import { AdminAi } from './AdminAi'

const TOKEN_STORAGE_KEY = 'fv:admin_token'
const RANGE_OPTIONS: { label: string; days: number }[] = [
  { label: '24시간', days: 1 },
  { label: '7일', days: 7 },
  { label: '30일', days: 30 },
  { label: '90일', days: 90 },
]

function classifySource(r: PageView): string {
  if (r.utm_source) return `${r.utm_source}${r.utm_medium ? ` · ${r.utm_medium}` : ''}`
  const host = (r.referrer_host || '').toLowerCase()
  if (!host) return '직접 / 북마크'
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

function fmtKoreaTime(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(d)
}

function fmtDuration(ms: number | null): string {
  if (ms == null || ms < 0) return '—'
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}초`
  const m = Math.floor(s / 60)
  const rs = s % 60
  return `${m}분 ${rs}초`
}

function fmtLocation(r: PageView): string {
  const parts = [r.country, r.region, r.city].filter(Boolean)
  return parts.join(' · ') || '—'
}

function fmtPath(r: PageView): string {
  return r.path + (r.search || '') + (r.hash || '')
}

export function AdminPage() {
  const [token, setToken] = useState<string>(() => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })
  const [tokenInput, setTokenInput] = useState('')
  const [rows, setRows] = useState<PageView[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rangeDays, setRangeDays] = useState(7)
  const [pathFilter, setPathFilter] = useState('')

  useEffect(() => {
    document.title = 'FutureVisor · 관리자'
  }, [])

  async function loadData(useToken: string, days: number) {
    if (!supabase) {
      setError('Supabase 설정이 비어 있습니다. .env에 VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY를 설정하세요.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
      const { data, error } = await supabase.rpc('fv_admin_page_views', {
        p_token: useToken,
        p_since: since,
        p_limit: 20000,
      })
      if (error) throw error
      setRows((data || []) as PageView[])
    } catch (e) {
      const msg = (e as Error).message || String(e)
      if (msg.toLowerCase().includes('unauthorized')) {
        setError('토큰이 올바르지 않습니다.')
        try {
          localStorage.removeItem(TOKEN_STORAGE_KEY)
        } catch {
          /* ignore */
        }
        setToken('')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    void loadData(token, rangeDays)
  }, [token, rangeDays])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!tokenInput.trim()) return
    const t = tokenInput.trim()
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, t)
    } catch {
      /* ignore */
    }
    setToken(t)
  }

  function handleLogout() {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setToken('')
    setRows([])
  }

  const filteredRows = useMemo(() => {
    if (!pathFilter) return rows
    const q = pathFilter.toLowerCase()
    return rows.filter((r) => fmtPath(r).toLowerCase().includes(q))
  }, [rows, pathFilter])

  const kpis = useMemo(() => {
    const totalViews = filteredRows.length
    const visitors = new Set(filteredRows.map((r) => r.visitor_id)).size
    const sessions = new Set(filteredRows.map((r) => r.session_id)).size
    const withDur = filteredRows.filter((r) => r.duration_ms != null && r.duration_ms > 0)
    const avgMs = withDur.length
      ? Math.round(withDur.reduce((a, r) => a + (r.duration_ms || 0), 0) / withDur.length)
      : 0
    const bouncedSessions = (() => {
      const bySession = new Map<string, PageView[]>()
      for (const r of filteredRows) {
        const arr = bySession.get(r.session_id) || []
        arr.push(r)
        bySession.set(r.session_id, arr)
      }
      let b = 0
      for (const [, arr] of bySession) {
        if (arr.length === 1 && arr[0].is_bounce) b++
        else if (arr.length === 1 && (arr[0].duration_ms || 0) < 5000) b++
      }
      return b
    })()
    const bounceRate = sessions > 0 ? (bouncedSessions / sessions) * 100 : 0
    return { totalViews, visitors, sessions, avgMs, bounceRate }
  }, [filteredRows])

  const topPaths = useMemo(() => {
    const m = d3Rollup(filteredRows, (r) => fmtPath(r))
    return m.map(([key, value]) => ({ key, value }))
  }, [filteredRows])

  const sources = useMemo(() => {
    const m = d3Rollup(filteredRows, classifySource)
    return m.map(([key, value]) => ({ key, value }))
  }, [filteredRows])

  const devices = useMemo(() => {
    const m = d3Rollup(filteredRows, (r) => r.device_type || 'unknown')
    return m.map(([key, value]) => ({ key, value }))
  }, [filteredRows])

  const browsers = useMemo(() => {
    const m = d3Rollup(filteredRows, (r) => r.browser || 'unknown')
    return m.map(([key, value]) => ({ key, value }))
  }, [filteredRows])

  const locations = useMemo(() => {
    const m = d3Rollup(filteredRows, (r) => {
      const c = [r.country, r.city].filter(Boolean).join(' · ')
      return c || '(미확인)'
    })
    return m.map(([key, value]) => ({ key, value }))
  }, [filteredRows])

  const utmCampaigns = useMemo(() => {
    const m = d3Rollup(
      filteredRows.filter((r) => r.utm_campaign || r.utm_source),
      (r) => `${r.utm_source || '?'} / ${r.utm_campaign || '(no campaign)'}`,
    )
    return m.map(([key, value]) => ({ key, value }))
  }, [filteredRows])

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <h1 className="mb-2 text-lg font-semibold">Supabase 환경변수가 없습니다</h1>
          <p>
            프로젝트 루트에 <code>.env.local</code> 을 만들고 아래 두 값을 채운 뒤 다시 빌드/배포해 주세요.
          </p>
          <pre className="mt-3 overflow-x-auto rounded bg-amber-100 p-3 text-xs">
{`VITE_SUPABASE_URL=https://ivymmwygzqwxfewheqmb.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable key>`}
          </pre>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <form
          onSubmit={handleLogin}
          className="mx-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h1 className="text-lg font-semibold text-slate-900">FutureVisor 관리자</h1>
          <p className="mt-1 text-xs text-slate-500">접근 토큰을 입력하세요.</p>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="admin token"
            autoFocus
            className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            로그인
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-[1280px] space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">FutureVisor · 방문자 트래킹</h1>
            <p className="text-xs text-slate-500">
              최근 {rangeDays}일 · 페이지뷰 {kpis.totalViews.toLocaleString()}건 · 순방문자{' '}
              {kpis.visitors.toLocaleString()}명
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-white text-sm">
              {RANGE_OPTIONS.map((o) => (
                <button
                  key={o.days}
                  onClick={() => setRangeDays(o.days)}
                  className={`px-3 py-1.5 transition ${
                    o.days === rangeDays
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <input
              value={pathFilter}
              onChange={(e) => setPathFilter(e.target.value)}
              placeholder="경로 필터 (예: /, ?utm)"
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-brand-500"
            />
            <button
              onClick={() => loadData(token, rangeDays)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              새로고침
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50"
            >
              로그아웃
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <KpiCard label="페이지뷰" value={kpis.totalViews.toLocaleString()} />
          <KpiCard label="순방문자" value={kpis.visitors.toLocaleString()} />
          <KpiCard label="세션" value={kpis.sessions.toLocaleString()} />
          <KpiCard label="평균 체류" value={fmtDuration(kpis.avgMs)} />
          <KpiCard label="바운스율" value={`${kpis.bounceRate.toFixed(1)}%`} />
        </section>

        <AdminAi rows={filteredRows} adminToken={token} rangeDays={rangeDays} />

        <Card title="기간 추세">
          {loading && rows.length === 0 ? (
            <Skeleton h={220} />
          ) : (
            <TimeSeriesChart rows={filteredRows} rangeDays={rangeDays} />
          )}
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="요일 × 시간대 (한국시각 기준)">
            <HourDayHeatmap rows={filteredRows} />
          </Card>
          <Card title="체류시간 분포">
            <DurationHistogram rows={filteredRows} />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="유입 경로 (Referrer / UTM)">
            <DonutChart data={sources.slice(0, 8)} centerLabel="유입" />
          </Card>
          <Card title="UTM 캠페인 성과">
            <BarRanking data={utmCampaigns.slice(0, 10)} />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="디바이스">
            <DonutChart data={devices} centerLabel="기기" />
          </Card>
          <Card title="브라우저">
            <DonutChart data={browsers.slice(0, 8)} centerLabel="브라우저" />
          </Card>
          <Card title="국가 · 도시">
            <BarRanking data={locations.slice(0, 10)} />
          </Card>
        </div>

        <Card title="가장 많이 본 페이지">
          <BarRanking data={topPaths.slice(0, 15)} />
        </Card>

        <Card title={`최근 방문 세션 (${filteredRows.length.toLocaleString()}건)`}>
          <SessionTable rows={filteredRows.slice(0, 300)} />
        </Card>

        <footer className="pt-2 pb-6 text-center text-xs text-slate-400">
          개인정보는 IP를 해시값으로만 저장합니다. /admin 자체는 트래킹되지 않습니다.
        </footer>
      </div>
    </div>
  )
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-4">
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">{value}</div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <h2 className="mb-3 text-sm font-semibold text-slate-700">{title}</h2>
      {children}
    </section>
  )
}

function Skeleton({ h }: { h: number }) {
  return <div className="w-full animate-pulse rounded bg-slate-100" style={{ height: h }} />
}

function SessionTable({ rows }: { rows: PageView[] }) {
  if (rows.length === 0)
    return <div className="py-6 text-center text-xs text-slate-400">데이터가 없습니다</div>
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-xs">
        <thead className="text-left text-slate-500">
          <tr className="border-b border-slate-200">
            <th className="py-2 pr-2">시각</th>
            <th className="py-2 pr-2">방문자</th>
            <th className="py-2 pr-2">위치</th>
            <th className="py-2 pr-2">경로</th>
            <th className="py-2 pr-2">유입</th>
            <th className="py-2 pr-2">디바이스</th>
            <th className="py-2 pr-2 text-right">체류</th>
            <th className="py-2 pr-2 text-right">스크롤</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 align-top hover:bg-slate-50">
              <td className="whitespace-nowrap py-1.5 pr-2 text-slate-700 tabular-nums">
                {fmtKoreaTime(r.entered_at)}
              </td>
              <td className="whitespace-nowrap py-1.5 pr-2 font-mono text-[10px] text-slate-500">
                {r.visitor_id.slice(0, 8)}
              </td>
              <td className="whitespace-nowrap py-1.5 pr-2 text-slate-700">{fmtLocation(r)}</td>
              <td className="py-1.5 pr-2 text-slate-900">
                <span className="break-all" title={r.url}>
                  {fmtPath(r)}
                </span>
              </td>
              <td className="whitespace-nowrap py-1.5 pr-2 text-slate-600">{classifySource(r)}</td>
              <td className="whitespace-nowrap py-1.5 pr-2 text-slate-600">
                {r.device_type} · {r.browser} · {r.os}
              </td>
              <td className="whitespace-nowrap py-1.5 pr-2 text-right tabular-nums text-slate-900">
                {fmtDuration(r.duration_ms)}
              </td>
              <td className="whitespace-nowrap py-1.5 pr-2 text-right tabular-nums text-slate-600">
                {r.max_scroll != null ? `${r.max_scroll}%` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// d3.rollup wrapper that returns sorted entries
function d3Rollup<T>(arr: T[], key: (r: T) => string): [string, number][] {
  const m = new Map<string, number>()
  for (const r of arr) {
    const k = key(r)
    m.set(k, (m.get(k) || 0) + 1)
  }
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1])
}
