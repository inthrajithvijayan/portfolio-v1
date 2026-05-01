import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Container from '../components/Container.jsx'

function Starfield() {
  const points = useMemo(() => {
    const count = 1400
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = -Math.random() * 14
    }
    return arr
  }, [])

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
      <Points positions={points} stride={3} frustumCulled>
        <PointMaterial
          transparent
          size={0.02}
          depthWrite={false}
          color="#9bbcff"
          opacity={0.85}
          sizeAttenuation
        />
      </Points>
    </Float>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, shouldReduceMotion ? 0 : 110])
  const opacity = useTransform(scrollY, [0, 550], [1, shouldReduceMotion ? 1 : 0.72])
  const previewRef = useRef(null)

  useEffect(() => {
    if (shouldReduceMotion) return
    const el = previewRef.current
    if (!el) return

    const qx = gsap.quickTo(el, 'rotationX', { duration: 0.35, ease: 'power3.out' })
    const qy = gsap.quickTo(el, 'rotationY', { duration: 0.35, ease: 'power3.out' })
    const qz = gsap.quickTo(el, 'z', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = (0.5 - py) * 10
      const ry = (px - 0.5) * 12
      qx(rx)
      qy(ry)
      qz(18)
    }

    const onLeave = () => {
      qx(0)
      qy(0)
      qz(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [shouldReduceMotion])

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(130,177,255,0.18),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-0 [mask-image:radial-gradient(600px_380px_at_50%_10%,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="relative">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                <span>Available for freelance & full-time</span>
              </motion.div>

              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              >
                Inthrajith Vijayan
                <span className="mt-3 block bg-gradient-to-r from-cyan-200 via-indigo-200 to-violet-200 bg-clip-text text-transparent">
                  Web Developer
                </span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
              >
                4+ years building performant, elegant web experiences. I craft modern UIs,
                animation-rich interactions, and scalable front-end architectures.
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-white/15"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-white"
                >
                  Contact me
                </a>

                <div className="ml-0 flex items-center gap-2 sm:ml-2">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:inthrajithvijayan47@gmail.com"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>

              <div className="mt-12 flex items-center gap-2 text-xs text-white/55">
                <ArrowDown className="h-4 w-4" />
                <span>Scroll for the story</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/15 via-indigo-400/10 to-violet-400/15 blur-2xl" />
              <motion.div
                ref={previewRef}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-glow"
              >
                <div className="aspect-[4/5] w-full">
                  <Canvas
                    dpr={[1, 1.6]}
                    camera={{ position: [0, 0, 5.2], fov: 55 }}
                    gl={{ antialias: true, alpha: true }}
                  >
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.7} />
                      <directionalLight position={[2, 3, 4]} intensity={1.1} />
                      <Starfield />
                    </Suspense>
                  </Canvas>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-white/85">Focus</div>
                        <div className="mt-1 text-xs text-white/60">
                          React, UI engineering, motion, performance
                        </div>
                      </div>
                      <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/85">
                        4+ years
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  )
}
