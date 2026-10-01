import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.01, rootMargin: '200px 0px 200px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Component
      ref={ref}
      className={`reveal-wrapper ${isVisible ? 'is-revealed' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  )
}
