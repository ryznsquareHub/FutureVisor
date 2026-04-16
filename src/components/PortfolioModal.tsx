import { useEffect, useState } from 'react'

type PortfolioItem = {
  company: string
  tags: string[]
  image: string
  siteUrl: string
  note?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    company: 'KDB인베스트먼트',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/kdb.png',
    siteUrl: 'https://www.kdbi.co.kr',
  },
  {
    company: 'CJ AI CENTER',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/cj-ai-center.png',
    siteUrl: '',
  },
  {
    company: '[용돈] 용하게 돈벌다',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/yongdon.png',
    siteUrl: 'https://play.google.com/store/apps/details?id=com.yongdone.www',
  },
  {
    company: '플레이키키',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/playkiki.png',
    siteUrl: 'https://m.onestore.co.kr/',
  },
  {
    company: '오피유커스',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/ophiuchus.png',
    siteUrl: 'http://www.ophiuchus.co.kr/',
  },
  {
    company: '해피한',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/happyhan.png',
    siteUrl: 'http://www.hhan.co.kr/',
  },
  {
    company: '드림잡스쿨',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/dreamjobschool.png',
    siteUrl: 'http://www.djobs.kr/',
  },
  {
    company: '스카이업드래곤',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/skyupdragon.png',
    siteUrl: 'http://skyupdragon.io/',
  },
  {
    company: '법무법인세림',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/beopmu.png',
    siteUrl: '',
  },
  {
    company: '리바이모 쇼핑몰',
    tags: ['쇼핑몰', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/revimo.png',
    siteUrl: 'http://revimo.co.kr/',
  },
  {
    company: '윤호병원',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/yunho.png',
    siteUrl: 'http://www.yoonhohospital.co.kr/',
  },
  {
    company: 'JWP파트너스',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/jwp.png',
    siteUrl: 'http://jwppartners.com',
  },
  {
    company: '커뮤니케이션즈 코리아',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/commkorea.png',
    siteUrl: 'http://commkorea.com',
  },
  {
    company: '오월학교',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/owolschool.png',
    siteUrl: 'https://www.owolschool.co.kr/',
  },
  {
    company: '우리아토즈',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/wooriatoz.png',
    siteUrl: 'http://wooriatoz.com/',
  },
  {
    company: '다란인테리어',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/daran.png',
    siteUrl: 'http://www.daraninterior.com/',
  },
  {
    company: '아토즈오프쇼어',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/atozoffshore.png',
    siteUrl: 'http://www.atozoffshore.com/',
  },
  {
    company: '맥스플러스원',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/maxplusone.png',
    siteUrl: 'http://www.maxplusone.com/',
  },
  {
    company: '렉스소프트',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/rexsoft.png',
    siteUrl: 'https://rexsw.com/',
  },
  {
    company: '유미코 에어 매트리스',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/umicco.png',
    siteUrl: 'https://umicco.kr/',
  },
  {
    company: 'WSL',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/wsl.png',
    siteUrl: 'https://wslcompany.com/',
  },
  {
    company: '진주교육대 100주년',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/jinju100.png',
    siteUrl: 'http://ceu100.dreamitbiz.com/',
  },
  {
    company: '신원레저산업',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/sinwon.png',
    siteUrl: 'https://swgolfcondo.com/',
  },
  {
    company: 'LH 플랫폼',
    tags: ['UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/lh.png',
    siteUrl: '',
  },
  {
    company: '세븐의료기 리쇼드',
    tags: ['쇼핑몰', 'UX / UI 디자인', '퍼블', '앱 · 모바일'],
    image: '/assets/portfolio/litchaud.png',
    siteUrl: 'https://litchaud.com/',
  },
  {
    company: '비즈웨이브',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/bizwave.png',
    siteUrl: 'https://vizwave.co.kr/',
  },
  {
    company: '준엔지니어링',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/jun-eng.png',
    siteUrl: 'http://jun-eng.kr/',
  },
  {
    company: '울산항만공사',
    tags: ['랜딩 홈페이지', 'UX / UI 디자인', '퍼블'],
    image: '/assets/portfolio/ulsan-port.png',
    siteUrl: '',
  },
  {
    company: '커머스 + 게임(유니티) APP',
    tags: ['앱 · 모바일'],
    image: '/assets/portfolio/commerce-game.png',
    siteUrl: '',
  },
  {
    company: 'KX 이노베이션 리뉴얼',
    tags: ['기업 내부시스템'],
    image: '/assets/portfolio/kx-innovation.png',
    siteUrl: '',
  },
  {
    company: 'LG S&I 홈페이지 유지보수',
    tags: ['랜딩 홈페이지', '기업 내부시스템'],
    image: '/assets/portfolio/lg-sni.png',
    siteUrl: '',
  },
  {
    company: '테크다스 AI 대기 MES 솔루션',
    tags: ['기업 내부시스템', 'UX / UI 디자인', '퍼블', '솔루션'],
    image: '',
    siteUrl: '',
    note: '내부 시스템은 별도 문의 부탁드립니다.',
  },
  {
    company: 'LG XI 홈페이지 유지보수',
    tags: ['랜딩 홈페이지'],
    image: '/assets/portfolio/lg-xi.png',
    siteUrl: 'https://www.xi.co.kr/',
  },
  {
    company: '컬리 관리자 페이지 리뉴얼',
    tags: ['기업 내부시스템', '솔루션', '쇼핑몰'],
    image: '',
    siteUrl: '',
    note: '내부 시스템은 별도 문의 부탁드립니다.',
  },
  {
    company: 'SK 쉴더스',
    tags: ['기업 내부시스템', '솔루션'],
    image: '/assets/portfolio/sk-shielders.png',
    siteUrl: '',
  },
  {
    company: 'SK C&C, 하이닉스 MES 프로젝트',
    tags: ['기업 내부시스템', '솔루션'],
    image: '/assets/portfolio/sk-cnc.png',
    siteUrl: '',
  },
  {
    company: '삼성전자, 삼성페이 운영',
    tags: ['기업 내부시스템'],
    image: '/assets/portfolio/samsung.png',
    siteUrl: '',
  },
  {
    company: 'SK 하이닉스, 지식블로그 개발 및 운영',
    tags: ['기업 내부시스템', '솔루션'],
    image: '/assets/portfolio/sk-hynix.png',
    siteUrl: '',
  },
]

type Props = {
  onClose: () => void
}

function DetailView({
  item,
  idx,
  total,
  onBack,
  onPrev,
  onNext,
}: {
  item: PortfolioItem
  idx: number
  total: number
  onBack: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="flex min-h-full flex-col">
      {/* 상세 헤더 */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-700/50 bg-[#0a0f1e]/95 px-6 py-4 backdrop-blur-sm md:px-12">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          목록으로
        </button>
        <span className="text-sm text-slate-500">
          {idx + 1} / {total}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="이전"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="다음"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 상세 콘텐츠 */}
      <div className="mx-auto w-full max-w-[900px] px-6 py-10 md:px-8">
        {/* 번호 + 회사명 */}
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-xs font-bold text-brand-400">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{item.company}</h2>
        </div>

        {/* 태그 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-medium text-brand-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 메인 이미지 */}
        {item.image ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl">
            <img
              src={item.image}
              alt={item.company}
              className="w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="mt-8 flex min-h-[240px] items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-900/60 shadow-2xl">
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto text-slate-600" aria-hidden="true">
                <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 32l10-8 8 7 6-5 12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mt-4 text-sm font-medium text-slate-400">
                {item.note ?? '내부 시스템은 별도 문의 부탁드립니다.'}
              </p>
            </div>
          </div>
        )}

        {/* 사이트 링크 */}
        {item.siteUrl && (
          <div className="mt-8 flex justify-center">
            <a
              href={item.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-brand-500/60 hover:bg-slate-700 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H6.5M11 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              사이트 방문하기
            </a>
          </div>
        )}

        {/* 이전/다음 네비게이션 */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="flex flex-col items-start gap-1 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-5 text-left transition hover:border-brand-500/40 hover:bg-slate-800/60"
          >
            <span className="text-xs text-slate-500">이전</span>
            <span className="text-sm font-semibold text-white">
              {portfolioItems[(idx - 1 + portfolioItems.length) % portfolioItems.length].company}
            </span>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex flex-col items-end gap-1 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-5 text-right transition hover:border-brand-500/40 hover:bg-slate-800/60"
          >
            <span className="text-xs text-slate-500">다음</span>
            <span className="text-sm font-semibold text-white">
              {portfolioItems[(idx + 1) % portfolioItems.length].company}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function PortfolioModal({ onClose }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const scrollRef = { list: 0 }

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedIdx !== null) setSelectedIdx(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, selectedIdx])

  const scrollContainerRef = (el: HTMLDivElement | null) => {
    if (el && selectedIdx !== null) el.scrollTop = 0
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0a0f1e]"
      role="dialog"
      aria-modal="true"
    >
      {selectedIdx === null ? (
        <>
          {/* 목록 헤더 */}
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

          {/* 목록 스크롤 */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 pb-8 pt-10 text-center md:px-12">
              <h2 className="text-3xl font-bold text-white md:text-4xl">FutureVisor 포트폴리오</h2>
              <p className="mt-3 text-base text-slate-400">UX/UI 디자인 · 퍼블리싱 · 앱/모바일</p>
            </div>

            <div className="mx-auto max-w-[1228px] px-6 pb-20 md:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, idx) => (
                  <button
                    key={item.company}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 text-left transition hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
                  >
                    <div className="aspect-video overflow-hidden bg-slate-800">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.company}
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-800/80">
                          <span className="text-xs text-slate-500">별도 문의</span>
                        </div>
                      )}
                    </div>
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
                  </button>
                ))}
              </div>
            </div>

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
        </>
      ) : (
        <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
          <DetailView
            item={portfolioItems[selectedIdx]}
            idx={selectedIdx}
            total={portfolioItems.length}
            onBack={() => setSelectedIdx(null)}
            onPrev={() =>
              setSelectedIdx((i) => ((i ?? 0) - 1 + portfolioItems.length) % portfolioItems.length)
            }
            onNext={() =>
              setSelectedIdx((i) => ((i ?? 0) + 1) % portfolioItems.length)
            }
          />
        </div>
      )}
    </div>
  )
}
