import { Award, Trophy, ExternalLink, Sparkles } from 'lucide-react'
import Section from './Section'
import awardPhoto from '../assets/9th-Edition-–-Realistic-Awards-2026-An-Evening-Celebrating-the-Power-and-Grace-of-Womanhood.jpeg'

export default function AwardRecognition() {
  const articleUrl =
    'https://republicnewsindia.com/9th-edition-realistic-awards-2026-an-evening-celebrating-the-power-and-grace-of-womanhood/'

  return (
    <Section
      id="award-recognition"
      width="wide"
      bg="olive"
      eyebrow="NATIONAL RECOGNITION & HONOURS"
      title="Celebrated at Realistic Awards 2026"
      lead="Honouring clinical impact, evidence-based nutrition protocols, and leadership in healthcare."
    >
      <div className="award-showcase-card">
        {/* Left Column: Ceremony Photo Frame */}
        <div className="award-photo-container">
          <div className="award-photo-frame">
            <img
              src={awardPhoto}
              alt="Meenu Balaji presented with Best Nutritionist & Dietitian Award at Realistic Awards 2026 Chennai"
              className="award-photo-img"
              loading="lazy"
            />
            <div className="award-photo-badge">
              <Trophy size={16} className="text-moss" aria-hidden="true" />
              <span>Realistic Awards 2026 • Chennai</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial & Press Story */}
        <div className="award-details-content">
          <div className="award-pill-row">
            <span className="award-category-pill">
              <Award size={15} strokeWidth={2.5} aria-hidden="true" />
              <span>9TH EDITION REALISTIC AWARDS</span>
            </span>
            <span className="award-edition-pill">
              <Sparkles size={14} aria-hidden="true" />
              <span>WOMEN ACHIEVERS</span>
            </span>
          </div>

          <h3 className="award-card-title">
            Best Nutritionist &amp; Dietitian Award
          </h3>

          <p className="award-card-lead">
            Meenu Balaji was presented with the <strong>Best Nutritionist &amp; Dietitian Award: Realistic Awards 2026, Chennai</strong>. Alongside eminent women achievers from various fields. As featured in <strong>Republic News India</strong>.
          </p>

          <p className="award-card-body">
            Recognised for pioneering evidence-based gut health protocols, adolescent sports nutrition frameworks, and 14+ years of clinical practice across India, the UK, and New Zealand.
          </p>

          <div className="award-action-row">
            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-award-link"
            >
              <span>Read Full Feature on Republic News India</span>
              <ExternalLink size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <span className="award-citation-tag">As featured in Republic News India</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
