import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Briefcase, ChevronDown, Dot, GraduationCap, X } from 'lucide-react'
import Section from '../components/Section.jsx'
import ThreeCard from '../components/ThreeCard.jsx'

const items = [
  {
    icon: Briefcase,
    title: 'Web Developer',
    org: 'Outrise Technologies (Fonicom Limited)',
    date: '2022 — Present',
    points: [
      'Experienced Web Developer (4+ years) specializing in building scalable, responsive web applications using ReactJS.',
      'Focused on clean UI, usability, and performance optimization.'
    ],
    details: [
      'Architected a secure SaaS backup platform integrating AWS S3 for scalable, durable object storage, enabling reliable backup and recovery of Microsoft 365 data.',
      'Implemented Stripe Payment Gateway for recurring subscription billing, automated renewals, and invoice generation, improving revenue reliability and reducing manual billing overhead.',
      'Designed a microservices architecture using Celery JS and PHP Resque with Redis to decouple heavy file compression, upload tasks, and background job processing from the main thread, achieving zero UI lag for end users.',
      'Built and maintained three full-stack products—a helpdesk ticketing system, an M365 backup tool, and a data center infrastructure management platform—across the complete SDLC.',
      'Developed real-time server monitoring dashboards using AngularJS, visualizing critical system metrics including CPU usage, memory consumption, and thermal performance.',
      'Optimized the PHP backend by refactoring complex MySQL queries, reducing report generation time by 40% and significantly improving application responsiveness.',
      'Implemented Resque with Redis for asynchronous background job processing, handling email notifications and SLA calculations to prevent server timeouts during peak traffic.',
      'Utilized MongoDB for unstructured metadata and log storage alongside MySQL for structured relational data, optimizing query performance across both database systems.',
      'Customized Avada Premium WordPress themes and developed custom PHP plugins to deliver tailored client business logic and extend platform functionality.',
      'Managed CI/CD pipelines using GitLab and Jenkins for automated builds, testing, and deployments, reducing release cycle time and improving team productivity.'
    ]
  },
  {
    icon: GraduationCap,
    title: 'Bachelor of Computer applications',
    org: '',
    date: '2018 — 2021',
    points: [
      'Focused on core computer science topics, including programming, data structures, algorithms, databases, and web development.',
      'Gained hands-on experience in software development and problem-solving.'
    ]
  }
]

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion()
  const [activeKey, setActiveKey] = useState(null)
  const resumeWrapRef = useRef(null)

  useEffect(() => {
    if (!activeKey) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveKey(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeKey])

  useEffect(() => {
    if (!activeKey) return
    const onDown = (e) => {
      const root = resumeWrapRef.current
      if (!root) return
      const modal = root.querySelector('[data-resume-expanded="true"]')
      if (!modal) return
      if (modal.contains(e.target)) return
      setActiveKey(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [activeKey])

  const activeItem = activeKey ? items.find((it) => `${it.title}-${it.date}` === activeKey) : null

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Resume"
      subtitle="A concise view of my experience and education — kept consistent with my existing portfolio content."
    >
      <div ref={resumeWrapRef} className="relative">
        <AnimatePresence initial={false}>
          {activeItem ? (
            <motion.div
              key="resume-inline-modal"
              className="pointer-events-auto"
              initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? false : { opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                <motion.div
                  data-resume-expanded="true"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto w-full max-w-3xl p-4 sm:p-6"
                >
                  <div className="rounded-3xl border border-white/10 bg-[#0b1220]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <activeItem.icon className="h-5 w-5 text-white/85" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{activeItem.title}</div>
                          <div className="mt-1 text-xs text-white/60">
                            {activeItem.org ? `${activeItem.org} · ` : ''}
                            {activeItem.date}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveKey(null)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                        aria-label="Close details"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-[11px] font-semibold text-white/60">Highlights</div>
                      <div className="mt-3 space-y-2">
                        {activeItem.details.map((p) => (
                          <div key={p} className="flex items-start gap-2 text-xs leading-relaxed text-white/70">
                            <Dot className="mt-0.5 h-4 w-4 text-white/40" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid gap-6 lg:grid-cols-3">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <ThreeCard className="h-full">
              {(() => {
                const key = `${it.title}-${it.date}`
                const isExpandable = Array.isArray(it.details) && it.details.length > 0
                const isOpen = activeKey === key

                return (
                  <div className="h-full">
                    <button
                      type="button"
                      onClick={isExpandable ? () => setActiveKey(key) : undefined}
                      className={
                        isExpandable
                          ? 'w-full cursor-pointer text-left outline-none'
                          : 'w-full cursor-default text-left outline-none'
                      }
                      aria-expanded={isExpandable ? isOpen : undefined}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <it.icon className="h-5 w-5 text-white/85" />
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-xs font-semibold text-white/60">{it.date}</div>
                          {isExpandable ? (
                            <motion.div
                              initial={false}
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                              className="rounded-lg border border-white/10 bg-white/5 p-1"
                              aria-hidden
                            >
                              <ChevronDown className="h-4 w-4 text-white/70" />
                            </motion.div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-sm font-semibold text-white">{it.title}</div>
                        {it.org ? <div className="mt-1 text-xs text-white/60">{it.org}</div> : null}
                      </div>

                      <div className="mt-4 space-y-2">
                        {it.points.map((p) => (
                          <div key={p} className="flex items-start gap-2 text-xs leading-relaxed text-white/70">
                            <Dot className="mt-0.5 h-4 w-4 text-white/40" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  </div>
                )
              })()}
            </ThreeCard>
          </motion.div>
        ))}
        </div>
      </div>
    </Section>
  )
}
