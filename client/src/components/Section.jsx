import Reveal from './Reveal'

export default function Section({
  id,
  title,
  lead,
  eyebrow,
  width = 'wide',
  bg = 'cream',
  tight = false,
  className = '',
  style,
  children
}) {
  const bgClass = `bg-${bg}`
  const widthClass = `sec-${width}`
  const tightClass = tight ? 'sec-tight' : ''

  return (
    <section id={id} className={`section ${bgClass} ${tightClass} ${className}`.trim()} style={style}>
      <div className={`section-inner ${widthClass}`}>
        {(title || lead || eyebrow) && (
          <Reveal className="section-header">
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            {title && <h2 className="section-title">{title}</h2>}
            {lead && <p className="lead">{lead}</p>}
          </Reveal>
        )}
        <Reveal delay={150}>
          {children}
        </Reveal>
      </div>
    </section>
  )
}
