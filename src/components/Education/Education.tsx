import { motion, useScroll, useSpring } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { education } from '../../data/experience'
import { SectionHeading } from '../Motion/SectionHeading'

export function Education() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.5'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section aria-labelledby="education-title" className="section bg-soft">
      <div className="container-x">
        <SectionHeading id="education-title" index="05" eyebrow="Education" title="My Learning Journey" accent="Journey" align="center" />

        <ol ref={ref} className="relative mx-auto max-w-5xl">
          {/* Track + scroll-drawn line */}
          <span aria-hidden className="absolute left-6 top-0 h-full w-px bg-line md:left-1/2" />
          <motion.span aria-hidden style={{ scaleY: line }} className="metal-bg absolute left-6 top-0 h-full w-[3px] -translate-x-px origin-top md:left-1/2" />

          {education.map((e, i) => {
            const right = i % 2 === 0
            const Icon = e.current ? GraduationCap : BookOpen
            return (
              <li key={e.institution} className="relative grid py-10 pl-20 md:grid-cols-2 md:pl-0">
                <motion.span
                  className="absolute left-6 top-12 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-line bg-bg md:left-1/2"
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                >
                  <Icon className="h-5 w-5" />
                  {e.current && <span className="absolute inset-0 rounded-full bg-lavender/60" style={{ animation: 'pulse-ring 2.2s ease-out infinite' }} />}
                </motion.span>

                <motion.div
                  className={`group relative rounded-[2rem] border border-line bg-surface p-7 transition-shadow duration-500 hover:shadow-[var(--shadow)] md:p-9 ${
                    right ? 'md:col-start-2 md:ml-14' : 'md:col-start-1 md:mr-14'
                  }`}
                  initial={{ opacity: 0, x: right ? 80 : -80, rotate: right ? 3 : -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <span className="metal-bg absolute inset-x-8 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                  <p className="eyebrow mb-3 flex items-center gap-2">
                    {e.current && <span className="h-2 w-2 rounded-full bg-lavender" style={{ animation: 'blink 1.6s infinite' }} />}
                    {e.status}
                  </p>
                  <h3 className="display text-3xl md:text-4xl">{e.title}</h3>
                  <p className="mt-3 font-display text-lg italic text-muted">{e.institution}</p>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
