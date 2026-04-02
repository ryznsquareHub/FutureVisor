import { useState } from 'react'

import EndToEndProcessFlow from '../components/EndToEndProcessFlow'

const steps = [
  {
    n: '01',
    title: '상담 · 업무 진단',
    body: '유료 컨설팅 기반으로 현재 업무 흐름과 문제를 정밀 분석합니다.',
  },
  {
    n: '02',
    title: '문서 기반 설계',
    body: '요구정의서·기능정의서를 통해 시스템 구조와 범위를 명확히 정의합니다.',
  },
  {
    n: '03',
    title: 'UI/UX 설계',
    body: 'Figma로 화면 구조와 사용자 플로우를 설계합니다.',
  },
  {
    n: '04',
    title: '개발 · QA · 배포',
    body: '5주 사이클로 개발 후 QA를 거쳐 실제 운영환경에 적용합니다.',
  },
  {
    n: '05',
    title: '운영 · 유지보수',
    body: '운영 데이터 기반으로 개선과 모듈 확장을 계속 이어갑니다.',
  },
]

type PortfolioSlide = {
  theme: 'dark' | 'light'
  company: string
  subtitle: string
  tag: string
  description: string
  images: [string, string]
  imageAlts: [string, string]
  results: string[]
}

/** Figma desktop 포트폴리오 슬라이드 — 이미지는 동일 에셋으로도 연결 가능 */
const portfolioSlides: PortfolioSlide[] = [
  {
    theme: 'dark',
    company: 'A사',
    subtitle: '재고 관리 시스템 자동화',
    tag: '재고 관리 시스템',
    description:
      '수작업으로 처리하던 재고 관리 업무를 완전 자동화하여 실시간으로 재고 현황을 파악하고, 정확한 의사결정을 지원하는 통합 시스템을 구축했습니다.',
    images: ['/assets/image(a사포트폴리오1).png', '/assets/image(a사포트폴리오2).png'],
    imageAlts: ['A사 포트폴리오 화면 1', 'A사 포트폴리오 화면 2'],
    results: ['업무 시간 80% 감소', '재고 정확도 99% 향상', '실시간 현황 파악'],
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

export function ProcessPortfolioSection() {
  const [slide, setSlide] = useState(0)
  const p = portfolioSlides[slide]
  const len = portfolioSlides.length

  const goPrev = () => setSlide((i) => (i - 1 + len) % len)
  const goNext = () => setSlide((i) => (i + 1) % len)

  const isDark = p.theme === 'dark'

  return (
    <>
      <section id="process" className="bg-white py-24 md:py-36">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-14 px-8 lg:flex-row lg:items-stretch lg:gap-20 lg:px-16">
          <div className="flex flex-1 flex-col">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
              FutureVisor,
              <br />
              이렇게 구축합니다
            </h2>
            <p className="mt-4 text-slate-600">체계적인 5단계 프로세스</p>
            <div className="mt-10 space-y-8">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-sm font-bold text-white">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[min(92vw,420px)] flex-1 flex-col lg:min-h-0">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
              <EndToEndProcessFlow />
            </div>
          </div>
        </div>
      </section>
      <section id="portfolio" className="bg-[#0f172b] pb-20 pt-24 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-8 text-center lg:px-16">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            실제 기업들은
            <br />
            이렇게 변화했습니다
          </h2>
          <p className="mt-4 text-lg text-slate-400">고객사의 전체 프로세스를 자동화한 사례</p>
        </div>

        <div
          className={
            isDark
              ? 'mt-12 bg-gradient-to-b from-[#0f172b] to-[#314158]'
              : 'mt-12 bg-gradient-to-b from-white to-blue-100'
          }
        >
          <div className="flex flex-col items-center gap-8 py-12 md:gap-10 md:py-16">
            <button
              type="button"
              onClick={goPrev}
              aria-label="이전 포트폴리오 사례"
              className="flex items-center justify-center rounded-lg bg-transparent p-3 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              <img
                src="/assets/arrowup.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                decoding="async"
              />
            </button>

            <div
              key={slide}
              className="portfolio-slide-panel mx-auto w-full max-w-[1228px] px-6 md:px-8"
            >
              <div
                className={
                  isDark
                    ? 'rounded-[42px] border border-slate-600/50 bg-slate-900/40 px-6 py-10 backdrop-blur-sm md:px-14'
                    : 'rounded-[42px] border border-slate-200/80 bg-white/70 px-6 py-10 shadow-sm backdrop-blur-sm md:px-14'
                }
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="text-left">
                    <h3
                      className={`text-3xl font-bold md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                      {p.company}
                    </h3>
                    <p
                      className={`mt-2 text-xl font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                      {p.subtitle}
                    </p>
                  </div>
                  <span
                    className={
                      isDark
                        ? 'inline-flex self-start rounded-full bg-gradient-to-b from-brand-500 to-[#1787ff] px-6 py-2.5 text-sm font-bold text-white'
                        : 'inline-flex self-start rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-6 py-2.5 text-sm font-bold text-white'
                    }
                  >
                    {p.tag}
                  </span>
                </div>
                <p
                  className={`mt-8 max-w-3xl text-left text-[17px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                >
                  {p.description}
                </p>
                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  {/* 비스듬하게 포개진 이미지 */}
                  <div className="relative h-[200px] flex-1 sm:h-[240px] md:h-[280px] lg:h-[320px]">
                    <div
                      className={`absolute left-0 top-0 w-[82%] overflow-hidden rounded-[14px] shadow-lg ${
                        isDark
                          ? 'border border-slate-600/50 bg-[#1d293d]/30'
                          : 'border border-slate-200/80 bg-slate-100/40 shadow-md'
                      }`}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.imageAlts[0]}
                        className="aspect-video w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-[76%] overflow-hidden rounded-[14px] shadow-2xl ${
                        isDark
                          ? 'border border-slate-600/50 bg-[#1d293d]/30'
                          : 'border border-slate-200/80 bg-slate-100/40'
                      }`}
                    >
                      <img
                        src={p.images[1]}
                        alt={p.imageAlts[1]}
                        className="aspect-video w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Results — 오른쪽 배치 */}
                  <div
                    className={`shrink-0 rounded-[14px] border p-8 lg:w-[280px] xl:w-[320px] ${
                      isDark
                        ? 'border-slate-600/50'
                        : 'border-white/50 bg-gradient-to-b from-white to-[#ecf4ff]'
                    }`}
                    style={
                      isDark
                        ? {
                            backgroundImage:
                              'linear-gradient(171.12deg, rgba(29, 41, 61, 0.8) 0%, rgba(15, 23, 43, 0.8) 100%)',
                          }
                        : undefined
                    }
                  >
                    <p
                      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                      <span className="h-7 w-1 rounded-full bg-gradient-to-b from-brand-500 to-[#1787ff]" />
                      Results
                    </p>
                    <div className="mt-6 flex flex-col gap-4">
                      {p.results.map((r) => (
                        <div
                          key={r}
                          className={`flex items-center gap-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                          <span
                            className={
                              isDark
                                ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-brand-500 to-[#1787ff] text-white shadow-sm'
                                : 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 text-white shadow-sm'
                            }
                          >
                            ✓
                          </span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="다음 포트폴리오 사례"
              className="flex items-center justify-center rounded-lg bg-transparent p-3 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              <img
                src="/assets/arrowdown.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                decoding="async"
              />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
