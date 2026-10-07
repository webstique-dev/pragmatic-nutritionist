import { useState } from 'react'
import { Plus, ArrowRight } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { FAQ, wa } from '../data/site'
import Section from './Section'

export default function Faq({ tight }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <Section
      id="faq"
      width="wide"
      bg="brand"
      tight={tight}
      className="faq-section"
    >
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">INQUIRIES.</span>
        <span className="divider-line" />
        <span className="divider-label">CLARITY.</span>
      </div>

      <div className="faq-two-col">
        {/* Left Column: Header & Support Contact */}
        <div className="faq-left-col">
          <span className="section-eyebrow">FREQUENTLY ASKED</span>
          <h2 className="faq-title">
            Answers for <em>Your Peace of Mind</em>
          </h2>
          <p className="lead">
            Transparent insights into consultation workflows, food philosophies, and timeline expectations.
          </p>

          <div className="faq-support-card">
            <h4>Have a specific medical or dietary question?</h4>
            <p>Send a note directly to Meenu on WhatsApp for immediate guidance.</p>
            <a
              className="btn-editorial-text btn-no-underline"
              href={wa('Hi Meenu, I have a question about your gut health & sports nutrition consultations.')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={16} />
              <span>Ask Meenu on WhatsApp</span>
              <ArrowRight size={14} strokeWidth={2.25} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Column: Accordion List with CSS Grid expansion */}
        <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions">
          {FAQ.map(([q, a], idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={q}
                className={`faq-editorial-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-q-${idx}`}
                >
                  <div className="faq-q-left">
                    <span className="faq-num">(0{idx + 1})</span>
                    <span className="faq-q-text">{q}</span>
                  </div>
                  <span className={`faq-icon ${isOpen ? 'rotated' : ''}`} aria-hidden="true">
                    <Plus size={16} strokeWidth={2.2} />
                  </span>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  className="faq-answer-collapse"
                  role="region"
                  aria-labelledby={`faq-q-${idx}`}
                >
                  <div className="faq-answer-inner">
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
