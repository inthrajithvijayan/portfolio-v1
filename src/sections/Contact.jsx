import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import Section from '../components/Section.jsx'
import ThreeCard from '../components/ThreeCard.jsx'

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'someone'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const to = 'inthrajithvijayan47@gmail.com'

    setStatus('sending')
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
    setTimeout(() => setStatus('idle'), 600)
    form.reset()
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something great"
      subtitle="Have a project in mind or want to collaborate? Send a message and I’ll get back to you."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ThreeCard className="h-full">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-xs font-semibold text-white/75">Name</div>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/7"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <div className="text-xs font-semibold text-white/75">Email</div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/7"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <div className="text-xs font-semibold text-white/75">Message</div>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/7"
                  placeholder="Tell me about your project..."
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-white/15"
              >
                <Send className="h-4 w-4" />
                <span>{status === 'sending' ? 'Opening email…' : 'Send message'}</span>
              </button>
            </form>
          </ThreeCard>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-6">
            <ThreeCard>
              <div className="text-xs font-semibold text-white/85">Social</div>
              <div className="mt-4 grid gap-3">
                <a
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  href="https://github.com/inthrajithvijayan"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </span>
                  <span className="text-xs text-white/50">@inthrajith</span>
                </a>
                <a
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  href="https://www.linkedin.com/in/inthrajith-vijayan-533062132/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </span>
                  <span className="text-xs text-white/50">Connect</span>
                </a>
                <a
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  href="mailto:inthrajithvijayan47@gmail.com"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </span>
                  <span className="text-xs text-white/50">inthrajithvijayan47@gmail.com</span>
                </a>
              </div>
            </ThreeCard>

            <ThreeCard>
              <div className="text-xs font-semibold text-white/85">What I can help with</div>
              <div className="mt-3 grid gap-2 text-xs text-white/70">
                <div>High-end portfolio / landing pages</div>
                <div>React app UI engineering & design systems</div>
                <div>Animation & interaction design (Framer Motion / GSAP)</div>
                <div>Performance audits & UX polish</div>
              </div>
            </ThreeCard>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
