import { useEffect } from 'react'

/**
 * useReveal – IntersectionObserver-alapú scroll-reveal hook.
 * Minden .reveal osztályú elemet megfigyel, és hozzáadja a .visible osztályt,
 * amikor az elem a nézetbe kerül.
 *
 * @param {any[]} deps – opcionális függőségek, pl. ha az oldal tartalma dinamikusan változik
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
