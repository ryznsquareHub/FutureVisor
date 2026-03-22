import { useState } from 'react'

const reviews = [
  {
    quote:
      '주문부터 정산, 송장 발송까지 모든 프로세스가 자동화되면서 실무자의 업무 부담이 70% 이상 줄었습니다.',
    name: '김준호',
    role: 'ESP 마케팅 대표',
  },
  {
    quote:
      'ERP 도입을 고민하다가 FutureVisor를 선택한 것이 최고의 결정이었습니다. 우리 업무에 딱 맞는 시스템이 완성됐습니다.',
    name: '이수진',
    role: '헬스케어솔루션 운영이사',
  },
  {
    quote:
      'Zapier로는 구현 불가능했던 복잡한 재고 관리와 정산 로직이 완벽하게 구현되었습니다.',
    name: '박민수',
    role: '유통기업 IT본부장',
  },
  {
    quote:
      '생산 현장의 실시간 데이터를 통합하여 의사결정 속도가 3배 빨라졌습니다. 경영진이 현장 상황을 즉시 파악합니다.',
    name: '최은영',
    role: '제조기업 혁신실장',
  },
  {
    quote:
      '개발자 없이도 비즈니스 로직을 빠르게 수정할 수 있어서 시장 변화에 민첩하게 대응하고 있습니다.',
    name: '정태훈',
    role: '물류 스타트업 CTO',
  },
  {
    quote:
      '고객 문의부터 배송, CS까지 모든 것이 연결되어 업무 효율이 비약적으로 향상되었습니다.',
    name: '강혜진',
    role: '커머스 기업 COO',
  },
]

const trustCards = [
  {
    title: '문서 기반 개발',
    body: '요구정의서·기능정의서·플로우 다이어그램으로 구조를 투명하게 공유합니다.',
  },
  {
    title: '대기업 PM 경험',
    body: '삼성전자·현대차 등 대기업 프로젝트 경험이 있는 PM이 직접 진행합니다.',
  },
  {
    title: '체계적 QA/배포',
    body: '개발 후 QA와 안정적 배포를 통해 문제를 최소화합니다.',
  },
]

const faqs = [
  'FutureVisor는 어떤 서비스인가요?',
  'Zapier나 Make 같은 자동화 툴과 무엇이 다른가요?',
  '어떤 회사에 적합한 서비스인가요?',
  '프로젝트는 어떤 방식으로 진행되나요?',
  '프로젝트 최소 비용은 어떻게 되나요?',
  '우리 회사도 자동화가 가능한지 먼저 확인할 수 있나요?',
]

function Stars() {
  return (
    <div className="flex gap-1 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 13.9 4.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewTrustFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <section className="bg-gradient-to-b from-white to-blue-100 py-24 md:py-32">
        <div className="mx-auto max-w-[1288px] px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">고객사의 성공 이야기</h2>
          <p className="mt-4 text-slate-600">
            FutureVisor와 함께 비즈니스를 혁신한 기업들의 실제 후기
          </p>
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max gap-4 px-6 lg:px-8">
            {reviews.map((r) => (
              <article
                key={r.name}
                className="w-[min(100vw-3rem,400px)] shrink-0 rounded-[14px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <Stars />
                <p className="mt-5 text-sm leading-relaxed text-slate-700">{r.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-700" />
                  <div className="text-left">
                    <p className="font-semibold text-slate-900">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              문서와 프로세스로
              <br />
              증명되는 전문성
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              신뢰할 수 있는 개발 파트너 FutureVisor이 귀사와 함께 동행합니다.
            </p>
          </div>
          <div className="mt-14 overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200 p-px">
            <div className="grid gap-px md:grid-cols-3">
            {trustCards.map((c) => (
              <div key={c.title} className="bg-white p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-blue-50/60 via-white to-white py-24 md:py-32">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">자주 묻는 질문</h2>
            <p className="mt-4 text-slate-600">FutureVisor에 대해 궁금하신 점을 확인해보세요</p>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((q, i) => {
              const open = openFaq === i
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 rounded-[14px] border border-slate-200 bg-white px-6 py-5 text-left shadow-sm transition hover:bg-slate-50/80"
                >
                  <span className="font-medium text-slate-900">{q}</span>
                  <span
                    className={`text-slate-400 transition ${open ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
