// components/Disclaimer.tsx
export default function Disclaimer() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-sm text-blue-900">
          <h3 className="font-semibold mb-2">Disclaimer Medis</h3>
          <p>
            Hasil deteksi bersifat informatif dan tidak menggantikan diagnosis
            profesional. Konsultasikan ke dokter kulit untuk pengobatan lebih lanjut.
          </p>
        </div>
      </div>
    </section>
  );
}