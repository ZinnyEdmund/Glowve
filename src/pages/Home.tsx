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
    <div>
      <Navbar />
      <Hero />
      <TrustBadges />
      <Feature />
      <NewArrivals />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
      <InstagramFeed />
      <Footer />
    </div>
  );
}
