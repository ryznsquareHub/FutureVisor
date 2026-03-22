import { useState, type ReactNode } from 'react'

const reviews = [
  {
    quote:
      '주문부터 정산, 송장 발송까지 모든 프로세스가 자동화되면서 실무자의 업무 부담이 70% 이상 줄었습니다.',
    name: '김준호',
    role: 'ESP 마케팅 대표',
    avatar: '/assets/image(김준호).png',
  },
  {
    quote:
      'ERP 도입을 고민하다가 FutureVisor를 선택한 것이 최고의 결정이었습니다. 우리 업무에 딱 맞는 시스템이 완성됐습니다.',
    name: '이수진',
    role: '헬스케어솔루션 운영이사',
    avatar: '/assets/image(이수진).png',
  },
  {
    quote:
      'Zapier로는 구현 불가능했던 복잡한 재고 관리와 정산 로직이 완벽하게 구현되었습니다.',
    name: '박민수',
    role: '유통기업 IT본부장',
    avatar: '/assets/image(박민수).png',
  },
  {
    quote:
      '생산 현장의 실시간 데이터를 통합하여 의사결정 속도가 3배 빨라졌습니다. 경영진이 현장 상황을 즉시 파악합니다.',
    name: '최은영',
    role: '제조기업 혁신실장',
    avatar: '/assets/image(최은영).png',
  },
  {
    quote:
      '개발자 없이도 비즈니스 로직을 빠르게 수정할 수 있어서 시장 변화에 민첩하게 대응하고 있습니다.',
    name: '정태훈',
    role: '물류 스타트업 CTO',
    avatar: '/assets/image(정태훈).png',
  },
  {
    quote:
      '고객 문의부터 배송, CS까지 모든 것이 연결되어 업무 효율이 비약적으로 향상되었습니다.',
    name: '강혜진',
    role: '커머스 기업 COO',
    avatar: '/assets/image(강혜진).png',
  },
]

const trustCards = [
  {
    title: '문서 기반 개발',
    body: '요구정의서·기능정의서·플로우 다이어그램으로 구조를 투명하게 공유합니다.',
    icon: '/assets/문서기반개발.png',
  },
  {
    title: '대기업 PM 경험',
    body: '삼성전자·현대차 등 대기업 프로젝트 경험이 있는 PM이 직접 진행합니다.',
    icon: '/assets/커스텀시스템.png',
  },
  {
    title: '체계적 QA/배포',
    body: '개발 후 QA와 안정적 배포를 통해 문제를 최소화합니다.',
    icon: '/assets/통합워크플로우.png',
  },
]

type FaqItem = {
  question: string
  answer: ReactNode
}

