'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ScanFace, SunMedium, Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Akses Kamera',
    desc: 'Izinkan website mengakses webcam browser Anda untuk memulai.',
    icon: Camera,
  },
  {
    id: 2,
    title: 'Posisi Wajah',
    desc: 'Posisikan wajah Anda di tengah bingkai sesuai panduan layar.',
    icon: ScanFace,
  },
  {
    id: 3,
    title: 'Pencahayaan',
    desc: 'Pastikan ruangan terang dan wajah tidak tertutup bayangan.',
    icon: SunMedium,
  },
  {
    id: 4,
    title: 'Deteksi Otomatis',
    desc: 'AI akan langsung menganalisis jenis jerawat secara real-time.',
    icon: Sparkles,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Memberikan jeda antar animasi (smooth sequence)
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Cara Kerja <span className="text-[#98bad5]">AI Scan</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 text-lg"
          >
            Teknologi canggih yang mudah digunakan. Hanya butuh 4 langkah sederhana.
          </motion.p>
        </div>

        {/* Steps Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector Line (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[2px] bg-gray-100 -z-10 transform translate-x-1/2"></div>
              )}

              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-3xl border border-transparent transition-all duration-300 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:-translate-y-2 cursor-default">
                
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-[#98bad5] group-hover:bg-[#98bad5] group-hover:text-white transition-colors duration-300 relative">
                  <step.icon size={32} strokeWidth={1.5} />
                  
                  {/* Small Step Number Badge */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {step.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#98bad5] transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}