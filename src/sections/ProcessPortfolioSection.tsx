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

const results = ['환경 규제 100% 준수', '생산 효율 45% 향상', '실시간 품질 관리']

export function ProcessPortfolioSection() {
  return (
    <>
      <section id="process" className="bg-white py-24 md:py-36">
        <div className="mx-auto grid max-w-[1288px] gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
              FutureVisor는
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
          <div className="flex items-center justify-center">
            <div className="aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <img
                src="/assets/process-flow.png"
                alt="FutureVisor End-to-End 프로세스 플로우 다이어그램"
                className="h-full w-full object-contain object-center p-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="portfolio" className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-[1288px] px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
            실제 기업들은
            <br />
            이렇게 변화했습니다
          </h2>
          <p className="mt-4 text-slate-600">고객사의 전체 프로세스를 자동화한 사례</p>
        </div>
        <div className="mx-auto mt-12 max-w-[1228px] rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-900 md:text-4xl">테크다스</h3>
              <p className="mt-2 text-slate-600">테크다스 AI 대기 MES 솔루션</p>
            </div>
            <span className="inline-flex self-start rounded-full bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-700">
              제조 실행 시스템
            </span>
          </div>
          <p className="mt-8 max-w-3xl text-left text-slate-600">
            수작업으로 처리하던 재고 관리 업무를 완전 자동화하여 실시간으로 재고 현황을 파악하고, 정확한
            생산 계획 수립이 가능해졌습니다.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="aspect-video overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-200"
              >
                <img
                  src="/assets/portfolio-mes.png"
                  alt="테크다스 MES 대시보드 화면"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-600">
              <span className="h-1 w-1 rounded-full bg-brand-500" />
              Results
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {results.map((r) => (
                <div key={r} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                    ✓
                  </span>
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
