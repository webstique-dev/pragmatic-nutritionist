import { Sparkles, Trophy, CheckCircle2, ArrowRight } from 'lucide-react'
import { useBook } from '../context/bookContext'
import Section from './Section'
import Photo from './Photo'
import meenuPhoto from '../assets/Faithful high-resolution photo enhancement.png'

export default function MeetMeenu() {
  const openBook = useBook()

  return (
    <Section id="about-meenu" width="wide" bg="brand" className="meet-meenu-section">
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">CLINICAL FOUNDER.</span>
        <span className="divider-line" />
        <span className="divider-label">CREDENTIALS.</span>
      </div>

      <div className="meet-meenu-grid">
        {/* Left Column: Portrait with overlapping stats badge */}
        <div className="meenu-portrait-wrap">
          <div className="meenu-portrait-frame">
            <Photo
              src={meenuPhoto}
              label="Meenu Balaji - Registered Clinical Nutritionist"
              className="meenu-photo"
              aspectRatio="4/5"
            >
              <div className="meenu-floating-tag">
                <Sparkles size={14} className="tag-sparkle text-primary" />
                <span>FOUNDER & CLINICAL SPECIALIST</span>
              </div>
            </Photo>
          </div>

          <div className="meenu-overlap-card">
            <div className="overlap-stat-number">14+</div>
            <div className="overlap-stat-text">
              <strong>YEARS CLINICAL PRACTICE</strong>
              <small>Specializing in gut health, child nutrition & athletic fuelling</small>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Credentials & Award Feature */}
        <div className="meenu-bio-content">
          <span className="section-eyebrow">Meet Meenu Balaji &bull; M.H.Sc (Food Science &amp; Nutrition)</span>
          <h2 className="meenu-heading">
            Clinical Care Grounded in <span className="nowrap-text"><em>Real&#8209;Life Practice</em></span>
          </h2>

          <div className="meenu-paragraphs">
            <p className="lead-meenu">
              You are not failing at nutrition. You are struggling to apply generic templates to a complex life.
            </p>
            <p className="body-meenu">
              With 14+ years of clinical practice across India, the UK, and New Zealand, I bridge the gap between rigorous clinical biochemistry and everyday home cooking.
            </p>
          </div>

          <div className="meenu-award-card">
            <div className="award-trophy" aria-hidden="true">
              <Trophy size={24} strokeWidth={2} className="text-secondary" />
            </div>
            <div className="award-text">
              <div className="award-header-row">
                <strong>BEST NUTRITIONIST &amp; DIETITIAN AWARD 2026</strong>
                <span className="award-badge-pill">9th Edition Realistic Awards</span>
              </div>
              <p>Honoured at Chennai for pioneering evidence-based gut health protocols and adolescent sports nutrition frameworks.</p>
              <a
                href="https://republicnewsindia.com/9th-edition-realistic-awards-2026-an-evening-celebrating-the-power-and-grace-of-womanhood/"
                target="_blank"
                rel="noopener noreferrer"
                className="award-press-link"
              >
                <span>Read Feature on Republic News India</span>
                <ArrowRight size={13} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          <div className="meenu-badges-grid" aria-label="Credentials and achievements">
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-primary" />
              <span>Registered Clinical Nutritionist (14+ Years)</span>
            </div>
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-primary" />
              <span>M.H.Sc Food Science &amp; Nutrition</span>
            </div>
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-primary" />
              <span>ICAR JRF &amp; UGC NET JRF Qualified</span>
            </div>
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-primary" />
              <span>Peer Reviewer, European Journal of Nutrition</span>
            </div>
          </div>

          <div className="meenu-cta-row">
            <button type="button" className="btn-editorial-text" onClick={openBook}>
              <span>Talk to Meenu Balaji</span>
              <ArrowRight size={15} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <span className="meenu-trust-note">Personal 1-on-1 consultations via Video &amp; WhatsApp</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
