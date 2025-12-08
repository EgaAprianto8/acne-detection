// components/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo kiri */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#98bad5] hover:opacity-90 transition"
        >
          Acne Detector
        </Link>

        {/* Links tengah (desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative group px-1 py-2 text-sm font-medium hover:text-[#98bad5] transition"
            >
              {l.label}
              {/* Underline animasi */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#98bad5] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* CTA kanan */}
        <div className="hidden md:block">
          <Link
            href="/acne-detector"
            className="px-5 py-2 rounded-full bg-[#98bad5] text-white font-semibold hover:bg-[#7aa3c0] hover:scale-105 active:scale-95 transition transform"
          >
            Try Acne Detector
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#98bad5] rounded"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu dengan animasi smooth */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 space-y-3 text-gray-700">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#98bad5] transition"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/acne-detector"
            onClick={() => setOpen(false)}
            className="inline-block mt-2 px-4 py-2 rounded-full bg-[#98bad5] text-white font-semibold hover:bg-[#7aa3c0] transition"
          >
            Try Acne Detector
          </Link>
        </div>
      </div>
    </header>
  );
}