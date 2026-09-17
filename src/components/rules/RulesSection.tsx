"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertOctagon, ShieldAlert, Check } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

export default function RulesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(4); // Rule 5 (DB rule) opened by default
  const rules = HACKATHON_CONFIG.rules;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="rules" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="sticker-tag bg-[#ff84b5] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          OFFICIAL PROTOCOL // REGULATIONS
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          🏆 Rules &amp; Regulations
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body max-w-2xl mx-auto">
          Please review the 12 official guidelines. Compliance is strictly audited for evaluation.
        </p>
      </motion.div>

      {/* Mandatory Database Warning Box in Neo-Brutalist Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 bg-[#ffb347] border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-brutal-xl text-black relative"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-black text-[#ffb347] border-2 border-black flex items-center justify-center shrink-0">
            <AlertOctagon className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white inline-block mb-2">
              🚨 ZERO-TOLERANCE COMPLIANCE RULE
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight mb-2">
              Mandatory Database Rule
            </h3>
            <p className="text-black text-xs sm:text-sm leading-relaxed font-body font-medium">
              Participants are free to use any programming language, framework, library, AI tool, API, platform, or development tool they are comfortable with. However, teams must use <strong>ONLY the official database provided by the Hackathon organizers</strong>. Use of any external database, cloud database, local database, or alternative data-storage service is strictly prohibited and will result in <strong>AUTOMATIC DISQUALIFICATION</strong>.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono font-bold">
              <span className="px-3 py-1 rounded bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                💰 Fee: ₹200 per Team
              </span>
              <span className="px-3 py-1 rounded bg-black text-white border-2 border-black">
                ⏱️ Duration: 24 Hours Continuous
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Accordion Rules */}
      <div className="space-y-3">
        {rules.map((rule, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={rule.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.02 }}
              className={`rounded-2xl border-2 border-black transition-all duration-200 overflow-hidden ${
                rule.isImportant
                  ? "bg-[#1f1717] border-red-500 shadow-brutal"
                  : isOpen
                  ? "bg-[#171b29] shadow-brutal"
                  : "bg-[#121520] shadow-[2px_2px_0px_#000] hover:shadow-brutal"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-black flex items-center justify-center shrink-0 border-2 border-black ${
                      rule.isImportant
                        ? "bg-red-500 text-white"
                        : isOpen
                        ? "bg-[#9ae885] text-black"
                        : "bg-[#252b3d] text-white"
                    }`}
                  >
                    {rule.number}
                  </span>
                  <span
                    className={`font-black text-sm sm:text-base font-display ${
                      rule.isImportant
                        ? "text-red-400 font-bold"
                        : isOpen
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {rule.title}
                  </span>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t-2 border-black">
                      <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-body">
                        {rule.content.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="w-2 h-2 rounded-full bg-[#9ae885] mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
