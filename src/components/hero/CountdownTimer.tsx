"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HACKATHON_CONFIG } from "@/config/hackathon";
import { Radio, CheckCircle, Flame } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  state: "before" | "live" | "ended";
}

function calculateISTTime(): TimeLeft {
  const now = new Date();
  const startDate = new Date(HACKATHON_CONFIG.dates.startDate);
  const endDate = new Date(HACKATHON_CONFIG.dates.endDate);

  const nowMs = now.getTime();
  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  if (nowMs < startMs) {
    const diff = Math.max(0, startMs - nowMs);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      state: "before",
    };
  } else if (nowMs >= startMs && nowMs < endMs) {
    const diff = Math.max(0, endMs - nowMs);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      state: "live",
    };
  } else {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      state: "ended",
    };
  }
}

interface ArchiveUnitProps {
  value: number;
  label: string;
  bgHex: string;
  rotation?: string;
}

function ArchiveUnit({ value, label, bgHex, rotation = "rotate-0" }: ArchiveUnitProps) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className={`flex flex-col items-center transform ${rotation} transition-transform hover:scale-105 duration-200`}>
      {/* Tape Tag Label */}
      <div className="z-10 -mb-2 px-2.5 py-0.5 rounded bg-black text-white font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase border border-black shadow-[2px_2px_0px_#fff]">
        {label}
      </div>

      {/* Cassette Card Unit */}
      <div
        className="w-16 sm:w-24 md:w-28 h-20 sm:h-28 md:h-32 rounded-xl border-[3px] border-black shadow-brutal flex flex-col justify-between p-2 relative overflow-hidden select-none"
        style={{ backgroundColor: bgHex }}
      >
        {/* Screw holes / cassette accents */}
        <div className="flex justify-between items-center opacity-80">
          <div className="w-1.5 h-1.5 rounded-full bg-black/40 border border-black/80" />
          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase text-black/60 tracking-wider">
            EDO-24H
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-black/40 border border-black/80" />
        </div>

        {/* Center Digit Value with Flip Animation */}
        <div className="relative flex items-center justify-center my-auto">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={formatted}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-black tracking-tighter"
            >
              {formatted}
            </motion.span>
          </AnimatePresence>

          {/* Cassette split line */}
          <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-black/20 pointer-events-none" />
        </div>

        {/* Bottom screw holes */}
        <div className="flex justify-between items-center opacity-80">
          <div className="w-1.5 h-1.5 rounded-full bg-black/40 border border-black/80" />
          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase text-black/60">
            CHRONO
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-black/40 border border-black/80" />
        </div>
      </div>
    </div>
  );
}

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    state: "before",
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateISTTime());

    const interval = setInterval(() => {
      setTimeLeft(calculateISTTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-500 font-mono text-sm animate-pulse">
        [ INITIALIZING IST ARCHIVE CHRONOMETER... ]
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Header Banner */}
      <div className="mb-5">
        {timeLeft.state === "before" && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9ae885] text-black border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000]">
            <Flame className="w-3.5 h-3.5" />
            <span>KICKOFF COUNTDOWN (IST)</span>
          </div>
        )}

        {timeLeft.state === "live" && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#ff84b5] text-black border-2 border-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000] animate-pulse">
            <Radio className="w-4 h-4" />
            <span>🔴 24H SPRINT IS LIVE — SUBMISSION CLOCK</span>
          </div>
        )}

        {timeLeft.state === "ended" && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c1f8ff] text-black border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_#000]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>HACKATHON CONCLUDED</span>
          </div>
        )}
      </div>

      {/* 4 Neo-Brutalist Archive Cassette Units */}
      {timeLeft.state !== "ended" ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 items-center">
          <ArchiveUnit value={timeLeft.days} label="Days" bgHex="#c1f8ff" rotation="-rotate-1" />
          <ArchiveUnit value={timeLeft.hours} label="Hours" bgHex="#9ae885" rotation="rotate-1" />
          <ArchiveUnit value={timeLeft.minutes} label="Mins" bgHex="#ffb347" rotation="-rotate-1" />
          <ArchiveUnit value={timeLeft.seconds} label="Secs" bgHex="#d8b4fe" rotation="rotate-1" />
        </div>
      ) : (
        <div className="bg-[#171b29] border-2 border-black rounded-2xl p-6 text-center max-w-md shadow-brutal">
          <h3 className="text-lg font-bold text-white mb-1 font-display">Submissions Frozen</h3>
          <p className="text-xs text-gray-400">
            Jury evaluation in progress.
          </p>
        </div>
      )}

      {/* Location / Timezone Technical Stamp */}
      <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-gray-400">
        <span className="inline-block w-2 h-2 rounded-full bg-[#9ae885]" />
        <span>OCT 17, 9:00 AM IST • TIMEZONE: ASIA/KOLKATA [UTC+05:30]</span>
      </div>
    </div>
  );
}
