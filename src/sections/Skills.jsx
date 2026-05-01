import { motion, useReducedMotion } from 'framer-motion'
import {
  Braces,
  Database,
  Layers,
  Layout,
  Palette,
  Rocket,
  ShieldCheck,
  Wand2
} from 'lucide-react'
import Section from '../components/Section.jsx'
import ThreeCard from '../components/ThreeCard.jsx'

const skills = [
  { icon: Layout, label: 'ReactJS', level: 90, hint: 'Scalable UI and component-driven development' },
  { icon: Braces, label: 'NodeJS', level: 90, hint: 'APIs, services, and integration work' },
  { icon: Layers, label: 'PHP', level: 80, hint: 'Backend development and legacy systems' },
  { icon: Database, label: 'MySQL', level: 90, hint: 'Relational data modeling and queries' },
  { icon: ShieldCheck, label: 'MongoDB', level: 80, hint: 'Document modeling and aggregation basics' }
]

const knowledge = [
  'Stripe API',
  'PayPal API',
  'ODoo API',
  'Postman API',
  'AWS S3',
  'Wasabi S3',
  'Blackblaze S3',
  'Kafka JS',
  'Celery JS',
  'PHP Resque',
  'Redis',
  'Jenkins',
  'Git & Gitlab'
]

function Bar({ level }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-indigo-300/70 to-violet-300/70"
        initial={shouldReduceMotion ? false : { width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tech stack & strengths"
      subtitle="A snapshot of the tools and technologies I use regularly — plus platforms and APIs I’ve worked with in production."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <ThreeCard key={s.label} className="group">
            <div className="flex items-start justify-between gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <s.icon className="h-5 w-5 text-white/85" />
              </div>
              <div className="text-xs font-semibold text-white/70">{s.level}%</div>
            </div>
            <div className="mt-4 text-sm font-semibold text-white">{s.label}</div>
            <div className="mt-1 text-xs text-white/60">{s.hint}</div>
            <div className="mt-4">
              <Bar level={s.level} />
            </div>
          </ThreeCard>
        ))}

        <ThreeCard className="sm:col-span-2 lg:col-span-3">
          <div className="text-xs font-semibold text-white/85">Knowledge</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {knowledge.map((k) => (
              <span
                key={k}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70"
              >
                {k}
              </span>
            ))}
          </div>
        </ThreeCard>
      </div>
    </Section>
  )
}
