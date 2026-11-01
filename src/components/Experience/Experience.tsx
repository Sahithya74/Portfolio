import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Building2, Code2, GraduationCap, Users } from 'lucide-react'
import { experience } from '../../data/experience'
import { Reveal } from '../Motion/Reveal'
import { SectionHeading } from '../Motion/SectionHeading'
import { TiltCard } from '../Motion/TiltCard'

function ExperienceCard({ item }: { item: (typeof experience)[number] }) {
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(500px circle at ${mx}% ${my}%, rgba(183,162,201,0.35), transparent 60%)`

  const facts = [
    { icon: Users, label: 'Role', value: item.role },
    { icon: Building2, label: 'Organization', value: item.organization },
    { icon: GraduationCap, label: 'College', value: item.college },
    { icon: Code2, label: 'Contribution area', value: item.area },
  ]

  return (
    <TiltCard max={5} className="rounded-[2.5rem]">
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(((e.clientX - r.left) / r.width) * 100)
          my.set(((e.clientY - r.top) / r.height) * 100)
        }}
        className="animated-border relative overflow-hidden rounded-[2.5rem] bg-[#29272D] p-8 text-[#F5F0E8] md:p-14"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div aria-hidden className="grid-lines absolute inset-0 opacity-20" />
        <div aria-hidden className="animate-spin-slow absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed border-[#B7A2C9]/50" />
        <div aria-hidden className="animate-spin-rev absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#C7C5CA]/30" style={{ ['--dur' as string]: '30s' }} />

        <div className="relative grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#B7A2C9] px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#29272D]">Involvement</span>
              {item.duration && <span className="font-mono text-xs text-[#C7C5CA]">{item.duration}</span>}
            </div>
            <h3 className="display text-4xl md:text-6xl">
              {item.role.split(' ').slice(0, -1).join(' ')} <span className="metal-text italic">{item.role.split(' ').slice(-1)}</span>
            </h3>
            <p className="mt-3 font-display text-xl italic text-[#D8C9E5]">
              {item.organization} — {item.college}
            </p>
            <p className="mt-8 max-w-xl text-[#C7C5CA]">{item.description}</p>
          </div>
          <ul className="grid gap-3 lg:col-span-2">
            {facts.map(({ icon: Icon, label, value }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:border-[#B7A2C9]/60"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#B7A2C9]/20 text-[#D8C9E5]">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#C7C5CA]/80">{label}</span>
                  <span className="text-sm">{value}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </TiltCard>
  )
}

export function Experience() {
  return (
    <section id="journey" aria-labelledby="experience-title" className="section">
      <div className="container-x">
        <SectionHeading id="experience-title" index="04" eyebrow="Experience & involvement" title="Beyond Building Projects" accent="Projects" />
        {experience.map((item) => (
          <Reveal key={item.role} variant="scale" duration={1}>
            <ExperienceCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
