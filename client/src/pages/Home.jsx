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
import AwardRecognition from '../components/AwardRecognition'
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
      <Hero />
      <ProofStrip />
      <Champions />
      <CoreAreas />
      <ResultsFilter />
      <Checker />
      <WhyPragmatic />
      <Timeline />
      <MeetMeenu />
      <AwardRecognition />
      <DiagnosticCare />
      <Faq tight />
      <CtaBand
        title="Ready to Transform Your Nutrition?"
        text="From gut recovery to peak athletic performance: personalised plans built on real clinical expertise."
      />
    </>
  )
}
