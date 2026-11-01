import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  /** Percent of one copy per second. Negative scrolls right. */
  speed?: number
  className?: string
  /** Scroll velocity speeds up and reverses the strip. */
  scrollBoost?: boolean
}

/** Infinite strip whose speed reacts to scroll velocity. */
export function Marquee({ children, speed = 2, className = '', scrollBoost = true }: MarqueeProps) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * speed * (delta / 1000)
    if (scrollBoost) {
      const f = factor.get()
      if (f < 0) direction.current = -1
      else if (f > 0) direction.current = 1
      move += direction.current * Math.abs(f) * speed * (delta / 1000)
    }
    base.set(base.get() - move)
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
