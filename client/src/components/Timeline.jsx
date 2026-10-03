import { useEffect, useRef, useState } from 'react'
import { STEPS } from '../data/site'
import Section from './Section'

export default function Timeline() {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const [activeStep, setActiveStep] = useState(1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index)
            setActiveStep((prev) => Math.max(prev, index + 1))
          }
        })
      },
      { threshold: 0.4 }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Section
      id="how-it-works"
      width="wide"
      bg="brand"
      eyebrow="STRUCTURED METHODOLOGY"
      title="Your Path to Lasting Vitality"
      lead="A clear, three-phase clinical process focused on root-cause diagnosis, habit coaching, and continuous support."
    >
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">AUDIT.</span>
        <span className="divider-line" />
        <span className="divider-label">TRANSFORMATION.</span>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-grid">
          {STEPS.map(([title, desc], idx) => {
            const isCompleted = idx + 1 <= activeStep
            const isCurrent = idx + 1 === activeStep

            return (
              <div
                key={title}
                data-index={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                className={`timeline-step-card ${isCompleted ? 'step-active' : ''} ${isCurrent ? 'step-current' : ''}`}
              >
                <div className="step-card-header">
                  <span className="step-num-editorial">(0{idx + 1})</span>
                  <span className="step-phase-tag">PHASE 0{idx + 1}</span>
                </div>

                <h3 className="step-card-title">{title}</h3>
                <p className="step-card-desc">{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
