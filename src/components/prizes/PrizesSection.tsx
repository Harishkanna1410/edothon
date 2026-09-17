"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award, Flame, Gift, Check, Sparkles } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

const ICON_MAP: Record<string, any> = {
  Trophy,
  Medal,
  Award,
  Flame,
};

export default function PrizesSection() {
  const prizes = HACKATHON_CONFIG.prizes;
  const perks = HACKATHON_CONFIG.participantPerks;

  return (
    <section id="prizes" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c2130]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          Rewards &amp; Recognition
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
          Prizes &amp; Perks
        </h2>
        <p className="mt-4 text-gray-400 text-base sm:text-lg">
          Over <strong className="text-white">₹1,00,000+</strong> in cash prizes, cloud infrastructure credits, career pathways, and physical swag boxes.
        </p>
      </motion.div>

      {/* Prize Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {prizes.map((prize, idx) => {
          const Icon = ICON_MAP[prize.icon] || Trophy;

          return (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative group ${
                prize.highlight
                  ? "bg-gradient-to-b from-[#19152b] to-[#0f111a] border-2 border-edo-purple shadow-glow-purple -translate-y-2"
                  : "bg-[#0f111a] border border-[#1c2130] hover:border-edo-cyan/40"
              }`}
            >
              {prize.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-edo-purple to-edo-cyan text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  Top Prize
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      prize.highlight
                        ? "bg-edo-purple/20 text-edo-violet border border-edo-purple/40 shadow-glow-purple"
                        : "bg-[#141724] text-gray-300 border border-[#232a3d]"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 font-bold uppercase">
                    {prize.position}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-1">{prize.title}</h3>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-6 font-mono">
                  {prize.amount}
                </div>

                <ul className="space-y-2.5 border-t border-[#1c2130] pt-4 text-xs text-gray-400">
                  {prize.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1c2130] text-[11px] font-mono text-gray-500 text-center">
                Cash + Cloud Stack Perks
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Perks for Every Participant */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 bg-[#0f111a] border border-[#1c2130] rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-edo-cyan/10 border border-edo-cyan/30 flex items-center justify-center text-edo-cyan">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">For Every Participant &amp; Team</h3>
            <p className="text-xs text-gray-400">
              Nobody leaves empty-handed. All active participants receive direct perks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="bg-[#141724] border border-[#232a3d] rounded-xl p-4 flex items-start gap-3"
            >
              <Sparkles className="w-4 h-4 text-edo-cyan shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300 leading-relaxed">{perk}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
