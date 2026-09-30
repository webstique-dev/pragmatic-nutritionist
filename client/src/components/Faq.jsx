import { useState } from 'react'
import { Plus, ArrowRight, MessageCircle } from 'lucide-react'
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
      bg="olive"
      tight={tight}
      className="faq-section"
    >
      <div className="faq-two-col">
        {/* Left Column: Header & Support Contact */}
        <div className="faq-left-col">
          <span className="section-eyebrow">COMMON QUESTIONS</span>
          <h2 className="faq-title">Everything you need to know</h2>
          <p className="lead">
            Clear answers about consultation formats, dietary adjustments, and timeline expectations.
          </p>

          <div className="faq-support-card">
            <h4>Have a specific medical question?</h4>
            <p>Send a quick note directly to Meenu’s team on WhatsApp for personalized clarity.</p>
            <a
              className="btn btn-primary btn-sm btn-no-underline"
              href={wa('Hi Meenu, I have a question about your gut health & sports nutrition consultations.')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} strokeWidth={2.25} />
              <span>Ask on WhatsApp</span>
              <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
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
                className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-q-${idx}`}
                >
                  <span className="faq-q-text">{q}</span>
                  <span className={`faq-icon ${isOpen ? 'rotated' : ''}`} aria-hidden="true">
                    <Plus size={18} strokeWidth={2.5} />
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
