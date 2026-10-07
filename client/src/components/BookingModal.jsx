import { useState, useEffect, useRef } from 'react'
import { X, ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { GOALS, wa } from '../data/site'

export default function BookingModal({ onClose }) {
  const [step, setStep] = useState(0)
  const [service, setService] = useState('')
  const [slot, setSlot] = useState('')
  const [name, setName] = useState('')
  const modalRef = useRef(null)

  // Calculate next 3 days
  const days = Array.from({ length: 3 }, (_, n) => {
    const d = new Date()
    d.setDate(d.getDate() + n + 1)
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  })

  const timeSlots = ['10:00 AM', '12:30 PM', '04:00 PM', '06:30 PM']
  const allSlots = days.flatMap((d) => timeSlots.map((t) => `${d} • ${t}`))

  // Keyboard trap and Escape handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-step-title"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close button */}
        <div className="modal-header">
          <div className="modal-step-indicator">
            <span className="step-pill">Step {step + 1} of 3</span>
            <div className="modal-progress-bar">
              <div
                className="modal-progress-fill"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} strokeWidth={2.25} />
          </button>
        </div>

        {/* Modal Body Steps */}
        <div className="modal-body">
          {step === 0 && (
            <div className="modal-step-pane">
              <h3 id="modal-step-title" className="modal-heading">What would you like to address?</h3>
              <p className="modal-sub">Select your primary health or athletic goal to personalize your call.</p>

              <div className="modal-options-list">
                {GOALS.map((goal) => {
                  const isSelected = service === goal
                  return (
                    <button
                      key={goal}
                      type="button"
                      className={`modal-opt-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => {
                        setService(goal)
                        setStep(1)
                      }}
                    >
                      <span className="opt-title">{goal}</span>
                      <span className="opt-radio" aria-hidden="true">
                        {isSelected ? (
                          <CheckCircle2 size={18} strokeWidth={2.5} className="text-moss" />
                        ) : (
                          <Circle size={18} strokeWidth={1.5} className="text-line" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="modal-step-pane">
              <h3 id="modal-step-title" className="modal-heading">Select a preferred time slot</h3>
              <p className="modal-sub">Free 15-minute 1-on-1 discovery call with Meenu Balaji.</p>

              <div className="modal-slots-grid">
                {allSlots.map((timeSlot) => (
                  <button
                    key={timeSlot}
                    type="button"
                    className={`slot-chip ${slot === timeSlot ? 'is-selected' : ''}`}
                    onClick={() => setSlot(timeSlot)}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>

              <div className="modal-action-row">
                <button
                  type="button"
                  className="btn btn-primary btn-block modal-primary-cta"
                  disabled={!slot}
                  onClick={() => setStep(2)}
                >
                  <span>Continue to Confirmation</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
                <button type="button" className="btn btn-ghost btn-block modal-back-btn" onClick={() => setStep(0)}>
                  <ArrowLeft size={15} strokeWidth={2.5} />
                  <span>Back</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="modal-step-pane">
              <h3 id="modal-step-title" className="modal-heading">Confirm your discovery call</h3>
              <p className="modal-sub">Review your session details and enter your name to dispatch your invitation.</p>

              <div className="booking-summary-card">
                <div className="summary-row">
                  <span className="summary-label">Goal:</span>
                  <strong className="summary-value">{service || 'Gut Health & Clinical Care'}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Slot:</span>
                  <strong className="summary-value">{slot}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Format:</span>
                  <span className="summary-value">1-on-1 Video / Phone Consultation</span>
                </div>
              </div>

              <div className="modal-form-group">
                <label htmlFor="booking-name" className="modal-input-label">Your Full Name *</label>
                <input
                  id="booking-name"
                  type="text"
                  className="modal-text-input"
                  placeholder="e.g. Ananya Iyer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="modal-action-row">
                <a
                  className={`btn btn-wa btn-block btn-no-underline modal-wa-cta ${!name.trim() ? 'disabled' : ''}`}
                  href={wa(`Hi Meenu, I would like to confirm my free discovery call.\n• Goal: ${service || 'Gut Health'}\n• Slot: ${slot}\n• Name: ${name}`)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ pointerEvents: name.trim() ? 'auto' : 'none', opacity: name.trim() ? 1 : 0.45 }}
                >
                  <WhatsAppIcon size={18} />
                  <span>Confirm on WhatsApp</span>
                </a>
                <button type="button" className="btn btn-ghost btn-block modal-back-btn" onClick={() => setStep(1)}>
                  <ArrowLeft size={15} strokeWidth={2.5} />
                  <span>Change Slot</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

