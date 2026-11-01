import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Intro sequence: monogram strokes draw, letters of the name rise,
 * a metallic bar fills with a counter, then two curtains slide away.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const progress = useMotionValue(0)
  const pct = useTransform(progress, (v) => Math.round(v).toString().padStart(3, '0'))
  const width = useTransform(progress, (v) => `${v}%`)
  const [exiting, setExiting] = useState(false)
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const name = 'SAHITHYA K.'

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: reduce ? 0.3 : 1.8,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => setExiting(true),
    })
    return () => controls.stop()
  }, [progress, reduce])

  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(onDone, reduce ? 150 : 950)
    return () => clearTimeout(t)
  }, [exiting, onDone, reduce])

  const curtain = { duration: 1, ease: [0.76, 0, 0.24, 1] as const }

  return (
    <div className="fixed inset-0 z-[10000]" role="status" aria-label="Loading portfolio">
      {/* Curtains */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#29272D]"
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ ...curtain, delay: 0.1 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#29272D]"
        animate={exiting ? { y: '100%' } : { y: 0 }}
        transition={{ ...curtain, delay: 0.1 }}
      />
      <motion.div
        className="absolute inset-0 metal-bg opacity-0"
        animate={exiting ? { opacity: [0, 0.6, 0], scaleY: [1, 0.02, 0] } : {}}
        transition={{ duration: 0.7 }}
      />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-[#F5F0E8]"
        animate={exiting ? { opacity: 0, scale: 0.92, filter: 'blur(8px)' } : {}}
        transition={{ duration: 0.45 }}
      >
        {/* Monogram */}
        <div className="relative mb-10 grid h-32 w-32 place-items-center">
          <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" initial={{ rotate: -90 }} animate={{ rotate: 270 }} transition={{ duration: 3, ease: 'linear' }}>
            <defs>
              <linearGradient id="pl-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#D8C9E5" />
                <stop offset="0.5" stopColor="#C7C5CA" />
                <stop offset="1" stopColor="#B7A2C9" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="url(#pl-g)"
              strokeWidth="1.5"
              strokeDasharray="2 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </motion.svg>
          <div className="flex overflow-hidden font-display text-6xl italic">
            {['S', 'K'].map((l, i) => (
              <motion.span
                key={l}
                className="metal-text inline-block"
                initial={{ y: '110%', rotate: i ? 20 : -20 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="mb-8 flex overflow-hidden font-mono text-sm tracking-[0.5em]">
          {name.split('').map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </div>

        {/* Progress */}
        <div className="relative h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div className="metal-bg absolute inset-y-0 left-0" style={{ width }} />
          <motion.div
            className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            animate={{ x: [-40, 240] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="mt-4 flex w-56 justify-between font-mono text-[10px] tracking-[0.3em] text-[#C7C5CA]">
          <span>LOADING</span>
          <motion.span>{pct}</motion.span>
        </div>
        <motion.p
          className="mt-10 font-display text-lg italic text-[#C7C5CA]"
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.02em' }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          Designing experiences…
        </motion.p>
      </motion.div>
    </div>
  )
}
