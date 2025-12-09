'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t border-gray-100 pt-12 pb-8 overflow-hidden">
      
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[#98bad5]/5 rounded-full blur-[100px]"></div>
         <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-sky-50 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. Main Brand Section (Centered) */}
        <div className="flex flex-col items-center text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#98bad5] to-sky-200 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-100 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <Sparkles size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-[#98bad5] transition-colors">
                AcneDetector
              </span>
            </Link>
            
            <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
              Solusi cerdas berbasis AI untuk kulit lebih sehat. <br className="hidden md:block" />
              Deteksi, analisis, dan rawat kulitmu sekarang.
            </p>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

        {/* 2. Bottom Bar (Copyright & Utility) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="order-2 md:order-1">
            &copy; {new Date().getFullYear()} AcneDetector. Made with ❤️.
          </p>
          
          <div className="order-1 md:order-2">
             {/* Tombol Back to Top Interaktif */}
             <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-[#98bad5] text-gray-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
             >
                <span className="font-medium cursor-pointer">Kembali ke atas</span>
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </div>

      </div>
    </footer>
  );
}