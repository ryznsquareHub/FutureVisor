import { useEffect } from 'react'

type PortfolioItem = {
  theme: 'dark' | 'light'
  company: string
  subtitle: string
  tag: string
  description: string
  images: [string, string]
  imageAlts: [string, string]
  results: string[]
}

const portfolioItems: PortfolioItem[] = [
  {
    theme: 'dark',
    company: 'CJ WITH AI',
    subtitle: 'AI 시스템 CJ 빅데이터',
    tag: 'AI 빅데이터 시스템',
    description:
      'CJ그룹의 방대한 데이터를 AI로 분석하여 비즈니스 인사이트를 도출하고, 의사결정을 지원하는 통합 빅데이터 플랫폼을 구축했습니다.',
    images: ['/assets/image(cjwithai포트폴리오1).png', '/assets/image(cjwithai포트폴리오2).png'],
    imageAlts: ['CJ WITH AI 포트폴리오 1', 'CJ WITH AI 포트폴리오 2'],
    results: ['의사결정 속도 3배 향상', '데이터 활용도 85% 증가', '비용 절감 40%'],
  },
  {
    theme: 'light',
    company: '테크다스',
    subtitle: '테크다스 AI 대기 MES 솔루션',
    tag: '제조 실행 시스템',
    description:
      'AI 기반 대기 품질 모니터링과 제조 실행 시스템을 통합하여 실시간 생산 현황 파악 및 환경 데이터 분석으로 생산성과 품질을 동시에 향상시켰습니다.',
    images: ['/assets/portfolio-mes.png', '/assets/portfolio-mes.png'],
    imageAlts: ['테크다스 MES 대시보드', '테크다스 MES 상세 화면'],
    results: ['환경 규제 100% 준수', '생산 효율 45% 향상', '실시간 품질 관리'],
  },
  {
    theme: 'dark',
    company: 'A사',
    subtitle: '재고 관리 시스템 자동화',
    tag: '재고 관리 시스템',
    description:
      '수작업으로 처리하던 재고 관리 업무를 완전 자동화하여 실시간으로 재고 현황을 파악하고, 정확한 의사결정을 지원하는 통합 시스템을 구축했습니다.',
    images: ['/assets/정산관리포트폴리오1.png', '/assets/image(a사포트폴리오2).png'],
    imageAlts: ['A사 포트폴리오 화면 1', 'A사 포트폴리오 화면 2'],
    results: ['업무 시간 80% 감소', '재고 정확도 99% 향상', '실시간 현황 파악'],
  },
  {
    theme: 'light',
    company: 'D사',
    subtitle: '웹서비스 모니터링 시스템',
    tag: '시스템 모니터링',
    description:
      '24/7 실시간 웹서비스 모니터링으로 장애를 사전에 감지하고, 자동 알림과 상세 분석 리포트를 통해 서비스 안정성을 극대화했습니다.',
    images: ['/assets/image(d사포트폴리오1).png', '/assets/image(d사포트폴리오2).png'],
    imageAlts: ['D사 모니터링 화면 1', 'D사 모니터링 화면 2'],
    results: ['다운타임 95% 감소', '장애 대응 시간 70% 단축', '서비스 안정성 99.9%'],
  },
]

type Props = {
  onClose: () => void
}

export function PortfolioModal({ onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0a0f1e]"
      role="dialog"
      aria-modal="true"
      aria-label="전체 포트폴리오"
    >
      {/* 헤더 */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700/50 bg-[#0a0f1e]/95 px-6 py-4 backdrop-blur-sm md:px-12">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="FutureVisor" className="h-5 object-contain" />
          <span className="text-sm font-medium text-slate-400">포트폴리오</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 타이틀 */}
        <div className="px-6 pb-10 pt-12 text-center md:px-12">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            실제 기업들은
            <br />
            이렇게 변화했습니다
          </h2>
          <p className="mt-4 text-lg text-slate-400">고객사의 전체 프로세스를 자동화한 사례</p>
        </div>

        {/* 포트폴리오 목록 */}
        <div className="mx-auto max-w-[1228px] space-y-10 px-6 pb-20 md:px-8">
          {portfolioItems.map((p, idx) => {
            const isDark = p.theme === 'dark'
            return (
              <div
                key={p.company}
                className={`rounded-[42px] border px-6 py-10 md:px-14 ${
                  isDark
                    ? 'border-slate-600/50 bg-slate-900/40'
                    : 'border-slate-200/20 bg-white/8'
                }`}
                style={
                  !isDark
                    ? { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }
                    : undefined
                }
              >
                {/* 번호 + 헤더 */}
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4 text-left">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-sm font-bold text-brand-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-3xl font-bold text-white md:text-4xl">{p.company}</h3>
                      <p className="mt-1 text-lg font-medium text-slate-300">{p.subtitle}</p>
                    </div>
                  </div>
                  <span className="inline-flex self-start rounded-full bg-gradient-to-b from-brand-500 to-[#1787ff] px-6 py-2.5 text-sm font-bold text-white">
                    {p.tag}
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-left text-[17px] leading-relaxed text-slate-400">
                  {p.description}
                </p>

                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  {/* 이미지 — 모바일 2열 */}
                  <div className="grid grid-cols-2 gap-3 lg:hidden">
                    {[0, 1].map((i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-[14px] border border-slate-600/50 shadow-lg"
                      >
                        <img
                          src={p.images[i]}
                          alt={p.imageAlts[i]}
                          className="aspect-video w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 이미지 — 데스크톱 포개기 */}
                  <div className="relative hidden h-[300px] flex-1 lg:block">
                    <div className="absolute left-0 top-0 w-[82%] overflow-hidden rounded-[14px] border border-slate-600/50 shadow-lg">
                      <img
                        src={p.images[0]}
                        alt={p.imageAlts[0]}
                        className="aspect-video w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-[76%] overflow-hidden rounded-[14px] border border-slate-600/50 shadow-2xl">
                      <img
                        src={p.images[1]}
                        alt={p.imageAlts[1]}
                        className="aspect-video w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div
                    className="shrink-0 rounded-[14px] border border-slate-600/50 p-8 lg:w-[280px] xl:w-[320px]"
                    style={{
                      backgroundImage:
                        'linear-gradient(171.12deg, rgba(29, 41, 61, 0.8) 0%, rgba(15, 23, 43, 0.8) 100%)',
                    }}
                  >
                    <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white">
                      <span className="h-7 w-1 rounded-full bg-gradient-to-b from-brand-500 to-[#1787ff]" />
                      Results
                    </p>
                    <div className="mt-6 flex flex-col gap-4">
                      {p.results.map((r) => (
                        <div
                          key={r}
                          className="flex items-center gap-3 text-sm font-semibold text-white"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-brand-500 to-[#1787ff] text-white shadow-sm">
                            ✓
                          </span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="border-t border-slate-700/50 px-6 py-12 text-center">
          <p className="text-lg text-slate-300">
            우리 기업도 변화할 수 있습니다
          </p>
          <a
            href="#contact"
            onClick={onClose}
            className="mt-6 inline-flex min-w-[200px] justify-center rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-10 py-4 text-base font-bold text-white shadow-lg transition hover:opacity-90"
          >
            상담 신청하기
          </a>
        </div>
      </div>
    </div>
  )
}
