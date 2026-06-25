import Navbar from './components/layout/Navbar';
import FloatingActions from './components/layout/FloatingActions';
import CookieBanner from './components/layout/CookieBanner';
import Hero from './components/homepage/Hero';
import Ticker from './components/homepage/Ticker';
import Services from './components/homepage/Services';
import OnDemand from './components/homepage/OnDemand';
import Pricing from './components/homepage/Pricing';
import Process from './components/homepage/Process';
import Testimonials from './components/homepage/Testimonials';
import ResourcesTeaser from './components/homepage/ResourcesTeaser';
import About from './components/homepage/About';
import FAQ from './components/homepage/FAQ';
import CTAStrip from './components/homepage/CTAStrip';
import Booking from './components/homepage/Booking';
import Footer from './components/homepage/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <OnDemand />
      <Pricing />
      <Process />
      <Testimonials />
      <ResourcesTeaser />
      <About />
      <FAQ />
      <Booking />
      <CTAStrip />
      <Footer />
      <FloatingActions />
      <CookieBanner />
    </main>
  );
}