import { useEffect } from 'react'

type PortfolioItem = {
  company: string
  tags: string[]
  image: string
  url: string
}

const portfolioItems: PortfolioItem[] = [
  {
    company: 'KDB인베스트먼트',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/kdb.png',
    url: 'https://ryznsquare.oopy.io/867b8067-6e38-4798-a4ea-1d9285c47c91',
  },
  {
    company: 'CJ AI CENTER',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/cj-ai-center.png',
    url: 'https://ryznsquare.oopy.io/99733223-58de-4d60-8602-6e4546404ce6',
  },
  {
    company: '[용돈] 용하게 돈벌다',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/yongdon.png',
    url: 'https://ryznsquare.oopy.io/6db011eb-90fa-443b-af4c-e77a4e05652f',
  },
  {
    company: '플레이키키',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/playkiki.png',
    url: 'https://ryznsquare.oopy.io/29dbaf4a-3267-4349-b54e-303a04bbd4bc',
  },
  {
    company: '오피유커스',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/ophiuchus.png',
    url: 'https://ryznsquare.oopy.io/90a7ebdb-7516-418d-8733-782307b42244',
  },
  {
    company: '해피한',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/happyhan.png',
    url: 'https://ryznsquare.oopy.io/c251cf2e-92b9-4da4-8460-39ef21ebecba',
  },
  {
    company: '드림잡스쿨',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/dreamjobschool.png',
    url: 'https://ryznsquare.oopy.io/d7eb3e45-613b-43d4-ad86-06bb384ef207',
  },
  {
    company: '스카이업드래곤',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/skyupdragon.png',
    url: 'https://ryznsquare.oopy.io/2888a716-14c2-44f0-a8df-de0a7d014688',
  },
  {
    company: '법무법인세림',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/beopmu.png',
    url: 'https://ryznsquare.oopy.io/ec12519b-f757-4298-bc9b-3950dfc8e416',
  },
  {
    company: '리바이모 쇼핑몰',
    tags: ['쇼핑몰', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/revimo.png',
    url: 'https://ryznsquare.oopy.io/d682e02b-b4e6-41db-abd7-3509e06ce55e',
  },
  {
    company: '윤호병원',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/yunho.png',
    url: 'https://ryznsquare.oopy.io/9a93325d-58ae-4832-a549-3f256ac911f3',
  },
  {
    company: 'JWP파트너스',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/jwp.png',
    url: 'https://ryznsquare.oopy.io/37b54bf0-9816-455c-9a01-d400968a4286',
  },
  {
    company: '커뮤니케이션즈 코리아',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/commkorea.png',
    url: 'https://ryznsquare.oopy.io/42688dd0-aa9b-498a-abbe-cbe87a74554e',
  },
  {
    company: '오월학교',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/owolschool.png',
    url: 'https://ryznsquare.oopy.io/873ab948-5aa5-4b03-81ee-d8b709abf8b5',
  },
  {
    company: '우리아토즈',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/wooriatoz.png',
    url: 'https://ryznsquare.oopy.io/af4c0d9c-19fb-4c94-adf3-4399eae6a33a',
  },
  {
    company: '다란인테리어',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/daran.png',
    url: 'https://ryznsquare.oopy.io/2d372af2-36f0-409c-9fa1-fb2f59d12a42',
  },
  {
    company: '아토즈오프쇼어',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/atozoffshore.png',
    url: 'https://ryznsquare.oopy.io/0ceed645-8a0b-4006-9295-bde409e85438',
  },
  {
    company: '맥스플러스원',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/maxplusone.png',
    url: 'https://ryznsquare.oopy.io/1a367e86-fea7-4777-9f2c-4d9abd457337',
  },
  {
    company: '렉스소프트',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/rexsoft.png',
    url: 'https://ryznsquare.oopy.io/22a8a8f4-687c-4e7c-b42e-aaa389078e03',
  },
  {
    company: '유미코 에어 매트리스',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/umicco.png',
    url: 'https://ryznsquare.oopy.io/1fd2811e-b196-49ec-8c11-707fa4010843',
  },
  {
    company: 'WSL',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/wsl.png',
    url: 'https://ryznsquare.oopy.io/d551869e-8f47-4c96-b494-82a9405469e8',
  },
  {
    company: '진주교육대 100주년',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/jinju100.png',
    url: 'https://ryznsquare.oopy.io/ef5faba7-8ce3-41c1-adcf-49c61f4adc2a',
  },
  {
    company: '신원레저산업',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/sinwon.png',
    url: 'https://ryznsquare.oopy.io/370bd70f-c3fa-4996-8e7a-e4b1d9d16037',
  },
  {
    company: 'LH 플랫폼',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/lh.png',
    url: 'https://ryznsquare.oopy.io/f79ccc09-d2b9-4198-822f-c2f79366a613',
  },
  {
    company: '세븐의료기 리쇼드',
    tags: ['쇼핑몰', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/litchaud.png',
    url: 'https://ryznsquare.oopy.io/b5f7b2d6-c2b0-4def-b841-1b0ac2101029',
  },
]

type Props = {
  onClose: () => void
}

export function PortfolioModal({ onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0a0f1e]"
      role="dialog"
      aria-modal="true"
      aria-label="전체 포트폴리오"
    >
      {/* 헤더 */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700/50 bg-[#0a0f1e]/95 px-6 py-4 backdrop-blur-sm md:px-12">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="FutureVisor" className="h-5 object-contain" />
          <span className="text-sm font-medium text-slate-400">포트폴리오</span>
          <span className="rounded-full bg-brand-500/20 px-2.5 py-0.5 text-xs font-bold text-brand-400">
            {portfolioItems.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 타이틀 */}
        <div className="px-6 pb-8 pt-10 text-center md:px-12">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            FutureVisor 포트폴리오
          </h2>
          <p className="mt-3 text-base text-slate-400">UX/UI 디자인 · 퍼블리싱 · 앱/모바일</p>
        </div>

        {/* 포트폴리오 그리드 */}
        <div className="mx-auto max-w-[1228px] px-6 pb-20 md:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, idx) => (
              <a
                key={item.company}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 transition hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
              >
                {/* 이미지 */}
                <div className="aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.company}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* 콘텐츠 */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-slate-500">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-white">{item.company}</h3>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-1.5 shrink-0 text-slate-600 transition group-hover:text-brand-400"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 13L13 3M13 3H7M13 3v6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-slate-700/50 px-6 py-12 text-center">
          <p className="text-base text-slate-300">우리 기업도 변화할 수 있습니다</p>
          <a
            href="#contact"
            onClick={onClose}
            className="mt-5 inline-flex min-w-[200px] justify-center rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-10 py-4 text-base font-bold text-white shadow-lg transition hover:opacity-90"
          >
            상담 신청하기
          </a>
        </div>
      </div>
    </div>
  )
}
