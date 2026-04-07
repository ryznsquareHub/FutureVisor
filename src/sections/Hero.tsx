import { useEffect, useState } from 'react'

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

/** Hero 로테이션 카피 (밑줄 첫 줄만 교체) */
const ROTATING_HEADLINES = [
  '반복 업무를 자동화하고',
  '업무 효율을 200% 높이고',
  'ERP보다 유연하게',
  '5주 만에 구축하고',
  '노코드의 한계를 넘어',
] as const

const ROTATE_MS = 2250

export function Hero() {
  const [active, setActive] = useState(0)
  const [motionOk, setMotionOk] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionOk(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!motionOk) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % ROTATING_HEADLINES.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [motionOk])

  return (
    <section className="relative left-1/2 flex min-h-[calc(100dvh-84px)] w-screen max-w-[100vw] -translate-x-1/2 flex-col justify-center bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-9 text-center">
          <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold text-white md:text-sm">
            기업 맞춤형 자동화 플랫폼
          </div>
          <h1 className="flex flex-col items-center gap-0 overflow-visible text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl lg:text-[84px] lg:tracking-[-0.02em]">
            <span
              className="relative min-h-[1.15em] w-full min-w-0 px-1 leading-[1.15]"
              aria-live={motionOk ? 'polite' : 'off'}
            >
              {ROTATING_HEADLINES.map((line, i) => (
                <span
                  key={line}
                  className={`absolute inset-x-0 top-0 flex justify-center overflow-visible transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                  aria-hidden={i !== active}
                >
                  <span className="inline-block whitespace-nowrap text-center text-[2rem] underline decoration-white/40 decoration-2 underline-offset-8 sm:text-4xl sm:underline-offset-[0.2em] md:text-6xl lg:text-[84px]">
                    {line}
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-1 block leading-[1.1] sm:mt-0">성장에 집중하세요</span>
          </h1>
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
      </div>
    </section>
  )
}
