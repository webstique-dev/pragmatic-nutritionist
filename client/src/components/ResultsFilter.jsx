import { useState } from 'react'
import { Star, Info, TrendingUp, CheckCircle2, Award } from 'lucide-react'
import { RESULTS, RESULTS_DISCLAIMER } from '../data/site'
import Section from './Section'

const DEFAULT_CATEGORIES = ['All', 'Gut Health', 'Sports Nutrition', 'Weight Loss', 'PCOS', 'Diabetes']

export default function ResultsFilter({
  eyebrow = 'DOCUMENTED PATIENT PROGRESS',
  heading = 'Clinical Outcomes &',
  headingHighlight = 'Patient Stories',
  description = 'Real client progress across digestive recovery, sustainable metabolic health, hormonal balance, and athletic performance.',
  stats = [
    { value: '4,500+', label: 'Verified Patient Transformations' },
    { value: '4.9 / 5', label: 'Average Patient Rating', stars: true },
    { value: '100%', label: 'Personalised Care' }
  ],
  categories = DEFAULT_CATEGORIES,
  items = RESULTS,
  disclaimer = RESULTS_DISCLAIMER
}) {
  const [activeTag, setActiveTag] = useState('All')

  const filteredResults = items.filter((item) => {
    if (activeTag === 'All' || activeTag === 'ALL') return true
    return item.t.toLowerCase() === activeTag.toLowerCase()
  })

  // Featured story vs supporting stories
  const featuredItem = filteredResults.find((r) => r.featured) || filteredResults[0]
  const supportingItems = filteredResults.filter((r) => r !== featuredItem)

  return (
    <Section id="results" width="wide" bg="white" className="outcomes-editorial-section">
      {/* 1. TWO-COLUMN EDITORIAL HEADER */}
      <div className="outcomes-header-grid">
        <div className="outcomes-header-left">
          {eyebrow && (
            <div className="outcomes-eyebrow-wrap">
              <span className="outcomes-eyebrow-dot" aria-hidden="true" />
              <span className="outcomes-eyebrow">{eyebrow}</span>
            </div>
          )}
          <h2 className="outcomes-heading">
            <span className="heading-main-part">{heading}</span>
            <span className="outcomes-heading-accent">{headingHighlight}</span>
          </h2>
          <p className="outcomes-desc">{description}</p>
        </div>

        <div className="outcomes-header-right">
          <div className="clinical-data-panel" aria-label="Documented Clinical Statistics">
            <div className="data-panel-header">
              <span className="panel-badge-label">DOCUMENTED RESULTS</span>
              <Award size={14} className="panel-badge-icon" aria-hidden="true" />
            </div>
            <div className="data-panel-stats-list">
              {stats.map((stat, idx) => (
                <div key={idx} className="data-stat-row">
                  <div className="data-stat-value-group">
                    <span className="data-stat-val">{stat.value}</span>
                    {stat.stars && (
                      <span className="data-stat-stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, sIdx) => (
                          <Star key={sIdx} size={11} fill="currentColor" strokeWidth={0} />
                        ))}
                      </span>
                    )}
                  </div>
                  <span className="data-stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION STRIP (PATIENT STORIES ──── OUTCOMES) */}
      <div className="outcomes-nav-divider" aria-hidden="true">
        <span className="nav-divider-tag">PATIENT STORIES</span>
        <span className="nav-divider-line" />
        <span className="nav-divider-tag">OUTCOMES</span>
      </div>

      {/* 3. REFINED PILL FILTERS (Horizontally scrollable on mobile) */}
      <div className="outcomes-filter-scroll-wrap">
        <div className="outcomes-filter-chips" role="tablist" aria-label="Filter case studies by health category">
          {categories.map((cat) => {
            const isAll = cat.toLowerCase() === 'all'
            const count = isAll
              ? items.length
              : items.filter((r) => r.t.toLowerCase() === cat.toLowerCase()).length

            const isActive = activeTag.toLowerCase() === cat.toLowerCase()

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`outcomes-pill-chip ${isActive ? 'active' : ''} filter-chip`}
                onClick={() => setActiveTag(cat)}
              >
                <span className="chip-label">{cat}</span>
                <span className="chip-counter">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. EDITORIAL CASE STUDY PRESENTATION: 1 FEATURED + SUPPORTING STORIES */}
      <div className="outcomes-showcase-container" key={activeTag}>
        {/* Hero Featured Case Study Card */}
        {featuredItem && (
          <article className="outcomes-featured-card">
            <div className="featured-card-top-bar">
              <div className="featured-category-badge">
                <span className="category-dot" aria-hidden="true" />
                <span>{featuredItem.t.toUpperCase()}</span>
              </div>
              <div className="featured-rating-group" aria-label="5 stars rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </div>

            <div className="featured-card-body">
              {featuredItem.metric && (
                <div className="featured-metric-highlight">
                  <div className="metric-icon-wrap" aria-hidden="true">
                    <TrendingUp size={15} />
                  </div>
                  <div className="metric-text-group">
                    <span className="metric-primary-val">{featuredItem.metric}</span>
                    <span className="metric-primary-lbl">{featuredItem.metricLabel || 'Verified Outcome'}</span>
                  </div>
                </div>
              )}

              <blockquote className="featured-quote">
                "{featuredItem.quote}"
              </blockquote>
            </div>

            <div className="featured-card-footer">
              <div className="featured-author-seal">
                <span>{featuredItem.name.charAt(0)}</span>
              </div>
              <div className="featured-author-meta">
                <h3 className="featured-author-name">{featuredItem.name}</h3>
                <p className="featured-author-role">{featuredItem.role}</p>
              </div>
              <div className="featured-verified-tag">
                <CheckCircle2 size={13} strokeWidth={2.4} />
                <span>Documented Care</span>
              </div>
            </div>
          </article>
        )}

        {/* Supporting Outcome Stories Grid */}
        {supportingItems.length > 0 && (
          <div className="outcomes-supporting-grid">
            {supportingItems.map((res, idx) => (
              <article className="outcomes-supporting-card" key={res.name + idx}>
                <div className="supporting-card-header">
                  <span className="supporting-category-tag">
                    {res.t.toUpperCase()}
                  </span>
                  <span className="supporting-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                </div>

                {res.metric && (
                  <div className="supporting-outcome-badge">
                    <span className="supporting-metric-val">{res.metric}</span>
                    <span className="supporting-metric-lbl">{res.metricLabel}</span>
                  </div>
                )}

                <blockquote className="supporting-quote">
                  "{res.quote}"
                </blockquote>

                <div className="supporting-card-footer">
                  <div className="supporting-avatar-seal">
                    <span>{res.name.charAt(0)}</span>
                  </div>
                  <div className="supporting-author-meta">
                    <strong className="supporting-author-name">{res.name}</strong>
                    <span className="supporting-author-role">{res.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* 5. EDITORIAL FOOTNOTE DISCLAIMER */}
      {disclaimer && (
        <div className="outcomes-disclaimer-row">
          <Info size={14} className="disclaimer-icon" aria-hidden="true" />
          <p className="disclaimer-text">
            *{disclaimer}
          </p>
        </div>
      )}
    </Section>
  )
}
