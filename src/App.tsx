import { MotionConfig } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Cursor } from './components/Cursor/Cursor'
import { Footer } from './components/Footer/Footer'
import { ScrollProgress } from './components/Motion/ScrollProgress'
import { Navbar } from './components/Navbar/Navbar'
import { Preloader } from './components/Preloader/Preloader'
import { setLenis } from './lib/scroll'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()
  const done = useCallback(() => setLoading(false), [])

  // Smooth scrolling, kept in sync with GSAP ScrollTrigger.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // Lock scrolling during the intro.
  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : ''
    if (!loading) ScrollTrigger.refresh()
  }, [loading])

  // New route: start at the top and let pinned sections re-measure.
  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[10001] rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      {loading && <Preloader onDone={done} />}
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Home ready={!loading} />} />
      </Routes>
      <Footer />
    </MotionConfig>
  )
}
