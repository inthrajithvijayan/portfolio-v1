import { useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Timeline from './sections/Timeline.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (shouldReduceMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: true
    })

    lenisRef.current = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [shouldReduceMotion])

  const sections = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'contact', label: 'Contact' }
    ],
    []
  )

  return (
    <div className="min-h-screen">
      <Navbar sections={sections} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />

        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.55]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(130,177,255,0.18),transparent_55%)] blur-2xl" />
          <div className="absolute right-[-10rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(155,107,255,0.16),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-[-12rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.10),transparent_60%)] blur-2xl" />
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
