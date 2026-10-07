// Scroll helper that goes through Lenis when it is active, so smooth scrolling
// and GSAP ScrollTrigger pins stay in sync.
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
