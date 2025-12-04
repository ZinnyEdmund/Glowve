import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/Bagdes";
import Feature from "../components/Feature";
import NewArrivals from "../components/NewArrivals";
import PromoBanner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import InstagramFeed from "../components/Feed";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full mx-auto">
        <Navbar />
        <Hero />
        <div className="w-full bg-primary-6 py-0">
          <div className="container mx-auto p-0">
            <TrustBadges />
          </div>
        </div>
        <Feature />
        <NewArrivals />
        <PromoBanner />
        <Testimonials />
        <div className="w-full bg-primary-6 py-0">
          <div className="container mx-auto p-0">
            <Newsletter />
          </div>
        </div>
        <InstagramFeed />
        <Footer />
      </div>
    </div>
  );
}
