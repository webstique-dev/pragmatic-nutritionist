import { Droplet, Microscope, Dna, FlaskConical } from 'lucide-react'
import { DIAGNOSTICS, DIAGNOSTIC_TAGS } from '../data/site'
import Section from './Section'

export default function DiagnosticCare() {
  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Droplet size={20} strokeWidth={2} className="text-moss" />
      case 1:
        return <Microscope size={20} strokeWidth={2} style={{ color: 'var(--slate-700)' }} />
      case 2:
        return <Dna size={20} strokeWidth={2} className="text-coral" />
      case 3:
      default:
        return <FlaskConical size={20} strokeWidth={2} className="text-amber" />
    }
  }

  return (
    <Section
      id="diagnostics"
      width="wide"
      bg="slate"
      eyebrow="DATA-LED CLINICAL NUTRITION"
      title="Built on Data, Not Assumptions"
      lead="Most nutrition advice is generic. Ours begins with clinical biomarker analysis, coordinating targeted tests so every recommendation is biochemically sound."
    >
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">BIOMARKERS.</span>
        <span className="divider-line" />
        <span className="divider-label">PRECISION CARE.</span>
      </div>

      <div className="diagnostics-grid">
        {DIAGNOSTICS.map((diag, idx) => (
          <article key={diag.title} className="diag-editorial-card">
            <div className="diag-card-top">
              <span className="diag-num">(0{idx + 1})</span>
              <span className="diag-icon" aria-hidden="true">{getIcon(idx)}</span>
            </div>
            <h3 className="diag-title">{diag.title}</h3>
            <p className="diag-desc">{diag.desc}</p>
          </article>
        ))}
      </div>

      <div className="diagnostics-banner-callout">
        <p className="diag-banner-text">
          <strong>Full Diagnostic Coordination:</strong> You do not need to navigate complex test panels alone. We recommend clinically relevant markers, coordinate with certified diagnostic labs, and translate results directly into your daily meal plan.
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
