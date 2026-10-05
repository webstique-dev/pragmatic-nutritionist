import { useState } from 'react'
import {
  Sprout,
  Zap,
  Activity,
  Utensils,
  ArrowRight,
  ChevronDown
} from 'lucide-react'
import { useBook } from '../context/bookContext'
import Reveal from './Reveal'
import capsuleImg from '../assets/capsule.png'
import lifestyleImg from '../assets/hero-wellness-lifestyle.jpg'

const PILLARS = [
  {
    id: '01',
    num: '(01)',
    title: 'Clinical Gut Health',
    icon: Sprout,
    colorClass: 'text-primary',
    numColor: 'var(--color-primary)',
    details: 'Root-cause protocols for IBS, chronic bloating, acidity, GERD, constipation, and SIBO without extreme elimination diets.'
  },
  {
    id: '02',
    num: '(02)',
    title: 'Sports Nutrition',
    icon: Zap,
    colorClass: 'text-secondary',
    numColor: 'var(--color-secondary)',
    details: 'Match-day fuelling, endurance strategies, body composition, and recovery for teen, competitive, and national athletes.'
  },
  {
    id: '03',
    num: '(03)',
    title: 'Metabolic & Hormonal Care',
    icon: Activity,
    colorClass: 'text-primary',
    numColor: 'var(--color-primary)',
    details: 'Targeted biomarker nutrition for PCOS, Type-2 Diabetes reversal, thyroid balance, and sustainable metabolic fat loss.'
  },
  {
    id: '04',
    num: '(04)',
    title: 'Everyday Indian Food',
    icon: Utensils,
    colorClass: 'text-secondary',
    numColor: 'var(--color-secondary)',
    details: 'No generic crash diets. Every plan is rooted in your home kitchen—dal, rice, roti, sambar, and authentic regional cooking.'
  }
]

export default function Hero() {
  const [expandedPillar, setExpandedPillar] = useState('01')
  const openBook = useBook()

  const togglePillar = (id) => {
    setExpandedPillar(expandedPillar === id ? null : id)
  }

  return (
    <section className="hero-editorial-section" aria-label="Welcome to Pragmatic Nutrition">
      {/* SVG ClipPath Definition for the Irregular Organic Pebble/Cloud Shape */}
      <svg width="0" height="0" className="svg-mask-defs" aria-hidden="true">
        <defs>
          <clipPath id="organic-lifestyle-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0.06,0.54 C 0.01,0.64 0.02,0.76 0.08,0.85 C 0.16,0.96 0.34,0.98 0.54,0.96 C 0.74,0.94 0.90,0.89 0.96,0.76 C 1.01,0.65 0.98,0.48 0.92,0.36 C 0.86,0.24 0.78,0.08 0.65,0.08 C 0.55,0.08 0.50,0.22 0.44,0.24 C 0.36,0.26 0.30,0.15 0.20,0.18 C 0.10,0.21 0.07,0.36 0.06,0.54 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-editorial-container">
        {/* Left Panel (approx 44% width): Sage background, cropped decorative HEALTH letters, floating capsule whole foods, editorial caption */}
        <div className="hero-left-panel">
          {/* Huge pale decorative lettering cropped behind the imagery */}
          <div className="hero-decorative-letters" aria-hidden="true">
            <span className="dec-letter dec-h">H</span>
            <span className="dec-letter dec-e">E</span>
            <span className="dec-letter dec-a">A</span>
            <span className="dec-letter dec-l">L</span>
            <span className="dec-letter dec-t">T</span>
            <span className="dec-letter dec-h2">H</span>
          </div>

          {/* Central Nutrition Whole-Foods Cutout Composition */}
          <div className="hero-capsule-wrapper">
            <div className="hero-capsule-card">
              <img
                src={capsuleImg}
                alt="Whole food nutrition capsule with fresh broccoli, red onion, strawberries, lime, and basil"
                className="hero-capsule-img"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Bottom Italic Editorial Caption */}
          <div className="hero-left-caption">
            <p className="editorial-italic-caption">
              Nutrition That Delivers Results
            </p>
          </div>
        </div>

        {/* Right Panel (approx 56% width): Oversized olive headline, thin divider, organic lifestyle shape, intro & 4 pillars */}
        <div className="hero-right-panel">
          {/* Oversized Olive-Green Serif Headline */}
          <header className="hero-right-header">
            <h1 className="hero-editorial-headline">
              Wellness <em>Walk</em>
            </h1>
          </header>

          {/* Thin Horizontal Divider with Opposing Small Labels */}
          <div className="hero-divider-row" aria-hidden="true">
            <span className="divider-label">GOALS.</span>
            <span className="divider-line" />
            <span className="divider-label">HEALTH.</span>
          </div>

          {/* Lifestyle Photograph in Irregular Organic Pebble Shape */}
          <div className="hero-organic-image-wrap">
            <div className="hero-organic-mask-container">
              <img
                src={lifestyleImg}
                alt="Smiling woman enjoying vibrant, fresh kitchen whole foods"
                className="hero-organic-photo"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Lower Content Grid: 4 Pillars of Nutrition */}
          <div className="hero-pillars-grid">
            {/* Left Sub-column: Editorial Title & Description */}
            <div className="hero-pillars-intro">
              <h2 className="pillars-main-title">
                Our 4 Pillars <em>Of Clinical Care</em>
              </h2>
              <p className="pillars-intro-text">
                Evidence-based protocols built around your body&apos;s symptoms, biochemistry, and authentic Indian home meals.
              </p>
              <div className="hero-pillars-action">
                <button
                  type="button"
                  className="btn-editorial-text"
                  onClick={openBook}
                  aria-label="Book a consultation with Meenu Balaji"
                >
                  <span>Start Your Personal Plan</span>
                  <ArrowRight size={15} strokeWidth={2.25} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Sub-column: 4 Numbered Feature Rows with Fine Separators & Working Accordions */}
            <div className="hero-pillars-list" role="region" aria-label="Four Core Pillars of Nutrition">
              {PILLARS.map((pillar) => {
                const IconComponent = pillar.icon
                const isExpanded = expandedPillar === pillar.id

                return (
                  <div key={pillar.id} className={`pillar-row-item ${isExpanded ? 'is-expanded' : ''}`}>
                    <button
                      type="button"
                      className="pillar-row-button"
                      onClick={() => togglePillar(pillar.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`pillar-detail-${pillar.id}`}
                    >
                      <div className="pillar-row-left">
                        <span className="pillar-num" style={{ color: pillar.numColor }}>{pillar.num}</span>
                        <span className="pillar-title">{pillar.title}</span>
                      </div>
                      <div className="pillar-row-right">
                        <IconComponent size={16} strokeWidth={2.2} className={`pillar-icon ${pillar.colorClass}`} aria-hidden="true" />
                        <ChevronDown size={14} strokeWidth={2} className={`pillar-chevron ${isExpanded ? 'open' : ''}`} aria-hidden="true" />
                      </div>
                    </button>

                    {/* Expandable Accordion Body */}
                    <div
                      id={`pillar-detail-${pillar.id}`}
                      className={`pillar-content-collapse ${isExpanded ? 'expanded' : ''}`}
                      role="region"
                      aria-labelledby={`pillar-heading-${pillar.id}`}
                    >
                      <div className="pillar-content-inner">
                        <p>{pillar.details}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
