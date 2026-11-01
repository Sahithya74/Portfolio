import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navLinks, personal } from '../../data/personal'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { getLenis, scrollToId } from '../../lib/scroll'
import { GithubIcon, LinkedinIcon } from '../Icons/Brand'
import { Magnetic } from '../Motion/Magnetic'

const ids = navLinks.map((l) => l.id)

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 500 && !open)
  })

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    if (onHome) setTimeout(() => scrollToId(id), open ? 350 : 0)
    else navigate('/', { state: { scrollTo: id } })
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5"
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 md:px-4 ${
            open ? 'border border-transparent text-[#F5F0E8]' : scrolled || !onHome ? 'glass shadow-[var(--shadow)]' : 'border border-transparent'
          }`}
        >
          <button
            type="button"
            onClick={() => go('top')}
            className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-3"
            aria-label="Sahithya K. — back to top"
          >
            <span className="metal-bg relative grid h-9 w-9 place-items-center overflow-hidden rounded-full font-display text-base italic text-[#29272D] transition-transform duration-700 group-hover:rotate-[360deg]">
              {personal.initials}
            </span>
            <span className="hidden font-display text-lg sm:inline">
              Sahithya<span className="text-lavender">.</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = onHome && active === link.id
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative px-4 py-2 text-sm"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 block overflow-hidden transition-colors ${isActive ? 'text-bg' : ''}`}>
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span className="absolute inset-0 block translate-y-full italic text-lavender transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 font-display">
                        {link.label}
                      </span>
                    </span>
                    {!isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-px origin-right scale-x-0 bg-lavender transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid h-10 w-10 place-items-center rounded-full border border-line"
              whileTap={{ scale: 0.85 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -120, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 120, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.35 }}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <div className="hidden md:block">
              <Magnetic>
              <button
                type="button"
                onClick={() => go('contact')}
                className="group relative overflow-hidden rounded-full bg-ink px-5 py-2.5 text-sm text-bg"
              >
                <span className="metal-bg absolute inset-0 translate-y-full rounded-full transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative z-10 transition-colors group-hover:text-[#29272D]">Let&apos;s Talk</span>
              </button>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-ink lg:hidden"
            >
              <motion.span className="absolute h-[1.5px] w-4 bg-bg" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
              <motion.span className="absolute h-[1.5px] w-4 bg-bg" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#29272D] px-6 pb-10 pt-28 text-[#F5F0E8] lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            <ul className="relative space-y-2">
              {navLinks.map((link, i) => (
                <li key={link.id} className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={() => go(link.id)}
                    className="flex w-full items-baseline gap-4 py-1 text-left font-display text-5xl sm:text-6xl"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-mono text-xs text-lavender">0{i + 1}</span>
                    <span className={active === link.id ? 'metal-text italic' : ''}>{link.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              className="relative flex items-center justify-between border-t border-white/15 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <span className="font-mono text-xs tracking-widest text-[#C7C5CA]">{personal.headline}</span>
              <div className="flex gap-3">
                <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-white/20">
                  <GithubIcon />
                </a>
                <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-white/20">
                  <LinkedinIcon />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
