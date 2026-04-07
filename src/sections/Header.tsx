import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const nav = [
  { href: '#why', label: 'Why' },
  { href: '#solution', label: 'Solution' },
  { href: '#process', label: 'Process' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
] as const

function Logo() {
  return (
    <a href="#" className="flex items-center">
      <img
        src="/assets/logo.png"
        alt="FutureVisor"
        width={168}
        height={28}
        className="h-7 w-auto md:h-8"
        decoding="async"
      />
    </a>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  )
}

const MD_BREAKPOINT = 768

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= MD_BREAKPOINT) {
        setHeaderHidden(false)
        lastScrollY.current = window.scrollY
        return
      }
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y
      if (y < 12) {
        setHeaderHidden(false)
        return
      }
      if (delta > 8) setHeaderHidden(true)
      else if (delta < -8) setHeaderHidden(false)
    }
    const onResize = () => {
      if (window.innerWidth >= MD_BREAKPOINT) setHeaderHidden(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const mobileNav =
    menuOpen &&
    createPortal(
      <div className="fixed inset-0 z-[200] md:hidden" id="mobile-nav">
        <button
          type="button"
          className="absolute inset-0 bg-slate-900/60"
          aria-label="메뉴 닫기"
          onClick={closeMenu}
        />
        <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col border-l border-slate-200 bg-white shadow-xl">
          <div className="flex h-[84px] items-center justify-end border-b border-slate-100 px-4">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-ink hover:bg-slate-100"
              aria-label="메뉴 닫기"
              onClick={closeMenu}
            >
              <MenuIcon open />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="모바일 메뉴">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="border-t border-slate-100 p-4">
            <a
              href="#contact"
              className="flex w-full justify-center rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 py-3 text-sm font-bold text-white shadow-sm hover:opacity-95"
              onClick={closeMenu}
            >
              상담하기
            </a>
          </div>
        </div>
      </div>,
      document.body,
    )

  const hideOnMobile = headerHidden && !menuOpen

  return (
    <>
      {/* 모바일에서 fixed 헤더 아래 콘텐츠가 가리지 않도록 공간 확보 — 항상 84px 유지 */}
      <div className="h-[84px] shrink-0 md:hidden" aria-hidden />
      <header
        className={`z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm transition-transform duration-300 ease-out will-change-transform max-md:fixed max-md:left-0 max-md:right-0 max-md:top-0 md:sticky md:top-0 ${
          hideOnMobile ? 'max-md:-translate-y-full' : 'max-md:translate-y-0'
        }`}
      >
        <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-8 lg:px-16">
          <Logo />
          <nav className="hidden items-center gap-10 md:flex" aria-label="주요 메뉴">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-ink/90 hover:text-brand-500"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-8 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-95 md:inline-flex"
          >
            상담하기
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-ink hover:bg-slate-100 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>
      {mobileNav}
    </>
  )
}
