import { useState, useMemo } from 'react'
import {
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Droplet,
  Flame,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  MessageCircle,
  Clock,
  HeartPulse,
  Activity,
  Calendar
} from 'lucide-react'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import { GOALS, wa } from '../data/site'
import Section from '../components/Section'

const SYMPTOMS = [
  {
    id: 'bloating',
    title: 'Bloating & Abdominal Fullness',
    subtitle: 'Feeling tight, distended, or heavy after meals',
    category: 'digestion'
  },
  {
    id: 'constipation',
    title: 'Constipation or Irregular Bowels',
    subtitle: 'Hard stools, straining, or incomplete evacuation',
    category: 'digestion'
  },
  {
    id: 'gas',
    title: 'Gas, Flatulence & Rumbling',
    subtitle: 'Excessive stomach gas, discomfort, or cramping',
    category: 'digestion'
  },
  {
    id: 'acidity',
    title: 'Acidity, Heartburn & GERD',
    subtitle: 'Burning sensation in chest/throat or sour reflux',
    category: 'digestion'
  },
  {
    id: 'stomach_pain',
    title: 'Stomach Ache & Abdominal Tenderness',
    subtitle: 'Cramps, pain, or sharp sensitivity in the gut',
    category: 'digestion'
  },
  {
    id: 'food_cravings',
    title: 'Food Cravings & Sudden Sugar Spikes',
    subtitle: 'Intense sugar cravings or unmanageable hunger drops',
    category: 'metabolic'
  },
  {
    id: 'brain_fog',
    title: 'Brain Fog & Post-Meal Slump',
    subtitle: 'Difficulty focusing, grogginess, or memory blur',
    category: 'gut_brain'
  },
  {
    id: 'fatigue',
    title: 'Fatigue & Low Daily Stamina',
    subtitle: 'Feeling exhausted despite sleeping adequately',
    category: 'gut_brain'
  },
  {
    id: 'skin_issues',
    title: 'Skin Flare-ups & Breakouts',
    subtitle: 'Acne, eczema, unexplained rashes, or dullness',
    category: 'metabolic'
  }
]

const WATER_OPTIONS = [
  { label: 'Under 1 Litre', value: 3, sub: 'Significantly Dehydrated' },
  { label: '1 - 2 Litres', value: 2, sub: 'Borderline Hydration' },
  { label: '2 - 3 Litres', value: 1, sub: 'Optimal Daily Range' },
  { label: '3+ Litres', value: 0, sub: 'High Daily Hydration' }
]

const AGE_GROUPS = ['Under 18', '18 - 30', '31 - 45', '46 - 60', '60+']

const SEVERITY_LABELS = [
  { text: 'Never', value: 0, score: 0 },
  { text: 'Sometimes', value: 1, score: 1 },
  { text: 'Often', value: 2, score: 2 },
  { text: 'Always', value: 3, score: 3 }
]

