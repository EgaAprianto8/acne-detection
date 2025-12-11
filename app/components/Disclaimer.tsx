'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Stethoscope, Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <section className="py-12 px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative overflow-hidden bg-amber-50 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          
          {/* Dekorasi Background (Watermark Medis) */}
          <div className="absolute -right-6 -bottom-6 opacity-[0.05] pointer-events-none">
            <Stethoscope size={180} className="text-amber-900" />
          </div>
          
          {/* Accent Line di Kiri */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>

          <div className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8">
            
            {/* Ikon Warning dengan Animasi Pulse Halus */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-200 rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-amber-100 shadow-sm text-amber-500">
                  <AlertTriangle size={24} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Konten Teks */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Penting untuk Diketahui
                </h3>
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-200">
                  Disclaimer
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Hasil deteksi sistem ini dihasilkan oleh kecerdasan buatan (AI) dan 
                <span className="font-semibold text-gray-800"> hanya bersifat informatif</span>. 
                Sistem ini tidak menggantikan diagnosis medis profesional. 
                Selalu konsultasikan kondisi kulit Anda kepada 
                <span className="text-amber-700 font-medium underline decoration-amber-300 decoration-2 underline-offset-2"> Dokter Spesialis Kulit </span> 
                untuk penanganan yang tepat dan aman.
              </p>

              {/* Footer kecil (opsional) */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 font-medium">
                <Info size={14} />
                <span>AI Accuracy Disclaimer: Model YOLO11 Beta</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}