const features = [
  {
    title: '업무 로직 100% 커스텀',
    body: 'ERP·CRM이 못 담는 승인·분기·정산까지 우리 회사 방식 그대로 구현합니다.',
  },
  {
    title: '5주 단위 모듈형 구축',
    body: '핵심 업무부터 빠르게 만들고 필요한 만큼 단계적으로 확장합니다.',
  },
  {
    title: '기업 수준 자동화 처리',
    body: '대량 데이터와 복잡한 비즈니스 로직도 안정적으로 처리합니다.',
  },
  {
    title: '국내 실무 환경 완벽 대응',
    body: '카카오·토스 등 국내 서비스까지 전사 수준으로 연동합니다.',
  },
]

const tableRows = [
  {
    label: '자동화 방식',
    zapier: '앱 간 연결 자동화',
    make: '워크플로우 기반 자동화',
    fv: '기업 프로세스 기반 풀커스텀 자동화',
  },
  {
    label: '커스텀 가능성',
    zapier: '거의 불가',
    make: '제한적',
    fv: '업무 로직까지 100% 반영',
  },
  {
    label: '복잡 로직 처리',
    zapier: '어려움',
    make: '일부 가능',
    fv: 'ERP/CRM 수준 로직 완전 구현',
  },
  {
    label: 'API 범위',
    zapier: '외국 SaaS 중심',
    make: '중간',
    fv: '국내 서비스(카카오, 토스 등)까지 완전 대응',
  },
  {
    label: '적용 대상',
    zapier: '간단 자동화가 필요한 개인/소규모',
    make: '부분 자동화가 필요한 중소기업',
    fv: '5~100명, 연 매출 10~150억 구간 기업',
  },
]

export function SolutionSection() {
  return (
    <>
      <section id="solution" className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[896px] px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
            우리 회사 프로세스 그대로
            <br />
            작동하는{' '}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              맞춤형 자동화툴
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 md:text-xl">
            FutureVisor는 기업 고유 프로세스를 분석·설계·개발·자동화까지 End-to-End로 함께합니다.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1288px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              노코드 자동화와는
              <br />
              차원이 다른{' '}
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                기업 맞춤형 개발
              </span>
            </h2>
            <p className="mt-6 text-slate-600">비교를 통해 확인하는 FutureVisor의 차별점</p>
          </div>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-5 font-semibold text-slate-700 md:px-6">항목</th>
                  <th className="px-4 py-5 font-semibold text-slate-700 md:px-6">Zapier</th>
                  <th className="px-4 py-5 font-semibold text-slate-700 md:px-6">Make</th>
                  <th className="px-4 py-5 font-semibold text-brand-700 md:px-6">FutureVisor</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-5 font-medium text-slate-800 md:px-6">{row.label}</td>
                    <td className="px-4 py-5 text-slate-600 md:px-6">{row.zapier}</td>
                    <td className="px-4 py-5 text-slate-600 md:px-6">{row.make}</td>
                    <td className="bg-brand-500/5 px-4 py-5 font-medium text-slate-800 md:px-6">{row.fv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
