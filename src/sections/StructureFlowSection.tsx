import { Fragment, type SyntheticEvent } from 'react'

const pillars = [
  {
    title: 'Zapier 기능',
    icon: '/assets/노코드자동화의.png',
    items: ['Trigger / Action', '앱 간 자동화', '외부 API 연결'],
  },
  {
    title: 'Make 기능',
    icon: '/assets/기업수준자동화.png',
    items: ['분기/조건/반복', '복잡 로직 처리', '워크플로우 시각화'],
  },
  {
    title: 'Airtable 기능',
    icon: '/assets/엑셀카톡구글시트.png',
    items: ['DB 역할', '테이블 관리', '폼 입력'],
  },
  {
    title: 'ERP/CRM 기능',
    icon: '/assets/erpcrm이.png',
    items: ['매출/주문/재고/정산', '권한/승인 기반 변경', '커스텀 로직 반영'],
  },
]

const PILLAR_PLUS_ICON = '/assets/plusicon.png'

const flowSteps = ['업무 진단', '기능 정의', '시스템 설계', '개발', 'QA', '자동화 반영']

const flowCards = [
  {
    title: '완전 커스텀 구조',
    body: '회사 내부 프로세스에 따라 완전히 커스텀하여 ERP/CRM 수준의 업무 로직을 기업 고유 방식으로 구현합니다.',
    icon: '/assets/업무로직100.png',
  },
  {
    title: '자동화 + 반자동화',
    body: '반복 업무는 완전 자동화하고, 사람의 승인이 필요한 부분은 반자동화로 안전하게 처리합니다.',
    icon: '/assets/국내실무환경.png',
  },
  {
    title: '모듈형 확장 구조',
    body: '확장·변경에 강한 모듈형 구조로 설계하여 필요에 따라 기능을 유연하게 추가할 수 있습니다.',
    icon: '/assets/5주단위모듈형.png',
  },
  {
    title: '점진적 사이클 개발',
    body: '핵심 프로세스부터 시작하여 5주 단위로 검증하며 단계적으로 범위를 넓혀갑니다.',
    icon: '/assets/5주단위모듈형.png',
  },
]

/**
 * Figma: 기능 구조 하단 FutureVisor 카드 (node 1211-4218)
 * https://www.figma.com/design/hf1fGyJXjIGg6IdWwFvaRt/Untitled?node-id=1211-4218
 *
 * 로켓: 그라디언트 스쿼클 + 인라인 SVG(54 viewBox). 워드마크: logobig.png.
 */
function FvSummaryRocketIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 54 54"
      width={72}
      height={72}
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M9.97372 36.5701C6.64919 39.3627 5.54102 47.6519 5.54102 47.6519C5.54102 47.6519 13.8302 46.5437 16.6228 43.2192C18.1964 41.3574 18.1742 38.4984 16.4233 36.7696C15.5618 35.9474 14.427 35.4722 13.2367 35.4354C12.0464 35.3986 10.8844 35.8027 9.97372 36.5701Z"
        stroke="white"
        strokeWidth="4.4327"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5963 33.2452L19.9473 26.5962C21.1267 23.5364 22.6118 20.6033 24.38 17.8416C26.9624 13.7125 30.5583 10.3128 34.8256 7.96574C39.0929 5.61872 43.8898 4.40247 48.7598 4.43268C48.7598 10.4612 47.0311 21.0553 35.4617 28.8125C32.6622 30.5828 29.6922 32.0678 26.5963 33.2452Z"
        stroke="white"
        strokeWidth="4.4327"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.947 26.5962H8.86523C8.86523 26.5962 10.0842 19.8807 13.2979 17.7308C16.8884 15.3372 24.3797 17.7308 24.3797 17.7308"
        stroke="white"
        strokeWidth="4.4327"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5962 33.2452V44.327C26.5962 44.327 33.3117 43.108 35.4616 39.8943C37.8553 36.3038 35.4616 28.8125 35.4616 28.8125"
        stroke="white"
        strokeWidth="4.4327"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const FV_SUMMARY_WORDMARK_PNG = '/assets/logobig.png'
const FV_SUMMARY_WORDMARK_FALLBACK = '/assets/logo.png'

const fvSummaryChips = ['All-in-One', '맞춤형 개발', 'End-to-End'] as const

function imgFallbackOnce(e: SyntheticEvent<HTMLImageElement>, fallbackSrc: string) {
  const el = e.currentTarget
  if (el.dataset.fallbackApplied === 'true') return
  el.dataset.fallbackApplied = 'true'
  el.src = fallbackSrc
}

