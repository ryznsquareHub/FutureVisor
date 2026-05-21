import { supabase } from './supabase'

type Geo = {
  country: string
  region: string
  city: string
  timezone: string
  ip_hash: string
}

const VISITOR_KEY = 'fv:visitor_id'
const SESSION_KEY = 'fv:session_id'
const SESSION_TS_KEY = 'fv:session_ts'
const GEO_KEY = 'fv:geo'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = uuid()
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return uuid()
  }
}

function getSessionId(): string {
  try {
    const now = Date.now()
    const last = Number(localStorage.getItem(SESSION_TS_KEY) || 0)
    let id = localStorage.getItem(SESSION_KEY)
    if (!id || now - last > SESSION_TIMEOUT_MS) {
      id = uuid()
      localStorage.setItem(SESSION_KEY, id)
    }
    localStorage.setItem(SESSION_TS_KEY, String(now))
    return id
  } catch {
    return uuid()
  }
}

function parseUA(ua: string) {
  const u = ua.toLowerCase()
  let device_type = 'desktop'
  if (/mobile|iphone|android.*mobile|windows phone/.test(u)) device_type = 'mobile'
  else if (/ipad|tablet|android(?!.*mobile)/.test(u)) device_type = 'tablet'

  let browser = 'other'
  if (/edg\//.test(u)) browser = 'Edge'
  else if (/whale/.test(u)) browser = 'Whale'
  else if (/samsungbrowser/.test(u)) browser = 'Samsung'
  else if (/chrome\//.test(u)) browser = 'Chrome'
  else if (/firefox/.test(u)) browser = 'Firefox'
  else if (/safari/.test(u)) browser = 'Safari'
  else if (/kakaotalk/.test(u)) browser = 'KakaoTalk'
  else if (/naver\(inapp/.test(u) || /naver/.test(u)) browser = 'Naver'

  let os = 'other'
  if (/windows/.test(u)) os = 'Windows'
  else if (/iphone|ipad|ipod/.test(u)) os = 'iOS'
  else if (/android/.test(u)) os = 'Android'
  else if (/mac os x/.test(u)) os = 'macOS'
  else if (/linux/.test(u)) os = 'Linux'

  return { device_type, browser, os }
}

async function hashIp(ip: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('fv-salt:' + ip))
    return Array.from(new Uint8Array(buf))
      .slice(0, 8)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return ''
  }
}

async function fetchGeo(): Promise<Geo> {
  const empty: Geo = { country: '', region: '', city: '', timezone: '', ip_hash: '' }
  try {
    const cached = sessionStorage.getItem(GEO_KEY)
    if (cached) return JSON.parse(cached) as Geo
  } catch {
    /* ignore */
  }
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 3000)
    const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal })
    clearTimeout(t)
    if (!res.ok) return empty
    const j = (await res.json()) as {
      ip?: string
      country_name?: string
      country_code?: string
      region?: string
      city?: string
      timezone?: string
    }
    const geo: Geo = {
      country: j.country_name || j.country_code || '',
      region: j.region || '',
      city: j.city || '',
      timezone: j.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      ip_hash: j.ip ? await hashIp(j.ip) : '',
    }
    try {
      sessionStorage.setItem(GEO_KEY, JSON.stringify(geo))
    } catch {
      /* ignore */
    }
    return geo
  } catch {
    empty.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    return empty
  }
}

type UtmFields = {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
}

function readUtmParams(search: string): UtmFields {
  const p = new URLSearchParams(search)
  const pick = (k: string) => p.get(k) || null
  return {
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_term: pick('utm_term'),
    utm_content: pick('utm_content'),
  }
}

let currentViewId: string | null = null
let enteredAt = 0
let maxScroll = 0
let recorded = false

function computeScrollPct(): number {
  const doc = document.documentElement
  const body = document.body
  const scroll = window.scrollY || doc.scrollTop || 0
  const max = Math.max(doc.scrollHeight, body?.scrollHeight || 0) - window.innerHeight
  if (max <= 0) return 100
  return Math.min(100, Math.round((scroll / max) * 100))
}

function onScroll() {
  const v = computeScrollPct()
  if (v > maxScroll) maxScroll = v
}

async function recordExit() {
  if (recorded || !currentViewId || !supabase) return
  recorded = true
  const left = new Date()
  const duration = Date.now() - enteredAt
  const isBounce = duration < 5000 && maxScroll < 25
  try {
    await supabase.rpc('fv_record_duration', {
      p_id: currentViewId,
      p_left_at: left.toISOString(),
      p_duration_ms: duration,
      p_max_scroll: maxScroll,
      p_is_bounce: isBounce,
    })
  } catch {
    /* ignore */
  }
}

let installed = false

export async function trackPageView(): Promise<void> {
  if (typeof window === 'undefined') return
  if (!supabase) return

  // 어드민 페이지는 트래킹 제외
  if (window.location.pathname.startsWith('/admin')) return

  // 직전 페이지뷰가 살아있으면 먼저 종료 기록
  if (currentViewId && !recorded) {
    await recordExit()
  }

  recorded = false
  enteredAt = Date.now()
  maxScroll = computeScrollPct()

  const ua = navigator.userAgent || ''
  const { device_type, browser, os } = parseUA(ua)
  const utm = readUtmParams(window.location.search)
  const referrer = document.referrer || ''
  let referrer_host = ''
  try {
    referrer_host = referrer ? new URL(referrer).host : ''
  } catch {
    /* ignore */
  }

  const geo = await fetchGeo()

  const params = {
    p_visitor_id: getVisitorId(),
    p_session_id: getSessionId(),
    p_url: window.location.href,
    p_path: window.location.pathname,
    p_search: window.location.search || null,
    p_hash: window.location.hash || null,
    p_referrer: referrer || null,
    p_referrer_host: referrer_host || null,
    p_utm_source: utm.utm_source,
    p_utm_medium: utm.utm_medium,
    p_utm_campaign: utm.utm_campaign,
    p_utm_term: utm.utm_term,
    p_utm_content: utm.utm_content,
    p_user_agent: ua,
    p_language: navigator.language || '',
    p_device_type: device_type,
    p_browser: browser,
    p_os: os,
    p_screen_w: window.screen?.width ?? null,
    p_screen_h: window.screen?.height ?? null,
    p_viewport_w: window.innerWidth ?? null,
    p_viewport_h: window.innerHeight ?? null,
    p_country: geo.country || null,
    p_region: geo.region || null,
    p_city: geo.city || null,
    p_timezone: geo.timezone || null,
    p_ip_hash: geo.ip_hash || null,
  }

  try {
    const { data, error } = await supabase.rpc('fv_record_view', params)
    if (error || !data) {
      currentViewId = null
      return
    }
    currentViewId = data as string
  } catch {
    currentViewId = null
  }

  if (!installed) {
    installed = true
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('beforeunload', () => {
      void recordExit()
    })
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') void recordExit()
    })
    window.addEventListener('pagehide', () => {
      void recordExit()
    })
  }
}
