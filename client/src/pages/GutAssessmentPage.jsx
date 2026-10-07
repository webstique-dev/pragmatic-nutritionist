import { useState, useMemo } from 'react'
import {
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  Droplet,
  Flame,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Clock,
  HeartPulse,
  Activity,
  Calendar,
  Sparkles,
  Award,
  Compass,
  FileText,
  User,
  Phone,
  Mail,
  Check,
  Info
} from 'lucide-react'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import { GOALS, wa } from '../data/site'
import Section from '../components/Section'

const SYMPTOM_CLUSTERS = [
  {
    categoryKey: 'digestion',
    categoryName: 'Digestive Motility & Comfort',
    categoryDesc: 'Core gut sensations, motility regularity, and gastric balance',
    items: [
      {
        id: 'bloating',
        title: 'Bloating & Abdominal Distension',
        subtitle: 'Feeling tight, swollen, or heavy after regular meals'
      },
      {
        id: 'constipation',
        title: 'Constipation or Irregular Bowels',
        subtitle: 'Hard stools, straining, or incomplete morning evacuation'
      },
      {
        id: 'gas',
        title: 'Excessive Gas & Stomach Rumbling',
        subtitle: 'Frequent flatulence, internal bubbling, or discomfort'
      },
      {
        id: 'acidity',
        title: 'Acidity, Heartburn & GERD',
        subtitle: 'Burning sensation in chest/throat or sour regurgitation'
      },
      {
        id: 'stomach_pain',
        title: 'Stomach Ache & Cramping',
        subtitle: 'Abdominal sensitivity, spasms, or post-meal tenderness'
      }
    ]
  },
  {
    categoryKey: 'gut_brain',
    categoryName: 'Gut-Brain Axis & Energy Flow',
    categoryDesc: 'Neuro-digestive connection, mental clarity, and stamina',
    items: [
      {
        id: 'brain_fog',
        title: 'Brain Fog & Post-Meal Slump',
        subtitle: 'Difficulty focusing, grogginess, or midday energy crashes'
      },
      {
        id: 'fatigue',
        title: 'Unexplained Daily Fatigue',
        subtitle: 'Feeling exhausted despite sleeping 7-8 hours adequately'
      }
    ]
  },
  {
    categoryKey: 'metabolic',
    categoryName: 'Metabolic Signals & Inflammation',
    categoryDesc: 'Hormonal cues, cravings, and systemic skin responses',
    items: [
      {
        id: 'food_cravings',
        title: 'Intense Sugar & Carb Cravings',
        subtitle: 'Sudden urges for sweets or unmanageable hunger drops'
      },
      {
        id: 'skin_issues',
        title: 'Skin Flare-ups & Breakouts',
        subtitle: 'Acne, unexplained rashes, eczema, or skin dullness'
      }
    ]
  }
]

// Flattened list for calculations
const ALL_SYMPTOMS = SYMPTOM_CLUSTERS.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.categoryKey }))
)

const WATER_OPTIONS = [
  { label: 'Under 1L', value: 3, title: 'Low', sub: 'Severe dehydration risk' },
  { label: '1L - 2L', value: 2, title: 'Moderate', sub: 'Borderline hydration' },
  { label: '2L - 3L', value: 1, title: 'Optimal', sub: 'Healthy daily target' },
  { label: '3L+ / Day', value: 0, title: 'High', sub: 'Active athlete intake' }
]

const DIET_TYPES = ['Pure Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain / Satvic', 'Vegan']
const AGE_GROUPS = ['Under 20', '20 - 30', '31 - 45', '46 - 60', '60+']

const SEVERITY_LEVELS = [
  { text: 'Never', value: 0, short: '0' },
  { text: 'Sometimes', value: 1, short: '1' },
  { text: 'Often', value: 2, short: '2' },
  { text: 'Always', value: 3, short: '3' }
]

