import { useEffect, useState, useMemo } from "react";
import clo from "/clo.jpg";
import makeup from "/makeup.jpg";
import necklace from "/necklace.jpg";
import facecream from "/facecream.jpg";

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
    image: necklace,
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
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

      setTimeout(() => setIsTransitioning(false), 400);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = useMemo(() => SLIDES[currentSlide], [currentSlide]);

  return (
    <section>
      <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.alt}
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* TEXT */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 lg:px-16 bg-linear-to-r from-black/60 to-black/20 text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 max-w-xl drop-shadow-lg">
            {currentSlideData.text}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-md drop-shadow-md mb-6">
            {currentSlideData.description}
          </p>

          {/* CTA BUTTON */}
          <a
            href="/products"
            className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-200 transition-all"
          >
            Shop Now
          </a>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/50 w-2 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
