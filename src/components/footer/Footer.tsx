"use client";

import Link from "next/link";
import { Zap, Github, Twitter, MessageSquare, ArrowUpRight } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";
import MarqueeTicker from "../ui/MarqueeTicker";

export default function Footer() {
  const contact = HACKATHON_CONFIG.contact;

  return (
    <footer className="border-t-2 border-black bg-[#07080c] text-gray-400 font-mono">
      {/* Reverse Marquee Bar */}
      <MarqueeTicker
        text="★ EDOTHON '26 ★ A GIANT LEAP, OUT OF THE BOX ★ POWERED BY EDOBASE ★ OCTOBER 17-18 ★ GET YOUR PASS TODAY ★"
        className="bg-[#c1f8ff] text-black border-b-2 border-black"
        reverse={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b-2 border-black">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#9ae885] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black">
                <Zap className="w-6 h-6 fill-black" />
              </div>
              <span className="text-2xl font-black text-white font-display tracking-tight">
                EDOTHON <span className="text-[#9ae885]">&apos;26</span>
              </span>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-md font-body">
              The premier 24-hour continuous online hackathon showcasing <strong className="text-white">Edobase</strong> — the developer-first realtime backend platform. Think beyond the expected.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#121520] border-2 border-black hover:bg-[#9ae885] hover:text-black text-white flex items-center justify-center transition shadow-[2px_2px_0px_#000]"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={contact.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#121520] border-2 border-black hover:bg-[#c1f8ff] hover:text-black text-white flex items-center justify-center transition shadow-[2px_2px_0px_#000]"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={contact.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#121520] border-2 border-black hover:bg-[#5865F2] hover:text-white text-white flex items-center justify-center transition shadow-[2px_2px_0px_#000]"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Prizes removed) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Event Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-[#9ae885] transition">About Edothon</a>
              </li>
              <li>
                <a href="#edobase" className="hover:text-[#9ae885] transition">About Edobase Platform</a>
              </li>
              <li>
                <a href="#explore-grid" className="hover:text-[#9ae885] transition">Explore Directory</a>
              </li>
              <li>
                <a href="#problem-statement" className="hover:text-[#9ae885] transition">Problem Statement</a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-[#9ae885] transition">Hackathon Tracks</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#9ae885] transition">24H Schedule</a>
              </li>
              <li>
                <a href="#rules" className="hover:text-[#9ae885] transition">Rules &amp; Regulations</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#9ae885] transition">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Critical Directives */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Directives
            </h4>
            <div className="bg-[#121520] border-2 border-black rounded-xl p-4 text-xs space-y-2.5 shadow-brutal font-body">
              <div className="text-gray-300">
                <span className="text-[#ffb347] font-bold font-mono">🚨 RULE #5:</span> Teams must use ONLY the official Edobase database.
              </div>
              <div className="text-gray-300">
                <span className="text-[#9ae885] font-bold font-mono">💰 PASS:</span> ₹200 non-refundable per team of 2–4 members.
              </div>
              <div className="text-gray-300">
                <span className="text-[#c1f8ff] font-bold font-mono">⏱️ TIME:</span> Oct 17, 9:00 AM IST → Oct 18, 9:00 AM IST.
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Edothon &apos;26 • Powered by Edobase Cloud.
          </div>
          <div className="text-[#9ae885] font-bold">
            [ OUT OF THE BOX // REALTIME UNLEASHED ]
          </div>
        </div>
      </div>
    </footer>
  );
}
