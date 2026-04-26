import { useMemo, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'

/** EmailJS 템플릿의 Bcc 필드에 `{{bcc}}` 를 넣어야 복사 수신됩니다. */
const INQUIRY_BCC = 'contact@ryznsquare.com'

const services = [
  {
    title: '업무 자동화',
    desc: '반복 업무 완전 자동화',
    icon: '/assets/업무자동화.png',
  },
  {
    title: '커스텀 시스템',
    desc: '맞춤형 ERP/CRM 구축',
    icon: '/assets/커스텀시스템.png',
  },
  {
    title: '통합 워크플로우',
    desc: '여러 툴 완벽 연동',
    icon: '/assets/통합워크플로우.png',
  },
]

export function ContactCtaFooterSection() {
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState('')
  const [step, setStep] = useState<1 | 2>(1)
  const [sending, setSending] = useState(false)
  const [formNotice, setFormNotice] = useState<{
    kind: 'success' | 'error'
    text: string
  } | null>(null)

  const step1Ready = useMemo(
    () => Boolean(company.trim() && phone.trim() && email.trim() && message.trim()),
    [company, phone, email, message],
  )

  function goToStep2() {
    setFormNotice(null)
    if (!step1Ready) {
      setFormNotice({
        kind: 'error',
        text: '회사명, 전화번호, 이메일, 자동화하고 싶은 업무는 필수입니다.',
      })
      return
    }
    setStep(2)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormNotice(null)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      const missing = [
        !serviceId && 'VITE_EMAILJS_SERVICE_ID',
        !templateId && 'VITE_EMAILJS_TEMPLATE_ID',
        !publicKey && 'VITE_EMAILJS_PUBLIC_KEY',
      ].filter(Boolean).join(', ')
      setFormNotice({
        kind: 'error',
        text: `메일 전송 설정 오류 — 누락된 환경변수: ${missing}`,
      })
      return
    }

    const companyTrim = company.trim()
    const phoneTrim = phone.trim()
    const emailTrim = email.trim()
    const messageTrim = message.trim()

    if (!companyTrim || !phoneTrim || !emailTrim || !messageTrim) {
      setFormNotice({
        kind: 'error',
        text: '회사명, 전화번호, 이메일, 문의내용은 필수입니다.',
      })
      return
    }

    setSending(true)
    try {
      const detailsTrim = details.trim()
      const composedMessage = detailsTrim ? `${messageTrim}\n\n[추가 상세]\n${detailsTrim}` : messageTrim
      await emailjs.send(
        serviceId,
        templateId,
        {
          company: companyTrim,
          industry: industry.trim() || '(미입력)',
          phone: phoneTrim,
          email: emailTrim,
          budget: budget.trim() || '(미입력)',
          message: composedMessage,
          bcc: INQUIRY_BCC,
        },
        { publicKey },
      )
      setCompany('')
      setIndustry('')
      setPhone('')
      setEmail('')
      setBudget('')
      setMessage('')
      setDetails('')
      setStep(1)
      setFormNotice({
        kind: 'success',
        text: '문의가 전송되었습니다. 빠르게 연락드리겠습니다.',
      })
    } catch (err: unknown) {
      const status =
        err && typeof err === 'object' && 'status' in err ? (err as { status: number }).status : null
      const text =
        err && typeof err === 'object' && 'text' in err ? (err as { text: string }).text : null
      const detail = [status && `HTTP ${status}`, text].filter(Boolean).join(' — ')
      setFormNotice({
        kind: 'error',
        text: `전송 실패${detail ? `: ${detail}` : ''}. 잠시 후 다시 시도하거나 이메일로 직접 연락해주세요.`,
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section id="contact" className="bg-[#0f172b] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
          <div className="overflow-hidden rounded-[21px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:grid lg:grid-cols-[minmax(0,368px)_1fr]">
            <div className="bg-gradient-to-b from-white to-blue-100 p-10 md:p-14">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              <img
                src="/assets/logo.png"
                alt="FutureVisor"
                width={200}
                height={34}
                className="mb-4 block h-9 w-auto md:mb-5 md:h-10"
                decoding="async"
              />
              전문 개발팀에 의뢰하세요
            </h2>
            <div className="mt-12 space-y-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 rounded-[14px] border border-slate-200/60 bg-white p-5"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200/60">
                    <img
                      src={s.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
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
              60초면 신청 완료.
              <br />
              <span className="text-brand-600">영업일 기준 24시간 내 회신.</span>
            </h3>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-[13px] leading-relaxed text-slate-700">
              <span aria-hidden className="mt-0.5 text-base text-brand-600">ⓘ</span>
              <p>
                첫 업무 진단(컨설팅)은 <span className="font-bold text-slate-900">30만 원/H 유료</span>로 진행되며,
                <br className="hidden md:inline" />
                {' '}본 계약 체결 시 <span className="font-bold text-slate-900">전액 환급</span>됩니다.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3" aria-label="신청 진행 단계">
              <div className="flex flex-1 items-center gap-3">
                <span
                  className={
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ' +
                    (step === 1
                      ? 'bg-brand-500 text-white'
                      : 'bg-emerald-500 text-white')
                  }
                  aria-current={step === 1 ? 'step' : undefined}
                >
                  {step === 1 ? '1' : '✓'}
                </span>
                <span className="text-sm font-semibold text-slate-800">필수 정보</span>
              </div>
              <div className="h-px flex-1 bg-slate-200" aria-hidden />
              <div className="flex flex-1 items-center justify-end gap-3">
                <span className="text-sm font-medium text-slate-500">선택 정보</span>
                <span
                  className={
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ' +
                    (step === 2
                      ? 'bg-brand-500 text-white'
                      : 'bg-slate-200 text-slate-500')
                  }
                  aria-current={step === 2 ? 'step' : undefined}
                >
                  2
                </span>
              </div>
            </div>
            <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
              {formNotice ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={
                    formNotice.kind === 'success'
                      ? 'rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800'
                      : 'rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800'
                  }
                >
                  {formNotice.text}
                </p>
              ) : null}

              {step === 1 ? (
                <div className="space-y-6">
                  <label className="block text-sm">
                    <span className="text-slate-600">회사명 (필수)</span>
                    <input
                      name="company"
                      autoComplete="organization"
                      value={company}
                      onChange={(ev) => setCompany(ev.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                      placeholder="회사명 또는 운영하시는 팀명"
                    />
                  </label>
                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block text-sm">
                      <span className="text-slate-600">전화번호 (필수)</span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(ev) => setPhone(ev.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                        placeholder="010-0000-0000"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-slate-600">이메일 (필수)</span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                        placeholder="name@company.com"
                      />
                    </label>
                  </div>
                  <label className="block text-sm">
                    <span className="text-slate-600">자동화하고 싶은 업무 (필수, 한 줄)</span>
                    <input
                      name="message"
                      value={message}
                      onChange={(ev) => setMessage(ev.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                      placeholder="예) 주문→정산→송장 발송이 모두 수기로 돌아가요"
                    />
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={goToStep2}
                      disabled={!step1Ready}
                      className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-600 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                    >
                      업종·예산 추가하기 (선택) →
                    </button>
                    <button
                      type="submit"
                      disabled={sending || !step1Ready}
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-8 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                    >
                      {sending ? '전송 중…' : '바로 신청하기'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    선택 정보를 입력하시면 더 정확한 진단 자료를 준비해드립니다. 비워두셔도 신청은
                    가능합니다.
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block text-sm">
                      <span className="text-slate-600">업종 (선택)</span>
                      <input
                        name="industry"
                        value={industry}
                        onChange={(ev) => setIndustry(ev.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                        placeholder="예) 패션 유통, 제조, IT 서비스"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-slate-600">예산 (선택)</span>
                      <input
                        name="budget"
                        value={budget}
                        onChange={(ev) => setBudget(ev.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                        placeholder="예) 1,000~3,000만 원"
                      />
                    </label>
                  </div>
                  <label className="block text-sm">
                    <span className="text-slate-600">추가 상세 (선택)</span>
                    <textarea
                      name="details"
                      rows={4}
                      value={details}
                      onChange={(ev) => setDetails(ev.target.value)}
                      className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500/30 focus:ring-2"
                      placeholder="현재 사용 중인 도구·인력 구성·이상적 일정 등 자유롭게"
                    />
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-600 sm:w-auto"
                    >
                      ← 이전 단계
                    </button>
                    <button
                      type="submit"
                      disabled={sending || !step1Ready}
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-8 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                    >
                      {sending ? '전송 중…' : '신청 보내기'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
          <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700 px-6 py-16 shadow-[0px_25px_50px_-12px_rgba(0,64,255,0.3)] md:px-12 md:py-20">
        <div className="relative z-10 mx-auto max-w-[900px] text-center text-white">
          <h2 className="text-3xl font-bold leading-tight md:text-5xl md:leading-tight">
            우리 회사도 가능한지,
            <br className="hidden md:inline" />
            {' '}30분이면 답이 나옵니다.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/90">
            유료 진단(30만 원/H)으로 자동화 가능 범위 · 예상 비용 · 일정까지 산정합니다.
            <br className="hidden md:inline" />
            {' '}본 계약 시 진단 비용은 <span className="font-bold text-white">전액 환급</span>됩니다.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="inline-flex min-w-[168px] justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-600 shadow-md hover:bg-slate-50"
            >
              상담 신청하기
            </a>
            <a
              href="tel:0507-1477-6607"
              className="inline-flex min-w-[168px] flex-col items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 py-3 text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              <span className="text-base font-semibold leading-tight">바로 통화하기</span>
              <span className="text-xs font-medium leading-tight text-white/75">
                (0507-1477-6607)
              </span>
            </a>
          </div>
        </div>
        </div>
        </div>
      </section>
      <footer className="border-t border-[#1d293d] bg-[#0f172b] py-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-8 md:flex-row lg:px-16">
          <div>
            <img
              src="/assets/logo.png"
              alt="FutureVisor"
              width={152}
              height={26}
              className="h-6 w-auto opacity-95"
              decoding="async"
            />
            <p className="mt-3 text-sm text-slate-400">© 2025 FutureVisor. All rights reserved.</p>
            <p className="mt-1 text-sm text-slate-400">
              Contact |{' '}
              <a href="tel:0507-1477-6607" className="transition hover:text-white">
                0507-1477-6607
              </a>
            </p>
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
