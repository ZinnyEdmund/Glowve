// import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/Bagdes";
import Feature from "../components/Feature";
import NewArrivals from "../components/NewArrivals";
import PromoBanner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import InstagramFeed from "../components/Feed";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full mx-auto">
        <div className="px-3">
          <Hero />
        </div>
        <TrustBadges />

        <Feature />
        <NewArrivals />
        <PromoBanner />
        <Testimonials />

        <Newsletter />
        <InstagramFeed />
      </div>
    </div>
  );
}
