"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = HACKATHON_CONFIG.faqs;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="sticker-tag bg-[#c1f8ff] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          KNOWLEDGE BASE // INQUIRIES
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body">
          Key clarifications on eligibility, team composition, database rules, and checkout.
        </p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className={`rounded-2xl border-2 border-black transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#171b29] shadow-brutal"
                  : "bg-[#121520] shadow-[2px_2px_0px_#000] hover:shadow-brutal"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-black text-sm sm:text-base text-white font-display pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#9ae885]" : ""
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
                    <div className="px-6 pb-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t-2 border-black pt-3 font-body">
                      {faq.answer}
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
