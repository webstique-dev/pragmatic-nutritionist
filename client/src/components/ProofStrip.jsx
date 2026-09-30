import Counter from './Counter'
import Reveal from './Reveal'
import authorityLogo from '../assets/Authority_Magazine_seal_on_white.png'
import shefindsLogo from '../assets/SHEFINDS_logo_on_white_background.png'
import indianExpressLogo from '../assets/The_Indian_Express_logo_isolated.png'
import thriveLogo from '../assets/Thrive_Health___Nutrition_Logo.png'

const FEATURED_LOGOS = [
  { name: 'The Indian Express', src: indianExpressLogo, className: 'logo-indian-express' },
  { name: 'Authority Magazine', src: authorityLogo, className: 'logo-authority' },
  { name: 'SHEFINDS', src: shefindsLogo, className: 'logo-shefinds' },
  { name: 'Thrive Health & Nutrition Magazine', src: thriveLogo, className: 'logo-thrive' }
]

export default function ProofStrip() {
  return (
    <section className="proof-strip-section bg-forest" aria-label="Key metrics and media features">
      <div className="proof-container">
        {/* 4-column counter grid matching user reference */}
        <Reveal className="proof-stats-grid">
          <Counter to={14} suffix="+" label="Years" />
          <Counter to={4500} suffix="+" label="Clients" />
          <Counter to={350} suffix="+" label="Nutritionists Trained" />
          <Counter to={3} suffix=" Countries" label="UK, New Zealand, India" />
        </Reveal>

        {/* Seamless slow marquee showcasing featured media logos */}
        <div className="proof-marquee-wrap" aria-label="Media mentions and publications">
          <div className="marquee-label">AS FEATURED & QUOTED IN</div>
          <div className="marquee-track-outer">
            <div className="marquee-track">
              {[0, 1, 2, 3].map((setIdx) => (
                <div
                  key={`logo-set-${setIdx}`}
                  className="marquee-set"
                  aria-hidden={setIdx > 0 ? 'true' : undefined}
                >
                  {FEATURED_LOGOS.map((logo, idx) => (
                    <div key={`${logo.name}-${setIdx}-${idx}`} className="marquee-logo-card">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className={`marquee-logo-img ${logo.className}`}
                        loading="lazy"
                        width="160"
                        height="40"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
