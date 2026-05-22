// AI 분석 프롬프트 빌더 — 트래픽 데이터를 집계하고 공용 AI 게이트웨이로 보낼
// 최종 프롬프트 문자열을 만든다. 게이트웨이(D:\2026_workspace\Ai-docker)는
// 프로젝트 무관 제너릭이므로, FutureVisor 고유 프롬프트는 모두 여기 있다.

import type { PageView } from './types'

export type AiMode =
  | 'today-summary'
  | 'yesterday-summary'
  | 'today-vs-yesterday'
  | 'weekly-trend'
  | 'monthly-trend'
  | 'channel-compare'

const SERVICE_CONTEXT =
  'FutureVisor 랜딩 사이트 (futurevisor.co.kr — 기업 맞춤 자동화 시스템 구축 B2B 서비스)'

// ─────────────────────────── 공통 헬퍼 ───────────────────────────

export function classifySource(r: PageView): string {
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

export function startOfKstDay(d: Date): Date {
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

  return { pageViews: rows.length, visitors, sessions, avgDurationSec: avgDurSec, bounceRate }
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

function rowsInRange(rows: PageView[], from: Date, to: Date) {
  return rows.filter((r) => {
    const t = new Date(r.entered_at).getTime()
    return t >= from.getTime() && t < to.getTime()
  })
}

function hourlyKst(rows: PageView[]) {
  const out: { hour: number; count: number }[] = []
  for (let h = 0; h < 24; h++) {
    const c = rows.filter((r) => {
      const kstHour = Number(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Seoul',
          hour: '2-digit',
          hour12: false,
        }).format(new Date(r.entered_at)),
      )
      return kstHour === h
    }).length
    if (c > 0) out.push({ hour: h, count: c })
  }
  return out
}

function jsonBlock(data: unknown): string {
  return '```json\n' + JSON.stringify(data, null, 2) + '\n```'
}

// ─────────────────────────── 페이로드 빌더 ───────────────────────────

function buildTodaySummaryPayload(rows: PageView[]) {
  const now = new Date()
  const todayKst0 = startOfKstDay(now)
  const yesterdayKst0 = new Date(todayKst0.getTime() - 24 * 60 * 60 * 1000)
  const today = rowsInRange(rows, todayKst0, now)

  const yesterdaySameWindowEnd = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const yesterdaySameWindow = rowsInRange(rows, yesterdayKst0, yesterdaySameWindowEnd)

  const kstNowParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const kstHourNow = Number(kstNowParts.find((p) => p.type === 'hour')!.value)
  const kstMinNow = Number(kstNowParts.find((p) => p.type === 'minute')!.value)
  const elapsedHours = Math.round((kstHourNow + kstMinNow / 60) * 10) / 10

  const dateLabel = `${new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(todayKst0)} ${String(kstHourNow).padStart(2, '0')}:${String(kstMinNow).padStart(2, '0')} 기준`

  return {
    dateLabel,
    elapsedHours,
    today: {
      basics: aggregateBasics(today),
      topPaths: topN(today, (r) => r.path + (r.search || ''), 6),
      topSources: topN(today, classifySource, 6),
      topCountries: topN(today, (r) => `${r.country || '미확인'}/${r.city || '-'}`, 5),
      devices: topN(today, (r) => r.device_type || 'unknown', 4),
      hourlyDistribution: hourlyKst(today),
    },
    yesterdaySameWindow: {
      label: `어제 0시 ~ 어제 ${String(kstHourNow).padStart(2, '0')}:${String(kstMinNow).padStart(2, '0')}`,
      basics: aggregateBasics(yesterdaySameWindow),
      topSources: topN(yesterdaySameWindow, classifySource, 5),
    },
  }
}

