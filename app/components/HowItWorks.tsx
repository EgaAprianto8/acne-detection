// components/HowItWorks.tsx
const steps = [
  {
    title: '1. Unggah Foto',
    desc: 'Pilih foto wajah yang jelas dan pencet tombol upload.',
  },
  {
    title: '2. AI Mendeteksi',
    desc: 'Model YOLOv11 kami mengidentifikasi jenis jerawat secara otomatis.',
  },
  {
    title: '3. Dapatkan Saran',
    desc: 'Terima rekomendasi produk & rutinitas perawatan yang disesuaikan.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Cara Kerjanya</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-[#98bad5]">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}