import { Droplet, Microscope, Dna, FlaskConical } from 'lucide-react'
import { DIAGNOSTICS, DIAGNOSTIC_TAGS } from '../data/site'
import Section from './Section'

export default function DiagnosticCare() {
  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Droplet size={26} strokeWidth={2} className="diag-icon-lucide text-moss" />
      case 1:
        return <Microscope size={26} strokeWidth={2} className="diag-icon-lucide text-moss" />
      case 2:
        return <Dna size={26} strokeWidth={2} className="diag-icon-lucide text-moss" />
      case 3:
      default:
        return <FlaskConical size={26} strokeWidth={2} className="diag-icon-lucide text-moss" />
    }
  }

  return (
    <Section
      id="diagnostics"
      width="wide"
      bg="cream"
      eyebrow="Diagnostic-led care"
      title="Your plan is built on data, not assumptions"
      lead="Most nutrition advice is generic. Ours starts with clinical evidence — coordinating the right diagnostic tests so every recommendation is specific to your body."
    >
      <div className="diagnostics-grid">
        {DIAGNOSTICS.map((diag, idx) => (
          <article key={diag.title} className="diag-card">
            <div className="diag-icon" aria-hidden="true">{getIcon(idx)}</div>
            <h3 className="diag-title">{diag.title}</h3>
            <p className="diag-desc">{diag.desc}</p>
          </article>
        ))}
      </div>

      <div className="diagnostics-banner-callout">
        <p className="diag-banner-text">
          <strong>We coordinate testing for you.</strong> You don't need to know which tests to book or how to read the results. Meenu recommends what's clinically relevant, arranges testing through certified diagnostic labs, and interprets the findings directly into your plan.
        </p>
      </div>

      <div className="diagnostics-tags-row">
        {DIAGNOSTIC_TAGS.map((tag) => (
          <span key={tag} className="diag-tag-pill">{tag}</span>
        ))}
      </div>
    </Section>
  )
}



