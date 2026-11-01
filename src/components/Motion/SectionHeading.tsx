import { motion } from 'framer-motion'
import { SplitText } from './SplitText'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  /** Word(s) inside the title to render in metallic italic. */
  accent?: string
  intro?: string
  align?: 'left' | 'center'
  id?: string
}

/** Shared heading: numbered eyebrow with a drawn line, split-text title, blurred-in intro. */
export function SectionHeading({ index, eyebrow, title, accent, intro, align = 'left', id }: SectionHeadingProps) {
  const center = align === 'center'
  const parts = accent ? title.split(accent) : [title]

  return (
    <header className={`mb-14 md:mb-20 ${center ? 'mx-auto text-center' : ''} max-w-4xl`}>
      <div className={`mb-6 flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs text-lavender">{index}</span>
        <motion.span
          className="h-px w-16 origin-left bg-ink/40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 id={id} className="display text-[clamp(2.4rem,6.4vw,5.6rem)] text-ink">
        {parts.length === 2 ? (
          <>
            <SplitText text={parts[0].trim()} />{' '}
            <SplitText text={accent!} className="metal-text italic" delay={0.25} />
            {parts[1].trim() && (
              <>
                {' '}
                <SplitText text={parts[1].trim()} delay={0.4} />
              </>
            )}
          </>
        ) : (
          <SplitText text={title} />
        )}
      </h2>
      {intro && (
        <motion.p
          className={`mt-6 max-w-2xl text-lg text-muted ${center ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {intro}
        </motion.p>
      )}
    </header>
  )
}
