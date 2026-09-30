import { useState } from 'react'
import { Star } from 'lucide-react'
import { RESULTS, RESULTS_DISCLAIMER } from '../data/site'
import Section from './Section'

const CATEGORIES = ['ALL', 'GUT HEALTH', 'SPORTS NUTRITION', 'WEIGHT LOSS', 'PCOS', 'DIABETES']

export default function ResultsFilter({ title = 'Real Clients Real Outcomes' }) {
  const [activeTag, setActiveTag] = useState('ALL')

  const filteredResults = RESULTS.filter((item) => {
    if (activeTag === 'ALL') return true
    return item.t.toUpperCase() === activeTag
  })

  return (
    <Section
      id="results"
      width="wide"
      bg="cream"
      eyebrow="WHAT PEOPLE SAY ABOUT WORKING WITH MEENU"
      title={title}
      lead="Real client progress tracked across digestive recovery, sustainable weight management, hormonal balance, and athletic milestones."
    >
      {/* 4500+ Verified Reviews Badge Strip */}
      <div className="results-rating-badge-wrap">
        <div className="verified-rating-pill">
          <span className="rating-stars" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="currentColor" strokeWidth={0} className="star-icon" />
            ))}
          </span>
          <span className="rating-score">5.0</span>
          <span className="rating-divider">•</span>
          <span className="rating-count">4,500+ Verified Clients</span>
        </div>
      </div>

      {/* Horizontally scrollable filter chips with hidden scrollbar */}
      <div className="results-chips-wrap">
        <div className="results-chips" role="tablist" aria-label="Filter testimonials by health goal">
          {CATEGORIES.map((tag) => {
            const count = tag === 'ALL'
              ? RESULTS.length
              : RESULTS.filter((r) => r.t.toUpperCase() === tag).length

            return (
              <button
                key={tag}
                role="tab"
                aria-selected={activeTag === tag}
                className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                <span>{tag}</span>
                <span className="chip-count">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Results Testimonial Cards */}
      <div className="results-grid" key={activeTag}>
        {filteredResults.map((res, idx) => (
          <article className="result-card" key={res.name + idx}>
            <div className="result-card-header">
              <span className="result-tag">
                {res.t.toUpperCase()}
              </span>
              <span className="result-rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </div>

            <p className="result-quote">"{res.quote}"</p>

            <div className="result-footer-client">
              <div className="client-avatar-badge" aria-hidden="true">
                {res.name.charAt(0)}
              </div>
              <div className="client-meta">
                <strong className="client-name">{res.name}</strong>
                <span className="client-role">{res.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="results-disclaimer">
        <p className="note">
          *{RESULTS_DISCLAIMER}
        </p>
      </div>
    </Section>
  )
}
