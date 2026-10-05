import { useSeo } from '../components/Seo'
import Hero from '../components/Hero'
import ProofStrip from '../components/ProofStrip'
import Champions from '../components/Champions'
import CoreAreas from '../components/CoreAreas'
import ResultsFilter from '../components/ResultsFilter'
import Checker from '../components/Checker'
import WhyPragmatic from '../components/WhyPragmatic'
import Timeline from '../components/Timeline'
import MeetMeenu from '../components/MeetMeenu'
import DiagnosticCare from '../components/DiagnosticCare'
import Faq from '../components/Faq'
import CtaBand from '../components/CtaBand'

export default function Home() {
  useSeo(
    'Best Online Nutritionist in India for Gut Health & Sports Nutrition | Meenu Balaji',
    'Clinical nutritionist, 14+ years across India, UK & NZ. Evidence-based care for IBS, bloating and digestion, plus performance nutrition for teen and elite athletes.'
  )

  return (
    <>
      {/* 1. Hero: Visual hook & 4 Pillars */}
      <Hero />

      {/* 2. Proof Strip: Clinical track record & Press */}
      <ProofStrip />

      {/* 3. Core Disciplines: Gut Health & Sports Nutrition */}
      <CoreAreas />

      {/* 4. Clinical Philosophy: The Pragmatic Approach */}
      <WhyPragmatic />

      {/* 5. Clinical Founder & Honors: Meenu Balaji & Realistic Awards 2026 */}
      <MeetMeenu />

      {/* 6. Precision Care: Data-Led Diagnostic Testing */}
      <DiagnosticCare />

      {/* 7. Structured Methodology: 3-Phase Path to Lasting Vitality */}
      <Timeline />

      {/* 8. Interactive Clinical Audit: 5-Question Vitality Checker */}
      <Checker />

      {/* 9. Social Proof: Champions & Elite Athletes */}
      <Champions />

      {/* 10. Social Proof: Verified Patient Clinical Outcomes */}
      <ResultsFilter />

      {/* 11. FAQ: Common Inquiries & Clarity */}
      <Faq tight />

      {/* 12. Final Action Band */}
      <CtaBand
        eyebrow="START YOUR JOURNEY"
        headline="Start With A Plan"
        headlineHighlight="Built Around You."
        text="Personalised care, evidence-led protocols, and expert guidance designed around your goals."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
        trustStatement="Personalised care • Evidence-led • Available globally"
      />
    </>
  )
}
