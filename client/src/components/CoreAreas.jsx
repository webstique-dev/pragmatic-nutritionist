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
    if (id === 'gut-health') return <Sprout size={22} strokeWidth={2.2} />
    return <Zap size={22} strokeWidth={2.2} />
  }

  return (
    <Section
      id="core-areas"
      width="wide"
      bg="olive"
      eyebrow="SPECIALIZED CLINICAL EXPERTISE"
      title="Two Core Areas of Gut & Sports Nutrition"
      lead="Evidence-based dietary frameworks designed for long-term digestive comfort and peak athletic conditioning."
    >
      <div className="core-areas-grid">
        {CORE_AREAS.map((area) => {
          const bgImg = AREA_BG_IMAGES[area.id]

          return (
            <article key={area.id} className="core-area-card">
              {/* Background Image Container with Overlay */}
              {bgImg && (
                <div className="core-card-bg-wrap">
                  <img
                    src={bgImg}
                    alt=""
                    className="core-card-bg-img"
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <div className="core-card-overlay" />
                </div>
              )}

              {/* Card Foreground Content */}
              <div className="core-card-content">
                <div className="core-card-header">
                  <span className="core-badge">{area.badge}</span>
                  <span className="core-icon-pill" aria-hidden="true">{getIcon(area.id)}</span>
                </div>

                <div className="core-card-text-block">
                  <h3 className="core-card-title">{area.title}</h3>
                  <span className="core-card-sub">{area.subtitle}</span>
                  <p className="core-card-desc">{area.desc}</p>
                </div>

                <div className="core-card-footer">
                  <Link to={area.to} className="btn btn-primary btn-core-cta btn-no-underline">
                    <span>{area.linkText}</span>
                    <ArrowRight size={16} strokeWidth={2.5} className="core-arrow" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
