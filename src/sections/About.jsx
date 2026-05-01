import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Code2, Gauge, Sparkles } from 'lucide-react'
import Section from '../components/Section.jsx'
import ThreeCard from '../components/ThreeCard.jsx'

export default function About() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [120, 980], [shouldReduceMotion ? 0 : 18, shouldReduceMotion ? 0 : -18])

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Design-first engineering"
      subtitle="I build clean interfaces with crisp micro-interactions and scalable component systems — focused on user delight and measurable performance."
    >
      <motion.div style={{ y }} className="grid gap-6 lg:grid-cols-3">
        <ThreeCard className="group lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm font-semibold text-white">Hi, I’m Inthrajith.</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  Hello! I’m Inthrajith vijayan. Web Developer. I have experience in web application
                  developing, also I am good at wordpress.
                </div>
              </div>
              <div className="hidden shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white/80 sm:block">
                UI · Motion · DX
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { k: 'Name', v: 'Inthrajith vijayan' },
                { k: 'Citizenship', v: 'India' },
                { k: 'Age', v: '25' },
                { k: 'Residence', v: 'Puducherry' },
                { k: 'Job', v: 'Web Developer' },
                { k: 'Email', v: 'inthrajithvijayan47@gmail.com' }
              ].map((row) => (
                <div key={row.k} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[11px] font-semibold text-white/60">{row.k}</div>
                  <div className="mt-1 text-xs font-semibold text-white/85">{row.v}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/85">
                  <Sparkles className="h-4 w-4 text-cyan-200" />
                  <span>UX polish</span>
                </div>
                <div className="mt-2 text-xs leading-relaxed text-white/65">
                  Micro-interactions, feedback loops, and clarity.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/85">
                  <Gauge className="h-4 w-4 text-emerald-200" />
                  <span>Performance</span>
                </div>
                <div className="mt-2 text-xs leading-relaxed text-white/65">
                  Smooth scrolling, optimized rendering, accessible motion.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/85">
                  <Code2 className="h-4 w-4 text-indigo-200" />
                  <span>Craft</span>
                </div>
                <div className="mt-2 text-xs leading-relaxed text-white/65">
                  Clean code, strong architecture, maintainable systems.
                </div>
              </div>
            </div>
          </div>
        </ThreeCard>

        <ThreeCard className="group">
          <div className="text-xs font-semibold text-white/85">Core strengths</div>
          <div className="mt-4 space-y-3">
            {[
              { label: 'React UI engineering', value: 'Component systems, state patterns, performance' },
              { label: 'Motion design', value: 'Scroll storytelling, hover depth, transitions' },
              { label: 'Product thinking', value: 'User journeys, accessibility, clarity' }
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="text-xs font-semibold text-white/85">{item.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/65">{item.value}</div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white/10 px-4 py-3 text-xs font-semibold text-white shadow-glow transition hover:bg-white/15"
          >
            Build something together
          </a>
        </ThreeCard>
      </motion.div>
    </Section>
  )
}
