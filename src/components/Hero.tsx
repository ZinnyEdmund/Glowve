import { useState, useCallback, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import clo from "/clo.jpg"
import makeup from "/makeup.jpg"
import omo from "/omo.jpg"
import facecream from "/facecream.jpg"

const SLIDES = [
  {
    image: makeup,
    text: "Your glow, your story.",
    description: "Luxury beauty for everyday confidence.",
    alt: "Premium makeup products",
  },
  {
    image: clo,
    text: "Style that speaks softly.",
    description: "Timeless looks for every mood.",
    alt: "Stylish hoodie fashion",
  },
  {
    image: omo,
    text: "Details define you.",
    description: "Minimal elegance for every moment.",
    alt: "Elegant jewelry necklace",
  },
  {
    image: facecream,
    text: "Skin that feels loved.",
    description: "Gentle. Real. Authentic.",
    alt: "Natural skincare products",
  },
]

const SLIDE_INTERVAL = 5000
const TRANSITION_DURATION = 350

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fading, setFading] = useState(false)

  const goToSlide = useCallback((index: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setFading(false)
    }, TRANSITION_DURATION)
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % SLIDES.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const interval = setInterval(nextSlide, SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [nextSlide])

  const slide = useMemo(() => SLIDES[currentSlide], [currentSlide])

  return (
    <section aria-label="Featured collections">
      <div className="relative w-full h-[85vh] min-h-[520px] max-h-[800px] overflow-hidden bg-gray-900">

        {/* BACKGROUND IMAGE */}
        <img
          src={slide.image}
          alt={slide.alt}
          style={{ transition: `opacity ${TRANSITION_DURATION}ms ease` }}
          className={`absolute inset-0 w-full h-full object-cover ${fading ? "opacity-0" : "opacity-100"}`}
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
          <div
            style={{ transition: `opacity ${TRANSITION_DURATION}ms ease, transform ${TRANSITION_DURATION}ms ease` }}
            className={`max-w-xl ${fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
          >
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              New Collection
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.08]">
              {slide.text}
            </h1>
            <p className="text-white/75 text-base sm:text-lg mb-8 leading-relaxed max-w-sm">
              {slide.description}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all duration-200 group w-fit shadow-lg"
            >
              Shop Now
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* PREV ARROW */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* NEXT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2" role="tablist">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6 h-2"
                  : "bg-white/40 hover:bg-white/70 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}