'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScanFace, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TrySection() {
  return (
    <section id="try" className="py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100 rounded-full blur-[100px] opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Main Card Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#98bad5] to-[#7aa3c0] shadow-2xl shadow-sky-200"
        >
          
          {/* Animated Background Pattern inside Card */}
          <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-center"></div>
          
          {/* Floating Glow Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3], 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-white blur-[80px] rounded-full mix-blend-overlay" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3], 
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-sky-900 blur-[80px] rounded-full mix-blend-overlay opacity-20" 
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-10">
            
            {/* Left Side: Content */}
            <div className="text-center md:text-left max-w-xl text-white">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/30"
              >
                <Sparkles size={16} className="text-yellow-300" />
                <span>Gratis & Tanpa Login</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              >
                Deteksi Jerawat <br className="hidden md:block"/>Dalam Hitungan Detik
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sky-50 text-lg mb-8 leading-relaxed"
              >
                Teknologi AI kami siap membantu menganalisis kondisi jerawat dan privasi terjamin aman.
              </motion.p>
              
              {/* Trust Badges */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-sky-100/90"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-teal-300" /> Hasil Instan
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-teal-300" /> Privasi Dijaga
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-teal-300" /> Akurasi Tinggi
                </div>
              </motion.div>
            </div>

            {/* Right Side: Big Interactive Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              {/* Spinning Ring Decoration */}
              <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full animate-[spin_10s_linear_infinite] w-[200px] h-[200px] md:w-[240px] md:h-[240px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none"></div>
              
              <Link 
                href="/acne-detection" 
                className="relative z-10 flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-white text-[#98bad5] rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
              >
                <ScanFace size={48} className="mb-2 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
                <span className="font-bold text-lg">Mulai Scan</span>
                <div className="flex items-center text-xs mt-1 opacity-70 font-medium">
                  Coba Sekarang <ArrowRight size={12} className="ml-1" />
                </div>
                
                {/* Ripple Effect Ring inside button */}
                <span className="absolute inset-0 rounded-full border border-[#98bad5]/20 scale-125 animate-ping-slow"></span>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}