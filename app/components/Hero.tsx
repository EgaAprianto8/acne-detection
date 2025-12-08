// components/Hero.tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10 min-h-[600px]">
        {/* Teks kiri */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Where Skin <span className="text-[#98bad5]">Glows</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-lg">
            A smart acne detector powered by AI. Upload a photo, get instant analysis,
            and unlock personalized care — all in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/acne-detector"
              className="px-7 py-3 rounded-full bg-[#98bad5] text-white font-semibold hover:bg-[#7aa3c0] transition"
            >
              Try it now
            </a>
            <a
              href="#features"
              className="px-7 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Ilustrasi kanan */}
        <div className="flex justify-center">
          <Image
            src="/images/hero-image.jpg"  // ganti dengan ilustrasi kamu
            alt="Hero illustration"
            width={500}
            height={500}
            className="w-full h-auto max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}