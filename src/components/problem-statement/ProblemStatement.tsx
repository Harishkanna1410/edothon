"use client";

import { motion } from "framer-motion";
import { Lock, Clock, Sparkles, Zap, Cpu, ShieldCheck, Terminal, Disc } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

const ICON_MAP: Record<string, any> = {
  Zap,
  Cpu,
  ShieldCheck,
  Sparkles,
};

export default function ProblemStatement() {
  const statement = HACKATHON_CONFIG.problemStatement;

  return (
    <section id="problem-statement" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="sticker-tag bg-[#ffb347] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          CHALLENGE VAULT // COMING SOON
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          Problem Statement
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body">
          Official challenge briefs will be unlocked at kickoff to ensure fair, real-time competition.
        </p>
      </motion.div>

      {/* If statement is published in config, show statement */}
      {statement ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#121520] border-[3px] border-black rounded-2xl p-8 shadow-brutal-xl"
        >
          <div className="sticker-tag bg-[#9ae885] text-black px-3 py-1 rounded text-xs font-mono font-black mb-4">
            ★ OFFICIAL CHALLENGE UNLOCKED ★
          </div>
          <h3 className="text-2xl font-black text-white font-display mb-4">{statement.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">{statement.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statement.tracks.map((t) => (
              <div key={t.name} className="bg-[#171b29] border-2 border-black rounded-xl p-5 shadow-brutal">
                <h4 className="text-white font-black text-base mb-2 font-display">{t.name}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{t.challenge}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Sealed Vault Card */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#121520] border-[3px] border-black rounded-2xl p-8 sm:p-12 shadow-brutal-xl relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
            {/* Retro Cassette / Lock Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#ffb347] border-2 border-black shadow-brutal flex items-center justify-center text-black mb-6 rotate-2">
              <Lock className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="sticker-tag bg-black text-[#ffb347] border-2 border-[#ffb347] px-3 py-1 rounded text-xs font-mono font-black mb-4">
              [ ENCRYPTED REPOSITORY: REVEAL_AT_09:00_IST ]
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mb-3">
              Problem Statement Revealed on Oct 17
            </h3>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
              To ensure all participants build from a clean slate, the official detailed problem statement is encrypted and will be decrypted live during the opening keynote on{" "}
              <strong className="text-white font-bold">October 17, 2026 at 9:00 AM IST</strong>.
            </p>

            <div className="p-3 bg-[#171b29] border-2 border-black rounded-xl text-xs font-mono text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9ae885] animate-pulse" />
              <span>STATUS: LOCKED • REVEAL PROTOCOL ARMED FOR KICKOFF</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4 Competition Tracks */}
      <div id="tracks" className="mt-20">
        <div className="text-center mb-10">
          <span className="sticker-tag bg-[#d8b4fe] text-black px-3 py-1 rounded text-xs font-mono font-black rotate-1">
            EXPLORE THE DOMAINS
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mt-3">
            Hackathon Tracks
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1">
            Choose your focus track during team registration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HACKATHON_CONFIG.tracks.map((track, i) => {
            const Icon = ICON_MAP[track.icon] || Sparkles;
            const colors = ["bg-[#9ae885]", "bg-[#c1f8ff]", "bg-[#ffb347]", "bg-[#d8b4fe]"];
            const cardBg = colors[i % colors.length];

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#121520] border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${cardBg} border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-gray-300 border border-white/10">
                      TRACK #{i + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-white font-display mb-2 group-hover:text-[#9ae885] transition-colors">
                    {track.name}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-body">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>FOCUS: {track.badge}</span>
                  <span className="text-[#9ae885] font-bold">READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