export function StructureFlowSection() {
  return (
    <>
      <section className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              FutureVisor가 실제로
              <br />
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                포함하고 있는 상세 기능 구조
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              여러 도구의 장점을 하나로 통합한 All-in-One 자동화 시스템
            </p>
          </div>
          <div className="mt-16 flex flex-col lg:hidden">
            {pillars.map((p, i) => (
              <Fragment key={p.title}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                    <img
                      src={p.icon}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="text-brand-500">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < pillars.length - 1 && (
                  <div className="flex justify-center py-4" aria-hidden>
                    <img
                      src={PILLAR_PLUS_ICON}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                      decoding="async"
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="mt-16 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-y-6">
            {pillars.map((p, i) => (
              <Fragment key={p.title}>
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                    <img
                      src={p.icon}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="text-brand-500">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < 3 && (
                  <div
                    className="flex items-center justify-center px-8 md:px-10"
                    aria-hidden
                  >
                    <img
                      src={PILLAR_PLUS_ICON}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 object-contain"
                      decoding="async"
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="relative mt-14 overflow-visible rounded-t-[28px] border-x border-t border-[#f1f5f9] bg-white md:mt-16 md:rounded-t-[56px]">
            <div className="mx-auto max-w-[475px] px-6 pb-12 pt-14 text-center md:px-8 md:pb-16 md:pt-16">
              <div className="mx-auto flex justify-center">
                <div className="-mt-10 flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[21px] bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] sm:h-[100px] sm:w-[100px] md:-mt-12 md:h-[106px] md:w-[106px]">
                  <FvSummaryRocketIcon className="h-16 w-16 shrink-0 object-contain sm:h-[72px] sm:w-[72px] md:h-20 md:w-20" />
                </div>
              </div>
              <div className="mx-auto mt-6 inline-block max-w-full md:mt-7">
                <img
                  src={FV_SUMMARY_WORDMARK_PNG}
                  alt="FutureVisor"
                  width={320}
                  height={64}
                  className="mx-auto h-10 w-auto max-w-full md:h-12"
                  decoding="async"
                  onError={(e) => imgFallbackOnce(e, FV_SUMMARY_WORDMARK_FALLBACK)}
                />
                <div
                  className="mx-auto mt-4 h-0.5 max-w-[162px] rounded-full bg-gradient-to-r from-transparent via-brand-500/60 to-transparent opacity-70"
                  aria-hidden
                />
              </div>
              <p className="mx-auto mt-6 max-w-[28rem] text-center text-[1.125rem] font-semibold leading-snug tracking-tight text-slate-ink sm:text-[1.25rem] md:mt-7 md:text-[26px] md:leading-[1.35]">
                모든 기능을 통합한 기업 맞춤형 자동화 플랫폼
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2 md:mt-9 md:gap-3">
                {fvSummaryChips.map((t) => (
                  <span
                    key={t}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-brand-500/30 bg-gradient-to-r from-brand-500/10 to-[#1787ff]/10 px-5 py-2 text-[14px] font-bold leading-none text-brand-700 sm:text-[15px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 md:mt-9">
                <div className="grid grid-cols-3 gap-2 text-center sm:gap-6 md:gap-8">
                  <div className="flex flex-col items-center gap-1.5">
                    <p className="bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 bg-clip-text text-[36px] font-bold leading-none tracking-tight text-transparent md:text-[42px]">
                      4+
                    </p>
                    <p className="text-sm font-medium leading-tight text-[#45556c]">통합 기능</p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <p className="bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 bg-clip-text text-[36px] font-bold leading-none tracking-tight text-transparent md:text-[42px]">
                      1
                    </p>
                    <p className="text-sm font-medium leading-tight text-[#45556c]">플랫폼</p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <p className="bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 bg-clip-text text-[36px] font-bold leading-none tracking-tight text-transparent md:text-[42px]">
                      ∞
                    </p>
                    <p className="text-sm font-medium leading-tight text-[#45556c]">가능성</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-100 bg-gradient-to-b from-white to-blue-100 py-24 md:py-36">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              커스텀 + 반자동화로
              <br />
              <span className="text-brand-600">기업 고유 프로세스를 완벽하게</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
              우선순위가 높은 핵심 프로세스부터 맞춤형으로 개발하여,
              <br />
              5주 사이클 단위로 기능을 점진적으로 확장합니다.
            </p>
          </div>
          <div className="mt-10 mx-auto grid max-w-sm grid-cols-2 gap-2 md:hidden">
            {flowSteps.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-10 hidden flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-700 md:flex md:gap-3">
            {flowSteps.map((s, idx) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">{s}</span>
                {idx < flowSteps.length - 1 && (
                  <span className="text-slate-400" aria-hidden>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {flowCards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={c.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
