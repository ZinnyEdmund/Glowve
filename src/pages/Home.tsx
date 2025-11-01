import { useEffect, useState } from "react";
import hoodie from "../assets/hoodie.jpg";
import makeup from "../assets/makeup.jpg";
// import necklace from "../assets/necklace.jpg";
import Myneck from "../assets/Myneck.jpg";
import myy from "../assets/myy.jpg";
import bag from "../assets/bag.jpg";
import necklace1 from "../assets/necklace1.jpg";
import myskincare from "../assets/myskincare.jpg";
import blush from "../assets/blush.jpg";

export default function Home() {

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
      image: Myneck,
      text: "Details define you.",
      description: "Minimal elegance for every moment.",
    },
    {
      image: myy,
      text: "Skin that feels loved.",
      description: "Gentle. Real. Authentic.",
    },
  ];

  const feature = [
    {
      pic: bag,
      name: "Fashion",
    },
    {
      pic: blush,
      name: "Beauty",
    },
    {
      pic: necklace1,
      name: "Jewelry",
    },
    {
      pic: myskincare,
      name: "Skincare",
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // if (loading) return <Loader />;



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

      {/* Featured categories */}
      <div>
        <h3 className="text-2xl font-bold text-center justify-center mb-4">Featured Categories</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
          {/* border-gray-300 */}
          {feature.map((item, index) => (
            <div key={index} className="bg-gray-50 border border-gray-100 rounded-lg flex flex-col items-center">
              <img src={item.pic} alt={item.name} className="w-full h-32 object-cover mb-2 rounded-tl-xl rounded-tr-xl" />
              <h4 className="text-lg font-semibold">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
