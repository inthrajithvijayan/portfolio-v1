import Container from '../components/Container.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col justify-between gap-3 text-xs text-white/55 sm:flex-row sm:items-center">
          <div>© {year} Inthrajith. All rights reserved.</div>
          <div className="text-white/45">Built with React · Motion · 3D · Performance</div>
        </div>
      </Container>
    </footer>
  )
}
