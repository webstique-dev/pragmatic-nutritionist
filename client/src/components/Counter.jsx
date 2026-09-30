import { useEffect, useRef, useState } from 'react'

export default function Counter({ to, suffix = '', prefix = '', label }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          o.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!on) return
    let i = 0
    const steps = 40
    const stepTime = 30
    const id = setInterval(() => {
      i++
      setN(Math.round(to * Math.min(i / steps, 1)))
      if (i >= steps) clearInterval(id)
    }, stepTime)
    return () => clearInterval(id)
  }, [on, to])

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-number">
        {prefix}
        {n}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
