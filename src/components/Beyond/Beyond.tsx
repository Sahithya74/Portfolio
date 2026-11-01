import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { beyondTraits } from '../../data/personal'
import { Reveal } from '../Motion/Reveal'
import { SectionHeading } from '../Motion/SectionHeading'

/** Rotating geometric "rhythm" motif, drawn stroke by stroke as it scrolls in. */
function RhythmArt() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 60])
  const draw = useTransform(scrollYProgress, [0.1, 0.55], [0, 1])
  const petals = Array.from({ length: 9 }, (_, i) => i * 40)

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-md">
      <motion.svg viewBox="0 0 400 400" className="h-full w-full" style={{ rotate }} aria-hidden>
        <defs>
          <linearGradient id="rhythm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B7A2C9" />
            <stop offset="1" stopColor="#77717B" />
          </linearGradient>
        </defs>
        {petals.map((deg) => (
          <motion.ellipse
            key={deg}
            cx="200"
            cy="120"
            rx="38"
            ry="82"
            fill="none"
            stroke="url(#rhythm)"
            strokeWidth="1.4"
            transform={`rotate(${deg} 200 200)`}
            style={{ pathLength: draw }}
          />
        ))}
        <motion.circle cx="200" cy="200" r="150" fill="none" stroke="var(--line)" strokeDasharray="3 7" style={{ pathLength: draw }} />
        <circle cx="200" cy="200" r="78" fill="var(--bg)" stroke="var(--purple)" strokeWidth="1" />
      </motion.svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <span className="display metal-text block text-7xl md:text-8xl">09</span>
          <span className="eyebrow">years of training</span>
        </div>
      </div>
    </div>
  )
}

export function Beyond() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const xa = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])
  const xb = useTransform(scrollYProgress, [0, 1], ['-40%', '5%'])

  return (
    <section aria-labelledby="beyond-title" className="section overflow-hidden">
      <div className="container-x">
        <SectionHeading id="beyond-title" index="06" eyebrow="Beyond technology" title="Creativity Beyond Code" accent="Beyond Code" />

        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal variant="clip-x" duration={1.2}>
              <p className="display text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.05]">
                Technology is one side of my creativity. <em className="text-lavender">Art and discipline</em> are another.
              </p>
            </Reveal>
            <Reveal variant="blur" delay={0.2}>
              <p className="mt-8 max-w-lg text-lg text-muted">
                I have completed nine years of classical dance training. The rehearsal room taught me what I now bring to every
                build — patience with detail, rhythm in structure, and the habit of practising until it feels effortless.
              </p>
            </Reveal>
            <motion.ul
              className="mt-10 flex flex-wrap gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            >
              {beyondTraits.map((t, i) => (
                <motion.li
                  key={t}
                  variants={{
                    hidden: { opacity: 0, y: 30, rotate: i % 2 ? 8 : -8 },
                    show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 180, damping: 14 } },
                  }}
                  whileHover={{ scale: 1.08, rotate: i % 2 ? 3 : -3 }}
                  className={`rounded-full px-5 py-2.5 text-sm ${i % 2 ? 'border border-line' : 'bg-ink text-bg'}`}
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="lg:col-span-6">
            <RhythmArt />
          </div>
        </div>
      </div>

      <div ref={ref} className="mt-24 space-y-2 select-none" aria-hidden>
        <motion.p style={{ x: xa }} className="whitespace-nowrap font-display text-[clamp(3rem,10vw,9rem)] leading-none">
          {beyondTraits.map((t) => (
            <span key={t} className="mr-10">
              {t} <span className="text-lavender">✦</span>
            </span>
          ))}
        </motion.p>
        <motion.p style={{ x: xb }} className="outline-text whitespace-nowrap font-display text-[clamp(3rem,10vw,9rem)] italic leading-none">
          {[...beyondTraits].reverse().map((t) => (
            <span key={t} className="mr-10">
              {t} ·
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  )
}
