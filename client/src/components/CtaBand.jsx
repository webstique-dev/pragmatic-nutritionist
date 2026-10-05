import React from 'react'
import { MessageCircle, ArrowRight, ShieldCheck, CheckCircle2, HeartPulse } from 'lucide-react'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import Section from './Section'

export default function CtaBand({
  eyebrow = 'START YOUR JOURNEY',
  headline = 'Start With A Plan',
  headlineHighlight = 'Built Around You.',
  title, // fallback backward-compatibility
  text = 'Personalised care, evidence-led protocols, and expert guidance designed around your goals.',
  primaryCtaText = 'Book Your Free Discovery Call',
  secondaryCtaText = 'Chat on WhatsApp',
  trustStatement = 'Personalised care • Evidence-led • Available globally',
  badgeText = 'Intake Open • Limited Weekly Cohorts',
  pillars = [
    { num: '01', title: 'Root-Cause Diagnostic Review', desc: 'Comprehensive symptom, blood marker, and lifestyle mapping.' },
    { num: '02', title: 'Authentic Indian Food Protocol', desc: 'Zero starvation. Balanced, nutrient-dense everyday meals.' },
    { num: '03', title: 'Direct Weekly Guidance', desc: 'Continuous protocol iterations with WhatsApp support.' }
  ]
}) {
  const openBook = useBook()

  // Allow split headline or single title string
  const line1 = title || headline
  const line2 = title ? null : headlineHighlight

  return (
    <Section width="wide" bg="none" className="clinical-cta-section-wrapper">
      <div className="clinical-cta-panel">
        {/* Ambient atmospheric gradients */}
        <div className="clinical-cta-glow-top" aria-hidden="true" />
        <div className="clinical-cta-glow-bottom" aria-hidden="true" />

        <div className="clinical-cta-grid">
          {/* LEFT COLUMN: Editorial Narrative & Action Triggers */}
          <div className="clinical-cta-left">
            {eyebrow && (
              <div className="clinical-cta-eyebrow-wrap">
                <span className="clinical-cta-eyebrow-dot" aria-hidden="true" />
                <span className="clinical-cta-eyebrow">{eyebrow}</span>
              </div>
            )}

            <h2 className="clinical-cta-headline">
              <span className="headline-line-1">{line1}</span>
              {line2 && <span className="headline-line-2">{line2}</span>}
            </h2>

            <p className="clinical-cta-desc">{text}</p>

            <div className="clinical-cta-actions">
              <button
                type="button"
                className="clinical-btn-primary"
                onClick={openBook}
                aria-label={primaryCtaText}
              >
                <span>{primaryCtaText}</span>
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="cta-arrow-icon" />
              </button>

              <a
                className="clinical-btn-secondary"
                href={wa('Hi Meenu, I would like to explore your nutrition consultation programs.')}
                target="_blank"
                rel="noreferrer"
                aria-label={secondaryCtaText}
              >
                <MessageCircle size={16} strokeWidth={2.2} aria-hidden="true" />
                <span>{secondaryCtaText}</span>
              </a>
            </div>

            {trustStatement && (
              <div className="clinical-cta-trust-strip">
                <ShieldCheck size={14} strokeWidth={2.2} className="trust-shield-icon" aria-hidden="true" />
                <span>{trustStatement}</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Clinical Methodology & Assurance Panel */}
          <div className="clinical-cta-right">
            <div className="clinical-consultation-card">
              <div className="consultation-card-header">
                <div className="consultation-status-pill">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span className="status-label">{badgeText}</span>
                </div>
                <div className="consultation-icon-tag" aria-hidden="true">
                  <HeartPulse size={15} strokeWidth={2} />
                </div>
              </div>

              <div className="consultation-pillars-list">
                {pillars.map((item, idx) => (
                  <div key={idx} className="consultation-pillar-item">
                    <div className="pillar-num">{item.num}</div>
                    <div className="pillar-body">
                      <h4 className="pillar-title">{item.title}</h4>
                      <p className="pillar-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="consultation-card-footer">
                <div className="consultation-expert-badge">
                  <div className="expert-avatar-seal" aria-hidden="true">
                    <span>MB</span>
                  </div>
                  <div className="expert-meta">
                    <span className="expert-name">Meenu Balaji, M.Sc.</span>
                    <span className="expert-sub">Chief Clinical Nutritionist • 14+ Yrs</span>
                  </div>
                </div>
                <div className="consultation-verified-badge">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                  <span>100% Custom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
