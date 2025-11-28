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
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Categories
      </h2>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 max-w-6xl mx-auto">
        {FEATURES.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={item.pic}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-3"
              loading="lazy"
            />
            <span className="text-lg font-medium text-gray-800">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}