"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, Users, Laptop, Zap, CheckCircle2, Terminal } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

export default function AboutEdothon() {
  const cards = [
    {
      badge: "01 // DURATION",
      title: "24 Continuous Hours",
      desc: "October 17, 9:00 AM IST to October 18, 9:00 AM IST. From initial problem reveal to live prototypes, teams develop without pause.",
      bg: "bg-[#121520]",
      border: "border-[#252b3d]",
      highlight: "text-[#9ae885]",
    },
    {
      badge: "02 // FORMAT",
      title: "100% Online & Global",
      desc: "Join from any university, lab, or workspace worldwide. Keynotes, technical mentorship, and project submissions stream live on Discord.",
      bg: "bg-[#121520]",
      border: "border-[#252b3d]",
      highlight: "text-[#c1f8ff]",
    },
    {
      badge: "03 // SQUAD",
      title: "2–4 Members Per Team",
      desc: "Assemble your squad: developers, architects, and designers. Each team designates a leader for centralized communications.",
      bg: "bg-[#121520]",
      border: "border-[#252b3d]",
      highlight: "text-[#ffb347]",
    },
    {
      badge: "04 // TECH STACK",
      title: "Any Stack, One Rule",
      desc: "Full freedom with frontend, mobile, or AI tools (Next.js, Flutter, Python, Rust). The only hard rule: your database must be Edobase.",
      bg: "bg-[#121520]",
      border: "border-[#252b3d]",
      highlight: "text-[#d8b4fe]",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Mission Statement */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <span className="sticker-tag bg-[#c1f8ff] text-black px-3 py-1 rounded text-xs font-mono font-black rotate-1">
            ARCHIVE DOSSIER // ABOUT EDOTHON
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight leading-tight">
            Think beyond the <span className="text-[#9ae885]">expected.</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-body">
            Inspired by the spirit of collegiate engineering and developer grit, <strong className="text-white">Edothon</strong> is not just a competition — it is an experimental testbed.
          </p>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-body">
            Over 24 continuous hours, hundreds of developers unite online to push the envelope of multi-user interactive software using Edobase&apos;s brand-new realtime data layer.
          </p>

          <div className="p-4 bg-[#171b29] border-2 border-black rounded-xl shadow-brutal space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#9ae885]">
              <Terminal className="w-4 h-4" />
              <span className="font-bold">EDOTHON_METRICS</span>
            </div>
            <div className="text-gray-400 flex justify-between border-b border-white/5 pb-1">
              <span>Duration:</span> <span className="text-white font-bold">24.00 Hours</span>
            </div>
            <div className="text-gray-400 flex justify-between border-b border-white/5 pb-1">
              <span>Pass Fee:</span> <span className="text-white font-bold">₹200 per Team</span>
            </div>
            <div className="text-gray-400 flex justify-between">
              <span>Platform:</span> <span className="text-[#c1f8ff] font-bold">Official Edobase</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 4 Technical Blocks */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`${c.bg} border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 group flex flex-col justify-between`}
            >
              <div>
                <span className={`text-[10px] font-mono font-black uppercase tracking-wider block mb-3 ${c.highlight}`}>
                  {c.badge}
                </span>
                <h3 className="text-lg font-black text-white font-display mb-2 group-hover:text-[#9ae885] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-body">
                  {c.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>VERIFIED DIRECTIVE</span>
                <span className="w-2 h-2 rounded-full bg-[#9ae885]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
