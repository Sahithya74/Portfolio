import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'clip' | 'clip-x' | 'blur' | 'scale' | 'rotate'

const ease = [0.22, 1, 0.36, 1] as const

const variants: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -80 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 80 }, show: { opacity: 1, x: 0 } },
  clip: { hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } },
  'clip-x': { hidden: { clipPath: 'inset(0% 100% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } },
  blur: { hidden: { opacity: 0, filter: 'blur(16px)', scale: 1.04 }, show: { opacity: 1, filter: 'blur(0px)', scale: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  rotate: { hidden: { opacity: 0, rotate: -6, y: 50 }, show: { opacity: 1, rotate: 0, y: 0 } },
}

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  amount?: number
  as?: 'div' | 'section' | 'li' | 'span' | 'article' | 'p'
}

export function Reveal({ children, variant = 'up', delay = 0, duration = 0.9, className, amount = 0.25, as = 'div' }: RevealProps) {
  const Comp = motion[as]
  // The outer element observes the viewport untransformed and unclipped; a fully clipped or
  // translated-away target would never register as intersecting.
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      <motion.div variants={variants[variant]} transition={{ duration, delay, ease }}>
        {children}
      </motion.div>
    </Comp>
  )
}
