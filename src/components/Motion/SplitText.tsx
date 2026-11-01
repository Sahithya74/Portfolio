import { motion, type Variants } from 'framer-motion'
import type { ElementType } from 'react'

type Effect = 'rise' | 'flip' | 'blur' | 'scatter'

interface SplitTextProps {
  text: string
  as?: ElementType
  className?: string
  /** Split into characters (default) or whole words. */
  by?: 'chars' | 'words'
  effect?: Effect
  delay?: number
  stagger?: number
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean
  /** Characters lift and tint on hover. */
  hover?: boolean
  charClassName?: string
}

const effects: Record<Effect, Variants> = {
  rise: {
    hidden: { y: '115%', rotate: 6 },
    show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  flip: {
    hidden: { rotateX: -95, y: '40%', opacity: 0 },
    show: { rotateX: 0, y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  },
  scatter: {
    hidden: (i: number) => ({
      opacity: 0,
      x: ((i * 37) % 60) - 30,
      y: ((i * 53) % 80) - 40,
      rotate: ((i * 29) % 50) - 25,
    }),
    show: { opacity: 1, x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
  },
}

/**
 * Splits text into masked words/characters and reveals them with a stagger.
 * Screen readers get the full string via aria-label.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  by = 'chars',
  effect = 'rise',
  delay = 0,
  stagger = 0.035,
  inView = true,
  hover = false,
  charClassName = '',
}: SplitTextProps) {
  const words = text.split(' ')
  const variants = effects[effect]
  const masked = effect === 'rise'
  let index = 0

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } }
    : { initial: 'hidden', animate: 'show' }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span aria-hidden className="inline" style={{ perspective: 600 }} variants={container} {...trigger}>
        {words.map((word, w) => (
          <span key={w} className="inline-block whitespace-nowrap">
            <span className={`inline-block ${masked ? 'overflow-hidden pb-[0.12em] -mb-[0.12em]' : ''}`}>
              {by === 'words' ? (
                <motion.span custom={index++} variants={variants} className={`inline-block ${charClassName}`}>
                  {word}
                </motion.span>
              ) : (
                word.split('').map((ch, c) => (
                  <motion.span
                    key={c}
                    custom={index++}
                    variants={variants}
                    // Colour changes via CSS so it follows the active theme.
                    className={`inline-block origin-bottom ${hover ? 'transition-colors duration-300 hover:text-lavender' : ''} ${charClassName}`}
                    whileHover={hover ? { y: -14, rotate: -6, transition: { type: 'spring', stiffness: 400, damping: 10 } } : undefined}
                  >
                    {ch}
                  </motion.span>
                ))
              )}
            </span>
            {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
