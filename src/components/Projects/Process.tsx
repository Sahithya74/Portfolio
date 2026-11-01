import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

// Drawn from the steps listed in the client-website projects.
const steps = [
  { title: 'Understand', text: 'Listen to the idea and analyse the requirements and expectations behind it.' },
  { title: 'Structure', text: 'Plan the layout, the flow and how information should be organised.' },
  { title: 'Design', text: 'Shape the UI/UX so the experience feels clear, considered and usable.' },
  { title: 'Build', text: 'Develop a responsive implementation that works across screen sizes.' },
  { title: 'Launch', text: 'Deploy it live — and keep learning from every project that ships.' },
]

/** Pinned section whose cards travel horizontally as you scroll vertically (desktop). */
export function Process() {
  const desktop = useIsDesktop()
  const reduce = usePrefersReducedMotion()
  const pinned = desktop && !reduce
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 80))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  const cards = steps.map((s, i) => (
    <motion.li
      key={s.title}
      className="group relative flex w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:w-[24rem] lg:h-[26rem]"
      initial={pinned ? false : { opacity: 0, y: 40 }}
      whileInView={pinned ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ y: -10 }}
    >
      <span className="metal-bg absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-150" />
      <span className="outline-text font-display text-8xl leading-none">0{i + 1}</span>
      <div className="mt-10">
        <h3 className="display mb-3 text-4xl transition-colors group-hover:text-lavender">{s.title}</h3>
        <p className="text-muted">{s.text}</p>
      </div>
    </motion.li>
  ))

  return (
    <section aria-labelledby="process-title" className="relative bg-taupe/50">
      <div ref={ref} style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }} className="relative">
        <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-24'}>
          <div className="container-x mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">How an idea becomes a product</p>
              <h2 id="process-title" className="display text-[clamp(2.2rem,5vw,4.5rem)]">
                From idea <span className="metal-text italic">to launch</span>
              </h2>
            </div>
            {pinned && (
              <div className="hidden w-48 lg:block">
                <div className="h-px w-full bg-line">
                  <motion.div className="metal-bg h-[2px]" style={{ width: bar }} />
                </div>
                <p className="eyebrow mt-2 text-right">Scroll →</p>
              </div>
            )}
          </div>
          <motion.ul
            ref={track}
            style={pinned ? { x } : undefined}
            className={`flex gap-6 px-[clamp(1.25rem,4vw,3.5rem)] ${pinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-4 [&>li]:snap-start'}`}
          >
            {cards}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
