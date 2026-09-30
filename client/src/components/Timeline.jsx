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
      width="medium"
      bg="sage"
      eyebrow="HOW IT WORKS"
      title="3 Steps to Your Transformation"
      lead="A structured three-step methodology designed for clarity, root-cause resolution, and continuous chat support."
    >
      <div className="timeline-container" ref={containerRef}>
        {/* Desktop timeline line indicator */}
        <div className="timeline-desktop-line" aria-hidden="true">
          <div
            className="timeline-progress-fill"
            style={{ width: `${((activeStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        <div className="timeline-grid">
          {STEPS.map(([title, desc], idx) => {
            const isCompleted = idx + 1 <= activeStep
            const isCurrent = idx + 1 === activeStep

            return (
              <div
                key={title}
                data-index={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                className={`timeline-step ${isCompleted ? 'step-active' : ''} ${isCurrent ? 'step-current' : ''}`}
              >
                <div className="step-node-wrapper">
                  <div className="step-node">
                    <span className="step-number">{idx + 1}</span>
                  </div>
                </div>

                <div className="step-card">
                  <span className="step-badge">STEP 0{idx + 1}</span>
                  <h3 className="step-title">{title}</h3>
                  <p className="step-desc">{desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
