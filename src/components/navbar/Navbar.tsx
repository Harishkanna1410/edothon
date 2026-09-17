"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, Search, Ticket } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

interface NavbarProps {
  onOpenStatusModal: () => void;
}

export default function Navbar({ onOpenStatusModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Removed "Prizes" as requested by user
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Edobase", href: "#edobase" },
    { name: "Problem", href: "#problem-statement" },
    { name: "Tracks", href: "#tracks" },
    { name: "Schedule", href: "#schedule" },
    { name: "Rules", href: "#rules" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#0c0e14]/95 backdrop-blur-md border-b-2 border-black py-2.5 shadow-brutal"
          : "bg-[#0c0e14]/80 backdrop-blur-sm border-b border-white/10 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo with Neo-Brutalist Badge */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#9ae885] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
            <Zap className="w-6 h-6 text-black fill-black" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white font-display flex items-center gap-2">
              EDOTHON <span className="text-[#9ae885]">&apos;26</span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-[#c1f8ff] text-black border border-black shadow-[1px_1px_0px_#000]">
                24H
              </span>
            </span>
            <span className="text-[9px] tracking-widest text-gray-400 uppercase font-mono -mt-1 font-semibold">
              POWERED BY EDOBASE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121520] border-2 border-black px-3 py-1.5 rounded-xl shadow-brutal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 hover:text-black hover:bg-[#9ae885] px-3 py-1.5 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenStatusModal}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-300 hover:text-white bg-[#171b29] border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] transition-all flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-[#c1f8ff]" />
            Status
          </button>

          <a
            href="#register"
            className="btn-brutal px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#9ae885] hover:bg-[#aef49b]"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Get Pass (₹{HACKATHON_CONFIG.registration.feeINR})</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenStatusModal}
            className="p-2 rounded-lg text-gray-300 bg-[#171b29] border-2 border-black"
            title="Check Registration Status"
          >
            <Search className="w-4 h-4 text-[#c1f8ff]" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-black bg-[#9ae885] border-2 border-black"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0e14] border-b-2 border-black px-6 py-6 space-y-4 shadow-brutal-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-bold uppercase tracking-wider text-gray-300 hover:text-[#9ae885] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStatusModal();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-gray-300 bg-[#171b29] border-2 border-black flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#c1f8ff]" /> Check Registration Status
            </button>

            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-brutal w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#9ae885]"
            >
              <Ticket className="w-4 h-4" /> Get Pass (₹{HACKATHON_CONFIG.registration.feeINR})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