function buildYesterdayPayload(rows: PageView[]) {
  const now = new Date()
  const todayKst0 = startOfKstDay(now)
  const yesterdayKst0 = new Date(todayKst0.getTime() - 24 * 60 * 60 * 1000)
  const yest = rowsInRange(rows, yesterdayKst0, todayKst0)

  const dateLabel = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(yesterdayKst0)

  return {
    dateLabel,
    basics: aggregateBasics(yest),
    topPaths: topN(yest, (r) => r.path + (r.search || ''), 8),
    topSources: topN(yest, classifySource, 8),
    topCountries: topN(yest, (r) => `${r.country || '미확인'}/${r.city || '-'}`, 8),
    devices: topN(yest, (r) => r.device_type || 'unknown', 5),
    browsers: topN(yest, (r) => r.browser || 'unknown', 5),
    hourlyDistribution: hourlyKst(yest),
  }
}

function buildTodayVsYesterdayPayload(rows: PageView[]) {
  const now = new Date()
  const todayKst0 = startOfKstDay(now)
  const yesterdayKst0 = new Date(todayKst0.getTime() - 24 * 60 * 60 * 1000)
  const yesterdaySameWindowEnd = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const today = rowsInRange(rows, todayKst0, now)
  const yesterdaySameWindow = rowsInRange(rows, yesterdayKst0, yesterdaySameWindowEnd)
  const yesterdayFull = rowsInRange(rows, yesterdayKst0, todayKst0)

  const kstNowParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const kstHourNow = Number(kstNowParts.find((p) => p.type === 'hour')!.value)
  const kstMinNow = Number(kstNowParts.find((p) => p.type === 'minute')!.value)
  const elapsedHours = Math.round((kstHourNow + kstMinNow / 60) * 10) / 10

  const todayLabel = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(todayKst0)
  const yesterdayLabel = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(yesterdayKst0)

  return {
    elapsedHours,
    nowLabel: `${todayLabel} ${String(kstHourNow).padStart(2, '0')}:${String(kstMinNow).padStart(2, '0')} 기준`,
    today: {
      label: `오늘(${todayLabel}) 00:00 ~ 현재 (${elapsedHours}h)`,
      basics: aggregateBasics(today),
      topPaths: topN(today, (r) => r.path + (r.search || ''), 5),
      topSources: topN(today, classifySource, 5),
      devices: topN(today, (r) => r.device_type || 'unknown', 4),
    },
    yesterdaySameWindow: {
      label: `어제(${yesterdayLabel}) 00:00 ~ 같은 시각까지 (${elapsedHours}h)`,
      basics: aggregateBasics(yesterdaySameWindow),
      topPaths: topN(yesterdaySameWindow, (r) => r.path + (r.search || ''), 5),
      topSources: topN(yesterdaySameWindow, classifySource, 5),
    },
    yesterdayFull: {
      label: `어제(${yesterdayLabel}) 전체 24시간`,
      basics: aggregateBasics(yesterdayFull),
      topPaths: topN(yesterdayFull, (r) => r.path + (r.search || ''), 5),
      topSources: topN(yesterdayFull, classifySource, 5),
    },
  }
}

