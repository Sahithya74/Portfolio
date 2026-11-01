import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}
export const getLenis = () => lenis

/** Smooth-scroll to a section id (or top). Falls back to native scrolling. */
export function scrollToId(id: string) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (lenis) {
    lenis.scrollTo(target as HTMLElement | number, { offset: id === 'top' ? 0 : -20, duration: 1.4 })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
