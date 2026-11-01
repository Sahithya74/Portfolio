import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { personal } from '../../data/personal'
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { scrollToId } from '../../lib/scroll'
import { GithubIcon, LinkedinIcon } from '../Icons/Brand'
import { Magnetic } from '../Motion/Magnetic'
import { MorphBlob } from '../Motion/MorphBlob'
import { Particles } from '../Motion/Particles'
import { SplitText } from '../Motion/SplitText'

const HeroScene = lazy(() => import('./HeroScene'))

const ease = [0.22, 1, 0.36, 1] as const

/** Cycles through the professional roles with a vertical flip. */
function RoleTicker({ start }: { start: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!start) return
    const id = setInterval(() => setI((n) => (n + 1) % personal.roles.length), 2400)
    return () => clearInterval(id)
  }, [start])
  return (
    <span className="relative inline-flex h-6 w-[13.5rem] items-center overflow-hidden" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={personal.roles[i]}
          className="block whitespace-nowrap font-display text-base italic text-plum"
          initial={{ y: 18, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -18, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease }}
        >
          {personal.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Offsets a parallax layer by the smoothed pointer position times its depth. */
function useLayer(sx: MotionValue<number>, sy: MotionValue<number>, depth: number) {
  return {
    x: useTransform(sx, (v) => v * depth),
    y: useTransform(sy, (v) => v * depth),
  }
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const desktop = useIsDesktop()
  const reduce = usePrefersReducedMotion()

  // Pointer-driven parallax layers
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const far = useLayer(sx, sy, -18)
  const mid = useLayer(sx, sy, 26)
  const near = useLayer(sx, sy, -40)
  const photoRotY = useTransform(sx, [-1, 1], [-8, 8])
  const photoRotX = useTransform(sy, [-1, 1], [6, -6])

  // Cursor-responsive gradient spotlight
  const gx = useMotionValue(50)
  const gy = useMotionValue(40)
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${gx}% ${gy}%, rgba(216,201,229,0.55), transparent 60%)`

  // Scroll: content drifts and fades, photo scales down
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const nameX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  // Fetch the 3D chunk while the preloader is still on screen.
  useEffect(() => {
    if (desktop && !reduce) void import('./HeroScene')
  }, [desktop, reduce])

  const onMove = (e: React.PointerEvent) => {
    if (!desktop) return
    const r = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    mx.set(nx * 2 - 1)
    my.set(ny * 2 - 1)
    gx.set(nx * 100)
    gy.set(ny * 100)
  }

  const go = (state: boolean) => (state ? 'show' : 'hidden')

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      aria-label="Introduction"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 md:pt-32"
    >
      {/* ── Background layers ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--purple),transparent_55%),radial-gradient(ellipse_at_bottom_left,var(--taupe),transparent_60%)] opacity-80" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="grid-lines absolute inset-0 opacity-60" />
        <motion.div style={far} className="absolute -left-40 top-10 h-[34rem] w-[34rem] opacity-50 blur-2xl">
          <MorphBlob id="hero-a" className="h-full w-full" duration={16} />
        </motion.div>
        <motion.div style={mid} className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] opacity-40 blur-2xl">
          <MorphBlob id="hero-b" className="h-full w-full" duration={20} gradient={['#C7C5CA', '#EAE3DA']} />
        </motion.div>
        <Particles count={55} />
        {/* Animated decorative lines */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <motion.path
            d="M-20 700 C 300 560, 520 820, 860 640 S 1300 420, 1460 520"
            fill="none"
            stroke="var(--lavender)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={ready ? { pathLength: 1, opacity: 0.8 } : {}}
            transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.path
            d="M-20 240 C 260 120, 600 360, 900 200 S 1280 60, 1460 160"
            fill="none"
            stroke="var(--silver)"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={ready ? { pathLength: 1 } : {}}
            transition={{ duration: 3, ease: 'easeInOut', delay: 0.8 }}
          />
        </svg>
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* ── Text column ── */}
        <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="relative z-10 lg:col-span-7">
          <motion.div
            className="glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-ink text-bg">
              <span className="absolute inset-0 rounded-full bg-lavender" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
              <Sparkles className="relative h-3.5 w-3.5" />
            </span>
            <span className="text-sm">
              <RoleTicker start={ready} />
            </span>
          </motion.div>

          <h1 className="display select-none text-[clamp(3.4rem,12.5vw,10.5rem)] leading-[0.82]" aria-label={personal.name}>
            <motion.span className="block" style={reduce ? undefined : { x: nameX }}>
              {ready && <SplitText text="SAHITHYA" inView={false} hover stagger={0.06} delay={0.15} />}
              {!ready && <span className="invisible">SAHITHYA</span>}
            </motion.span>
            <span className="flex items-end gap-4">
              {ready ? (
                <SplitText text="K." inView={false} hover effect="flip" delay={0.65} className="metal-text italic" />
              ) : (
                <span className="invisible">K.</span>
              )}
              <motion.span
                aria-hidden
                className="mb-[0.18em] hidden h-[2px] flex-1 origin-left bg-gradient-to-r from-ink/60 via-lavender to-transparent sm:block"
                initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, ease, delay: 0.9 }}
              />
            </span>
          </h1>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1 } } }}
            initial="hidden"
            animate={go(ready)}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
              className="mt-8 font-display text-[clamp(1.4rem,2.8vw,2.2rem)] italic leading-tight"
            >
              Designing Experiences. <span className="text-lavender">Building Possibilities.</span>
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="mt-5 max-w-xl text-base text-muted md:text-lg"
            >
              {personal.description}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId('work')}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-ink py-4 pl-7 pr-4 text-bg shadow-[var(--shadow)]"
                >
                  <span className="metal-bg absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                  <span className="relative z-10 font-medium transition-colors group-hover:text-[#29272D]">Explore My Work</span>
                  <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-bg text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowDownRight className="h-4 w-4" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-ink/30 px-7 py-4"
                >
                  <span className="absolute inset-0 -translate-x-full bg-purple/60 transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative z-10 font-medium">Let&apos;s Connect</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Magnetic>
              <div className="flex items-center gap-2">
                {[
                  { href: personal.github, label: 'GitHub', Icon: GithubIcon },
                  { href: personal.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
                ].map(({ href, label, Icon }) => (
                  <Magnetic key={label} strength={0.5}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-12 w-12 place-items-center rounded-full border border-line transition-all duration-300 hover:-rotate-12 hover:border-lavender hover:bg-lavender/20"
                    >
                      <Icon />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Visual column ── */}
        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none" style={{ perspective: 1200 }}>
          {/* Rotating rings */}
          <motion.div style={mid} aria-hidden className="absolute -inset-10 sm:-inset-14">
            <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-lavender/60" style={{ ['--dur' as string]: '60s' }} />
            <div className="animate-spin-rev absolute inset-10 rounded-full border border-silver/70" style={{ ['--dur' as string]: '45s' }}>
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-lavender shadow-[0_0_20px_#B7A2C9]" />
            </div>
          </motion.div>

          {/* 3D knot behind the frame */}
          {desktop && !reduce && ready && (
            <motion.div
              aria-hidden
              className="absolute -right-24 -top-24 z-0 h-72 w-72"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease, delay: 0.8 }}
            >
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </motion.div>
          )}

          <motion.div
            style={reduce ? undefined : { rotateY: photoRotY, rotateX: photoRotX, scale: photoScale, y: photoY }}
            className="relative z-10"
          >
            <motion.figure
              className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border border-white/50 shadow-[0_40px_90px_-30px_rgba(57,52,61,0.55)]"
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 40px 40px)' }}
              animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 40px 40px)' } : {}}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              data-cursor="Hello!"
            >
              <motion.img
                src={personal.photo}
                alt={personal.photoAlt}
                className="h-full w-full object-cover object-[50%_30%] transition-[filter] duration-700 hover:saturate-[1.15]"
                initial={{ scale: 1.35 }}
                animate={ready ? { scale: 1.05 } : {}}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 1.8, ease }}
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#39343D]/45 via-transparent to-[#B7A2C9]/15" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={ready && !reduce ? { x: ['0%', '400%'] } : {}}
                transition={{ duration: 2.2, delay: 2, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[#F5F0E8]">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">CSE · MKCE</span>
                <span className="font-display text-lg italic">est. curiosity</span>
              </figcaption>
            </motion.figure>

            {/* Floating chips */}
            <motion.div style={near} className="absolute -right-4 top-[40%] z-20 sm:-right-12">
              <motion.div
                className="glass animate-float rounded-2xl px-4 py-3 shadow-[var(--shadow)]"
                style={{ ['--fy' as string]: '-12px', ['--dur' as string]: '6s' }}
                initial={{ opacity: 0, x: 40 }}
                animate={ready ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.8, ease }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Currently</p>
                <p className="font-display text-base">Learning by building</p>
              </motion.div>
            </motion.div>
            <motion.div style={far} className="absolute -left-4 bottom-[14%] z-20 sm:-left-10">
              <motion.div
                className="animate-float rounded-2xl bg-ink px-4 py-3 text-bg shadow-[var(--shadow)]"
                style={{ ['--fy' as string]: '14px', ['--dur' as string]: '7s', ['--r' as string]: '-4deg' }}
                initial={{ opacity: 0, x: -40 }}
                animate={ready ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.6, duration: 0.8, ease }}
              >
                <p className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-lavender" style={{ animation: 'blink 1.4s infinite' }} />
                  Web · AI · Full-stack
                </p>
              </motion.div>
            </motion.div>
            <motion.div style={mid} aria-hidden className="absolute left-[2%] top-[6%] z-20">
              <motion.div
                className="metal-bg animate-float grid h-20 w-20 place-items-center rounded-full font-display text-2xl italic text-[#29272D] shadow-[var(--shadow)]"
                style={{ ['--dur' as string]: '5s' }}
                initial={{ scale: 0, rotate: -180 }}
                animate={ready ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 1.8, type: 'spring', stiffness: 120, damping: 12 }}
              >
                ✦
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId('quote')}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="relative flex h-11 w-7 justify-center rounded-full border border-ink/40 pt-2">
          <span className="h-2 w-1 rounded-full bg-ink" style={{ animation: 'scroll-dot 1.8s ease-in-out infinite' }} />
        </span>
        <span className="eyebrow text-[10px]">Scroll</span>
      </motion.button>
    </section>
  )
}
