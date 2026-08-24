import { useState, useCallback, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import clo from "/clo.jpg"
import makeup from "/makeup.jpg"
import omo from "/omo.jpg"
import facecream from "/facecream.jpg"

interface Slide {
  image: string
  eyebrow: string
  text: string
  description: string
  alt: string
}

const SLIDES: Slide[] = [
  {
    image: makeup,
    eyebrow: "Beauty",
    text: "Your glow, your story.",
    description: "Luxury beauty for everyday confidence.",
    alt: "Premium makeup products",
  },
  {
    image: clo,
    eyebrow: "Fashion",
    text: "Style that speaks softly.",
    description: "Timeless looks for every mood.",
    alt: "Stylish hoodie fashion",
  },
  {
    image: omo,
    eyebrow: "Jewelry",
    text: "Details define you.",
    description: "Minimal elegance for every moment.",
    alt: "Elegant jewelry necklace",
  },
  {
    image: facecream,
    eyebrow: "Skincare",
    text: "Skin that feels loved.",
    description: "Gentle. Real. Authentic.",
    alt: "Natural skincare products",
  },
]

const SLIDE_INTERVAL = 5000
const FADE_MS = 380

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
  }, [])

  const goTo = useCallback(
    (next: number) => {
      if (fading) return
      setFading(true)
      setTimeout(() => {
        setIndex(next)
        setProgress(0)
        setFading(false)
      }, FADE_MS)
    },
    [fading]
  )

  const startAutoplay = useCallback(() => {
    clearTimers()
    if (prefersReduced.current) return

    setProgress(0)
    // Progress bar ticks every 50ms
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + 50 / SLIDE_INTERVAL, 1))
    }, 50)

    intervalRef.current = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % SLIDES.length
        setFading(true)
        setTimeout(() => {
          setProgress(0)
          setFading(false)
        }, FADE_MS)
        return next
      })
    }, SLIDE_INTERVAL)
  }, [clearTimers])

  useEffect(() => {
    startAutoplay()
    return clearTimers
  }, [startAutoplay, clearTimers])

  const handleManualNav = useCallback(
    (next: number) => {
      clearTimers()
      goTo(next)
      // Restart autoplay after manual navigation
      setTimeout(startAutoplay, FADE_MS + 50)
    },
    [clearTimers, goTo, startAutoplay]
  )

  const slide = SLIDES[index]

  return (
    <section aria-label="Featured collections" aria-roledescription="carousel">
      <div className="relative w-full h-[85vh] min-h-[520px] max-h-[800px] overflow-hidden bg-gray-900">

        {/* BACKGROUND IMAGE */}
        <img
          key={index}
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: prefersReduced.current ? "none" : `opacity ${FADE_MS}ms ease`,
            opacity: fading ? 0 : 1,
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

        {/* PROGRESS BAR */}
        {!prefersReduced.current && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-10">
            <div
              className="h-full bg-white/60 transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
          <div
            style={{
              transition: prefersReduced.current
                ? "none"
                : `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(8px)" : "translateY(0)",
            }}
            className="max-w-xl"
          >
            {/* Per-slide eyebrow — no longer hardcoded */}
            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4">
              {slide.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.06]">
              {slide.text}
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed max-w-sm">
              {slide.description}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors duration-200 group w-fit shadow-lg"
            >
              Shop Now
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>

        {/* PREV / NEXT */}
        <button
          onClick={() =>
            handleManualNav((index - 1 + SLIDES.length) % SLIDES.length)
          }
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-sm border border-white/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => handleManualNav((index + 1) % SLIDES.length)}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-sm border border-white/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* SLIDE DOTS */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {SLIDES.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`${s.eyebrow} — slide ${i + 1} of ${SLIDES.length}`}
              onClick={() => handleManualNav(i)}
              className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                i === index
                  ? "bg-white w-6 h-2"
                  : "bg-white/35 hover:bg-white/65 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}