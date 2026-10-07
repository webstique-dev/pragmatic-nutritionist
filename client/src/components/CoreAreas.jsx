import { Link } from 'react-router-dom'
import { Sprout, Zap, ArrowRight, Activity, ShieldCheck, Award } from 'lucide-react'
import { CORE_AREAS } from '../data/site'
import Section from './Section'
import gutImg from '../assets/Gut-health.avif'
import sportsImg from '../assets/sports-nutrotionist.avif'

const AREA_BG_IMAGES = {
  'gut-health': gutImg,
  'sports-nutrition': sportsImg
}

const DISCIPLINE_METRICS = {
  'gut-health': [
    { value: '14+ Yrs', label: 'Clinical Protocols' },
    { value: '100%', label: 'Indian Food First' },
    { value: 'Zero', label: 'Crash Eliminations' }
  ],
  'sports-nutrition': [
    { value: 'Youth & Elite', label: 'Performance Fuelling' },
    { value: 'Growth-Safe', label: 'Adolescent Frameworks' },
    { value: 'Podium', label: 'Proven Track Record' }
  ]
}

export default function CoreAreas() {
  const getIcon = (id) => {
    if (id === 'gut-health') return <Sprout size={18} strokeWidth={2.2} />
    return <Zap size={18} strokeWidth={2.2} />
  }

  return (
    <Section
      id="core-areas"
      width="wide"
      bg="lime"
      eyebrow="CLINICAL PILLARS"
      title="Two Core Disciplines of Practice"
      lead="Targeted gut restoration and high-performance sports nutrition grounded in clinical biochemistry and tailored for real lives."
      className="core-disciplines-section"
    >
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">GUT DIGESTION.</span>
        <span className="divider-line" />
        <span className="divider-label">ATHLETIC FUELLING.</span>
      </div>

      <div className="core-case-studies-stack">
        {CORE_AREAS.map((area, idx) => {
          const bgImg = AREA_BG_IMAGES[area.id]
          const metrics = DISCIPLINE_METRICS[area.id] || []
          const isReversed = idx % 2 === 1

          return (
            <article
              key={area.id}
              className={`core-case-study-card ${isReversed ? 'layout-reversed' : ''}`}
            >
              {/* Visual Presentation Area */}
              <div className="case-study-visual-wrapper">
                {bgImg && (
                  <div className="case-study-visual-frame">
                    <img
                      src={bgImg}
                      alt={area.title}
                      className="case-study-img"
                      loading="lazy"
                    />
                    <div className="case-study-visual-overlay" aria-hidden="true" />
                    <div className="case-study-floating-badge">
                      <span className="badge-index">0{idx + 1}</span>
                      <span className="badge-divider" />
                      <span className="badge-name">{area.id === 'gut-health' ? 'GUT RESTORATION' : 'SPORTS FUELLING'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Information & Narrative Area */}
              <div className="case-study-content-wrapper">
                <div className="case-study-top-meta">
                  <div className="case-study-tag-group">
                    <span className="case-study-icon-wrap" aria-hidden="true">
                      {getIcon(area.id)}
                    </span>
                    <span className="case-study-badge-pill">{area.badge}</span>
                  </div>
                  <span className="case-study-num-indicator">(0{idx + 1} / 02)</span>
                </div>

                <div className="case-study-heading-block">
                  <h3 className="case-study-title">{area.title}</h3>
                  <span className="case-study-sub">{area.subtitle}</span>
                </div>

                <p className="case-study-desc">{area.desc}</p>

                <div className="case-study-action-row">
                  <Link to={area.to} className="case-study-cta-btn">
                    <span>{area.linkText}</span>
                    <span className="cta-icon-circle" aria-hidden="true">
                      <ArrowRight size={15} strokeWidth={2.4} />
                    </span>
                  </Link>
                </div>

                {/* 3-Column Clinical Impact Metadata Row */}
                {metrics.length > 0 && (
                  <div className="case-study-metrics-grid" aria-label="Key clinical highlights">
                    {metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="metric-col">
                        <span className="metric-number">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
