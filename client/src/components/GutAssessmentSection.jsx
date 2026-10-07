import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  HeartPulse,
  Flame,
  CheckCircle2,
  Clock,
  Droplet
} from 'lucide-react'
import Section from './Section'

const SAMPLE_SYMPTOMS = [
  { id: 'bloating', name: 'Bloating & Fullness', defaultScore: 2, icon: '🫧' },
  { id: 'acidity', name: 'Acidity, Heartburn & GERD', defaultScore: 1, icon: '🔥' },
  { id: 'constipation', name: 'Constipation & Irregular Digestion', defaultScore: 2, icon: '🌿' },
  { id: 'brain_fog', name: 'Post-Meal Brain Fog & Fatigue', defaultScore: 1, icon: '⚡' }
]

const SEVERITY_LEVELS = ['Never', 'Sometimes', 'Often', 'Always']

export default function GutAssessmentSection() {
  const [selectedScores, setSelectedScores] = useState({
    bloating: 2,
    acidity: 1,
    constipation: 2,
    brain_fog: 1
  })

  const handleSelectSeverity = (id, scoreIdx) => {
    setSelectedScores((prev) => ({
      ...prev,
      [id]: scoreIdx
    }))
  }

  // Calculate live preview score from sample items
  const totalPoints = Object.values(selectedScores).reduce((a, b) => a + b, 0)
  const previewScore = Math.max(38, Math.round(100 - (totalPoints / (SAMPLE_SYMPTOMS.length * 3)) * 60))

  const scoreStatus =
    previewScore >= 80
      ? { label: 'Optimal Gut Balance', color: 'var(--color-primary)', bg: 'rgba(14, 98, 88, 0.1)', desc: 'Mild symptoms manageable with subtle kitchen adjustments.' }
      : previewScore >= 60
      ? { label: 'Moderate Sensitivity', color: 'var(--color-secondary)', bg: 'rgba(192, 113, 48, 0.1)', desc: 'Clear warning signs present. Targeted food-first protocols advised.' }
      : { label: 'High Distress Level', color: '#b91c1c', bg: 'rgba(185, 28, 28, 0.1)', desc: 'Chronic digestive stress. Clinical root-cause intervention recommended.' }

  return (
    <Section id="gut-assessment" width="wide" bg="base" className="gut-assessment-section">
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">SELF ASSESSMENT.</span>
        <span className="divider-line" />
        <span className="divider-label">GUT HEALTH AUDIT.</span>
      </div>

      <div className="gut-assessment-grid">
        {/* Left Column: Editorial Information & Benefits */}
        <div className="gut-assessment-intro">
          <div className="section-eyebrow-pill">
            <Sparkles size={13} className="eyebrow-icon" aria-hidden="true" />
            <span>CLINICAL SELF-ASSESSMENT • 3-MINUTE AUDIT</span>
          </div>

          <h2 className="gut-assessment-heading">
            Free Clinical <em>Gut Health Assessment</em>
          </h2>

          <p className="gut-assessment-lead">
            Evaluate your digestive biochemistry, track your symptom patterns, and get an instant Gut Balance Score with personalized food-first guidance by Meenu Balaji.
          </p>

          <div className="gut-assessment-pillars">
            <div className="gut-pillar-item">
              <div className="gut-pillar-icon">
                <Activity size={18} />
              </div>
              <div className="gut-pillar-text">
                <strong>9 Symptom Biomarkers Analyzed</strong>
                <p>Covers bloating, GERD, constipation, food cravings, energy drops, and gut-brain signals.</p>
              </div>
            </div>

            <div className="gut-pillar-item">
              <div className="gut-pillar-icon">
                <HeartPulse size={18} />
              </div>
              <div className="gut-pillar-text">
                <strong>Instant Emotional & Clinical Score</strong>
                <p>Visual 0–100 vitality rating with symptom severity breakdown and trigger classification.</p>
              </div>
            </div>

            <div className="gut-pillar-item">
              <div className="gut-pillar-icon">
                <CheckCircle2 size={18} />
              </div>
              <div className="gut-pillar-text">
                <strong>Indian Kitchen Action Plan</strong>
                <p>Evidence-based dietary recommendations built around dal, rice, roti, and home meals.</p>
              </div>
            </div>
          </div>

          <div className="gut-assessment-actions">
            <Link to="/gut-health-checker" className="gut-primary-cta-btn">
              <span>Start Full Gut Assessment</span>
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            <div className="gut-cta-meta">
              <Clock size={14} className="meta-icon" />
              <span>Takes ~3 mins • 100% Free • No sign-up required to calculate</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Assessment Preview Widget */}
        <div className="gut-assessment-widget-wrap">
          <div className="gut-preview-card">
            <div className="preview-card-header">
              <div className="preview-header-left">
                <span className="preview-tag">INTERACTIVE PREVIEW</span>
                <h3 className="preview-card-title">Test Sample Symptoms</h3>
              </div>
              <div className="preview-score-badge" style={{ backgroundColor: scoreStatus.bg, color: scoreStatus.color }}>
                <span className="score-num">{previewScore}</span>
                <span className="score-denom">/100</span>
              </div>
            </div>

            <p className="preview-instruction">
              Select your typical frequency for these common digestive symptoms:
            </p>

            {/* Interactive Symptom Rows */}
            <div className="preview-symptoms-list">
              {SAMPLE_SYMPTOMS.map((sym) => {
                const currentVal = selectedScores[sym.id]
                return (
                  <div key={sym.id} className="preview-symptom-row">
                    <div className="sym-row-header">
                      <span className="sym-icon" aria-hidden="true">{sym.icon}</span>
                      <span className="sym-name">{sym.name}</span>
                    </div>
                    <div className="sym-severity-buttons" role="group" aria-label={`Frequency for ${sym.name}`}>
                      {SEVERITY_LEVELS.map((level, idx) => {
                        const isSelected = currentVal === idx
                        return (
                          <button
                            key={level}
                            type="button"
                            className={`sym-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => handleSelectSeverity(sym.id, idx)}
                          >
                            {level}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dynamic Status Preview Banner */}
            <div className="preview-result-banner" style={{ borderColor: scoreStatus.color }}>
              <div className="result-banner-top">
                <strong style={{ color: scoreStatus.color }}>{scoreStatus.label}</strong>
                <span className="result-indicator-dot" style={{ backgroundColor: scoreStatus.color }} />
              </div>
              <p className="result-banner-desc">{scoreStatus.desc}</p>
            </div>

            {/* Direct Launch CTA */}
            <Link to="/gut-health-checker" className="preview-launch-cta">
              <span>Complete Full 9-Question Assessment</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
