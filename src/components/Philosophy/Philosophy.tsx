import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { philosophy } from '../../data/personal'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

// Each statement enters with its own transition.
const entrances: gsap.TweenVars[] = [
  { yPercent: 110, opacity: 0 },
  { filter: 'blur(24px)', opacity: 0, scale: 1.3 },
  { letterSpacing: '0.6em', opacity: 0 },
  { rotationX: -90, opacity: 0, transformOrigin: '50% 100%' },
  { clipPath: 'inset(0 100% 0 0)' },
  { scale: 0.3, opacity: 0, rotation: -8 },
]

/** Pinned, scrubbed sequence presenting each philosophy statement on its own. */
export function Philosophy() {
  const root = useRef<HTMLElement>(null)
  const reduce = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduce || !root.current) return
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.phil-item')
      const dots = gsap.utils.toArray<HTMLElement>('.phil-dot')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${items.length * 90}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })
      const settled = {
        yPercent: 0, opacity: 1, filter: 'blur(0px)', scale: 1, letterSpacing: '-0.03em', rotationX: 0, rotation: 0,
        clipPath: 'inset(0 0% 0 0)', ease: 'power3.out',
      }
      gsap.set(items.slice(1), { opacity: 0 })
      // The first statement rises in while the section scrolls into view, before pinning.
      gsap.fromTo(items[0].querySelector('.phil-inner'), { ...entrances[0] }, {
        ...settled,
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 10%', scrub: 0.6 },
      })
      gsap.set(dots[0], { scale: 1.8, backgroundColor: '#B7A2C9' })
      items.forEach((el, i) => {
        if (i > 0) {
          tl.fromTo(el, { ...entrances[i % entrances.length] }, { ...settled, duration: 1 })
          tl.to(dots[i], { scale: 1.8, backgroundColor: '#B7A2C9', duration: 0.3 }, '<')
        }
        tl.set('.phil-counter', { innerText: String(i + 1) }, '<')
        tl.to({}, { duration: 0.6 })
        if (i < items.length - 1) {
          tl.to(el, { opacity: 0, yPercent: -40, filter: 'blur(10px)', duration: 0.7, ease: 'power2.in' })
          tl.to(dots[i], { scale: 1, duration: 0.3 }, '<')
        }
      })
      tl.to('.phil-bg', { rotation: 180, scale: 1.4, duration: tl.duration() }, 0)
    }, root)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section ref={root} aria-labelledby="philosophy-title" className="relative overflow-hidden bg-[#29272D] text-[#F5F0E8]">
      <h2 id="philosophy-title" className="sr-only">
        Personal philosophy
      </h2>
      {reduce ? (
        <ul className="container-x space-y-6 py-28">
          {philosophy.map((p) => (
            <li key={p} className="display text-5xl">
              {p}
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative flex h-screen items-center justify-center">
          <div aria-hidden className="phil-bg pointer-events-none absolute h-[120vmax] w-[120vmax] opacity-30">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#39343D,#B7A2C9,#29272D,#C7C5CA,#39343D)] blur-3xl" />
          </div>
          <div aria-hidden className="grid-lines absolute inset-0 opacity-20" />
          <p className="eyebrow absolute left-[clamp(1.25rem,4vw,3.5rem)] top-24 text-[#C7C5CA]">07 — Philosophy</p>
          <p className="absolute right-[clamp(1.25rem,4vw,3.5rem)] top-24 font-mono text-sm text-[#C7C5CA]">
            <span className="phil-counter">1</span> / {philosophy.length}
          </p>

          <ul className="relative w-full px-6 text-center" style={{ perspective: 800 }}>
            {philosophy.map((p, i) => (
              <li
                key={p}
                className="phil-item display absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-[clamp(2.6rem,8.5vw,8rem)] leading-none"
              >
                <span className="phil-inner inline-block">{i % 2 ? <span className="metal-text italic">{p}</span> : p}</span>
              </li>
            ))}
          </ul>

          <div aria-hidden className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
            {philosophy.map((p) => (
              <span key={p} className="phil-dot h-2 w-2 rounded-full bg-white/25" />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
