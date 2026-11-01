import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { scrollToId } from '../../lib/scroll'

/** Top progress bar + circular back-to-top button whose ring fills with scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShow(v > 0.08))

  return (
    <>
      <motion.div
        aria-hidden
        className="metal-bg fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => scrollToId('top')}
            initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.4, rotate: 90 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full shadow-lg md:bottom-8 md:right-8"
          >
            <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden>
              <circle cx="28" cy="28" r="25" fill="none" stroke="var(--line)" strokeWidth="2" />
              <motion.circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="var(--lavender)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
