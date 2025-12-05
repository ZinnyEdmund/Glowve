import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely love the quality! The skincare products have transformed my routine.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    rating: 5,
    text: "Fast shipping and excellent customer service. Will definitely shop again!",
    avatar: "MC"
  },
  {
    name: "Emma Davis",
    rating: 5,
    text: "The jewelry collection is stunning. Perfect for everyday wear and special occasions.",
    avatar: "ED"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">
            Real reviews from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />// for the increment of the stars
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#755757]/20 flex items-center justify-center font-semibold text-[#755757]">
                  {testimonial.avatar}
                </div>
                <span className="font-medium text-gray-800">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
