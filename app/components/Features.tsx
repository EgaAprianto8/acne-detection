// components/Features.tsx
const features = [
  {
    title: 'Akurat',
    desc: 'Menggunakan model YOLOv11 terbaru untuk akurasi tinggi.',
  },
  {
    title: 'Privasi Aman',
    desc: 'Foto kamu tidak disimpan dan diproses secara instan.',
  },
  {
    title: 'Gratis',
    desc: 'Tanpa biaya tersembunyi & bebas digunakan kapan saja.',
  },
  {
    title: 'Cepat',
    desc: 'Hasil deteksi muncul dalam hitungan detik.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Keunggulan Kami</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm text-center"
            >
              <h3 className="text-lg font-semibold mb-2 text-[#98bad5]">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}