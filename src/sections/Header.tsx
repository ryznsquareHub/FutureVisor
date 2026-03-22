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

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-6 lg:px-14">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
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
          className="rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-8 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-95"
        >
          상담하기
        </a>
      </div>
    </header>
  )
}
