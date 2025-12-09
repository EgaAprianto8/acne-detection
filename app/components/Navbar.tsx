'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#how-it-works', label: 'Cara Kerja' },
  { href: '#features', label: 'Kelebihan' },
  { href: '#about', label: 'Tentang Kami' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        // PERUBAHAN DI SINI:
        // 1. Menghapus logic 'scrolled' agar lebar tetap konsisten.
        // 2. Mengatur w-[92%] untuk mobile agar ada jarak kiri-kanan (tidak terlalu lebar).
        className="fixed top-4 left-0 right-0 z-50 mx-auto w-[92%] md:w-full max-w-5xl"
      >
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-sky-100/20 rounded-full px-4 py-3 md:px-6 md:py-3 flex items-center justify-between transition-all duration-300">
          
          {/* --- LOGO --- */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-800 text-lg tracking-tight hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-[#98bad5] to-sky-200 rounded-full flex items-center justify-center text-white shadow-sm">
              <Sparkles size={16} fill="currentColor" />
            </div>
            <span className="block">AcneDetector</span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <span className="relative z-10">{link.label}</span>
                {hoveredPath === link.href && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-2">
            {/* CTA Button Desktop */}
            <Link
              href="/acne-detector"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#98bad5] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:bg-[#8baecf] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Coba AI
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition focus:ring-2 focus:ring-[#98bad5]/50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            // Menu dropdown mobile
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-2xl p-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-700 py-3 border-b border-gray-100 hover:text-[#98bad5] flex justify-between items-center group"
                >
                  {link.label}
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Link
                  href="/acne-detector"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 rounded-xl bg-[#98bad5] text-white font-bold shadow-lg active:scale-95 transition"
                >
                  Mulai Deteksi Sekarang
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}