function buildWeeklyTrendPayload(rows: PageView[]) {
  const now = new Date()
  const todayKst0 = startOfKstDay(now)
  const thisWeekStart = new Date(todayKst0.getTime() - 7 * 24 * 60 * 60 * 1000)
  const prevWeekStart = new Date(todayKst0.getTime() - 14 * 24 * 60 * 60 * 1000)

  const thisWeekRows = rowsInRange(rows, thisWeekStart, todayKst0)
  const prevWeekRows = rowsInRange(rows, prevWeekStart, thisWeekStart)

  const dayFmt = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  })

  const daysWithData = new Set<string>()
  const dailyBreakdown = []
  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(todayKst0.getTime() - (i + 1) * 24 * 60 * 60 * 1000)
    const dayEnd = new Date(todayKst0.getTime() - i * 24 * 60 * 60 * 1000)
    const dayRows = rowsInRange(rows, dayStart, dayEnd)
    if (dayRows.length > 0) daysWithData.add(dayStart.toISOString().slice(0, 10))
    const b = aggregateBasics(dayRows)
    dailyBreakdown.push({
      date: dayFmt.format(dayStart),
      visitors: b.visitors,
      pageViews: b.pageViews,
      sessions: b.sessions,
      avgDurationSec: b.avgDurationSec,
      bounceRate: b.bounceRate,
      topSources: topN(dayRows, classifySource, 3),
      topPaths: topN(dayRows, (r) => r.path, 3),
    })
  }

  return {
    rangeLabel: `최근 7일 (${dayFmt.format(thisWeekStart)} ~ ${dayFmt.format(new Date(todayKst0.getTime() - 24 * 60 * 60 * 1000))})`,
    dataCompleteness: `${daysWithData.size}/7`,
    thisWeekTotals: aggregateBasics(thisWeekRows),
    previousWeekTotals: prevWeekRows.length > 0 ? aggregateBasics(prevWeekRows) : null,
    dailyBreakdown,
    dayOfWeekPattern: dayOfWeekPattern(rowsInRange(rows, prevWeekStart, todayKst0)),
    topSourcesThisWeek: topN(thisWeekRows, classifySource, 8),
    topPathsThisWeek: topN(thisWeekRows, (r) => r.path + (r.search || ''), 8),
  }
}

function buildMonthlyTrendPayload(rows: PageView[]) {
  const now = new Date()
  const todayKst0 = startOfKstDay(now)
  const monthStart = new Date(todayKst0.getTime() - 30 * 24 * 60 * 60 * 1000)
  const prevMonthStart = new Date(todayKst0.getTime() - 60 * 24 * 60 * 60 * 1000)

  const thisMonthRows = rowsInRange(rows, monthStart, todayKst0)
  const prevMonthRows = rowsInRange(rows, prevMonthStart, monthStart)

  const dayFmt = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  })
  const shortFmt = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
  })

  const daysWithData = new Set<string>()
  const dailyCompact = []
  for (let i = 29; i >= 0; i--) {
    const dayStart = new Date(todayKst0.getTime() - (i + 1) * 24 * 60 * 60 * 1000)
    const dayEnd = new Date(todayKst0.getTime() - i * 24 * 60 * 60 * 1000)
    const dayRows = rowsInRange(rows, dayStart, dayEnd)
    if (dayRows.length > 0) daysWithData.add(dayStart.toISOString().slice(0, 10))
    dailyCompact.push({
      date: shortFmt.format(dayStart),
      visitors: new Set(dayRows.map((r) => r.visitor_id)).size,
      pageViews: dayRows.length,
    })
  }

  const weeklyBreakdown = []
  for (let w = 4; w >= 0; w--) {
    const wStart = new Date(todayKst0.getTime() - (w + 1) * 7 * 24 * 60 * 60 * 1000)
    const wEnd = new Date(todayKst0.getTime() - w * 7 * 24 * 60 * 60 * 1000)
    if (wEnd.getTime() <= monthStart.getTime()) continue
    const clampedStart = wStart.getTime() < monthStart.getTime() ? monthStart : wStart
    const wRows = rowsInRange(rows, clampedStart, wEnd)
    const b = aggregateBasics(wRows)
    weeklyBreakdown.push({
      week: `${shortFmt.format(clampedStart)} ~ ${shortFmt.format(new Date(wEnd.getTime() - 24 * 60 * 60 * 1000))}`,
      visitors: b.visitors,
      pageViews: b.pageViews,
      sessions: b.sessions,
      avgDurationSec: b.avgDurationSec,
      bounceRate: b.bounceRate,
      topSources: topN(wRows, classifySource, 3),
    })
  }

  return {
    rangeLabel: `최근 30일 (${dayFmt.format(monthStart)} ~ ${dayFmt.format(new Date(todayKst0.getTime() - 24 * 60 * 60 * 1000))})`,
    dataCompleteness: `${daysWithData.size}/30`,
    thisMonthTotals: aggregateBasics(thisMonthRows),
    previousMonthTotals: prevMonthRows.length > 0 ? aggregateBasics(prevMonthRows) : null,
    weeklyBreakdown,
    dailyCompact,
    dayOfWeekPattern: dayOfWeekPattern(thisMonthRows),
    topSourcesMonth: topN(thisMonthRows, classifySource, 8),
    topPathsMonth: topN(thisMonthRows, (r) => r.path + (r.search || ''), 8),
  }
}

