"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

export default function Timeline() {
  const schedule = HACKATHON_CONFIG.schedule;

  return (
    <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="sticker-tag bg-[#d8b4fe] text-black px-3 py-1 rounded text-xs font-mono font-black rotate-1">
          CHRONOLOGY // EVENT SPRINT
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          24H Schedule
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body">
          Key checkpoints, mentorship syncs, and demo times synchronized to Indian Standard Time (IST).
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Timeline Line */}
        <div className="hidden md:block absolute top-6 bottom-6 left-1/2 w-1 -translate-x-1/2 bg-black border-r border-white/10" />

        <div className="space-y-8 relative">
          {schedule.map((item, index) => {
            const isEven = index % 2 === 0;
            const badgeColors = ["bg-[#9ae885]", "bg-[#c1f8ff]", "bg-[#ffb347]", "bg-[#d8b4fe]", "bg-[#ff84b5]"];
            const tagBg = badgeColors[index % badgeColors.length];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-5/12">
                  <div className="bg-[#121520] border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                      <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded border border-black text-black ${tagBg}`}>
                        {item.date}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-[#9ae885]" />
                        <span>{item.time}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white font-display mb-2 group-hover:text-[#9ae885] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-body">{item.description}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex w-2/12 justify-center items-center my-4 md:my-0">
                  <div className="w-8 h-8 rounded-xl bg-[#9ae885] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-black" />
                  </div>
                </div>

                {/* Empty spacer side */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
