import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import meenuPortrait from '../assets/Faithfully Enhanced Portrait.png'

export default function Hero() {
  const openBook = useBook()

  return (
    <section className="hero-editorial-section" aria-label="Welcome to Pragmatic Nutrition by Meenu Balaji">
      <div className="hero-editorial-container">
        {/* Left Editorial Content Column */}
        <div className="hero-editorial-content">
          {/* Eyebrow badge */}
          <div className="hero-eyebrow-pill" aria-label="Clinical focus areas">
            <Sparkles size={14} className="eyebrow-icon" aria-hidden="true" />
            <span>CLINICAL NUTRITION • GUT HEALTH • SPORTS NUTRITION</span>
          </div>

          {/* Main Heading with selective emphasis on Gut Health and Sports Nutrition */}
          <h1 className="hero-editorial-h1">
            Meenu Balaji-Best Online Nutritionist in India for{' '}
            <span className="hero-accent-text">Gut Health</span> and{' '}
            <span className="hero-accent-text">Sports Nutrition</span>
          </h1>

          {/* Primary Supporting Statement */}
          <p className="hero-primary-lead">
            From Gut recovery to peak performance: personalised plans built on real clinical expertise
          </p>

          {/* Secondary Statement */}
          <p className="hero-secondary-desc">
            No generic charts, no extreme diets. A nutrition plan built around Indian food, your symptoms, and your goals.
          </p>

          {/* CTA Actions */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-primary-cta-btn"
              onClick={openBook}
              aria-label="Talk to A Nutritionist"
            >
              <span>Talk to A Nutritionist</span>
              <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>

            <a
              href={wa('Hi Meenu, I would like to consult with you about personalised gut health and sports nutrition.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-secondary-cta-btn"
              aria-label="Whatsapp Meenu"
            >
              <WhatsAppIcon size={18} />
              <span>Whatsapp Meenu</span>
            </a>
          </div>

          {/* Subtle Clinical Trust & Expertise Markers */}
          <div className="hero-trust-bar" role="region" aria-label="Clinical credentials and experience">
            <div className="hero-trust-item">
              <span className="trust-num">14+</span>
              <span className="trust-label">Years Clinical Practice</span>
            </div>
            <div className="hero-trust-divider" aria-hidden="true" />
            <div className="hero-trust-item">
              <span className="trust-num">4,500+</span>
              <span className="trust-label">Clients Guided Worldwide</span>
            </div>
            <div className="hero-trust-divider" aria-hidden="true" />
            <div className="hero-trust-item">
              <span className="trust-num">India • UK • NZ</span>
              <span className="trust-label">Global Consultations</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Portrait Presentation */}
        <div className="hero-editorial-visual">
          <div className="hero-portrait-card">
            {/* Subtle background ambient graphic frame */}
            <div className="portrait-backdrop-frame" aria-hidden="true" />
            
            {/* Meenu Balaji Portrait Frame */}
            <div className="portrait-image-wrapper">
              <img
                src={meenuPortrait}
                alt="Meenu Balaji, Clinical Nutritionist specialising in Gut Health and Sports Nutrition"
                className="portrait-main-img"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Floating Editorial Practitioner Card */}
            <div className="portrait-floating-badge" aria-label="Founder credentials">
              <div className="floating-badge-icon" aria-hidden="true">
                <ShieldCheck size={18} />
              </div>
              <div className="floating-badge-text">
                <strong className="badge-name">Meenu Balaji, M.H.Sc</strong>
                <span className="badge-role">Founder • Clinical Nutritionist</span>
              </div>
            </div>

            {/* Subtle secondary clinical tag */}
            <div className="portrait-secondary-tag" aria-hidden="true">
              <CheckCircle2 size={13} className="tag-check" />
              <span>Root-Cause Indian Nutrition</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
