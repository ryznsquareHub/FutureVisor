const features = [
  {
    title: '업무 로직 100% 커스텀',
    body: 'ERP·CRM이 못 담는 승인·분기·정산까지 우리 회사 방식 그대로 구현합니다.',
    icon: '/assets/업무로직100.png',
  },
  {
    title: '5주 단위 모듈형 구축',
    body: '핵심 업무부터 빠르게 만들고 필요한 만큼 단계적으로 확장합니다.',
    icon: '/assets/5주단위모듈형.png',
  },
  {
    title: '기업 수준 자동화 처리',
    body: '대량 데이터와 복잡한 비즈니스 로직도 안정적으로 처리합니다.',
    icon: '/assets/기업수준자동화.png',
  },
  {
    title: '국내 실무 환경 완벽 대응',
    body: '카카오·토스 등 국내 서비스까지 전사 수준으로 연동합니다.',
    icon: '/assets/국내실무환경.png',
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
  {
    label: '가격대 (월/연 환산)',
    zapier: '월 $20~$100 구독',
    make: '월 $10~$300 구독',
    fv: '1사이클(5주) 1,000만 원~ · 본 계약 시 진단비 환급',
  },
]

export function SolutionSection() {
  return (
    <>
      <section id="solution" className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-8 text-center lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              <span className="block">우리 회사 방식은 그대로</span>
              <span className="mt-1 block md:mt-0">
                작동하는{' '}
                <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                  맞춤형 자동화
                </span>
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 md:text-xl">
              FutureVisor는 기업 고유 프로세스를 분석·설계·개발·자동화까지 End-to-End로 함께합니다.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-[1400px] px-8 lg:px-16">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200 p-px">
            <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="bg-white p-7">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200/60">
                    <img
                      src={f.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-[#f8fbff] to-[#f0f5ff] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
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
          <div className="mt-12 space-y-4 md:hidden">
            {tableRows.map((row, i) => {
              const fvTint = i % 2 === 0 ? 'bg-[#f7fbff]' : 'bg-[#eff6ff]'
              return (
                <div
                  key={row.label}
                  className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-200 bg-[#f8fafc] px-4 py-4 text-center text-[15px] font-semibold text-slate-900">
                    {row.label}
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="bg-white px-4 py-4">
                      <p className="text-xs font-semibold text-slate-500">Zapier</p>
                      <p className="mt-1 text-[15px] leading-snug text-slate-600">{row.zapier}</p>
                    </div>
                    <div className="bg-white px-4 py-4">
                      <p className="text-xs font-semibold text-slate-500">Make</p>
                      <p className="mt-1 text-[15px] leading-snug text-slate-600">{row.make}</p>
                    </div>
                    <div className={`px-4 py-4 ${fvTint}`}>
                      <p className="text-xs font-bold text-[#0028bb]">FutureVisor ✨</p>
                      <p className="mt-1 text-[15px] font-medium leading-snug text-[#0028bb]">{row.fv}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-12 hidden overflow-x-auto rounded-[14px] border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="rounded-tl-[14px] bg-[#f8fafc] px-4 py-5 text-[15px] font-semibold text-slate-900 md:px-6">
                    항목
                  </th>
                  <th className="bg-[#f8fafc] px-4 py-5 text-[15px] font-semibold text-[#314158] md:px-6">
                    Zapier
                  </th>
                  <th className="bg-[#f8fafc] px-4 py-5 text-[15px] font-semibold text-[#314158] md:px-6">
                    Make
                  </th>
                  <th className="rounded-tr-[14px] bg-gradient-to-b from-[#0040ff] via-[#0035dd] to-[#0028bb] px-4 py-5 text-[15px] font-bold text-white md:px-6">
                    FutureVisor ✨
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => {
                  const leftZebra = i % 2 === 1
                  const fvTint = i % 2 === 0 ? 'bg-[#f7fbff]' : 'bg-[#eff6ff]'
                  const leftBg = leftZebra ? 'bg-[rgba(248,250,252,0.5)]' : 'bg-white'
                  const isLast = i === tableRows.length - 1
                  return (
                    <tr key={row.label} className="border-b border-slate-100 last:border-0">
                      <td
                        className={`px-4 py-5 text-[15px] font-semibold text-slate-900 md:px-6 ${leftBg} ${isLast ? 'rounded-bl-[14px]' : ''}`}
                      >
                        {row.label}
                      </td>
                      <td className={`px-4 py-5 text-[15px] text-slate-600 md:px-6 ${leftBg}`}>{row.zapier}</td>
                      <td className={`px-4 py-5 text-[15px] text-slate-600 md:px-6 ${leftBg}`}>{row.make}</td>
                      <td
                        className={`px-4 py-5 text-[15px] font-medium text-[#0028bb] md:px-6 ${fvTint} ${isLast ? 'rounded-br-[14px]' : ''}`}
                      >
                        {row.fv}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
