"use client";

import { motion } from "framer-motion";
import {
  Code,
  Ticket,
  Lock,
  Calendar,
  ShieldAlert,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function ExploreGrid() {
  const puzzlePieces = [
    {
      title: "HACKATHONS & TRACKS",
      subtitle: "4 Major Domains & Challenges",
      href: "#tracks",
      bg: "bg-[#9ae885]",
      text: "text-black",
      icon: Code,
      rotation: "-rotate-2",
      border: "border-black",
    },
    {
      title: "GET PASS (₹200)",
      subtitle: "Instant Team Registration",
      href: "#register",
      bg: "bg-[#c1f8ff]",
      text: "text-black",
      icon: Ticket,
      rotation: "rotate-2",
      border: "border-black",
    },
    {
      title: "PROBLEM STATEMENT",
      subtitle: "Sealed Until Oct 17 9:00 AM",
      href: "#problem-statement",
      bg: "bg-[#ffb347]",
      text: "text-black",
      icon: Lock,
      rotation: "-rotate-1",
      border: "border-black",
    },
    {
      title: "24H SCHEDULE",
      subtitle: "Timeline & Key Checkpoints",
      href: "#schedule",
      bg: "bg-[#d8b4fe]",
      text: "text-black",
      icon: Calendar,
      rotation: "rotate-3",
      border: "border-black",
    },
    {
      title: "RULES & DIRECTIVES",
      subtitle: "12 Official Rules + DB Alert",
      href: "#rules",
      bg: "bg-[#ff84b5]",
      text: "text-black",
      icon: ShieldAlert,
      rotation: "-rotate-2",
      border: "border-black",
    },
    {
      title: "DISCORD COMMUNITY",
      subtitle: "Mentorship & War Rooms",
      href: "#contact",
      bg: "bg-[#fef08a]",
      text: "text-black",
      icon: MessageSquare,
      rotation: "rotate-1",
      border: "border-black",
    },
  ];

  return (
    <section id="explore-grid" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-black">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="sticker-tag bg-[#9ae885] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          INTERACTIVE FEST DIRECTORY
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          Find your way into <span className="text-[#9ae885]">Edothon &apos;26</span>
        </h2>
        <p className="mt-3 text-gray-400 text-sm sm:text-base font-mono">
          [ CLICK ANY TILE TO TELEPORT DIRECTLY TO THAT MISSION SECTION ]
        </p>
      </div>

      {/* Invente-Style Puzzle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {puzzlePieces.map((piece, i) => {
          const Icon = piece.icon;

          return (
            <motion.a
              key={piece.title}
              href={piece.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`p-6 rounded-2xl border-[3px] ${piece.border} ${piece.bg} ${piece.text} ${piece.rotation} shadow-brutal hover:shadow-brutal-xl hover:scale-105 transition-all duration-200 flex flex-col justify-between min-h-[160px] group cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-black/10 border-2 border-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black font-display tracking-tight leading-tight mb-1">
                  {piece.title}
                </h3>
                <p className="text-xs font-mono font-bold text-black/70">
                  {piece.subtitle}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
