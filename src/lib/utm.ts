const STORAGE_KEY = 'fv:utm'

export type UtmPayload = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  referrer: string
  landingPath: string
  landedAt: string
}

const empty: UtmPayload = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmTerm: '',
  utmContent: '',
  referrer: '',
  landingPath: '',
  landedAt: '',
}

export function captureUtmOnce() {
  if (typeof window === 'undefined') return
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const payload: UtmPayload = {
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      utmTerm: params.get('utm_term') ?? '',
      utmContent: params.get('utm_content') ?? '',
      referrer: document.referrer || '',
      landingPath: window.location.pathname + window.location.search,
      landedAt: new Date().toISOString(),
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* sessionStorage 차단 환경 — 무시 */
  }
}

export function readUtm(): UtmPayload {
  if (typeof window === 'undefined') return empty
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<UtmPayload>
    return { ...empty, ...parsed }
  } catch {
    return empty
  }
}

export function formatUtmForEmail(u: UtmPayload): string {
  const lines = [
    u.utmSource && `source: ${u.utmSource}`,
    u.utmMedium && `medium: ${u.utmMedium}`,
    u.utmCampaign && `campaign: ${u.utmCampaign}`,
    u.utmTerm && `term: ${u.utmTerm}`,
    u.utmContent && `content: ${u.utmContent}`,
    u.referrer && `referrer: ${u.referrer}`,
    u.landingPath && `landing: ${u.landingPath}`,
    u.landedAt && `landedAt: ${u.landedAt}`,
  ].filter(Boolean)
  return lines.length ? lines.join('\n') : '(direct)'
}
