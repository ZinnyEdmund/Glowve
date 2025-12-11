import bag from "/bag.jpg";
import blush from "/blush.jpg";
import necklace1 from "/necklace1.jpg";
import myskincare from "/myskincare.jpg";

const FEATURES = [
  { pic: bag, name: "Fashion" },
  { pic: blush, name: "Beauty" },
  { pic: necklace1, name: "Jewelry" },
  { pic: myskincare, name: "Skincare" }
];

export default function Feature() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Featured Categories
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <img
                src={item.pic}
                alt={item.name}
                className="w-full h-48 sm:h-64 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <span className="text-lg sm:text-xl font-medium text-gray-800 text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
