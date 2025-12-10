'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ScanEye } from 'lucide-react';
import LottieAnimation from "./LottieAnimation";
import animationJson from "../../public/animations/Cardiologist.json";

// Animasi varian untuk teks
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// Animasi mengambang untuk container visual
const floatingAnimation = {
  y: [-10, 10],
  transition: {
    y: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-32 pb-10 lg:pt-0 lg:pb-0"
    >
      {/* --- Latar Belakang Ambient Blobs --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] rounded-full bg-sky-100 blur-[80px] md:blur-[120px] opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#98bad5]/30 blur-[80px] md:blur-[120px] opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      </div>

      <div className="max-w-7xl -mt-20 mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* --- Kolom Teks Kiri --- */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          
          {/* Badge Kecil */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={textVariants}
            className="inline-flex items-center mx-auto lg:mx-0 mb-6 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-[#98bad5] text-xs md:text-sm font-medium w-fit"
          >
            <Sparkles size={14} className="mr-2" />
            AI-Powered Skin Analysis
          </motion.div>
          
          {/* Judul Utama (Responsive Font Size) */}
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={textVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-700 tracking-tight leading-[1.1] md:leading-[1.1]"
          >
            Clear Skin Starts <br className="hidden md:block"/>
            <span className="md:ml-0">with </span>
            {/* Wrapper span untuk 'Smart Scan' agar aman di mobile */}
            <span className="relative inline-block text-[#98bad5] mt-1 md:mt-0 md:ml-3">
              Smart Scan.
              {/* Garis bawah dekoratif */}
              <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-[#98bad5]/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
            variants={textVariants}
            className="mt-6 md:mt-8 text-base md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Your personal AI skin companion. Instant analysis for a clearer, healthier tomorrow.
          </motion.p>

          {/* --- Tombol Aksi (Link Fix) --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.6}
            variants={textVariants}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto"
          >
            {/* Tombol Utama */}
            <Link 
              href="/acne-detection" 
              className="group relative px-8 py-3.5 md:py-4 rounded-full bg-[#98bad5] text-white font-bold text-base md:text-lg shadow-lg shadow-sky-200/50 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 active:scale-95"
            >
              <ScanEye className="mr-2 w-5 h-5" />
              Start Free Scan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
            </Link>
            
            {/* Tombol Sekunder */}
            <Link 
              href="#how-it-works"
              className="px-8 py-3.5 md:py-4 rounded-full border-2 border-[#98bad5]/30 text-gray-700 font-semibold text-base md:text-lg hover:border-[#98bad5] hover:bg-white/50 transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>

        {/* --- Kolom Visual Kanan --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lg:col-span-5 relative mt-8 lg:mt-0 lg:-ml-12"
        >
          {/* Container Kaca */}
          <motion.div 
            animate={floatingAnimation}
            className="relative z-20 bg-white/40 backdrop-blur-xl border border-white/60 rounded-4xl md:rounded-[3rem] p-6 md:p-10 shadow-2xl shadow-sky-100/50 mx-4 md:mx-0"
          >
            {/* Efek Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#98bad5] blur-[60px] opacity-30 -z-10 rounded-full"></div>
            
            <div className="rounded-2xl overflow-hidden relative">
               <LottieAnimation
                 animationData={animationJson}
                 className="w-full h-auto max-h-[300px] md:max-h-[500px] object-contain mx-auto"
               />
               <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Dekorasi titik */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#98bad5]"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
            </div>
          </motion.div>
          
          <div className="absolute top-10 -right-4 lg:-right-10 w-16 h-16 md:w-24 md:h-24 border-4 border-[#98bad5]/10 rounded-full -z-10 animate-spin-slow"></div>
        </motion.div>

      </div>
    </section>
  );
}