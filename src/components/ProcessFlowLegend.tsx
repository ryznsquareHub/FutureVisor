/** Figma 1188:659 — 범례 레이어 */
export function ProcessFlowLegend() {
  const b = '/assets/process-flow'
  const imgVector19 = `${b}/0775b213e574ecc1938af9b2999087a9cfaa058c.svg`
  const imgVector20 = `${b}/5aaad91c37f64c0b674ac864b3ab96401a2b7576.svg`
  const imgVector21 = `${b}/1b72fac90f7abe0893c3fc89b24e84f607012f24.svg`
  const imgVector22 = `${b}/fa92e9504840246eb76f71ede1f34dbbbf9f647c.svg`

  return (
    <div className="absolute contents inset-[87.15%_6.92%_5.48%_6.92%]">
      <div className="absolute inset-[87.15%_6.92%_5.48%_6.92%] opacity-95">
        <div className="absolute inset-[-2.27%_-0.22%]">
          <img alt="" className="block size-full max-w-none" src={imgVector19} />
        </div>
      </div>
      <div className="absolute inset-[89.83%_86.92%_8.16%_10.77%] opacity-95">
        <div className="absolute inset-[-133.33%]">
          <img alt="" className="block size-full max-w-none" src={imgVector20} />
        </div>
      </div>
      <p className="absolute inset-[89.67%_75.08%_8.18%_15%] whitespace-nowrap text-[11.09px] font-bold leading-[normal] text-[rgba(15,23,42,0.9)] opacity-95">
        Data flow
      </p>
      <div className="absolute inset-[89.83%_60.38%_8.16%_37.31%] opacity-95">
        <div className="absolute inset-[-6.25%]">
          <img alt="" className="block size-full max-w-none" src={imgVector21} />
        </div>
      </div>
      <p className="absolute inset-[89.67%_43.58%_8.18%_41.54%] whitespace-nowrap text-[11.09px] font-bold leading-[normal] text-[rgba(15,23,42,0.9)] opacity-95">
        Process Steps
      </p>
      <div className="absolute contents inset-[90.17%_28.85%_8.49%_68.08%]">
        <div className="absolute inset-[90.17%_28.85%_8.49%_68.08%] opacity-95">
          <div className="absolute inset-[-11.25%_-5.62%]">
            <img alt="" className="block size-full max-w-none" src={imgVector22} />
          </div>
        </div>
      </div>
      <p className="absolute inset-[89.67%_9.95%_8.18%_72.31%] whitespace-nowrap text-[11.09px] font-bold leading-[normal] text-[rgba(15,23,42,0.9)] opacity-95">
        Continuous Loop
      </p>
    </div>
  )
}