function dayOfWeekPattern(rows: PageView[]) {
  const dowFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', weekday: 'short' })
  const dowMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }
  const isoFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' })
  const agg: Record<number, { pv: number; days: Set<string> }> = {}
  for (const r of rows) {
    const d = new Date(r.entered_at)
    const dow = dowMap[dowFmt.format(d)] ?? 0
    if (!agg[dow]) agg[dow] = { pv: 0, days: new Set() }
    agg[dow].pv++
    agg[dow].days.add(isoFmt.format(d))
  }
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  return dayNames.map((name, i) => {
    const a = agg[i]
    const dc = a?.days.size ?? 0
    return { dayOfWeek: name, sampleDays: dc, avgPv: a && dc > 0 ? Math.round((a.pv / dc) * 10) / 10 : 0 }
  })
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

  return { dateRange: `최근 ${rangeDays}일`, totals: aggregateBasics(rows), channels }
}

// ─────────────────────────── 프롬프트 빌더 ───────────────────────────

export function buildPrompt(mode: AiMode, rows: PageView[], rangeDays: number): string {
  switch (mode) {
    case 'today-summary': {
      const data = buildTodaySummaryPayload(rows)
      return `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 ${SERVICE_CONTEXT}의 **오늘**(${data.dateLabel} 한국시각, 현재 ${data.elapsedHours}시간 경과 / 24시간 중) 진행 중 트래픽 집계입니다.

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(현재 시각까지 방문자/PV/체류시간/바운스 + 어제 같은 시간대 대비가 데이터에 있으면 그 비교까지 한 문장)

### 지금까지의 시그널
- (오전/오후 어느 시간대에 유입이 몰렸는지)
- (어디서 와서, 어떤 페이지를 봤는지)
- (체류·바운스 품질)

### 남은 시간 액션
- (오늘 안에 시도할 수 있는 트래픽 부스팅 액션 1개)
- (지금 들어온 방문자 유형 기반의 후속 조치 1개)

오늘은 **진행 중인 부분 데이터**임을 분석에 명시적으로 반영하세요. 어제와 비교할 수 있으면 "어제 같은 시간대 대비 X%" 같은 표현을 사용. 데이터가 너무 적으면(예: PV 5 미만) "데이터 부족" 솔직히 적고 어떤 신호가 더 필요한지 말씀해주세요. 데이터에 없는 사실을 지어내지 마세요.

데이터:
${jsonBlock(data)}`
    }

    case 'yesterday-summary': {
      const data = buildYesterdayPayload(rows)
      return `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 ${SERVICE_CONTEXT}의 어제(${data.dateLabel} 한국시각) 트래픽 집계입니다.

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(방문자/PV/체류시간/바운스 핵심 지표 한 문장)

### 인사이트
- (어디서 와서, 무엇을 보고, 얼마나 머물렀는지 1번)
- (2번)
- (3번)

### 액션 제안
- (유입 늘리기 위한 구체적 액션 1번)
- (2번)

데이터가 너무 적으면(예: PV 10 미만) "데이터 부족"이라 솔직히 적고, 어떤 시그널이 더 필요한지 짚어주세요. 절대 데이터 없는 사실을 지어내지 마세요.

데이터:
${jsonBlock(data)}`
    }

    case 'today-vs-yesterday': {
      const data = buildTodayVsYesterdayPayload(rows)
      return `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 ${SERVICE_CONTEXT}의 **오늘 vs 어제** 트래픽 비교 데이터입니다.

세 가지 묶음이 있습니다:
- **today**: 오늘 00:00 ~ 현재(${data.elapsedHours}시간 경과)까지 진행 중 데이터
- **yesterdaySameWindow**: 어제 00:00 ~ 어제 같은 시각까지의 누적 (today와 동일 윈도우)
- **yesterdayFull**: 어제 0시 ~ 24시 전체

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(같은 윈도우 기준 today vs yesterdaySameWindow 핵심 지표 비교를 한 문장으로 — "어제 같은 시간 대비 ±X%" 같이)

### 비교 표
| 지표 | 오늘 (진행 중) | 어제 같은 시간까지 | 어제 전체 | 추세 |
|---|---|---|---|---|
| 방문자 | ... | ... | ... | ↑/↓/→ |
| PV | ... | ... | ... | ↑/↓/→ |
| 평균 체류(초) | ... | ... | ... | ↑/↓/→ |
| 바운스율 | ... | ... | ... | ↑/↓/→ |

(today와 yesterdaySameWindow 비교가 "추세" 컬럼의 핵심)

### 변화 포인트
- (오늘 유입 채널이 어제와 어떻게 다른지)
- (오늘 뜨고 있는/식고 있는 페이지 — top paths 비교)
- (체류·바운스 품질 변화)

### 오늘 안 액션
- (남은 시간에 시도할 가장 임팩트 있는 액션 1개, 구체적으로)
- (다음 24시간 추적 우선순위 1개)

데이터 양이 적으면(전체 PV 10 미만) 솔직히 인정하고, "비교 자체가 노이즈 수준이지만 그래도 읽을 수 있는 점은…" 식으로 신중하게 다루세요. 같은 윈도우 비교가 의사결정에 가장 유용하다는 사실을 기억하세요. 데이터에 없는 사실 지어내지 마세요.

데이터:
${jsonBlock(data)}`
    }

    case 'weekly-trend': {
      const data = buildWeeklyTrendPayload(rows)
      return `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 ${SERVICE_CONTEXT}의 **최근 7일 트렌드** 데이터입니다.

페이로드 구조:
- **dailyBreakdown**: 최근 7일 (KST 기준), 날짜순. 각 일자별 방문자/PV/세션/평균체류/바운스/상위 유입/상위 페이지
- **thisWeekTotals**: 최근 7일 누적
- **previousWeekTotals**: 그 전 7일 누적 (없으면 null)
- **dayOfWeekPattern**: 요일별 평균 PV (최근 14일 기준)
- **dataCompleteness**: 실제로 수집된 일자 수 / 7

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(주간 추세를 한 문장 — "지난 주 대비 ±X%", "상승/하락/정체", "어느 요일이 핵심" 등)

### 일자별 추이
| 날짜 (요일) | 방문자 | PV | 평균 체류 | 바운스 | 핵심 유입 |
|---|---|---|---|---|---|
| MM/DD (요일) | ... | ... | ... | ... | ... |

(dailyBreakdown 배열의 모든 일자를 표로)

### 패턴 진단
- **요일 패턴**: (어느 요일이 강한지 — B2B는 보통 주중. 우리는 어떤지)
- **추세 방향**: (7일 그래프 형태 — 상승/하락/평탄/스파이크)
- **이번 주 vs 지난 주**: (있다면 비교)
- **유입 채널 변화**: (Direct, 검색, SNS 비율 변화)

### 다음 주 액션 (우선순위)
- (가장 임팩트 큰 액션 1개, 데이터 근거 함께)
- (실험해볼 만한 가설 1개)
- (모니터링 강화 필요한 지표 1개)

dataCompleteness가 7/7이 아니면 (예: 3일치만) 그 사실을 명시하고 신중하게 다루세요. 전체 PV가 30 미만이면 "패턴 단정 불가, 더 많은 데이터가 필요" 명확히 적어주세요. 데이터에 없는 사실 지어내지 마세요.

데이터:
${jsonBlock(data)}`
    }

    case 'monthly-trend': {
      const data = buildMonthlyTrendPayload(rows)
      return `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 ${SERVICE_CONTEXT}의 **최근 30일 트렌드** 데이터입니다.

페이로드 구조:
- **weeklyBreakdown**: 최근 30일을 주 단위로 쪼갠 묶음 (가장 오래된 주 → 최신 주). 각 주의 방문자/PV/세션/평균체류/바운스/상위 유입
- **dailyCompact**: 30일 일자별 간단 수치 (날짜·방문자·PV) — 스파이크/공백일 파악용
- **thisMonthTotals**: 최근 30일 누적
- **previousMonthTotals**: 그 전 30일 누적 (없으면 null)
- **dayOfWeekPattern**: 요일별 평균 PV
- **topSourcesMonth / topPathsMonth**: 30일 상위 유입·페이지
- **dataCompleteness**: 데이터가 있는 일자 수 / 30

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(월간 추세 한 문장 — "지난 달 대비 ±X%", 상승/하락/정체, 가장 큰 변화)

### 주차별 추이
| 주차 | 방문자 | PV | 평균 체류 | 바운스 | 핵심 유입 |
|---|---|---|---|---|---|
| (weeklyBreakdown 각 주) | ... | ... | ... | ... | ... |

### 한 달 흐름 진단
- **성장 궤적**: (4주간 우상향/우하향/정체/롤러코스터 — 구체 수치로)
- **이번 달 vs 지난 달**: (있다면 비교, 없으면 명시)
- **요일 패턴**: (어느 요일이 꾸준히 강한지 — B2B 주중 패턴 확인)
- **유입 채널 변화**: (한 달간 Direct/검색/SNS 비중이 어떻게 움직였는지)
- **스파이크/공백**: (dailyCompact에서 튀는 날·0인 날이 있으면 짚기)

### 다음 달 전략 (우선순위)
- (가장 임팩트 큰 액션 1개 — 데이터 근거 명확히)
- (한 달 안에 검증할 가설 1개)
- (집중 모니터링할 지표 1개)

dataCompleteness가 30/30이 아니면 명시하고 신중히. 전체 PV가 100 미만이면 "월간 트렌드로 단정하기엔 표본 부족" 솔직히 적되, 그 안에서 읽을 수 있는 초기 신호는 짚어주세요. 데이터에 없는 사실 지어내지 마세요.

데이터:
${jsonBlock(data)}`
    }

    case 'channel-compare': {
      const data = buildChannelPayload(rows, rangeDays)
      return `당신은 마케팅 채널 효율 분석가입니다. 아래는 ${SERVICE_CONTEXT}의 유입 채널별 성과 집계입니다 — 기간: ${data.dateRange}.

각 채널(Google, Naver, Daum/Kakao, Meta, X/Twitter, YouTube, LinkedIn, 직접/북마크, UTM 캠페인 등)을 다음 관점으로 비교 분석해 주세요:

### 채널별 한 줄 평가
- (채널명: 방문자 수 vs 평균 체류 vs 바운스율을 보고 한 줄 평가)
- 채널마다 한 줄씩, 데이터가 있는 채널만

### 효율 vs 양 진단
- "양은 많은데 질이 낮은" 채널과 "양은 적지만 질이 높은" 채널을 구분해 짚어주세요

### 다음 액션 (우선순위)
- (광고/콘텐츠 배분 제안 2-3가지, 구체적으로)

데이터가 한쪽으로 쏠려 있으면(예: 직접 유입만 99%) 솔직히 그 사실을 지적하고 다른 채널을 키울 출발점을 제안하세요. 데이터에 없는 채널을 지어내지 마세요.

데이터:
${jsonBlock(data)}`
    }
  }
}
