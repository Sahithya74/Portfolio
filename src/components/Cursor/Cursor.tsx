import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Dot + trailing ring cursor. Elements can set `data-cursor="View"` to show a label,
 * any link/button enlarges the ring. A faint lavender glow trails further behind.
 */
export function Cursor() {
  const touch = useIsTouch()
  const reduce = usePrefersReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })
  const gx = useSpring(x, { stiffness: 60, damping: 20 })
  const gy = useSpring(y, { stiffness: 60, damping: 20 })
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const [hidden, setHidden] = useState(true)

  const enabled = !touch

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const t = e.target as HTMLElement | null
      const labelled = t?.closest<HTMLElement>('[data-cursor]')
      setLabel(labelled?.dataset.cursor ?? '')
      setHovering(!!t?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor]'))
    }
    const leave = () => setHidden(true)
    const pd = () => setDown(true)
    const pu = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', pd)
    window.addEventListener('pointerup', pu)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', pd)
      window.removeEventListener('pointerup', pu)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 88 : hovering ? 56 : 34

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: hidden ? 0 : 1 }}>
      {!reduce && (
        <motion.div
          className="absolute h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ x: gx, y: gy, translateX: '-50%', translateY: '-50%', background: 'radial-gradient(circle, #B7A2C9, transparent 70%)' }}
        />
      )}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-ink/50 backdrop-invert-0"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.8 : 1,
          backgroundColor: label ? 'rgba(41,39,45,0.92)' : hovering ? 'rgba(183,162,201,0.25)' : 'rgba(183,162,201,0)',
          borderColor: hovering ? 'rgba(183,162,201,0.9)' : 'rgba(119,113,123,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F0E8]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
      />
    </div>
  )
}
