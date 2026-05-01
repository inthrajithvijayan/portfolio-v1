import { useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export default function ThreeCard({ className = '', children }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const handlers = useMemo(() => {
    if (shouldReduceMotion) {
      return {}
    }

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = clamp((0.5 - py) * 12, -10, 10)
      const ry = clamp((px - 0.5) * 14, -12, 12)
      el.style.setProperty('--rx', `${rx}deg`)
      el.style.setProperty('--ry', `${ry}deg`)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }

    const onLeave = () => {
      const el = ref.current
      if (!el) return
      el.style.setProperty('--rx', `0deg`)
      el.style.setProperty('--ry', `0deg`)
      el.style.setProperty('--mx', `50%`)
      el.style.setProperty('--my', `50%`)
    }

    return { onMouseMove: onMove, onMouseLeave: onLeave }
  }, [shouldReduceMotion])

  return (
    <motion.div
      ref={ref}
      {...handlers}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))'
      }}
      className={`relative rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-glow transition-[transform] duration-200 will-change-transform ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 [background:radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(130,177,255,0.14),transparent_55%)] group-hover:opacity-100"
      />
      <div style={{ transform: 'translateZ(22px)' }} className="relative">
        {children}
      </div>
    </motion.div>
  )
}
