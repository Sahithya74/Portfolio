import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { personal } from '../../data/personal'
import { Marquee } from '../Motion/Marquee'

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [8, 0])
  const highlight = /curiosity|creativity|interfaces|products\.?/i.test(word)
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${highlight ? 'metal-text italic' : ''}`}>
      {word}
    </motion.span>
  )
}

/** Role marquee followed by the main quote, revealed word-by-word as you scroll. */
export function QuoteBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = personal.quote.split(' ')

  return (
    <section id="quote" aria-label="Personal quote" className="relative overflow-hidden">
      <div className="-rotate-2 scale-105 border-y border-line bg-ink py-5 text-bg">
        <Marquee speed={1.6}>
          {personal.roles.map((r) => (
            <span key={r} className="flex items-center gap-8 pr-8 font-display text-3xl italic md:text-5xl">
              {r}
              <span className="metal-text not-italic">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
      <div className="mt-[-1px] rotate-1 border-y border-line bg-taupe py-3">
        <Marquee speed={-1.2}>
          {['Design', 'Code', 'Explore', 'Experiment', 'Build', 'Grow'].map((r) => (
            <span key={r} className="flex items-center gap-6 pr-6 font-mono text-xs uppercase tracking-[0.35em] text-muted">
              {r}
              <span className="h-1 w-1 rounded-full bg-lavender" />
            </span>
          ))}
        </Marquee>
      </div>

      <div ref={ref} className="container-x section">
        <span aria-hidden className="pointer-events-none absolute left-[4%] top-16 font-display text-[16rem] leading-none text-purple/60 md:text-[22rem]">
          “
        </span>
        <blockquote className="relative mx-auto max-w-5xl">
          <p className="display text-[clamp(1.9rem,4.6vw,4.2rem)] leading-[1.08]" aria-label={personal.quote}>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
              ))}
            </span>
          </p>
          <motion.footer
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="h-px w-14 bg-lavender" />
            <span className="text-muted">{personal.supporting}</span>
          </motion.footer>
        </blockquote>
      </div>
    </section>
  )
}