export default function GutAssessmentPage() {
  useSeo(
    'Free Gut Health Assessment Quiz | Pragmatic Nutritionist',
    'Evaluate your digestive health, calculate your gut balance score with emotional feedback, and get personalized clinical food-first insights by Meenu Balaji.'
  )

  const openBook = useBook()

  // Multi-step form state (1: Symptoms, 2: Lifestyle, 3: Contact & Result)
  const [step, setStep] = useState(1)
  const [symptomAnswers, setSymptomAnswers] = useState({})
  const [waterIntake, setWaterIntake] = useState(WATER_OPTIONS[2].label)
  const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[1])
  const [diagnosedConditions, setDiagnosedConditions] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: GOALS[0]
  })
  const [isCalculated, setIsCalculated] = useState(false)

  // Handle symptom answer selection
  const handleSymptomSelect = (symptomId, val) => {
    setSymptomAnswers((prev) => ({ ...prev, [symptomId]: val }))
  }

  // Answered symptom count
  const answeredCount = Object.keys(symptomAnswers).length

  // Calculate live score
  const { score, emotionTier } = useMemo(() => {
    let rawPenalty = 0
    const maxPossiblePenalty = SYMPTOMS.length * 3 + 3 // symptoms + water

    SYMPTOMS.forEach((s) => {
      const val = symptomAnswers[s.id] ?? 0
      rawPenalty += val
    })

    const waterObj = WATER_OPTIONS.find((w) => w.label === waterIntake)
    if (waterObj) {
      rawPenalty += waterObj.value
    }

    // Convert to 0 - 100 Score
    const calculatedScore = Math.max(
      15,
      Math.min(100, Math.round(100 - (rawPenalty / maxPossiblePenalty) * 85))
    )

    let tier
    if (calculatedScore >= 80) {
      tier = {
        level: 'optimal',
        label: 'THRIVING & BALANCED GUT',
        shortDesc: 'Your digestive tract is resilient and functioning with minimal irritation.',
        color: 'var(--color-primary)',
        bgTint: 'var(--color-primary-soft)',
        borderColor: 'var(--color-primary)',
        icon: Smile,
        emoji: '😄',
        mood: 'Calm, Energized & Harmonious',
        actionAdvice:
          'Your digestive system is happy and functioning well! Continue focusing on diverse fiber, seasonal Indian foods, and hydration to preserve your microbiome strength.',
        badgeColor: 'var(--color-primary)',
        badgeBg: 'var(--color-primary-light)'
      }
    } else if (calculatedScore >= 55) {
      tier = {
        level: 'warning',
        label: 'MILD GUT DISTRESS & SENSITIVITY',
        shortDesc: 'Early warning signs detected. Food triggers or low enzyme activity are disrupting digestion.',
        color: 'var(--color-secondary)',
        bgTint: 'var(--color-secondary-soft)',
        borderColor: 'var(--color-secondary)',
        icon: Meh,
        emoji: '😐',
        mood: 'Sluggish, Bloated & Irritated',
        actionAdvice:
          'Your gut is showing clear distress signals. Targeted meal sequencing and identifying hidden food triggers will prevent chronic IBS or metabolic fatigue.',
        badgeColor: 'var(--color-secondary)',
        badgeBg: 'var(--color-secondary-soft)'
      }
    } else {
      tier = {
        level: 'critical',
        label: 'HIGH GUT STRESS & DYSBIOSIS',
        shortDesc: 'Significant gastrointestinal stress and inflammation impacting daily energy and comfort.',
        color: 'var(--color-secondary)',
        bgTint: 'var(--color-secondary-soft)',
        borderColor: 'var(--color-secondary)',
        icon: Frown,
        emoji: '😟',
        mood: 'Distressed, Inflamed & Overwhelmed',
        actionAdvice:
          'Your gut barrier is under serious stress, likely disrupting nutrient absorption, hormone balance, and daily vitality. A clinical, food-first protocol is strongly recommended.',
        badgeColor: 'var(--color-secondary)',
        badgeBg: 'var(--color-secondary-subtle)'
      }
    }

    return { score: calculatedScore, emotionTier: tier }
  }, [symptomAnswers, waterIntake])

  const circumference = 2 * Math.PI * 48
  const strokeDashoffset = circumference - (score / 100) * circumference

  const EmotionIcon = emotionTier.icon

  // Breakdown metrics
  const digestionPenalty = SYMPTOMS.filter((s) => s.category === 'digestion').reduce(
    (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
    0
  )
  const gutBrainPenalty = SYMPTOMS.filter((s) => s.category === 'gut_brain').reduce(
    (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
    0
  )
  const metabolicPenalty = SYMPTOMS.filter((s) => s.category === 'metabolic').reduce(
    (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
    0
  )

  const digestionScore = Math.max(10, Math.round(100 - (digestionPenalty / 15) * 85))
  const gutBrainScore = Math.max(10, Math.round(100 - (gutBrainPenalty / 6) * 85))
  const metabolicScore = Math.max(10, Math.round(100 - (metabolicPenalty / 6) * 85))

  const handleRetake = () => {
    setSymptomAnswers({})
    setWaterIntake(WATER_OPTIONS[2].label)
    setAgeGroup(AGE_GROUPS[1])
    setDiagnosedConditions([])
    setFormData({ name: '', phone: '', email: '', goal: GOALS[0] })
    setStep(1)
    setIsCalculated(false)
  }

  const toggleCondition = (cond) => {
    setDiagnosedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    )
  }

  return (
    <div className="gut-assessment-page">
      {/* Page Header Hero */}
      <section className="assessment-hero-header">
        <div className="section-inner sec-wide">
          <div className="assessment-hero-content">
            <span className="section-eyebrow">CLINICAL DIGESTIVE SCORECARD</span>
            <h1 className="assessment-page-title">Free Gut Health Assessment Quiz</h1>
            <p className="assessment-page-lead">
              Take this 2-minute clinical evaluation to calculate your gut balance score with emotional feedback, uncover underlying triggers, and receive practical Indian food-first guidance.
            </p>

            <div className="assessment-trust-pills">
              <span className="trust-pill">
                <CheckCircle2 size={16} className="text-moss" />
                <span>100% Indian Home Food Focus</span>
              </span>
              <span className="trust-pill">
                <ShieldCheck size={16} className="text-moss" />
                <span>14+ Years Clinical Expertise</span>
              </span>
              <span className="trust-pill">
                <Clock size={16} className="text-moss" />
                <span>Takes Under 2 Minutes</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Assessment Container (Width matching Our Categories / sec-wide) */}
      <Section id="assessment-main" width="wide" bg="olive" className="assessment-body-section">
        {!isCalculated ? (
          <div className="assessment-wizard-grid">
            {/* Left Column: Multi-Step Interactive Assessment Form */}
            <div className="assessment-form-card">
              {/* Stepper Navigation Indicator */}
              <div className="wizard-stepper-header">
                <div className="stepper-tab-list">
                  <button
                    className={`stepper-tab ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
                    onClick={() => setStep(1)}
                  >
                    <span className="step-num">1</span>
                    <span className="step-label">Symptoms ({answeredCount}/{SYMPTOMS.length})</span>
                  </button>
                  <div className="stepper-line" />
                  <button
                    className={`stepper-tab ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}
                    onClick={() => {
                      if (answeredCount >= 4) setStep(2)
                    }}
                  >
                    <span className="step-num">2</span>
                    <span className="step-label">Lifestyle & Water</span>
                  </button>
                  <div className="stepper-line" />
                  <button
                    className={`stepper-tab ${step === 3 ? 'active' : ''}`}
                    onClick={() => {
                      if (answeredCount >= 4) setStep(3)
                    }}
                  >
                    <span className="step-num">3</span>
                    <span className="step-label">Your Score</span>
                  </button>
                </div>
              </div>

              {/* Step 1: Symptoms Checklist */}
              {step === 1 && (
                <div className="wizard-step-body animate-fadeIn">
                  <div className="step-heading-row">
                    <div>
                      <h2 className="wizard-step-title">Step 1: Symptom Frequency Mapping</h2>
                      <p className="wizard-step-desc">
                        How often do you experience the following symptoms in a typical week?
                      </p>
                    </div>
                  </div>

                  <div className="symptoms-interactive-list">
                    {SYMPTOMS.map((symptom) => {
                      const currentVal = symptomAnswers[symptom.id]

                      return (
                        <div key={symptom.id} className="symptom-item-row">
                          <div className="symptom-text-block">
                            <h3 className="symptom-item-title">{symptom.title}</h3>
                            <p className="symptom-item-sub">{symptom.subtitle}</p>
                          </div>

                          <div className="severity-pill-group" role="radiogroup" aria-label={symptom.title}>
                            {SEVERITY_LABELS.map((sev) => {
                              const isSelected = currentVal === sev.value

                              return (
                                <button
                                  key={sev.text}
                                  type="button"
                                  className={`severity-pill-btn ${isSelected ? 'selected' : ''}`}
                                  onClick={() => handleSymptomSelect(symptom.id, sev.value)}
                                  aria-checked={isSelected}
                                  role="radio"
                                >
                                  {sev.text}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="wizard-footer-action">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={() => setStep(2)}
                    >
                      <span>Continue to Lifestyle & Hydration</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Lifestyle & Hydration */}
              {step === 2 && (
                <div className="wizard-step-body animate-fadeIn">
                  <div className="step-heading-row">
                    <div>
                      <h2 className="wizard-step-title">Step 2: Hydration & Profile Context</h2>
                      <p className="wizard-step-desc">
                        Water intake and lifestyle variables directly shape enzyme production and motility.
                      </p>
                    </div>
                  </div>

                  <div className="lifestyle-questions-wrap">
                    {/* Water intake */}
                    <div className="lifestyle-field-block">
                      <label className="field-label-prominent">
                        <Droplet size={18} className="text-moss inline-icon" />
                        <span>Daily Water Intake</span>
                      </label>
                      <div className="water-options-grid">
                        {WATER_OPTIONS.map((w) => (
                          <button
                            key={w.label}
                            type="button"
                            className={`water-card-btn ${waterIntake === w.label ? 'selected' : ''}`}
                            onClick={() => setWaterIntake(w.label)}
                          >
                            <span className="water-label">{w.label}</span>
                            <span className="water-sub">{w.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age group */}
                    <div className="lifestyle-field-block">
                      <label className="field-label-prominent">
                        <span>Age Group</span>
                      </label>
                      <div className="pill-choice-row">
                        {AGE_GROUPS.map((age) => (
                          <button
                            key={age}
                            type="button"
                            className={`pill-choice-btn ${ageGroup === age ? 'selected' : ''}`}
                            onClick={() => setAgeGroup(age)}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pre-existing conditions */}
                    <div className="lifestyle-field-block">
                      <label className="field-label-prominent">
                        <span>Any diagnosed conditions? (Optional)</span>
                      </label>
                      <div className="condition-tags-row">
                        {['IBS / SIBO', 'Acidity / GERD', 'PCOS', 'Thyroid', 'Type 2 Diabetes', 'None'].map(
                          (c) => (
                            <button
                              key={c}
                              type="button"
                              className={`condition-tag-btn ${
                                diagnosedConditions.includes(c) ? 'selected' : ''
                              }`}
                              onClick={() => toggleCondition(c)}
                            >
                              {diagnosedConditions.includes(c) && (
                                <CheckCircle2 size={14} className="inline-check" />
                              )}
                              {c}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="wizard-footer-action dual-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} strokeWidth={2.5} />
                      <span>Back to Symptoms</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={() => setStep(3)}
                    >
                      <span>Proceed to Your Gut Report</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Instant Report Generation */}
              {step === 3 && (
                <div className="wizard-step-body animate-fadeIn">
                  <div className="step-heading-row">
                    <div>
                      <h2 className="wizard-step-title">Step 3: Receive Your Comprehensive Score</h2>
                      <p className="wizard-step-desc">
                        Enter your details to generate your personalized emotional scorecard and customized Indian meal strategy.
                      </p>
                    </div>
                  </div>

                  <div className="contact-form-grid">
                    <div className="input-group">
                      <label htmlFor="user-name">Your Full Name *</label>
                      <input
                        id="user-name"
                        type="text"
                        placeholder="e.g. Ananya Iyer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="user-phone">WhatsApp Number * (For Instant Summary)</label>
                      <input
                        id="user-phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="input-group full-width">
                      <label htmlFor="user-email">Email Address (Optional)</label>
                      <input
                        id="user-email"
                        type="email"
                        placeholder="e.g. ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="input-group full-width">
                      <label htmlFor="user-goal">Primary Health Priority</label>
                      <select
                        id="user-goal"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      >
                        {GOALS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="wizard-footer-action dual-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setStep(2)}
                    >
                      <ArrowLeft size={16} strokeWidth={2.5} />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      disabled={!formData.name.trim() || formData.phone.trim().length < 8}
                      onClick={() => setIsCalculated(true)}
                    >
                      <Sparkles size={18} strokeWidth={2.2} />
                      <span>Calculate My Gut Score</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Emotional Score Preview & Clinical Context */}
            <aside className="assessment-sidebar-col">
              {/* Dynamic Emotional Gauge Card */}
              <div className="live-emotion-card" style={{ borderColor: emotionTier.borderColor }}>
                <div className="emotion-preview-badge" style={{ backgroundColor: emotionTier.bgTint, color: emotionTier.color }}>
                  <EmotionIcon size={20} strokeWidth={2.5} />
                  <span>LIVE ASSESSMENT STATUS</span>
                </div>

                <div className="score-visual-gauge">
                  <svg className="score-ring-svg" width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
                    <circle className="score-ring-track" cx="65" cy="65" r="48" fill="none" strokeWidth="9" />
                    <circle
                      className="score-ring-progress"
                      cx="65"
                      cy="65"
                      r="48"
                      fill="none"
                      stroke={emotionTier.color}
                      strokeWidth="9"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="score-inner-val">
                    <span className="score-big-num">{score}</span>
                    <span className="score-denom">/ 100</span>
                  </div>
                </div>

                <div className="emotion-state-block">
                  <div className="emoji-display">{emotionTier.emoji}</div>
                  <h3 className="emotion-state-title" style={{ color: emotionTier.color }}>
                    {emotionTier.label}
                  </h3>
                  <p className="emotion-state-mood">
                    <strong>Emotional State:</strong> {emotionTier.mood}
                  </p>
                  <p className="emotion-state-desc">{emotionTier.shortDesc}</p>
                </div>
              </div>

              {/* Clinical Trust Card */}
              <div className="clinical-guidance-card">
                <div className="guidance-card-header">
                  <ShieldCheck size={22} className="text-moss" />
                  <h4 className="guidance-title">Meenu Balaji Clinical Framework</h4>
                </div>
                <p className="guidance-desc">
                  Based on 14+ years of clinical dietetics across India, the UK, and New Zealand. Designed to pinpoint dysbiosis, enzyme insufficiency, and metabolic triggers without restrictive crash diets.
                </p>
                <div className="guidance-badge-row">
                  <span className="badge-mini">ICAR & UGC NET JRF</span>
                  <span className="badge-mini">Peer Reviewer EJN</span>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* =========================================================================
             RESULT DASHBOARD VIEW (Expressive Emotions, Breakdown & Action)
             ========================================================================= */
          <div className="assessment-results-dashboard animate-fadeIn">
            {/* Top Result Banner */}
            <div className="result-main-card" style={{ borderColor: emotionTier.borderColor }}>
              <div className="result-header-row">
                <div className="result-left-summary">
                  <div
                    className="result-tier-badge"
                    style={{ backgroundColor: emotionTier.badgeBg, color: emotionTier.badgeColor }}
                  >
                    <EmotionIcon size={18} strokeWidth={2.5} />
                    <span>{emotionTier.label}</span>
                  </div>
                  <h2 className="result-greeting">
                    {formData.name ? `${formData.name}'s Digestive Report` : 'Your Gut Health Score'}
                  </h2>
                  <p className="result-emotional-mood">
                    <strong>Emotional Status:</strong> {emotionTier.emoji} {emotionTier.mood}
                  </p>
                  <p className="result-clinical-advice">{emotionTier.actionAdvice}</p>
                </div>

                <div className="result-right-gauge">
                  <div className="score-visual-gauge lg">
                    <svg className="score-ring-svg" width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
                      <circle className="score-ring-track" cx="80" cy="80" r="58" fill="none" strokeWidth="12" />
                      <circle
                        className="score-ring-progress"
                        cx="80"
                        cy="80"
                        r="58"
                        fill="none"
                        stroke={emotionTier.color}
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={(2 * Math.PI * 58) - (score / 100) * (2 * Math.PI * 58)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="score-inner-val">
                      <span className="score-big-num lg">{score}</span>
                      <span className="score-denom">/ 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="result-metrics-grid">
                <div className="metric-pill-card">
                  <div className="metric-label-row">
                    <span className="metric-name">
                      <Activity size={16} className="text-moss" />
                      Digestion & Motility
                    </span>
                    <span className="metric-val">{digestionScore}%</span>
                  </div>
                  <div className="metric-progress-track">
                    <div
                      className="metric-progress-fill"
                      style={{
                        width: `${digestionScore}%`,
                        backgroundColor: digestionScore >= 75 ? 'var(--color-primary)' : 'var(--color-secondary)'
                      }}
                    />
                  </div>
                </div>

                <div className="metric-pill-card">
                  <div className="metric-label-row">
                    <span className="metric-name">
                      <HeartPulse size={16} className="text-primary" />
                      Gut-Brain Axis & Energy
                    </span>
                    <span className="metric-val">{gutBrainScore}%</span>
                  </div>
                  <div className="metric-progress-track">
                    <div
                      className="metric-progress-fill"
                      style={{
                        width: `${gutBrainScore}%`,
                        backgroundColor: gutBrainScore >= 75 ? 'var(--color-primary)' : 'var(--color-secondary)'
                      }}
                    />
                  </div>
                </div>

                <div className="metric-pill-card">
                  <div className="metric-label-row">
                    <span className="metric-name">
                      <Flame size={16} className="text-primary" />
                      Metabolic & Systemic Balance
                    </span>
                    <span className="metric-val">{metabolicScore}%</span>
                  </div>
                  <div className="metric-progress-track">
                    <div
                      className="metric-progress-fill"
                      style={{
                        width: `${metabolicScore}%`,
                        backgroundColor: metabolicScore >= 75 ? 'var(--color-primary)' : 'var(--color-secondary)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Direct Next-Step CTAs */}
              <div className="result-action-toolbar">
                <a
                  className="btn btn-wa btn-lg btn-no-underline"
                  href={wa(
                    `Hi Meenu, I just finished the Gut Health Assessment Quiz! My Gut Score is ${score}/100 (${emotionTier.label}). Primary Goal: ${formData.goal}. Name: ${formData.name}. I would love to review my symptoms with you.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={20} strokeWidth={2.25} />
                  <span>Discuss Report on WhatsApp with Meenu</span>
                </a>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={openBook}
                >
                  <Calendar size={18} strokeWidth={2.25} />
                  <span>Book Free 15-Min Discovery Call</span>
                </button>

                <button
                  className="btn btn-ghost"
                  onClick={handleRetake}
                >
                  <RotateCcw size={16} strokeWidth={2} />
                  <span>Retake Assessment</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
