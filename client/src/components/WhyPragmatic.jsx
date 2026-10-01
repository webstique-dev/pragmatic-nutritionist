import { Search, Users, TrendingUp, Globe } from 'lucide-react'
import { WHY_PRAGMATIC } from '../data/site'
import Section from './Section'

export default function WhyPragmatic() {
  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Search size={20} strokeWidth={2} className="text-moss" />
      case 1:
        return <Users size={20} strokeWidth={2} className="text-moss" />
      case 2:
        return <TrendingUp size={20} strokeWidth={2} className="text-moss" />
      case 3:
      default:
        return <Globe size={20} strokeWidth={2} className="text-moss" />
    }
  }

  return (
    <Section
      id="why-pragmatic"
      width="wide"
      bg="olive"
      eyebrow="CLINICAL PHILOSOPHY"
      title="The Pragmatic Approach"
      lead="Built for real life: non-extreme, symptom-led, and centered around practical Indian home meals."
    >
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">EVIDENCE.</span>
        <span className="divider-line" />
        <span className="divider-label">SUSTAINABILITY.</span>
      </div>

      <div className="why-pragmatic-grid">
        {WHY_PRAGMATIC.map((item, idx) => (
          <div key={item.title} className="why-editorial-card">
            <div className="why-card-top">
              <span className="why-num">(0{idx + 1})</span>
              <span className="why-icon" aria-hidden="true">{getIcon(idx)}</span>
            </div>
            <h3 className="why-title">{item.title}</h3>
            <p className="why-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
