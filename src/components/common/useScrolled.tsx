import { useState, useEffect } from "react"

/**
 * useScrolled
 * Returns true when the page has scrolled past `threshold` px.
 * Uses a passive scroll listener — zero layout thrashing.
 * Safe to use in SSR environments (defaults to false).
 *
 * @param threshold - scroll distance in px before returning true (default 8)
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > threshold)
    check() // sync on mount in case page loads mid-scroll
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [threshold])

  return scrolled
}