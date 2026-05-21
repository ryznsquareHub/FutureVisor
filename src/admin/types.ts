export type PageView = {
  id: string
  visitor_id: string
  session_id: string
  url: string
  path: string
  search: string | null
  hash: string | null
  referrer: string | null
  referrer_host: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  user_agent: string | null
  language: string | null
  device_type: string | null
  browser: string | null
  os: string | null
  screen_w: number | null
  screen_h: number | null
  viewport_w: number | null
  viewport_h: number | null
  country: string | null
  region: string | null
  city: string | null
  timezone: string | null
  ip_hash: string | null
  entered_at: string
  left_at: string | null
  duration_ms: number | null
  max_scroll: number | null
  is_bounce: boolean | null
  created_at: string
}
