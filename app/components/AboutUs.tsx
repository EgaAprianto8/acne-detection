'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Mail, Copy, Check } from 'lucide-react';

// Data member
const members = [
  { name: 'Rahma Agustin', npm: '227006013', instagram: 'https://www.instagram.com/rahmaa_gstn/', email: '227006013@student.unsil.ac.id' },
  { name: 'Pandu Pangestu', npm: '227006017', instagram: 'https://www.instagram.com/pandupan__/', email: '227006017@student.unsil.ac.id' },
  { name: 'Ega Aprianto', npm: '227006018', instagram: 'https://www.instagram.com/egaprynt/', email: '227006018@student.unsil.ac.id' },
  { name: 'Salma Nurfithriyah', npm: '227006022', instagram: 'https://www.instagram.com/sllmmnff/', email: '227006022@student.unsil.ac.id' },
  { name: 'Irsalina Yumna', npm: '227006030', instagram: 'https://www.instagram.com/irsly_/', email: '227006030@student.unsil.ac.id' },
  { name: 'Yosep Adriana FR', npm: '227006033', instagram: 'https://www.instagram.com/_yosepafr/', email: '227006033@student.unsil.ac.id' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// --- Komponen Tooltip Email ---
const EmailTooltip = ({ email }: { email: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-800 hover:text-white transition-colors duration-300 cursor-help"
        aria-label="Show Email"
      >
        <Mail size={18} />
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -55, scale: 0.9 }} 
            transition={{ duration: 0.2 }}
            className="absolute z-50 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl flex items-center gap-2 whitespace-nowrap"
            style={{ bottom: '0' }}
          >
            <span>{email}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Copy Email"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            </button>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AboutUs() {
  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Meet the <span className="text-[#98bad5]">Innovators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Tim di balik layar yang berdedikasi menggabungkan kecerdasan buatan dengan perawatan kulit untuk masa depan yang lebih percaya diri.
          </motion.p>
           <div className="absolute left-1/2 -translate-x-1/2 bottom--10 w-24 h-1 bg-[#98bad5]/30 rounded-full mt-8"></div>
        </div>

        {/* Grid Kartu Tim */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((m) => (
            <motion.div
              key={m.name}
              variants={cardVariants}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-500 border border-gray-100/50 hover:border-[#98bad5]/30 text-center overflow-visible"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#98bad5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#98bad5]/30 group-hover:border-[#98bad5] group-hover:animate-[spin_10s_linear_infinite] transition-colors duration-500"></div>
                  <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-sky-50 to-[#98bad5]/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <span className="text-[#98bad5] font-bold text-xl tracking-wider">{getInitials(m.name)}</span>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#98bad5] transition-colors duration-300">
                  {m.name}
                </h3>
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600 font-medium mb-6 group-hover:bg-sky-50 transition-colors duration-300">
                  {m.npm}
                </div>

                 {/* Social Media Links */}
                 <div className="flex justify-center gap-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <a 
                    href={m.instagram} 
                    target="_blank"
                    className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 hover:text-white transition-all duration-300"
                    aria-label={`${m.name} on Instagram`}
                  >
                    <Instagram size={18} />
                  </a>
                  <EmailTooltip email={m.email} />
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* --- PERBAIKAN DI SINI --- */}
      {/* Blob Kiri: Diubah dari 'hidden md:block' menjadi 'hidden lg:block' */}
      <div className="hidden lg:block absolute top-1/3 left-0 -translate-x-1/2 w-96 h-96 bg-[#98bad5]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Blob Kanan: Diubah dari 'hidden md:block' menjadi 'hidden lg:block' */}
      {/* Ini memastikan blob hanya muncul di layar besar (Desktop), sehingga aman dari overflow di Tablet */}
      <div className="hidden lg:block absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}