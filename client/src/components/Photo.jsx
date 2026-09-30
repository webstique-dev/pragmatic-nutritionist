import { Zap, Activity } from 'lucide-react'

// Photography & Rich Visual placeholder component
export default function Photo({
  label,
  src,
  warm = false,
  aspectRatio,
  badge,
  className = '',
  style = {},
  children
}) {
  const combinedStyle = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style
  }

  if (src) {
    return (
      <div className={`photo-wrapper ${className}`} style={combinedStyle}>
        <img className="photo-img" src={src} alt={label || 'Visual illustration'} loading="lazy" />
        {children}
      </div>
    )
  }

  return (
    <div
      className={`photo-card ${warm ? 'photo-warm' : 'photo-cool'} ${className}`}
      style={combinedStyle}
      role="img"
      aria-label={label || 'Nutrition and health visual'}
    >
      <div className="photo-mesh" aria-hidden="true" />
      <div className="photo-inner">
        {badge && <span className="photo-badge">{badge}</span>}
        <div className="photo-content">
          <div className="photo-icon" aria-hidden="true">
            {warm ? (
              <Zap size={28} strokeWidth={1.75} />
            ) : (
              <Activity size={28} strokeWidth={1.75} />
            )}
          </div>
          <span className="photo-label">{label}</span>
          <small className="photo-note">Evidence-based nutrition • Meenu Balaji</small>
        </div>
      </div>
      {children}
    </div>
  )
}
