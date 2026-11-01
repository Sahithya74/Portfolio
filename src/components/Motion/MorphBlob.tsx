import { motion, useReducedMotion } from 'framer-motion'

// Blob outlines share the same command structure so the `d` attribute can morph between them.
const shapes = [
  'M421,307Q385,364,331,400Q277,436,207,421Q137,406,95,345Q53,284,73,214Q93,144,155,101Q217,58,287,77Q357,96,407,148Q457,200,421,307Z',
  'M440,300Q404,350,358,394Q312,438,238,440Q164,442,113,388Q62,334,68,258Q74,182,124,128Q174,74,249,64Q324,54,380,104Q436,154,456,227Q476,300,440,300Z',
  'M398,318Q401,386,334,414Q267,442,198,424Q129,406,89,343Q49,280,71,205Q93,130,163,92Q233,54,302,80Q371,106,383,178Q395,250,398,318Z',
  'M427,290Q378,330,348,383Q318,436,246,438Q174,440,128,385Q82,330,76,257Q70,184,121,131Q172,78,248,72Q324,66,377,118Q430,170,453,230Q476,290,427,290Z',
]

interface MorphBlobProps {
  className?: string
  duration?: number
  gradient?: [string, string]
  id: string
}

/** Continuously morphing SVG blob filled with a soft metallic gradient. */
export function MorphBlob({ className = '', duration = 14, gradient = ['#D8C9E5', '#B7A2C9'], id }: MorphBlobProps) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 500 500" aria-hidden className={className}>
      <defs>
        <linearGradient id={`blob-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <motion.path
        fill={`url(#blob-${id})`}
        initial={{ d: shapes[0] }}
        animate={reduce ? undefined : { d: [...shapes, shapes[0]] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
