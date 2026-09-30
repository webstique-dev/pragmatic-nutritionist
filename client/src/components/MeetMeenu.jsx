import { Sparkles, Trophy, CheckCircle2 } from 'lucide-react'
import { useBook } from '../context/bookContext'
import Section from './Section'
import Photo from './Photo'
import meenuPhoto from '../assets/Faithful high-resolution photo enhancement.png'

export default function MeetMeenu() {
  const openBook = useBook()

  return (
    <Section id="about-meenu" width="wide" bg="cream" className="meet-meenu-section">
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
              <div className="meenu-floating-tag float-anim-1">
                <Sparkles size={14} className="tag-sparkle text-moss" />
                <span>FOUNDER & CLINICAL SPECIALIST</span>
              </div>
            </Photo>
          </div>

          {/* Overlapping depth card with parallax float */}
          <div className="meenu-overlap-card float-anim-2">
            <div className="overlap-stat-number">14+</div>
            <div className="overlap-stat-text">
              <strong>YEARS CLINICAL PRACTICE</strong>
              <small>Specializing in gut health, child nutrition & athletic fuelling</small>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Credentials */}
        <div className="meenu-bio-content">
          <span className="section-eyebrow">MEET MEENU, M.H.Sc (Food Science & Nutrition)</span>
          <h2 className="meenu-heading">Leading Nutritionist in India for Gut Health & Sports Nutrition</h2>

          <div className="meenu-paragraphs">
            <p className="lead-meenu">
              You’re not failing at nutrition. You’re struggling to apply it consistently. Most people who work with me already know what they should be doing.
            </p>
            <p className="body-meenu">
              Yet gut symptoms keep returning, children’s food and behaviour feel overwhelming, or training results don’t match effort.
            </p>
            <p className="body-meenu">
              I’m Meenu Balaji, a clinical nutritionist in India with 14+ years of clinical practice across gut health, child nutrition, and sports nutrition. I specialise in closing the gap between knowing and doing, using science, behaviour change, and realistic food strategies. I'm a certified peer reviewer for European Journal of Nutrition and hold ICAR JRF and UGC NET JRF.
            </p>
            <p className="body-meenu">
              Pragmatic Nutrition is built for real life: non-extreme, flexible, and focused on long-term outcomes rather than quick fixes.
            </p>
          </div>

          <div className="meenu-award-card">
            <div className="award-trophy" aria-hidden="true">
              <Trophy size={28} strokeWidth={2} className="text-moss" />
            </div>
            <div className="award-text">
              <strong>BEST NUTRITIONIST & DIETITIAN AWARD 2026</strong>
              <p>Realistic Awards 2026, Chennai — alongside eminent women achievers from various fields. As featured in Republic News India.</p>
            </div>
          </div>

          <div className="meenu-badges-grid" aria-label="Credentials and achievements">
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-moss" />
              <span>REGISTERED CLINICAL NUTRITIONIST (14+ YEARS)</span>
            </div>
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-moss" />
              <span>M.H.Sc FOOD SCIENCE & NUTRITION</span>
            </div>
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-moss" />
              <span>ICAR JRF & UGC NET JRF QUALIFIED</span>
            </div>
            <div className="credential-badge">
              <CheckCircle2 size={15} strokeWidth={2.5} className="badge-bullet text-moss" />
              <span>PEER REVIEWER, EUROPEAN JOURNAL OF NUTRITION</span>
            </div>
          </div>

          <div className="meenu-cta-row">
            <button className="btn btn-primary btn-lg" onClick={openBook}>
              Talk to a Nutritionist
            </button>
            <div className="meenu-trust-note">
              <span>Personal 1-on-1 consultations via Video & WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
