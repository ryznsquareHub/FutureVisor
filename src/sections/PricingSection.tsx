const tiers = [
  {
    name: 'Diagnosis',
    badge: '진단',
    price: '30만 원',
    unit: '/ 1H 컨설팅',
    summary: '자동화 가능 여부 · 범위 · 예상 비용 · 일정 산정',
    points: [
      '대기업 PM이 직접 1:1 진단',
      '요구정의 초안 + 자동화 가능 영역 도식',
      '본 계약 체결 시 진단비 전액 환급',
    ],
    cta: { label: '진단 신청하기', href: '#contact' },
    emphasis: false,
  },
  {
    name: '1 Cycle',
    badge: '1사이클',
    price: '1,000만 원~',
    unit: '/ 5주',
    summary: '핵심 업무 1개를 완전 자동화하는 최소 단위 패키지',
    points: [
      '업무 분석 → 설계 → 개발 → QA → 배포',
      '요구정의서·기능정의서·플로우 다이어그램 제공',
      '국내 API(카카오·토스 등) 연동 포함',
      '운영 후 1개월 안정화 지원',
    ],
    cta: { label: '상담 신청하기', href: '#contact' },
    emphasis: true,
  },
  {
    name: 'Full Build',
    badge: '풀 구축',
    price: '맞춤 견적',
    unit: '/ 2~5사이클',
    summary: '여러 업무를 단계적으로 모듈화하여 전사 운영 시스템 구축',
    points: [
      '업무 단위로 1사이클씩 점진 확장',
      '권한·승인·재고·정산 등 ERP/CRM 수준 로직',
      '전용 서버·DB 기반 보안 구조',
      '운영 데이터 기반 지속 개선',
    ],
    cta: { label: '풀 구축 문의', href: '#contact' },
    emphasis: false,
  },
] as const

export function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
            얼마부터,{' '}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              어떻게 시작할 수 있나요?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            진단 → 1사이클 → 풀 구축까지, 단계별로 검증하며 확장합니다.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                t.emphasis
                  ? 'relative flex flex-col rounded-[20px] bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 p-8 text-white shadow-[0px_25px_50px_-12px_rgba(0,64,255,0.3)] md:p-10'
                  : 'relative flex flex-col rounded-[20px] border border-slate-200 bg-white p-8 shadow-sm md:p-10'
              }
            >
              {t.emphasis && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-brand-600 shadow-sm">
                  가장 많이 선택하는 시작 패키지
                </span>
              )}
              <p
                className={
                  t.emphasis
                    ? 'text-sm font-semibold text-white/85'
                    : 'text-sm font-semibold text-brand-600'
                }
              >
                {t.badge}
              </p>
              <h3
                className={
                  t.emphasis
                    ? 'mt-3 text-2xl font-bold text-white'
                    : 'mt-3 text-2xl font-bold text-slate-900'
                }
              >
                {t.name}
              </h3>
              <p
                className={
                  t.emphasis ? 'mt-2 text-sm text-white/80' : 'mt-2 text-sm text-slate-600'
                }
              >
                {t.summary}
              </p>
              <div className="mt-6 flex items-end gap-2">
                <span
                  className={
                    t.emphasis
                      ? 'text-3xl font-bold leading-none text-white md:text-4xl'
                      : 'text-3xl font-bold leading-none text-slate-900 md:text-4xl'
                  }
                >
                  {t.price}
                </span>
                <span
                  className={
                    t.emphasis ? 'pb-1 text-sm text-white/75' : 'pb-1 text-sm text-slate-500'
                  }
                >
                  {t.unit}
                </span>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {t.points.map((p) => (
                  <li
                    key={p}
                    className={
                      t.emphasis
                        ? 'flex items-start gap-2 text-sm text-white/90'
                        : 'flex items-start gap-2 text-sm text-slate-700'
                    }
                  >
                    <span
                      className={
                        t.emphasis
                          ? 'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold text-white'
                          : 'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-[10px] font-bold text-brand-600'
                      }
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={t.cta.href}
                className={
                  t.emphasis
                    ? 'mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-600 shadow-md transition hover:bg-slate-50'
                    : 'mt-8 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-600'
                }
              >
                {t.cta.label}
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-500">
          모든 패키지에는 요구정의서·기능정의서·플로우 다이어그램 등 문서 산출물이 포함됩니다.
          <br className="hidden md:inline" />
          {' '}정확한 견적은 1H 진단 후 요구사항 확정 시 산정됩니다.
        </p>
      </div>
    </section>
  )
}
