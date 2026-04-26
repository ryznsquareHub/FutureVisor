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

/** Hero 회전 카피 — 산만함을 줄이기 위해 5→2개로 축약, 회전 주기 2.25s→3.5s */
const ROTATING_HEADLINES = [
  '엑셀·카톡으로 굴러가던 회사 운영,',
  '반복 업무에 새는 시간을 멈추고,',
] as const

const ROTATE_MS = 3500

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
            직원 5~100명 기업 전용 · 맞춤형 자동화 플랫폼
          </div>
          <h1 className="flex flex-col items-center gap-0 overflow-visible text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl lg:text-[78px] lg:tracking-[-0.02em]">
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
                  <span className="inline-block whitespace-nowrap text-center text-[1.75rem] underline decoration-white/40 decoration-2 underline-offset-8 sm:text-4xl sm:underline-offset-[0.2em] md:text-6xl lg:text-[78px]">
                    {line}
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-1 block leading-[1.1] sm:mt-0">
              5주 만에 <span className="text-white/95">우리 회사 전용</span> 시스템으로.
            </span>
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/90 md:text-lg md:leading-8">
            1사이클(5주) <span className="font-bold text-white">1,000만 원부터</span>.
            기업 맞춤형 자동화 시스템을 구축합니다.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 text-base font-bold text-brand-500 shadow-md transition hover:bg-slate-50"
          >
            상담 신청하기
            <ArrowIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
