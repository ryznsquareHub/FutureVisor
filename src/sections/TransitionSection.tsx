export function TransitionSection() {
  return (
    <section
      className="pt-0 pb-24 md:pb-28"
      style={{
        backgroundImage: 'linear-gradient(167.743deg, rgb(15, 23, 43) 0%, rgb(29, 41, 61) 100%)',
      }}
    >
      <div className="mx-auto max-w-[1400px] px-8 pt-16 text-center md:pt-20 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl md:leading-tight">
            반복 업무 때문에{' '}
            <br className="md:hidden" />
            <span className="whitespace-nowrap">시간에 쫓겨,</span>
            <br />
            중요한 일을 못하고{' '}
            <br className="md:hidden" />
            <span className="whitespace-nowrap">있지는 않나요?</span>
          </h2>
          <p className="mt-8 text-lg text-slate-300 md:text-xl">
            반복 업무는 시스템에 맡기고, 사람은 더 중요한 일에 집중하세요.
          </p>
        </div>
      </div>
    </section>
  )
}
