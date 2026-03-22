import type { ReactNode } from 'react'

function CardIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
      {children}
    </div>
  )
}

const painPoints = [
  {
    title: (
      <>
        엑셀·카톡·구글시트에
        <br />
        흩어진 업무
      </>
    ),
    body: '반복 입력과 중복 기록으로 시간이 새어 나가고, 인수인계와 관리가 점점 어려워집니다.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M4 6h16M4 12h10M4 18h16"
        />
      </svg>
    ),
  },
  {
    title: (
      <>
        ERP/CRM이
        <br />
        우리 업무와 맞지 않음
      </>
    ),
    body: '시스템을 도입했지만 40~60%는 여전히 수기로 처리하며 실무자의 부담이 남아 있습니다.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12h6m-6 4h6M7 8h10M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"
        />
      </svg>
    ),
  },
  {
    title: (
      <>
        노코드 자동화의
        <br />
        구조적 한계
      </>
    ),
    body: '승인·분기·재고·정산 같은 복잡한 로직은 Zapier/Make만으로는 구현이 어렵습니다.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
]

export function WhySection() {
  return (
    <>
      <section id="why" className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              이런 불편을 겪고 계신가요?
            </h2>
            <p className="mt-6 text-base text-slate-600 md:text-lg">
              흩어진 업무 툴과 반복 작업에 지쳐있는 건 당신만이 아닙니다.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {painPoints.map((item) => (
              <div
                key={String(item.title)}
                className="rounded-[14px] border border-slate-100 bg-slate-50 p-9"
              >
                <CardIcon>{item.icon}</CardIcon>
                <h3 className="mt-6 text-lg font-semibold text-slate-900 md:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">{item.body}</p>
              </div>
            ))}
          </div>
          {/* Figma 1188:113–115: 672×500 클립, rounded 14px, 이미지 961×715 @ (-144,-107) */}
          <div className="mt-16 flex flex-col items-center">
            <div className="relative aspect-[672/500] w-full max-w-[672px] overflow-hidden rounded-[14px] bg-white">
              <img
                src="/assets/why-confused.png"
                alt="업무 고민을 상징하는 일러스트"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute left-[-21.429%] top-[-21.4%] h-[143%] w-[143.03%] max-w-none object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
