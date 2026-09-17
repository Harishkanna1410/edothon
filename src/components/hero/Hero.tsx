"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ExternalLink, Ticket, Compass } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import MarqueeTicker from "../ui/MarqueeTicker";
import { HACKATHON_CONFIG } from "@/config/hackathon";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-grid overflow-hidden">
      {/* Decorative Technical Corner Stamps */}
      <div className="hidden md:flex absolute top-24 left-8 text-[10px] font-mono text-gray-500 flex-col gap-1 border-l-2 border-white/20 pl-2">
        <span>LOC: CLOUD_WAR_ROOM</span>
        <span>LAT: 12.823° N, 80.044° E</span>
        <span className="text-[#9ae885] font-bold">STATUS: REGISTRATION_OPEN</span>
      </div>

      <div className="hidden md:flex absolute top-24 right-8 text-[10px] font-mono text-gray-500 flex-col gap-1 text-right border-r-2 border-white/20 pr-2">
        <span>EDOTHON_ID: EDO-2026-HQ</span>
        <span>SYS_KERNEL: EDOBASE_V2</span>
        <span className="text-[#c1f8ff] font-bold">PROTOCOL: REALTIME_WS</span>
      </div>

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Tilted Sticker Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="sticker-tag bg-[#fef08a] text-black px-4 py-1 rounded-md text-xs font-mono font-black -rotate-1 mb-6"
        >
          ★ 24-HOUR ONLINE TECHNICAL FEST • EDOTHON &apos;26 ★
        </motion.div>

        {/* Main Display Title (Invente "A GIANT LEAP, OUT OF THE BOX" Aesthetic) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase max-w-5xl leading-[1.05]"
        >
          A GIANT LEAP,{" "}
          <span className="highlight-box my-1">
            <span>OUT OF THE BOX</span>
          </span>
        </motion.h1>

        {/* Date line with technical borders */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-sm sm:text-base md:text-lg font-mono font-extrabold uppercase tracking-widest text-[#c1f8ff] bg-[#121520] border-2 border-black px-4 py-1.5 rounded-lg shadow-brutal"
        >
          17th &amp; 18th OCTOBER 2026 • 24 CONTINUOUS HOURS
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed font-body"
        >
          Welcome to <strong className="text-white font-extrabold">Edothon &apos;26</strong> — the premier online hackathon celebrating{" "}
          <span className="text-[#9ae885] font-bold">Edobase</span>, the next-gen realtime backend platform. Team up, architect high-concurrency products, and experience cloud without boundaries.
        </motion.p>

        {/* Archive Cassette Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 w-full max-w-3xl bg-[#121520] border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-brutal-xl relative"
        >
          {/* Top Tape Label */}
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-[#9ae885] text-black font-mono text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
            MISSION CHRONOMETER
          </div>

          <CountdownTimer />
        </motion.div>

        {/* Neo-Brutalist CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <a
            href="#register"
            className="btn-brutal w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#9ae885] hover:bg-[#aef49b]"
          >
            <Ticket className="w-4 h-4" />
            <span>Get Team Pass (₹{HACKATHON_CONFIG.registration.feeINR})</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#explore-grid"
            className="btn-brutal w-full sm:w-auto px-6 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#171b29] hover:bg-[#202538] border-2 border-black"
          >
            <Compass className="w-4 h-4 text-[#c1f8ff]" />
            <span>Explore The Fest</span>
          </a>
        </motion.div>

        {/* 4 Interactive Colored Neo-Brutalist Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl"
        >
          <div className="bg-[#c1f8ff] text-black border-2 border-black rounded-xl p-3 shadow-brutal text-left -rotate-1 hover:rotate-0 transition-transform">
            <span className="text-[10px] font-mono font-bold uppercase block opacity-70">DURATION</span>
            <span className="text-xl sm:text-2xl font-black font-display">24 HOURS</span>
            <span className="text-[10px] font-mono block font-semibold">Non-stop sprint</span>
          </div>

          <div className="bg-[#9ae885] text-black border-2 border-black rounded-xl p-3 shadow-brutal text-left rotate-1 hover:rotate-0 transition-transform">
            <span className="text-[10px] font-mono font-bold uppercase block opacity-70">TEAM SIZE</span>
            <span className="text-xl sm:text-2xl font-black font-display">2–4 DEV</span>
            <span className="text-[10px] font-mono block font-semibold">Leader + members</span>
          </div>

          <div className="bg-[#ffb347] text-black border-2 border-black rounded-xl p-3 shadow-brutal text-left -rotate-1 hover:rotate-0 transition-transform">
            <span className="text-[10px] font-mono font-bold uppercase block opacity-70">ENTRY FEE</span>
            <span className="text-xl sm:text-2xl font-black font-display">₹200</span>
            <span className="text-[10px] font-mono block font-semibold">Per team pass</span>
          </div>

          <div className="bg-[#d8b4fe] text-black border-2 border-black rounded-xl p-3 shadow-brutal text-left rotate-1 hover:rotate-0 transition-transform">
            <span className="text-[10px] font-mono font-bold uppercase block opacity-70">DATA LAYER</span>
            <span className="text-xl sm:text-2xl font-black font-display">EDOBASE</span>
            <span className="text-[10px] font-mono block font-semibold">Official DB required</span>
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <MarqueeTicker />
      </div>
    </section>
  );
}
