import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Brain, Code2, Database, Layout, Server, Wrench } from 'lucide-react'
import { useState } from 'react'
import { skillGlyph, skillGroups } from '../../data/skills'
import { useIsTouch } from '../../hooks/useMediaQuery'
import { Marquee } from '../Motion/Marquee'
import { SectionHeading } from '../Motion/SectionHeading'

const groupIcons: Record<string, typeof Code2> = {
  programming: Code2,
  frontend: Layout,
  backend: Server,
  database: Database,
  ai: Brain,
  tools: Wrench,
}

const allSkills = skillGroups.flatMap((g) => g.items)

/** Orbit of the active group's skills around a glowing core. */
function Orbit({ items, title }: { items: string[]; title: string }) {
  const radius = items.length > 4 ? 42 : 36
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]" aria-hidden>
      <div className="absolute inset-[8%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-[22%] rounded-full border border-line" />
      <div className="metal-bg absolute inset-[34%] grid place-items-center rounded-full shadow-[0_0_80px_-10px_#B7A2C9]">
        <AnimatePresence mode="wait">
          <motion.span
            key={title}
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
            className="px-4 text-center font-display text-lg italic leading-tight text-[#29272D] md:text-2xl"
          >
            {title}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="orbit absolute inset-0" style={{ ['--orbit-dur' as string]: '50s' }}>
        <AnimatePresence>
          {items.map((item, i) => {
            const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2
            const left = 50 + Math.cos(angle) * radius
            const top = 50 + Math.sin(angle) * radius
            return (
              <motion.div
                key={item}
                className="absolute"
                style={{ left: `${left}%`, top: `${top}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 220, damping: 16 }}
              >
                <div className="orbit-item -translate-x-1/2 -translate-y-1/2" style={{ ['--orbit-dur' as string]: '50s' }}>
                  <div className="glass grid h-16 w-16 place-items-center rounded-2xl font-mono text-sm font-medium shadow-[var(--shadow)] md:h-20 md:w-20 md:text-base">
                    {skillGlyph[item] ?? item.slice(0, 2)}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id)
  const touch = useIsTouch()
  const group = skillGroups.find((g) => g.id === active)!

  return (
    <section id="skills" aria-labelledby="skills-title" className="section overflow-hidden">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="Tech stack & skills"
          title="Technologies Behind My Ideas"
          accent="My Ideas"
          intro="The languages, frameworks and tools I learn with and build with — grouped by where they sit in a product."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <LayoutGroup>
              <div role="tablist" aria-label="Skill categories" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {skillGroups.map((g) => {
                  const Icon = groupIcons[g.id]
                  const selected = g.id === active
                  return (
                    <button
                      key={g.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="skills-panel"
                      onClick={() => setActive(g.id)}
                      onMouseEnter={() => !touch && setActive(g.id)}
                      className={`group relative flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                        selected ? 'text-bg' : 'hover:bg-taupe'
                      }`}
                    >
                      {selected && (
                        <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-2xl bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                      )}
                      <Icon className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-12" />
                      <span className="relative z-10">{g.title}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>

            <div id="skills-panel" role="tabpanel" className="mt-10 min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-3xl italic text-muted">{group.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {group.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 20, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
                        whileHover={{ y: -6, scale: 1.05 }}
                        className="animated-border flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-2 pr-5"
                      >
                        <span className="metal-bg grid h-9 min-w-9 place-items-center rounded-full px-1.5 font-mono text-[11px] font-medium text-[#29272D]">
                          {skillGlyph[item]}
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <Orbit items={group.items} title={group.title} />
        </div>
      </div>

      {/* Floating label strips */}
      <div className="mt-20 space-y-3" aria-hidden>
        <Marquee speed={1.4}>
          {allSkills.map((s) => (
            <span key={s} className="mr-3 rounded-full border border-line px-5 py-2 text-sm text-muted">
              {s}
            </span>
          ))}
        </Marquee>
        <Marquee speed={-1.1}>
          {[...allSkills].reverse().map((s) => (
            <span key={s} className="outline-text mr-10 font-display text-4xl italic md:text-6xl">
              {s}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
