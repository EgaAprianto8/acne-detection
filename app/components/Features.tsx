'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import LottieAnimation from "./LottieAnimation";
// Ganti dengan file JSON animasi yang relevan (misal: scan-face.json atau security.json)
// Jika belum ada, pakai yang lama dulu sebagai placeholder
import featureAnimationJson from "../../public/animations/data-security.json"; 

const features = [
  {
    title: 'Akurasi Tinggi',
    desc: 'Didukung oleh model YOLO11 terbaru yang dilatih khusus untuk deteksi kulit.',
    icon: Target,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    title: 'Privasi Terjamin',
    desc: 'Foto diproses langsung di browser (client-side) tanpa disimpan di server kami.',
    icon: ShieldCheck,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: '100% Gratis',
    desc: 'Akses penuh ke semua fitur analisis tanpa biaya langganan atau iklan.',
    icon: Sparkles,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Super Cepat',
    desc: 'Hasil analisis keluar dalam hitungan milidetik berkat optimasi AI.',
    icon: Zap,
    color: 'bg-blue-100 text-blue-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Dekorasi Background Abstrak */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#98bad5]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-sky-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- BAGIAN KIRI: Visual & Judul --- */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Teknologi Canggih untuk <br />
                <span className="text-[#98bad5]">Kulit Sehatmu</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Kami menggabungkan kecepatan dan akurasi AI untuk memberikan pengalaman deteksi yang mulus dan aman.
              </p>
            </motion.div>

            {/* Lottie Animation Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-full max-w-sm mx-auto lg:mx-0 bg-white rounded-3xl p-4 shadow-xl shadow-sky-100/50 border border-sky-50"
            >
               {/* Efek Glass di atas Lottie */}
               <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/0 to-white/40 rounded-3xl pointer-events-none z-10"></div>
               
               <LottieAnimation
                 animationData={featureAnimationJson}
                 className="w-full h-auto"
               />
            </motion.div>
          </div>

          {/* --- BAGIAN KANAN: Grid Fitur --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-sky-100 transition-all duration-300 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#98bad5] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}