// components/AboutUs.tsx
const members = [
  { name: 'Andi Wijaya', role: 'Machine Learning Engineer' },
  { name: 'Bella Saphira', role: 'UI/UX Designer' },
  { name: 'Citra Lestari', role: 'Frontend Developer' },
  { name: 'Dedi Kurniawan', role: 'Backend Developer' },
  { name: 'Elsa Meilani', role: 'Data Annotator' },
  { name: 'Fajar Nugroho', role: 'DevOps Engineer' },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Tentang Kami</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-2xl p-6 shadow-sm text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#98bad5]/20" />
              <h3 className="font-semibold text-gray-900">{m.name}</h3>
              <p className="text-sm text-gray-600">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}