export default function GutAssessmentPage() {
  useSeo(
    'Free Clinical Gut Health Assessment | Pragmatic Nutritionist',
    'Evaluate your digestive motility, calculate your evidence-led gut balance score, and receive personalized Indian food-first guidance by Meenu Balaji.'
  )

  const openBook = useBook()

  // Steps: 1 = Symptoms, 2 = Lifestyle, 3 = Profile, 4 = Result View
  const [step, setStep] = useState(1)
  const [symptomAnswers, setSymptomAnswers] = useState({})
  const [waterIntake, setWaterIntake] = useState(WATER_OPTIONS[2].label)
  const [dietType, setDietType] = useState(DIET_TYPES[0])
  const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[1])
  const [diagnosedConditions, setDiagnosedConditions] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: GOALS[0]
  })
  const [isCalculated, setIsCalculated] = useState(false)

  const handleSymptomSelect = (symptomId, val) => {
    setSymptomAnswers((prev) => ({ ...prev, [symptomId]: val }))
  }

  const answeredCount = Object.keys(symptomAnswers).length
  const totalSymptoms = ALL_SYMPTOMS.length
  const progressPercent = Math.round((answeredCount / totalSymptoms) * 100)

  // Live Score Calculation
  const { score, emotionTier, digestionScore, gutBrainScore, metabolicScore } = useMemo(() => {
    let rawPenalty = 0
    const maxPenalty = totalSymptoms * 3 + 3

    ALL_SYMPTOMS.forEach((s) => {
      const val = symptomAnswers[s.id] ?? 0
      rawPenalty += val
    })

    const waterObj = WATER_OPTIONS.find((w) => w.label === waterIntake)
    if (waterObj) rawPenalty += waterObj.value

    const calculatedScore = Math.max(
      15,
      Math.min(100, Math.round(100 - (rawPenalty / maxPenalty) * 85))
    )

    // Cluster penalties
    const digPenalty = ALL_SYMPTOMS.filter((s) => s.category === 'digestion').reduce(
      (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
      0
    )
    const gbPenalty = ALL_SYMPTOMS.filter((s) => s.category === 'gut_brain').reduce(
      (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
      0
    )
    const metPenalty = ALL_SYMPTOMS.filter((s) => s.category === 'metabolic').reduce(
      (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
      0
    )

    const dScore = Math.max(10, Math.round(100 - (digPenalty / 15) * 85))
    const gbScore = Math.max(10, Math.round(100 - (gbPenalty / 6) * 85))
    const mScore = Math.max(10, Math.round(100 - (metPenalty / 6) * 85))

    let tier
    if (calculatedScore >= 80) {
      tier = {
        level: 'optimal',
        label: 'THRIVING & BALANCED GUT',
        shortDesc: 'Your digestive tract is resilient and functioning with minimal irritation.',
        color: '#55883B',
        bgTint: '#E6F0DC',
        accentBg: '#C1E899',
        icon: Smile,
        emoji: '🌿',
        statusTag: 'Optimal Health',
        mood: 'Harmonious & Energized',
        actionAdvice:
          'Your digestive system is functioning with high resilience! Focus on diverse seasonal Indian fiber, cold-pressed oils, and consistent meal timings to maintain your microbiome diversity.',
        foodProtocols: [
          { title: 'Microbiome Diversity', desc: 'Include 20+ seasonal Indian plant varieties weekly.' },
          { title: 'Hydration Spacing', desc: 'Sip warm water 30 mins before meals, not with meals.' },
          { title: 'Digestive Enzymes', desc: 'Chew 1 tsp roasted saunf & ajwain after heavy lunches.' },
          { title: 'Prebiotic Fuel', desc: 'Add soaked chia, flax, and homemade curd or chaas.' }
        ]
      }
    } else if (calculatedScore >= 55) {
      tier = {
        level: 'warning',
        label: 'MILD GUT DISTRESS & SENSITIVITY',
        shortDesc: 'Early warning signals detected. Irregular motility or enzyme lag are causing distress.',
        color: '#9A6735',
        bgTint: '#FBF6F0',
        accentBg: '#F2E7DC',
        icon: Meh,
        emoji: '⚠️',
        statusTag: 'Moderate Sensitivity',
        mood: 'Sluggish & Sensitive',
        actionAdvice:
          'Your gut shows evident irritation signals. Targeted Indian meal sequencing, identifying hidden food triggers, and restoring digestive fire (Agni) will prevent chronic dysbiosis or IBS.',
        foodProtocols: [
          { title: 'Agni Enhancement', desc: 'Fresh ginger + rock salt sliver 10 mins before main meals.' },
          { title: 'Gentle Fiber', desc: 'Favor cooked gourds (lauki, ridge gourd) over raw salads.' },
          { title: 'Fermented Support', desc: 'Midday buttermilk (chaas) infused with roasted jeera & mint.' },
          { title: 'Trigger Elimination', desc: 'Avoid deep-fried snacks and ultra-processed bakery goods.' }
        ]
      }
    } else {
      tier = {
        level: 'critical',
        label: 'HIGH GUT STRESS & INFLAMMATION',
        shortDesc: 'Significant gastrointestinal distress, dysbiosis, and compromised barrier integrity.',
        color: '#B23B2A',
        bgTint: '#FDF2F0',
        accentBg: '#FCE4E1',
        icon: Frown,
        emoji: '🚨',
        statusTag: 'Clinical Attention Needed',
        mood: 'Inflamed & Depleted',
        actionAdvice:
          'Your gut barrier is experiencing significant stress, likely impacting nutrient absorption, hormone regulation, and metabolic energy. A structured clinical food-first protocol is strongly advised.',
        foodProtocols: [
          { title: 'Gut Lining Repair', desc: 'Warm vegetable broth, kanji, and stewed golden apples.' },
          { title: 'Zero Cold Liquids', desc: 'Strictly avoid ice water; drink warm cumin-coriander tea.' },
          { title: 'Anti-Inflammatory Spices', desc: 'Cook with organic turmeric, hing, and mild cumin seeds.' },
          { title: 'Personalized Clinical Care', desc: 'Book a 1-on-1 diagnostic review with Meenu Balaji.' }
        ]
      }
    }

    return {
      score: calculatedScore,
      emotionTier: tier,
      digestionScore: dScore,
      gutBrainScore: gbScore,
      metabolicScore: mScore
    }
  }, [symptomAnswers, waterIntake, totalSymptoms])

  const circumference = 2 * Math.PI * 52
  const strokeDashoffset = circumference - (score / 100) * circumference
  const EmotionIcon = emotionTier.icon

  const handleRetake = () => {
    setSymptomAnswers({})
    setWaterIntake(WATER_OPTIONS[2].label)
    setDietType(DIET_TYPES[0])
    setAgeGroup(AGE_GROUPS[1])
    setDiagnosedConditions([])
    setFormData({ name: '', phone: '', email: '', goal: GOALS[0] })
    setStep(1)
    setIsCalculated(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCondition = (cond) => {
    setDiagnosedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    )
  }

  return (
    <div className="gut-assessment-page-root">
      {/* 1. EDITORIAL HERO HEADER */}
      <section className="assessment-editorial-hero">
        <div className="assessment-hero-inner">
          <div className="assessment-hero-eyebrow-pill">
            <span className="eyebrow-pulse-dot" aria-hidden="true" />
            <span className="eyebrow-label">CLINICAL DIGESTIVE SCORECARD</span>
          </div>

          <h1 className="assessment-editorial-title">
            <span>Free Gut Health </span>
            <span className="title-accent-highlight">Assessment Quiz</span>
          </h1>

          <p className="assessment-editorial-lead">
            Take this 2-minute clinical evaluation to calculate your gut balance score with live emotional feedback, uncover underlying food triggers, and receive practical Indian food-first guidance.
          </p>

          <div className="assessment-credential-strip">
            <div className="credential-badge">
              <CheckCircle2 size={15} className="cred-icon" aria-hidden="true" />
              <span>100% Indian Kitchen Foods</span>
            </div>
            <div className="credential-badge">
              <ShieldCheck size={15} className="cred-icon" aria-hidden="true" />
              <span>14+ Years Clinical Expertise</span>
            </div>
            <div className="credential-badge">
              <Clock size={15} className="cred-icon" aria-hidden="true" />
              <span>Takes ~2 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE ASSESSMENT CONTAINER */}
      <Section id="assessment-workspace" width="wide" bg="none" className="assessment-main-section">
        {!isCalculated ? (
          <div className="assessment-dual-layout">
            {/* LEFT COLUMN: MULTI-STEP WIZARD */}
            <div className="assessment-wizard-card">
              {/* Responsive Progress Stepper */}
              <div className="stepper-progress-header">
                <div className="stepper-pills-row">
                  <button
                    type="button"
                    className={`stepper-stage-btn ${step === 1 ? 'is-active' : step > 1 ? 'is-completed' : ''}`}
                    onClick={() => setStep(1)}
                  >
                    <span className="stage-number">{step > 1 ? <Check size={12} strokeWidth={3} /> : '1'}</span>
                    <span className="stage-text">Symptoms</span>
                  </button>

                  <div className="stepper-connector-line" />

                  <button
                    type="button"
                    className={`stepper-stage-btn ${step === 2 ? 'is-active' : step > 2 ? 'is-completed' : ''}`}
                    onClick={() => {
                      if (answeredCount >= 3) setStep(2)
                    }}
                  >
                    <span className="stage-number">{step > 2 ? <Check size={12} strokeWidth={3} /> : '2'}</span>
                    <span className="stage-text">Lifestyle</span>
                  </button>

                  <div className="stepper-connector-line" />

                  <button
                    type="button"
                    className={`stepper-stage-btn ${step === 3 ? 'is-active' : ''}`}
                    onClick={() => {
                      if (answeredCount >= 3) setStep(3)
                    }}
                  >
                    <span className="stage-number">3</span>
                    <span className="stage-text">Report</span>
                  </button>
                </div>

                {/* Progress bar line */}
                <div className="stepper-fill-track" aria-hidden="true">
                  <div
                    className="stepper-fill-bar"
                    style={{
                      width: `${step === 1 ? (answeredCount / totalSymptoms) * 33.3 : step === 2 ? 66.6 : 100}%`
                    }}
                  />
                </div>
              </div>

              {/* STEP 1: SYMPTOM CLUSTERS */}
              {step === 1 && (
                <div className="wizard-step-container animate-fadeIn">
                  <div className="step-intro-bar">
                    <div>
                      <span className="step-tag-pill">STEP 1 OF 3</span>
                      <h2 className="step-main-heading">Symptom Frequency Mapping</h2>
                      <p className="step-sub-desc">
                        Select how often you experience each symptom in a typical week.
                      </p>
                    </div>
                    <div className="answered-counter-pill">
                      <span>{answeredCount} / {totalSymptoms} Answered</span>
                    </div>
                  </div>

                  <div className="clusters-wrapper">
                    {SYMPTOM_CLUSTERS.map((cluster) => (
                      <div key={cluster.categoryKey} className="symptom-cluster-group">
                        <div className="cluster-header">
                          <h3 className="cluster-title">{cluster.categoryName}</h3>
                          <p className="cluster-desc">{cluster.categoryDesc}</p>
                        </div>

                        <div className="cluster-symptoms-list">
                          {cluster.items.map((symptom) => {
                            const currentVal = symptomAnswers[symptom.id]
                            const isAnswered = currentVal !== undefined

                            return (
                              <div
                                key={symptom.id}
                                className={`symptom-item-card ${isAnswered ? 'has-answer' : ''}`}
                              >
                                <div className="symptom-info">
                                  <h4 className="symptom-name">{symptom.title}</h4>
                                  <p className="symptom-desc">{symptom.subtitle}</p>
                                </div>

                                <div
                                  className="severity-pill-selector"
                                  role="radiogroup"
                                  aria-label={symptom.title}
                                >
                                  {SEVERITY_LEVELS.map((sev) => {
                                    const isSelected = currentVal === sev.value

                                    return (
                                      <button
                                        key={sev.text}
                                        type="button"
                                        className={`severity-option-btn ${isSelected ? 'is-selected' : ''}`}
                                        onClick={() => handleSymptomSelect(symptom.id, sev.value)}
                                        role="radio"
                                        aria-checked={isSelected}
                                      >
                                        <span className="btn-full-text">{sev.text}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="wizard-action-footer">
                    <button
                      type="button"
                      className="btn-wizard-primary"
                      onClick={() => {
                        setStep(2)
                        window.scrollTo({ top: 200, behavior: 'smooth' })
                      }}
                    >
                      <span>Continue to Lifestyle & Hydration</span>
                      <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: LIFESTYLE & HYDRATION */}
              {step === 2 && (
                <div className="wizard-step-container animate-fadeIn">
                  <div className="step-intro-bar">
                    <div>
                      <span className="step-tag-pill">STEP 2 OF 3</span>
                      <h2 className="step-main-heading">Hydration & Lifestyle Context</h2>
                      <p className="step-sub-desc">
                        Water volume and meal patterns directly dictate enzyme secretion and peristalsis.
                      </p>
                    </div>
                  </div>

                  <div className="lifestyle-sections-stack">
                    {/* Water intake */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <Droplet size={17} className="box-icon" aria-hidden="true" />
                        <span>Daily Water Intake</span>
                      </label>
                      <div className="water-grid">
                        {WATER_OPTIONS.map((w) => {
                          const isSelected = waterIntake === w.label
                          return (
                            <button
                              key={w.label}
                              type="button"
                              className={`water-option-card ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => setWaterIntake(w.label)}
                            >
                              <span className="water-title">{w.label}</span>
                              <span className="water-subtext">{w.sub}</span>
                              {isSelected && <Check size={14} className="selected-check-icon" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Diet Type */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <Compass size={17} className="box-icon" aria-hidden="true" />
                        <span>Primary Food Lifestyle</span>
                      </label>
                      <div className="chips-flex-row">
                        {DIET_TYPES.map((diet) => (
                          <button
                            key={diet}
                            type="button"
                            className={`choice-chip-btn ${dietType === diet ? 'is-selected' : ''}`}
                            onClick={() => setDietType(diet)}
                          >
                            {diet}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age group */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <User size={17} className="box-icon" aria-hidden="true" />
                        <span>Age Bracket</span>
                      </label>
                      <div className="chips-flex-row">
                        {AGE_GROUPS.map((age) => (
                          <button
                            key={age}
                            type="button"
                            className={`choice-chip-btn ${ageGroup === age ? 'is-selected' : ''}`}
                            onClick={() => setAgeGroup(age)}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Diagnosed conditions */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <FileText size={17} className="box-icon" aria-hidden="true" />
                        <span>Any diagnosed conditions? (Select all that apply)</span>
                      </label>
                      <div className="chips-flex-row">
                        {['IBS / SIBO', 'Acidity / GERD', 'PCOS / PCOD', 'Thyroid', 'Type 2 Diabetes', 'Fatty Liver', 'None'].map(
                          (cond) => {
                            const isSelected = diagnosedConditions.includes(cond)
                            return (
                              <button
                                key={cond}
                                type="button"
                                className={`choice-chip-btn ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => toggleCondition(cond)}
                              >
                                {isSelected && <Check size={13} className="inline-check" />}
                                <span>{cond}</span>
                              </button>
                            )
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="wizard-action-footer dual-button-footer">
                    <button
                      type="button"
                      className="btn-wizard-secondary"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} strokeWidth={2.2} />
                      <span>Back to Symptoms</span>
                    </button>
                    <button
                      type="button"
                      className="btn-wizard-primary"
                      onClick={() => {
                        setStep(3)
                        window.scrollTo({ top: 200, behavior: 'smooth' })
                      }}
                    >
                      <span>Proceed to Your Gut Report</span>
                      <ArrowRight size={17} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT FORM & SCORE GENERATION */}
              {step === 3 && (
                <div className="wizard-step-container animate-fadeIn">
                  <div className="step-intro-bar">
                    <div>
                      <span className="step-tag-pill">STEP 3 OF 3</span>
                      <h2 className="step-main-heading">Generate Your Clinical Gut Report</h2>
                      <p className="step-sub-desc">
                        Enter your details below to generate your personalized emotional scorecard and customized Indian nutrition recommendations.
                      </p>
                    </div>
                  </div>

                  <form
                    className="contact-fields-grid"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (formData.name.trim() && formData.phone.trim().length >= 8) {
                        setIsCalculated(true)
                        window.scrollTo({ top: 150, behavior: 'smooth' })
                      }
                    }}
                  >
                    <div className="form-field-group">
                      <label htmlFor="user-name" className="input-label">
                        <User size={15} />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        id="user-name"
                        type="text"
                        className="clinical-text-input"
                        placeholder="e.g. Ananya Iyer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="user-phone" className="input-label">
                        <Phone size={15} />
                        <span>WhatsApp Number * (For Instant Report Dispatch)</span>
                      </label>
                      <input
                        id="user-phone"
                        type="tel"
                        inputMode="tel"
                        className="clinical-text-input"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-field-group span-full">
                      <label htmlFor="user-email" className="input-label">
                        <Mail size={15} />
                        <span>Email Address (Optional)</span>
                      </label>
                      <input
                        id="user-email"
                        type="email"
                        className="clinical-text-input"
                        placeholder="e.g. ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group span-full">
                      <label htmlFor="user-goal" className="input-label">
                        <Compass size={15} />
                        <span>Primary Health Priority</span>
                      </label>
                      <select
                        id="user-goal"
                        className="clinical-select-input"
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

                    <div className="privacy-assurance-note span-full">
                      <ShieldCheck size={15} className="shield-icon" aria-hidden="true" />
                      <span>100% Confidential • Zero Spam Guarantee • Evidence-Led Nutrition Only</span>
                    </div>

                    <div className="wizard-action-footer dual-button-footer span-full">
                      <button
                        type="button"
                        className="btn-wizard-secondary"
                        onClick={() => setStep(2)}
                      >
                        <ArrowLeft size={16} strokeWidth={2.2} />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="btn-wizard-primary"
                        disabled={!formData.name.trim() || formData.phone.trim().length < 8}
                      >
                        <Sparkles size={17} strokeWidth={2.2} />
                        <span>Calculate My Gut Score</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: STICKY CLINICAL BAROMETER */}
            <aside className="assessment-sidebar-pane">
              <div className="sticky-sidebar-content">
                {/* Live Dynamic Score Gauge Card */}
                <div className="sidebar-gauge-card" style={{ borderColor: emotionTier.color }}>
                  <div
                    className="gauge-status-badge"
                    style={{ backgroundColor: emotionTier.bgTint, color: emotionTier.color }}
                  >
                    <EmotionIcon size={16} strokeWidth={2.5} />
                    <span>LIVE STATUS: {emotionTier.statusTag.toUpperCase()}</span>
                  </div>

                  <div className="gauge-circle-wrap">
                    <svg className="gauge-svg-ring" width="136" height="136" viewBox="0 0 136 136" aria-hidden="true">
                      <circle className="gauge-bg-ring" cx="68" cy="68" r="52" fill="none" strokeWidth="10" />
                      <circle
                        className="gauge-fill-ring"
                        cx="68"
                        cy="68"
                        r="52"
                        fill="none"
                        stroke={emotionTier.color}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="gauge-center-text">
                      <span className="gauge-big-num">{score}</span>
                      <span className="gauge-denom">/ 100</span>
                    </div>
                  </div>

                  <div className="gauge-tier-meta">
                    <span className="tier-emoji-icon">{emotionTier.emoji}</span>
                    <h3 className="tier-title" style={{ color: emotionTier.color }}>
                      {emotionTier.label}
                    </h3>
                    <p className="tier-mood-text">
                      <strong>Emotional State:</strong> {emotionTier.mood}
                    </p>
                    <p className="tier-desc-text">{emotionTier.shortDesc}</p>
                  </div>
                </div>

                {/* Specialist Clinical Credibility Card */}
                <div className="sidebar-credibility-card">
                  <div className="card-top-header">
                    <div className="avatar-seal" aria-hidden="true">
                      <span>MB</span>
                    </div>
                    <div className="avatar-meta">
                      <h4 className="specialist-name">Meenu Balaji, M.Sc.</h4>
                      <span className="specialist-role">Chief Clinical Nutritionist • 14+ Yrs</span>
                    </div>
                  </div>
                  <p className="specialist-philosophy">
                    "We don't do restrictive starvation or exotic diets. We look at your symptoms and rebuild digestion using delicious everyday Indian kitchen foods."
                  </p>
                  <div className="specialist-tags-row">
                    <span className="spec-badge">ICAR & UGC NET JRF</span>
                    <span className="spec-badge">Peer Reviewer EJN</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* =========================================================================
             3. RESULT DASHBOARD: CLINICAL REPORT, EMOTIONAL GAUGE, METRICS & ACTION
             ========================================================================= */
          <div className="assessment-report-dashboard animate-fadeIn">
            <div className="report-main-panel" style={{ borderColor: emotionTier.color }}>
              {/* Header Row: Score + Greeting */}
              <div className="report-header-banner">
                <div className="report-header-left">
                  <div
                    className="report-tier-pill"
                    style={{ backgroundColor: emotionTier.bgTint, color: emotionTier.color }}
                  >
                    <EmotionIcon size={18} strokeWidth={2.4} />
                    <span>{emotionTier.label}</span>
                  </div>

                  <h2 className="report-patient-greeting">
                    {formData.name ? `${formData.name}'s Digestive Report` : 'Your Personalized Gut Score'}
                  </h2>

                  <p className="report-mood-line">
                    <strong>Current Emotional Profile:</strong> {emotionTier.emoji} {emotionTier.mood}
                  </p>

                  <p className="report-summary-advice">{emotionTier.actionAdvice}</p>
                </div>

                <div className="report-header-right">
                  <div className="report-hero-gauge">
                    <svg className="report-gauge-svg" width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
                      <circle className="gauge-bg-ring" cx="80" cy="80" r="60" fill="none" strokeWidth="12" />
                      <circle
                        className="gauge-fill-ring"
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke={emotionTier.color}
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={(2 * Math.PI * 60) - (score / 100) * (2 * Math.PI * 60)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="gauge-center-text">
                      <span className="report-score-num">{score}</span>
                      <span className="report-score-denom">/ 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core 3 Biomarker Breakdown Cards */}
              <div className="report-metrics-grid">
                <div className="metric-pillar-box">
                  <div className="pillar-top-row">
                    <span className="pillar-title">
                      <Activity size={16} className="pillar-icon" />
                      Digestion & Motility
                    </span>
                    <span className="pillar-score" style={{ color: digestionScore >= 75 ? '#55883B' : '#9A6735' }}>
                      {digestionScore}%
                    </span>
                  </div>
                  <div className="pillar-progress-track">
                    <div
                      className="pillar-progress-fill"
                      style={{
                        width: `${digestionScore}%`,
                        backgroundColor: digestionScore >= 75 ? '#55883B' : '#9A6735'
                      }}
                    />
                  </div>
                  <span className="pillar-status-note">
                    {digestionScore >= 75 ? 'Optimal Gastric Breakdown' : 'Enzyme insufficiency & motility lag'}
                  </span>
                </div>

                <div className="metric-pillar-box">
                  <div className="pillar-top-row">
                    <span className="pillar-title">
                      <HeartPulse size={16} className="pillar-icon" />
                      Gut-Brain Axis & Energy
                    </span>
                    <span className="pillar-score" style={{ color: gutBrainScore >= 75 ? '#55883B' : '#9A6735' }}>
                      {gutBrainScore}%
                    </span>
                  </div>
                  <div className="pillar-progress-track">
                    <div
                      className="pillar-progress-fill"
                      style={{
                        width: `${gutBrainScore}%`,
                        backgroundColor: gutBrainScore >= 75 ? '#55883B' : '#9A6735'
                      }}
                    />
                  </div>
                  <span className="pillar-status-note">
                    {gutBrainScore >= 75 ? 'Stable Neuro-Gut Signaling' : 'Post-meal fatigue & focus dips'}
                  </span>
                </div>

                <div className="metric-pillar-box">
                  <div className="pillar-top-row">
                    <span className="pillar-title">
                      <Flame size={16} className="pillar-icon" />
                      Metabolic & Cravings
                    </span>
                    <span className="pillar-score" style={{ color: metabolicScore >= 75 ? '#55883B' : '#9A6735' }}>
                      {metabolicScore}%
                    </span>
                  </div>
                  <div className="pillar-progress-track">
                    <div
                      className="pillar-progress-fill"
                      style={{
                        width: `${metabolicScore}%`,
                        backgroundColor: metabolicScore >= 75 ? '#55883B' : '#9A6735'
                      }}
                    />
                  </div>
                  <span className="pillar-status-note">
                    {metabolicScore >= 75 ? 'Balanced Blood Sugar Cues' : 'Irregular sugar cravings & glucose spikes'}
                  </span>
                </div>
              </div>

              {/* Food-First Clinical Guidance Protocols */}
              <div className="report-food-protocol-box">
                <div className="protocol-box-header">
                  <Sparkles size={18} className="protocol-header-icon" />
                  <h3 className="protocol-box-title">Immediate Indian Food Recommendations for Your Score</h3>
                </div>
                <div className="protocols-four-grid">
                  {emotionTier.foodProtocols.map((item, idx) => (
                    <div key={idx} className="protocol-mini-card">
                      <span className="protocol-idx">0{idx + 1}</span>
                      <h4 className="protocol-name">{item.title}</h4>
                      <p className="protocol-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="report-actions-toolbar">
                <a
                  className="btn-action-wa"
                  href={wa(
                    `Hi Meenu, I just completed the Gut Health Assessment Quiz! My Gut Score is ${score}/100 (${emotionTier.label}). Primary Goal: ${formData.goal}. Name: ${formData.name}. I would love to review my symptoms with you.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={19} />
                  <span>Discuss Report on WhatsApp with Meenu</span>
                </a>

                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={openBook}
                >
                  <Calendar size={17} strokeWidth={2.2} />
                  <span>Book Free 15-Min Discovery Call</span>
                </button>

                <button
                  type="button"
                  className="btn-action-ghost"
                  onClick={handleRetake}
                >
                  <RotateCcw size={16} strokeWidth={2} />
                  <span>Retake Assessment</span>
                </button>
              </div>

              {/* Medical Disclaimer Footnote */}
              <div className="report-disclaimer-row">
                <Info size={14} className="disclaimer-icon" aria-hidden="true" />
                <p className="disclaimer-text">
                  *This quiz provides educational digestive insights based on clinical self-reported symptom patterns. It does not replace individual medical diagnostics.
                </p>
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
