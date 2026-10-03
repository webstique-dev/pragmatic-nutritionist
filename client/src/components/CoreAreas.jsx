import { Link } from 'react-router-dom'
import { Sprout, Zap, ArrowRight } from 'lucide-react'
import { CORE_AREAS } from '../data/site'
import Section from './Section'
import gutImg from '../assets/Gut-health.avif'
import sportsImg from '../assets/sports-nutrotionist.avif'

const AREA_BG_IMAGES = {
  'gut-health': gutImg,
  'sports-nutrition': sportsImg
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
      bg="warm"
      eyebrow="CLINICAL PILLARS"
      title="Two Core Disciplines of Practice"
      lead="Targeted gut restoration and high-performance sports nutrition grounded in clinical biochemistry and tailored for real lives."
    >
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">GUT DIGESTION.</span>
        <span className="divider-line" />
        <span className="divider-label">ATHLETIC FUELLING.</span>
      </div>

      <div className="core-areas-grid">
        {CORE_AREAS.map((area, idx) => {
          const bgImg = AREA_BG_IMAGES[area.id]

          return (
            <article key={area.id} className="core-area-editorial-card">
              <div className="core-card-header">
                <span className="core-card-num">(0{idx + 1})</span>
                <span className="core-badge">{area.badge}</span>
                <span className="core-icon-pill" aria-hidden="true">{getIcon(area.id)}</span>
              </div>

              {bgImg && (
                <div className="core-card-media-wrap">
                  <img
                    src={bgImg}
                    alt=""
                    className="core-card-media-img"
                    aria-hidden="true"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="core-card-text-block">
                <h3 className="core-card-title">{area.title}</h3>
                <span className="core-card-sub">{area.subtitle}</span>
                <p className="core-card-desc">{area.desc}</p>
              </div>

              <div className="core-card-footer">
                <Link to={area.to} className="btn-editorial-text btn-no-underline">
                  <span>{area.linkText}</span>
                  <ArrowRight size={15} strokeWidth={2.25} className="core-arrow" aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
