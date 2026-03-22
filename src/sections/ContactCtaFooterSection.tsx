const services = [
  { title: '업무 자동화', desc: '반복 업무 완전 자동화' },
  { title: '커스텀 시스템', desc: '맞춤형 ERP/CRM 구축' },
  { title: '통합 워크플로우', desc: '여러 툴 완벽 연동' },
]

export function ContactCtaFooterSection() {
  return (
    <>
      <section id="contact" className="bg-[#0f172b] py-24 md:py-32">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="overflow-hidden rounded-[21px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:grid lg:grid-cols-[minmax(0,368px)_1fr]">
            <div className="bg-gradient-to-b from-white to-blue-100 p-10 md:p-14">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              FutureVisor
              <br />
              전문 개발팀에
              <br />
              의뢰하세요
            </h2>
            <div className="mt-12 space-y-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 rounded-[14px] border border-slate-200/60 bg-white p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-brand-500 to-[#1787ff] text-white shadow-sm">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{s.title}</p>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            </div>
          <div className="border-t border-slate-200 bg-white p-8 md:border-t-0 md:border-l md:p-12">
            <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              어떤 업무를 자동화하고
              <br />
              <span className="text-brand-600">싶으신가요?</span>
            </h3>
            <form
              className="mt-10 space-y-6"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-slate-600">회사명 (필수)</span>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                    placeholder="회사명 또는 운영하시는 팀명"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-slate-600">업종 (선택)</span>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                    placeholder="업종을 입력해주세요"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-slate-600">전화번호 (필수)</span>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                    placeholder="연락 가능한 전화번호를 입력해주세요"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-slate-600">이메일 (필수)</span>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                    placeholder="연락 가능한 이메일 주소를 입력해주세요"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="text-slate-600">예산 (선택)</span>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                  placeholder="가용 가능한 예산 금액을 입력해주세요"
                />
              </label>
              <label className="block text-sm">
                <span className="text-slate-600">문의내용 (필수)</span>
                <textarea
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                  placeholder="자동화하고 싶은 업무나 현재 겪고 계신 불편사항을 자세히 적어주세요"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 py-4 text-base font-bold text-white shadow-md hover:opacity-95"
              >
                문의하기
              </button>
            </form>
          </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1288px] px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-6 py-16 shadow-[0px_25px_50px_-12px_rgba(0,64,255,0.3)] md:px-12 md:py-20">
        <div className="relative z-10 mx-auto max-w-[900px] text-center text-white">
          <h2 className="text-3xl font-bold leading-tight md:text-5xl md:leading-tight">
            우리 회사 업무,
            <br />
            진짜 자동화할 수 있을까요?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/90">
            심도 있는 업무 진단을 위해 첫 컨설팅은 유료(30만원/H)로 진행되며,
            <br />
            본 계약 체결 시 해당 금액은 전액 환급됩니다.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-w-[168px] justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-600 shadow-md hover:bg-slate-50"
            >
              상담 신청하기
            </a>
            <button
              type="button"
              className="inline-flex min-w-[172px] justify-center rounded-full border-2 border-white/80 bg-transparent px-8 py-4 text-base font-bold text-white hover:bg-white/10"
            >
              자료 다운로드
            </button>
          </div>
        </div>
        </div>
        </div>
      </section>
      <footer className="border-t border-[#1d293d] bg-[#0f172b] py-12">
        <div className="mx-auto flex max-w-[1288px] flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-8">
          <div>
            <p className="text-lg font-bold">
              <span className="text-brand-500">Future</span>
              <span className="text-white">Visor</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">© 2025 FutureVisor. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <a href="#" className="transition hover:text-white">
              이용약관
            </a>
            <a href="#" className="transition hover:text-white">
              개인정보처리방침
            </a>
            <a href="#contact" className="transition hover:text-white">
              문의하기
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
