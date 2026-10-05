import { useState } from 'react'
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  MessageCircle
} from 'lucide-react'
import { QUIZ, GOALS, wa } from '../data/site'
import Section from './Section'

export default function Checker() {
  const [i, setI] = useState(0)
  const [pts, setPts] = useState([])
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({ name: '', phone: '', goal: GOALS[0] })

  const done = i >= QUIZ.length
  const total = pts.reduce((a, b) => a + b, 0)
  const score = Math.round(100 - (total / (QUIZ.length * 2)) * 70)
  const band =
    score >= 80
      ? 'Your gut is functioning well. Subtle dietary refinements can prevent future imbalances.'
      : score >= 55
      ? 'Your gut is showing clear warning signs. Addressing triggers now prevents chronic distress.'
      : 'Your gut is under significant stress. A structured, food-first clinical protocol is strongly advised.'

  const bandColor = score >= 80 ? 'var(--color-primary)' : score >= 55 ? 'var(--color-primary-hover)' : 'var(--color-secondary)'
  const circumference = 2 * Math.PI * 46
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Section id="checker" width="wide" bg="white" className="checker-section">
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">SELF ASSESSMENT.</span>
        <span className="divider-line" />
        <span className="divider-label">GUT SCORE.</span>
      </div>

      <div className="checker-two-col">
        {/* Left Column: Context & Benefits */}
        <div className="checker-info-col">
          <span className="section-eyebrow">FREE CLINICAL AUDIT</span>
          <h2 className="checker-heading">
            Evaluate Your <em>Digestive Vitality</em>
          </h2>
          <p className="lead">
            Gain immediate clarity on digestive triggers, bloating patterns, and metabolic warning signs with our evidence-based 5-question audit.
          </p>

          <div className="checker-benefits-list">
            <div className="benefit-item">
              <CheckCircle2 size={18} strokeWidth={2.25} className="benefit-check text-primary" aria-hidden="true" />
              <div>
                <strong>100% TAILORED TO INDIAN FOOD</strong>
                <p>Rooted in everyday home meals like dal, roti, rice, sambar, curd, and millets.</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckCircle2 size={18} strokeWidth={2.25} className="benefit-check text-primary" aria-hidden="true" />
              <div>
                <strong>NO RESTRICTIVE CRASH DIETS</strong>
                <p>We identify true trigger foods rather than cutting out entire food groups blindly.</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckCircle2 size={18} strokeWidth={2.25} className="benefit-check text-primary" aria-hidden="true" />
              <div>
                <strong>DIRECT CLINICAL INSIGHTS</strong>
                <p>Designed with clinical evidence and 14+ years of gut health expertise by Meenu Balaji.</p>
              </div>
            </div>
          </div>

          <div className="checker-quick-badge">
            <Clock size={16} strokeWidth={2.25} className="badge-icon text-primary" aria-hidden="true" />
            <span>Takes under 1 minute • 100% Free & Confidential</span>
          </div>
        </div>

        {/* Right Column: Quiz Card */}
        <div className="checker-card-col">
          <div className="checker-card">
            {/* Step Progress Bar */}
            <div className="checker-progress-bar" role="progressbar" aria-valuenow={i} aria-valuemin="0" aria-valuemax={QUIZ.length}>
              <div
                className="checker-progress-fill"
                style={{ width: `${(Math.min(i, QUIZ.length) / QUIZ.length) * 100}%` }}
              />
            </div>

            {!done ? (
              <div className="quiz-step" key={i}>
                <div className="step-count-header">
                  <span className="step-counter">QUESTION {i + 1} OF {QUIZ.length}</span>
                  <span className="step-percent">{Math.round((i / QUIZ.length) * 100)}% COMPLETE</span>
                </div>

                <h3 className="quiz-question">{QUIZ[i][0]}</h3>

                <div className="quiz-options">
                  {QUIZ[i][1].map((option, optIdx) => (
                    <button
                      key={option}
                      className="quiz-option-btn"
                      onClick={() => {
                        setPts([...pts, optIdx])
                        setI(i + 1)
                      }}
                    >
                      <span className="option-marker">{String.fromCharCode(65 + optIdx)}</span>
                      <span className="option-text">{option}</span>
                      <ArrowRight className="option-arrow" size={16} strokeWidth={2.5} />
                    </button>
                  ))}
                </div>

                {i > 0 && (
                  <button
                    className="quiz-back-btn"
                    onClick={() => {
                      setPts(pts.slice(0, -1))
                      setI(i - 1)
                    }}
                  >
                    <ArrowLeft size={14} strokeWidth={2.5} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                    BACK TO PREVIOUS QUESTION
                  </button>
                )}
              </div>
            ) : (
              <div className="quiz-result-view">
                <div className="score-ring-wrap">
                  <svg className="score-ring" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                    <circle
                      className="score-ring-bg"
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      strokeWidth="8"
                    />
                    <circle
                      className="score-ring-meter"
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke={bandColor}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="score-center-text">
                    <span className="score-number">{score}</span>
                    <span className="score-total">/100</span>
                  </div>
                </div>

                <div className="score-summary">
                  <span className="score-badge" style={{ color: 'var(--color-surface)', backgroundColor: bandColor }}>
                    {score >= 80 ? 'OPTIMAL GUT BALANCE' : score >= 55 ? 'MILD SENSITIVITY' : 'NEEDS CLINICAL FOCUS'}
                  </span>
                  <p className="score-band-text">{band}</p>
                </div>

                {!sent ? (
                  <div className="report-form-wrap">
                    <h4 className="report-form-title">SEND MY COMPREHENSIVE GUT SUMMARY</h4>
                    <p className="report-form-sub">We'll prepare personalized dietary tips based on your answers.</p>

                    <div className="form-fields">
                      <div className="input-group">
                        <label htmlFor="chk-name">YOUR NAME</label>
                        <input
                          id="chk-name"
                          type="text"
                          placeholder="e.g. Priya Sharma"
                          value={f.name}
                          onChange={(e) => setF({ ...f, name: e.target.value })}
                        />
                      </div>

                      <div className="input-group">
                        <label htmlFor="chk-phone">WHATSAPP NUMBER</label>
                        <input
                          id="chk-phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g. 9876543210"
                          value={f.phone}
                          onChange={(e) => setF({ ...f, phone: e.target.value })}
                        />
                      </div>

                      <div className="input-group">
                        <label htmlFor="chk-goal">PRIMARY HEALTH GOAL</label>
                        <select
                          id="chk-goal"
                          value={f.goal}
                          onChange={(e) => setF({ ...f, goal: e.target.value })}
                        >
                          {GOALS.map((goal) => (
                            <option key={goal} value={goal}>{goal}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-action-row">
                        <button
                          className="btn btn-primary btn-block"
                          disabled={!f.name.trim() || f.phone.trim().length < 8}
                          onClick={() => setSent(true)}
                        >
                          <span>Receive Report</span>
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </button>
                        <button
                          className="btn btn-ghost btn-block"
                          onClick={() => {
                            setI(0)
                            setPts([])
                          }}
                        >
                          <RotateCcw size={15} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                          Retake Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="report-success-wrap">
                    <div className="success-icon float-anim-1" aria-hidden="true">
                      <Sparkles size={36} strokeWidth={1.8} className="text-moss" />
                    </div>
                    <h4>THANK YOU, {f.name.toUpperCase()}!</h4>
                    <p className="success-desc">
                      Your gut index is <strong>{score}/100</strong>. Connect directly on WhatsApp with Meenu to review your results and get recommended meal tweaks.
                    </p>
                    <a
                      className="btn btn-wa btn-block btn-no-underline"
                      href={wa(`Hi Meenu, I just completed the Gut Health Checker! My gut score is ${score}/100. Primary goal: ${f.goal}. I would love to discuss a food-first plan.`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle size={18} strokeWidth={2.25} />
                      <span>Share Results on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
