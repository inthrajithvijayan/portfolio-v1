import Container from './Container.jsx'

export default function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
      <Container>
        <div className="mb-10 sm:mb-12">
          {eyebrow ? (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
              <span>{eyebrow}</span>
            </div>
          ) : null}
          {title ? (
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  )
}
