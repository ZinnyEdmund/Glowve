import { useEffect, useState } from "react"
import hoodie from "../assets/hoodie.jpg";
import makeup from "../assets/makeup.jpg";
import necklace from "../assets/necklace.jpg";
import skincare from "../assets/skincare.jpg";


export default function Hero() {
    const slides = [
        {
          image: hoodie,
          text: "Style that speaks softly.",
          description: "Timeless looks for every mood.",
        },
        {
          image: makeup,
          text: "Your glow, your story.",
          description: "Luxury beauty for everyday confidence.",
        },
        {
          image: necklace,
          text: "Details define you.",
          description: "Minimal elegance for every moment.",
        },
        {
          image: skincare,
          text: "Skin that feels loved.",
          description: "Gentle. Real. Authentic.",
        },
      ];
    
      const [currentSlide, setCurrentSlide] = useState(0);
    
      // Auto-slide logic
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
      }, [slides.length]);

      return (
         <div className="space-y-6">
              {/* Hero Section */}
              <div className="relative w-full h-[80vh] overflow-hidden">
                <img
                  src={slides[currentSlide].image}
                  alt="slide"
                  className="w-full h-full object-cover transform transition-transform duration-5000ms ease-in-out scale-105"
                /> 
                <div className="absolute inset-0 flex flex-col justify-center items-start px-10 bg-black/30 text-white">
                  <h2 className="text-5xl font-bold mb-2 max-w-xl drop-shadow-md">
                    {slides[currentSlide].text}
                  </h2>
                  <p className="text-2xl opacity-90 max-w-md drop-shadow-sm">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </div>
              </div>
      );
    
}