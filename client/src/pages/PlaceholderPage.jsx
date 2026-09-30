import { Link } from 'react-router-dom'
import { Sprout, ArrowRight } from 'lucide-react'
import { useSeo } from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'

export default function PlaceholderPage({ page }) {
  useSeo(page.label, page.blurb)

  return (
    <>
      <PageHero title={page.label} blurb={page.blurb} parent={page.parent} />
      
      <Section width="medium" bg="base" className="placeholder-content-section">
        {/* Information box */}
        <div className="placeholder-info-card">
          <div className="placeholder-icon" aria-hidden="true">
            <Sprout size={32} strokeWidth={2} className="text-moss" />
          </div>
          <h2 className="placeholder-heading">Comprehensive clinical protocols for {page.label}</h2>
          <p className="placeholder-desc">
            {page.blurb || `Evidence-based nutrition consultations and customized meal frameworks tailored for ${page.label}.`}
          </p>
          <div className="placeholder-features-grid">
            <div className="placeholder-feature">
              <strong>1-on-1 Consultation</strong>
              <span>Detailed medical history, symptom analysis, and routine mapping.</span>
            </div>
            <div className="placeholder-feature">
              <strong>Personalized Meal Plan</strong>
              <span>Adapted to your home kitchen, preferences, work schedules, and budget.</span>
            </div>
            <div className="placeholder-feature">
              <strong>Weekly WhatsApp Support</strong>
              <span>Real-time adjustments, dining-out guidance, and continuous progress tracking.</span>
            </div>
          </div>
        </div>

        {/* Sub-pages or related topics */}
        {page.children && page.children.length > 0 && (
          <div className="placeholder-subtopics">
            <h3 className="subtopics-title">Specialized areas within {page.label}:</h3>
            <div className="subtopics-grid">
              {page.children.map((child) => (
                <Link key={child.to} to={child.to} className="subtopic-card btn-no-underline">
                  <span className="subtopic-badge">Protocol</span>
                  <h4 className="subtopic-name">{child.label}</h4>
                  <p className="subtopic-blurb">{child.blurb}</p>
                  <div className="subtopic-action">
                    <span>Explore details</span>
                    <ArrowRight size={14} strokeWidth={2.5} className="subtopic-arrow" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      <CtaBand
        title={`Ready to start your ${page.label} consultation?`}
        text="Book a free 15-minute discovery call to discuss your personal health history."
      />
    </>
  )
}
