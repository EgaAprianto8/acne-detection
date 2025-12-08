// components/TrySection.tsx
import Link from 'next/link';

export default function TrySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Coba Sekarang</h2>
        <p className="text-gray-600 mb-8">
          Tidak perlu daftar & 100% gratis. Klik tombol di bawah untuk langsung mencoba deteksi jerawat.
        </p>
        <Link
          href="/acne-detector"
          className="inline-block px-8 py-3 rounded-lg bg-[#98bad5] text-white font-semibold hover:bg-[#7aa3c0] transition"
        >
          Deteksi Jerawat
        </Link>
      </div>
    </section>
  );
}