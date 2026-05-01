import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from './Container.jsx'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ sections }) {
  const shouldReduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = useMemo(() => sections ?? [], [sections])

  return (
    <div className="sticky top-0 z-50">
      <div
        className={`border-b border-white/10 ${
          scrolled ? 'bg-ink-900/70 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <Container className="py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-left"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-300 to-indigo-300 shadow-[0_0_0_2px_rgba(255,255,255,0.08)]" />
              <span className="font-display text-sm font-semibold tracking-tight text-white">
                Inthrajith vijayan
              </span>
              <span className="text-xs text-white/55 group-hover:text-white/70">Portfolio</span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {items.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  className="rounded-full px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {s.label}
                </button>
              ))}
              <a
                href="#contact"
                className="ml-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-white/15"
              >
                Let’s talk
              </a>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {open ? (
        <motion.div
          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="border-b border-white/10 bg-ink-900/85 backdrop-blur-xl md:hidden"
        >
          <Container className="py-3">
            <div className="flex flex-col gap-1">
              {items.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    scrollToId(s.id)
                    setOpen(false)
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium text-white/80 transition hover:bg-white/5"
                >
                  {s.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-glow"
              >
                Let’s talk
              </a>
            </div>
          </Container>
        </motion.div>
      ) : null}
    </div>
  )
}
