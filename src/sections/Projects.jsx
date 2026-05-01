import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Layers3, MonitorSmartphone, Sparkles } from 'lucide-react'
import Section from '../components/Section.jsx'
import ThreeCard from '../components/ThreeCard.jsx'

const baseProjects = [
  {
    title: 'Raiseaticket - Web-Based Helpdesk Ticketing System',
    desc: 'A robust, customizable helpdesk platform that streamlines support workflows, enhances team collaboration, and enables efficient customer support operations with SLA tracking and automated notifications.',
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'AngularJS', 'PHP', 'MySQL', 'Redis', 'PHP Resque'],
    stack: {
      frontend: 'HTML5, CSS3, Bootstrap, AngularJS',
      backend: 'PHP',
      database: 'MySQL',
      microservices: 'Redis, PHP Resque'
    },
    contributions: [
      'Engineered ticket lifecycle management with dynamic status workflows, priority queues, and agent assignment logic. Implemented Redis-backed PHP Resque queues to process email alerts and SLA breach notifications asynchronously, eliminating timeout issues under high load.',
      'Built an AngularJS-driven dashboard with real-time ticket stats, agent performance metrics, and filterable report exports.'
    ],
    accent: 'from-cyan-300/20 via-indigo-300/15 to-violet-300/20',
    icon: Layers3
  },
  {
    title: 'M365 Backup Tool - Microsoft 365 Data Protection Platform',
    desc: 'An enterprise-grade backup solution that automates secure, granular protection of Microsoft 365 cloud data (emails, calendars, OneDrive files) and enables fast point-in-time recovery.',
    tags: [
      'ReactJS',
      'Tailwind CSS',
      'NodeJS',
      'MySQL',
      'MongoDB',
      'Redis',
      'Celery JS',
      'AWS S3',
      'Stripe API',
      'Odoo API'
    ],
    stack: {
      frontend: 'ReactJS, Tailwind CSS',
      backend: 'NodeJS',
      database: 'MySQL (user & subscription), MongoDB (metadata & logs)',
      microservices: 'Redis, Celery JS',
      cloudStorage: 'AWS S3',
      payment: 'Stripe API',
      erp: 'Odoo API'
    },
    contributions: [
      'Architected Celery JS worker queues on Redis to orchestrate parallel backup jobs across multiple M365 tenants without blocking the main application thread.',
      'Built a ReactJS + Tailwind CSS interface with granular restore controls, backup scheduling, and real-time job progress tracking.',
      'Integrated Stripe Payment Gateway for subscription billing with auto-renewal, usage-based invoicing, and webhook-driven payment event handling.',
      'Connected Odoo API for seamless ERP synchronization—automating customer onboarding, syncing subscription data, and triggering service provisioning workflows.',
      'Designed a dual-database strategy: MySQL for transactional/subscription data and MongoDB for high-volume, schema-flexible backup metadata and audit logs.'
    ],
    accent: 'from-emerald-300/18 via-cyan-300/12 to-indigo-300/18',
    icon: Sparkles
  },
  {
    title: 'Data Center Infrastructure Management (DCIM) System',
    desc: 'A comprehensive platform for monitoring and managing data center assets, providing real-time visibility into server health, resource utilization, and infrastructure capacity.',
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'AngularJS', 'PHP', 'MySQL', 'Redis', 'PHP Resque', 'Chart.js'],
    stack: {
      frontend: 'HTML5, CSS3, Bootstrap, AngularJS, Chart.js',
      backend: 'PHP',
      database: 'MySQL',
      microservices: 'Redis, PHP Resque'
    },
    contributions: [
      'Developed real-time dashboards visualizing CPU, memory, heat, and network metrics across data center nodes using AngularJS and Chart.js.',
      'Implemented PHP Resque background workers for periodic metric polling and threshold-based alert dispatch, reducing manual monitoring effort.',
      'Designed MySQL schema for asset inventory, rack management, and historical performance data with optimized indexing for fast reporting queries.'
    ],
    accent: 'from-violet-300/18 via-indigo-300/12 to-cyan-300/18',
    icon: MonitorSmartphone
  },
  {
    title: 'WordPress Customization - Avada Premium Theme',
    desc: 'Custom WordPress development using the Avada Premium theme framework, delivering tailored business websites with bespoke PHP plugins and client-specific functionality.',
    tags: ['WordPress', 'Avada', 'PHP', 'Plugins', 'Responsive', 'Performance'],
    stack: {
      platform: 'WordPress',
      theme: 'Avada Premium',
      backend: 'PHP'
    },
    contributions: [
      'Customized Avada theme layouts, templates, and Fusion Builder components to match precise client design requirements.',
      'Developed custom PHP plugins to extend WordPress core functionality, including custom post types, shortcodes, and third-party API integrations.',
      'Ensured cross-browser compatibility, responsive design, and page performance optimization for delivered WordPress sites.'
    ],
    accent: 'from-amber-300/16 via-rose-300/12 to-violet-300/16',
    icon: Sparkles
  }
]

export default function Projects() {
  const shouldReduceMotion = useReducedMotion()
  const projects = useMemo(() => baseProjects, [])
  const [activeKey, setActiveKey] = useState(null)
  const wrapRef = useRef(null)

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
      const root = wrapRef.current
      if (!root) return
      const modal = root.querySelector('[data-project-expanded="true"]')
      if (!modal) return
      if (modal.contains(e.target)) return
      setActiveKey(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [activeKey])

  const activeProject = activeKey ? projects.find((p) => p.title === activeKey) : null

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      subtitle="A selection of production systems I’ve built — with the stack and key contributions behind each project."
    >
      <div ref={wrapRef} className="relative">
        <AnimatePresence initial={false}>
          {activeProject ? (
            <motion.div
              key="project-inline-modal"
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
                  data-project-expanded="true"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto w-full max-w-4xl p-4 sm:p-6"
                >
                  <div className="rounded-3xl border border-white/10 bg-[#0b1220]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <activeProject.icon className="h-5 w-5 text-white/85" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{activeProject.title}</div>
                          <div className="mt-2 text-xs leading-relaxed text-white/65">{activeProject.desc}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveKey(null)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                        aria-label="Close project details"
                      >
                        <ArrowUpRight className="h-4 w-4 rotate-45" />
                      </button>
                    </div>

                    {activeProject.stack ? (
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <div className="text-[11px] font-semibold text-white/60">Stack</div>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {Object.entries(activeProject.stack).map(([k, v]) => (
                            <div key={k} className="text-xs text-white/65">
                              <span className="font-semibold text-white/75">
                                {k.replace(/([A-Z])/g, ' $1')}: 
                              </span>
                              <span>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {Array.isArray(activeProject.contributions) && activeProject.contributions.length ? (
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <div className="text-[11px] font-semibold text-white/60">Key Contributions</div>
                        <div className="mt-3 space-y-2">
                          {activeProject.contributions.map((c) => (
                            <div key={c} className="flex items-start gap-2 text-xs leading-relaxed text-white/70">
                              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {Array.isArray(activeProject.tags) && activeProject.tags.length ? (
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <div className="text-[11px] font-semibold text-white/60">Tech</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {activeProject.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <ThreeCard className="h-full">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.accent} opacity-60`} />
                <button
                  type="button"
                  onClick={() => setActiveKey(p.title)}
                  className="relative flex h-full w-full items-center justify-center rounded-2xl px-4 py-10 text-center outline-none"
                  aria-label={`Open details for ${p.title}`}
                >
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                </button>
              </ThreeCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
