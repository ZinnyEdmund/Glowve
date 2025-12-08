import { useEffect, useState, useMemo } from "react";
// import hoodie from "/hoodie.jpg";
import clo from "/clo.jpg";
import makeup from "/makeup.jpg";
import necklace from "/necklace.jpg";
import skincare from "/skincare.jpg";
// import skinny from "/skinny.jpg";
// import fair from "/fair.jpg";

const SLIDES = [
  {
    image: clo,
    text: "Style that speaks softly.",
    description: "Timeless looks for every mood.",
    alt: "Stylish hoodie fashion"
  },
  {
    image: makeup,
    text: "Your glow, your story.",
    description: "Luxury beauty for everyday confidence.",
    alt: "Premium makeup products"
  },
  {
    image: necklace,
    text: "Details define you.",
    description: "Minimal elegance for every moment.",
    alt: "Elegant jewelry necklace"
  },
  {
    image: skincare,
    text: "Skin that feels loved.",
    description: "Gentle. Real. Authentic.",
    alt: "Natural skincare products"
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
      
      setTimeout(() => setIsTransitioning(false), 100);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = useMemo(() => SLIDES[currentSlide], [currentSlide]);

  return (
    <section className="space-y-6">
      <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.alt}
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-105'
          }`}
          loading="eager"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 lg:px-16 bg-linear-to-r from-black/60 to-black/20 text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 max-w-xl drop-shadow-lg animate-fade-in">
            {currentSlideData.text}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-md drop-shadow-md animate-fade-in-delay">
            {currentSlideData.description}
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}