import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { WhySection } from './sections/WhySection'
import { SolutionSection } from './sections/SolutionSection'
import { StructureFlowSection } from './sections/StructureFlowSection'
import { ProcessPortfolioSection } from './sections/ProcessPortfolioSection'
import { ReviewTrustFaqSection } from './sections/ReviewTrustFaqSection'
import { ContactCtaFooterSection } from './sections/ContactCtaFooterSection'

export function FutureVisorLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-ink antialiased">
      <Header />
      <main>
        <Hero />
        <WhySection />
        <SolutionSection />
        <StructureFlowSection />
        <ProcessPortfolioSection />
        <ReviewTrustFaqSection />
        <ContactCtaFooterSection />
      </main>
    </div>
  )
}
