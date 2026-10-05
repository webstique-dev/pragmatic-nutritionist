import { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Medal, Trophy, Sparkles } from 'lucide-react'
import { ATHLETES } from '../data/site'
import { useBook } from '../context/bookContext'
import Section from './Section'
import saiImg from '../assets/Sai-ameya.avif'
import charitaImg from '../assets/charita.avif'
import aahanaImg from '../assets/aahana-singh4.avif'
import dhairyaImg from '../assets/dhairya.avif'

const ATHLETE_PHOTOS = {
  'SAI AMEYA': saiImg,
  'CHARITA PHANINDRANATH': charitaImg,
  'AAHANA SINGH': aahanaImg,
  'DHAIRYA SAMAHITA NAVEEN': dhairyaImg
}

export default function Champions({
  eyebrow = 'SPORTS NUTRITION',
  headingLine1 = 'Performance',
  headingHighlight = 'That Speaks',
  description = 'Nutrition support for athletes competing at national and international events.',
  credibilityText = 'Supporting athletes from preparation to podium.',
  athletes = ATHLETES,
  ctaHeading = 'Raising a young athlete?',
  ctaDescription = 'Their nutrition matters as much as their training.',
  ctaButtonText = 'Book a Sports Nutrition Consult'
}) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)
  const openBook = useBook()

  const checkScrollLimits = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 20)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20)

    // Calculate approx current active card
    const cardWidth = el.querySelector('.athlete-showcase-card')?.offsetWidth || 340
    const newIdx = Math.round(el.scrollLeft / (cardWidth + 24))
    setCurrentIndex(Math.min(Math.max(newIdx, 0), athletes.length - 1))
  }, [athletes.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScrollLimits()
    el.addEventListener('scroll', checkScrollLimits, { passive: true })
    window.addEventListener('resize', checkScrollLimits, { passive: true })
    return () => {
      el.removeEventListener('scroll', checkScrollLimits)
      window.removeEventListener('resize', checkScrollLimits)
    }
  }, [checkScrollLimits])

  const scrollByAmount = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('.athlete-showcase-card')
    const scrollStep = card ? card.offsetWidth + 24 : 360
    el.scrollBy({ left: direction * scrollStep, behavior: 'smooth' })
  }

  // Mouse drag handlers for desktop track
  const handleMouseDown = (e) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeftState(el.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const el = scrollRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 1.5
    el.scrollLeft = scrollLeftState - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  return (
    <Section
      id="champions"
      width="full"
      bg="dark"
      className="champions-showcase-section"
    >
      <div className="champions-container">
        {/* 1. SECTION HEADER WITH TWO-COLUMN EDITORIAL COMPOSITION */}
        <div className="champions-header-row">
          <div className="champions-header-left">
            {eyebrow && (
              <div className="champions-eyebrow-pill">
                <span className="champions-eyebrow-dot" aria-hidden="true" />
                <span className="champions-eyebrow-text">{eyebrow}</span>
              </div>
            )}
            <h2 className="champions-display-title">
              <span>{headingLine1}</span>
              <span className="champions-title-accent">{headingHighlight}</span>
            </h2>
            <p className="champions-lead-desc">{description}</p>
            {credibilityText && (
              <p className="champions-credibility-note">
                <Sparkles size={13} className="credibility-icon" aria-hidden="true" />
                <span>{credibilityText}</span>
              </p>
            )}
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="champions-header-controls" aria-label="Athlete showcase navigation">
            <button
              type="button"
              className={`athlete-nav-btn prev-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous athlete"
            >
              <ArrowLeft size={18} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              className={`athlete-nav-btn next-btn ${!canScrollRight ? 'is-disabled' : ''}`}
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollRight}
              aria-label="Next athlete"
            >
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* 2. ATHLETE SHOWCASE CAROUSEL TRACK */}
        <div
          className={`athletes-scroll-track ${isDragging ? 'is-dragging' : ''}`}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          tabIndex={0}
          role="region"
          aria-label="Athlete achievements carousel"
        >
          {athletes.map((athlete, idx) => {
            const photoSrc = ATHLETE_PHOTOS[athlete.name]

            return (
              <article
                key={athlete.name}
                className="athlete-showcase-card"
                style={{ '--card-index': idx }}
              >
                {/* Dedicated Framed Image Area - 100% UN-CROPPED with object-fit: contain */}
                <div className="athlete-image-frame">
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={`${athlete.name} - ${athlete.sport} - ${athlete.tag}`}
                      className="athlete-framed-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="athlete-img-placeholder">
                      <Trophy size={48} className="placeholder-trophy" />
                    </div>
                  )}
                  <span className="athlete-sport-badge">{athlete.sport}</span>
                </div>

                {/* Structured Information Below the Image (No Overlapping Gradient on Face/Medal) */}
                <div className="athlete-info-pane">
                  <div className="athlete-category-label">
                    <span>SPORTS NUTRITION</span>
                  </div>

                  <h3 className="athlete-full-name">{athlete.name}</h3>

                  <div className="athlete-achievement-pill">
                    <Medal size={14} className="achievement-medal-icon" aria-hidden="true" />
                    <span>{athlete.tag}</span>
                  </div>

                  <p className="athlete-event-desc">{athlete.achievements}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* 3. PROGRESS INDICATOR STRIP */}
        <div className="athletes-progress-bar-row">
          <div className="athletes-counter-badge">
            <span className="counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">{String(athletes.length).padStart(2, '0')}</span>
          </div>
          <div className="athletes-progress-track" aria-hidden="true">
            <div
              className="athletes-progress-fill"
              style={{
                width: `${((currentIndex + 1) / athletes.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* 4. COMPACT YOUNG ATHLETE CTA STRIP */}
        <div className="young-athlete-cta-strip">
          <div className="young-athlete-cta-text">
            <span className="young-athlete-eyebrow">HIGH PERFORMANCE CARE</span>
            <h4 className="young-athlete-cta-title">{ctaHeading}</h4>
            <p className="young-athlete-cta-desc">{ctaDescription}</p>
          </div>
          <button
            type="button"
            className="btn-athlete-cta"
            onClick={openBook}
            aria-label={ctaButtonText}
          >
            <span>{ctaButtonText}</span>
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  )
}
