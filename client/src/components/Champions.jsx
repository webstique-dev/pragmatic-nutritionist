import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Medal } from 'lucide-react'
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

export default function Champions() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)
  const openBook = useBook()

  const checkScrollLimits = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 20)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20)
  }, [])

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
    const cardWidth = 340
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  // Mouse drag handlers for desktop
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

  const [activeCard, setActiveCard] = useState(null)

  return (
    <Section
      id="champions"
      width="full"
      bg="cream"
      eyebrow="SPORTS NUTRITION"
      title="Performance That Speaks"
      lead="Nutrition Support for Athletes competing at National & International events"
    >
      <div className="champions-carousel-wrapper">
        {/* Carousel Navigation Buttons */}
        <div className="carousel-controls" aria-label="Carousel navigation">
          <button
            className={`carousel-btn prev-btn ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous athlete"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            className={`carousel-btn next-btn ${!canScrollRight ? 'disabled' : ''}`}
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollRight}
            aria-label="Next athlete"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div
          className={`champions-track ${isDragging ? 'is-dragging' : ''}`}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          tabIndex={0}
          role="region"
          aria-label="Athletes carousel"
        >
          {ATHLETES.map((champ, idx) => {
            const photoSrc = ATHLETE_PHOTOS[champ.name]

            return (
              <article
                key={champ.name}
                className={`champion-card ${activeCard === champ.name ? 'is-active' : ''}`}
                style={{ '--card-idx': idx }}
                onClick={() => setActiveCard(activeCard === champ.name ? null : champ.name)}
                tabIndex={0}
              >
                {/* Athlete Photo Wrap */}
                <div className="champion-img-wrap">
                  {photoSrc && (
                    <img
                      src={photoSrc}
                      alt={`${champ.name} - ${champ.sport}`}
                      className="champion-img"
                      loading="lazy"
                    />
                  )}
                  <span className="champion-badge">{champ.sport}</span>
                </div>

                {/* Athlete Card Details */}
                <div className="champion-body">
                  <div className="champion-header-row">
                    <h3 className="champion-name">{champ.name}</h3>
                    <div className="champion-icon-wrap" aria-hidden="true">
                      <Medal size={20} strokeWidth={2} className="text-moss-light" />
                    </div>
                  </div>
                  <span className="champion-tag-sub">{champ.tag}</span>
                  <div className="champion-blurb-wrap">
                    <div className="champion-blurb-inner">
                      <p className="champion-blurb">{champ.achievements}</p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Young Athlete Nutrition Callout */}
        <div className="champions-young-athlete-band">
          <div className="young-athlete-content">
            <h4 className="young-athlete-title">Raising a young athlete?</h4>
            <p className="young-athlete-desc">Their nutrition matters as much as their training.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={openBook}>
            <span>Book a Sports Nutrition Consult</span>
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  )
}
