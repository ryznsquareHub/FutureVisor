function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 py-24 md:py-36">
      <div className="mx-auto flex max-w-[1008px] flex-col items-center gap-9 px-6 text-center">
        <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold text-white md:text-sm">
          기업 맞춤형 자동화 플랫폼
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-6xl lg:text-[84px] lg:leading-[1.1] lg:tracking-[-0.02em]">
            <span className="underline decoration-white/40 decoration-2 underline-offset-8">
              노코드의 한계를 넘어
            </span>
            <br />
            성장에 집중하세요
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-white/90 md:text-xl md:leading-9">
          ERP보다 유연하고, SaaS보다 정확하게.
          <br />
          귀사 전용 자동화 시스템을 구축합니다.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-brand-500 shadow-md transition hover:bg-slate-50"
        >
          업무 자동화 상담받기
          <ArrowIcon className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
