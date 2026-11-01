import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { About } from '../components/About/About'
import { QuoteBand } from '../components/About/QuoteBand'
import { Beyond } from '../components/Beyond/Beyond'
import { Contact } from '../components/Contact/Contact'
import { Education } from '../components/Education/Education'
import { Experience } from '../components/Experience/Experience'
import { Hero } from '../components/Hero/Hero'
import { Philosophy } from '../components/Philosophy/Philosophy'
import { Playground } from '../components/Playground/Playground'
import { Process } from '../components/Projects/Process'
import { Projects } from '../components/Projects/Projects'
import { Skills } from '../components/Skills/Skills'
import { scrollToId } from '../lib/scroll'

export function Home({ ready }: { ready: boolean }) {
  const location = useLocation()

  // Arriving from a case-study page with a target section.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target || !ready) return
    const t = setTimeout(() => scrollToId(target), 150)
    window.history.replaceState({}, '')
    return () => clearTimeout(t)
  }, [location.state, ready])

  return (
    <main id="main">
      <Hero ready={ready} />
      <QuoteBand />
      <About />
      <Projects />
      <Process />
      <Skills />
      <Experience />
      <Education />
      <Beyond />
      <Philosophy />
      <Playground />
      <Contact />
    </main>
  )
}
