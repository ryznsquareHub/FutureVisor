import { Fragment } from 'react'

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
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-light text-slate-400">
                      +
                    </span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="mt-16 hidden gap-6 lg:grid lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8">
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-slate-300" />
                )}
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
            ))}
          </div>
          <p className="mt-12 text-center text-3xl font-light text-slate-400">=</p>
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-brand-200 bg-gradient-to-b from-brand-500/10 to-white p-10 text-center shadow-sm">
            <p className="text-2xl font-bold text-slate-900 md:text-3xl">FutureVisor</p>
            <p className="mt-3 text-slate-600">모든 기능을 통합한 기업 맞춤형 자동화 플랫폼</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['All-in-One', '맞춤형 개발', 'End-to-End'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-brand-600">4+</p>
                <p className="text-xs text-slate-500">통합 기능</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-600">1</p>
                <p className="text-xs text-slate-500">플랫폼</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-600">∞</p>
                <p className="text-xs text-slate-500">가능성</p>
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
