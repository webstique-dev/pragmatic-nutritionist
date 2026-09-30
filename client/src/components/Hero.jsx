import { useState } from 'react'
import {
  Sprout,
  Zap,
  ArrowRight,
  MessageCircle,
  Star,
  Utensils,
  TrendingUp
} from 'lucide-react'
import { HERO } from '../data/site'
import { useBook } from '../context/bookContext'
import Photo from './Photo'
import Reveal from './Reveal'
import portraitGut from '../assets/Faithfully Enhanced Portrait.png'
import portraitSports from '../assets/Faithful high-resolution photo enhancement.png'

export default function Hero() {
  const [activeTab, setActiveTab] = useState('gut')
  const currentHero = HERO[activeTab]
  const openBook = useBook()

  return (
    <header className="hero-section">
      <div className="hero-container">
        {/* Left Column: Content & Call to Actions */}
        <Reveal className="hero-content">
          <div className="hero-toggle-wrap">
            <div className="hero-tabs" role="tablist" aria-label="Choose your nutrition focus">
              <button
                role="tab"
                aria-selected={activeTab === 'gut'}
                className={`hero-tab ${activeTab === 'gut' ? 'active' : ''}`}
                onClick={() => setActiveTab('gut')}
              >
                <Sprout className="tab-icon" size={16} strokeWidth={2.25} aria-hidden="true" />
                <span>I have gut issues</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'sports'}
                className={`hero-tab ${activeTab === 'sports' ? 'active' : ''}`}
                onClick={() => setActiveTab('sports')}
              >
                <Zap className="tab-icon" size={16} strokeWidth={2.25} aria-hidden="true" />
                <span>I'm an athlete</span>
              </button>
            </div>
          </div>

          <div className="hero-headline-wrap" key={activeTab}>
            <h1 className="hero-title">{currentHero.h}</h1>
            <p className="lead hero-sub-lead">{currentHero.sub}</p>
            <p className="hero-lead">{currentHero.p}</p>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={openBook}>
              <span>Talk to A Nutritionist</span>
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
            <a
              className="btn btn-wa btn-lg btn-no-underline"
              href="https://wa.me/919790425908?text=Hi%20Meenu%2C%20I%20would%20like%20to%20talk%20to%20a%20nutritionist."
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} strokeWidth={2.25} aria-hidden="true" />
              <span>Whatsapp Meenu</span>
            </a>
          </div>

          <div className="hero-micro-trust">
            <span className="trust-dot" />
            <span>Trusted by public figures, founders, international-level athletes, and health professionals across India and internationally.</span>
          </div>
        </Reveal>

        {/* Right Column: Full-Bleed Visual Panel with Floating Trust Badges */}
        <Reveal className="hero-visual-pane" delay={200}>
          <div className="hero-visual-inner">
            <Photo
              src={activeTab === 'sports' ? portraitSports : portraitGut}
              warm={activeTab === 'sports'}
              label="Meenu Balaji - Clinical Gut Health & Sports Nutritionist"
              className={`hero-photo-panel ${activeTab === 'sports' ? 'fade-sports' : 'fade-gut'}`}
            >
              {/* Floating Trust Chips with Parallax Float Animation */}
              <div className="floating-chip chip-top-right float-anim-1">
                <Star className="chip-icon text-moss" size={16} strokeWidth={2.25} />
                <div>
                  <strong>{activeTab === 'sports' ? 'National Champions' : '2,000+ Clients'}</strong>
                  <small>{activeTab === 'sports' ? 'Podium-proven fuelling' : 'Personalised care'}</small>
                </div>
              </div>

              <div className="floating-chip chip-bottom-left float-anim-2">
                <Utensils className="chip-icon text-moss" size={16} strokeWidth={2.25} />
                <div>
                  <strong>{activeTab === 'sports' ? 'Youth & Elite Sports' : 'Indian Food-First'}</strong>
                  <small>{activeTab === 'sports' ? 'Growth-safe protocols' : 'Zero crash diets'}</small>
                </div>
              </div>
            </Photo>
          </div>

          {/* Mobile Trust Chips Strip */}
          <div className="hero-mobile-chips" aria-label="Key Highlights">
            <div className="m-chip">
              <Star className="m-icon" size={14} strokeWidth={2.25} />
              <span>{activeTab === 'sports' ? 'National Champions' : '2,000+ Clients'}</span>
            </div>
            <div className="m-chip">
              <Utensils className="m-icon" size={14} strokeWidth={2.25} />
              <span>{activeTab === 'sports' ? 'Youth & Elite Sports' : 'Indian Food-First'}</span>
            </div>
            <div className="m-chip">
              <TrendingUp className="m-icon" size={14} strokeWidth={2.25} />
              <span>Evidence-Based</span>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
