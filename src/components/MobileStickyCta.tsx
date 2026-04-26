import { useEffect, useState } from 'react'

const HIDE_NEAR_FORM_PX = 320

/**
 * 모바일 전용 하단 고정 CTA 바.
 * - Hero 영역(약 1뷰포트)을 지나면 등장
 * - 컨택트 폼 근처에 도달하면 자동으로 숨김 (폼과의 시각적 충돌 방지)
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const showAfter = window.innerHeight * 0.85
      const contact = document.getElementById('contact')
      const nearContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight + HIDE_NEAR_FORM_PX
        : false
      setVisible(y > showAfter && !nearContact)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[150] border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(15,23,43,0.18)] backdrop-blur transition-transform duration-300 ease-out md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href="tel:0507-1477-6607"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 active:bg-slate-50"
          aria-label="바로 통화 0507-1477-6607"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          바로 통화
        </a>
        <a
          href="#contact"
          className="flex flex-[1.4] items-center justify-center rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-4 py-3 text-sm font-bold text-white shadow-md active:opacity-95"
        >
          상담 신청하기
        </a>
      </div>
    </div>
  )
}
