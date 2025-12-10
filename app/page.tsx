// app/page.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import TrySection from './components/TrySection';
import Features from './components/Features';
import Disclaimer from './components/Disclaimer';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      {/* <Navbar /> */}
      <Hero />
      <HowItWorks />
      <TrySection />
      <Features />
      <Disclaimer />
      <AboutUs />
      <Footer />
    </main>
  );
}