const faqs: FaqItem[] = [
  {
    question: 'FutureVisor는 어떤 서비스인가요?',
    answer: (
      <div className="space-y-2.5 text-[15.75px] leading-relaxed text-slate-600">
        <p>FutureVisor는 단순 자동화 툴이나 외주 개발이 아니라,</p>
        <p className="font-bold text-slate-900">
          기업의 핵심 업무 흐름을 분석하고, 5주 단위로 단계적으로 자동화·시스템화하는 기업 맞춤형 자동화·운영 시스템 구축 서비스입니다.
        </p>
        <p>
          ERP, CRM, 재고·정산·보고 등 회사 운영에 직접 영향을 주는 업무를 기업 프로세스에 맞게 설계·개발합니다.
        </p>
      </div>
    ),
  },
  {
    question: 'Zapier나 Make 같은 자동화 툴과 무엇이 다른가요?',
    answer: (
      <div className="space-y-2.5 text-[15.75px] leading-relaxed text-slate-600">
        <p>Zapier/Make는 앱을 연결하는 자동화 툴이고,</p>
        <p className="font-bold text-slate-900">
          FutureVisor는 기업 업무 프로세스 자체를 설계·개발하는 서비스입니다.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>기업 고유 로직 100% 반영</li>
          <li>대량 데이터·복잡한 분기 처리</li>
          <li>국내 API(카카오, 토스 등) 연동</li>
          <li>전용 서버·DB 기반 보안 구조</li>
        </ul>
        <p className="font-bold text-slate-900">
          등 ERP/CRM 수준의 로직 구현이 가능하다는 점이 가장 큰 차이입니다.
        </p>
      </div>
    ),
  },
  {
    question: '어떤 회사에 적합한 서비스인가요?',
    answer: (
      <div className="space-y-2.5 text-[15.75px] leading-relaxed text-slate-600">
        <p>FutureVisor는 아래와 같은 기업에 가장 적합합니다.</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            직원 <span className="font-bold text-slate-900">5~100명 규모</span>의 중소·중견기업
          </li>
          <li>업무가 엑셀·카톡·메일·수기로 운영되는 회사</li>
          <li>ERP/CRM이 우리 회사 방식과 맞지 않는 조직</li>
          <li>내부 개발팀이 없거나 매우 소규모인 회사</li>
        </ul>
        <p>개인 프로젝트나 단순 자동화 목적에는 적합하지 않습니다.</p>
      </div>
    ),
  },
  {
    question: '프로젝트는 어떤 방식으로 진행되나요?',
    answer: (
      <div className="space-y-2.5 text-[15.75px] leading-relaxed text-slate-600">
        <p className="font-bold text-slate-900">FutureVisor 프로젝트는 5주 단위(1사이클)로 운영됩니다.</p>
        <p>
          각 사이클은{' '}
          <span className="font-bold text-slate-900">업무 분석 → 설계 → 개발 → QA → 개선</span>
          {` 단계를 포함하며, `}
          보통 1~5사이클 범위에서 기업 상황에 맞게 진행됩니다.
        </p>
        <p>
          전사 시스템을 한 번에 만드는 방식이 아니라,{' '}
          <span className="font-bold text-slate-900">핵심 모듈부터 단계적으로 확장</span>
          하는 구조입니다.
        </p>
      </div>
    ),
  },
  {
    question: '프로젝트 최소 비용은 어떻게 되나요?',
    answer: (
      <div className="space-y-2.5 text-[15.75px] leading-relaxed text-slate-600">
        <p>FutureVisor는 단순 제작이 아닌</p>
        <p className="font-bold text-slate-900">
          업무 분석 + 자동화 설계 기반의 맞춤형 시스템 구축을 진행합니다.
        </p>
        <p>
          프로젝트는 <span className="font-bold text-slate-900">1사이클 기준 1,000만원부터</span> 시작되며,
          이는 품질, 운영 안정성, 지속 가능한 유지보수를 위한 최소 기준입니다.
        </p>
      </div>
    ),
  },
  {
    question: '우리 회사도 자동화가 가능한지 먼저 확인할 수 있나요?',
    answer: (
      <div className="space-y-2.5 text-[15.75px] leading-relaxed text-slate-600">
        <p>네.</p>
        <p>
          FutureVisor에서는 <span className="font-bold text-slate-900">자동화 가능성 체크</span>와
          <span className="font-bold text-slate-900"> 유료 업무 진단(컨설팅)</span>을 통해 귀사에 적합한
          자동화 범위와 방향을 먼저 제안드립니다.
        </p>
      </div>
    ),
  },
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

const REVIEW_CARD_CLASS =
  'w-[min(100vw-3rem,400px)] shrink-0 rounded-[14px] border border-slate-200 bg-white p-7 shadow-sm'

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <article className={REVIEW_CARD_CLASS}>
      <Stars />
      <p className="mt-5 text-sm leading-relaxed text-slate-700">{r.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={r.avatar}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
          loading="lazy"
          decoding="async"
        />
        <div className="min-w-0 text-left">
          <p className="font-semibold text-slate-900">{r.name}</p>
          <p className="text-xs text-slate-500">{r.role}</p>
        </div>
      </div>
    </article>
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
        <div
          className="relative mt-12 w-full overflow-x-hidden overflow-y-visible pb-4 motion-reduce:overflow-x-auto"
          aria-label="고객 후기 자동 슬라이드"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent motion-reduce:hidden md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent motion-reduce:hidden md:w-20" />
          <div className="review-marquee-track gap-4 pl-6 pr-4 md:gap-5 md:pl-8">
            {[...reviews, ...reviews].map((r, i) => (
              <ReviewCard key={`${r.name}-${i}`} r={r} />
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
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200/60">
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
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-24 md:py-32">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">자주 묻는 질문</h2>
            <p className="mt-4 text-lg text-slate-600">
              FutureVisor에 대해 궁금하신 점을 확인해보세요
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
            {faqs.map((item, i) => {
              const open = openFaq === i
              const headingId = `faq-q-${i}`
              const panelId = `faq-a-${i}`
              return (
                <div
                  key={item.question}
                  className="border-b border-slate-200 px-6 py-5 last:border-b-0"
                >
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[21px] font-bold leading-7 text-slate-900">{item.question}</span>
                    <span className="shrink-0 transition-opacity duration-200" aria-hidden>
                      <img
                        src={open ? '/assets/arrowup.png' : '/assets/arrowdown.png'}
                        alt=""
                        width={21}
                        height={21}
                        className="h-[21px] w-[21px] object-contain"
                        decoding="async"
                      />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pt-4 text-left">{item.answer}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
