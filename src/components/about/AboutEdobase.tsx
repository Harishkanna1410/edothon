"use client";

import { motion } from "framer-motion";
import { Zap, Database, KeyRound, HardDrive, Cpu, Layers, Check, ShieldCheck } from "lucide-react";

export default function AboutEdobase() {
  const pillars = [
    {
      icon: Zap,
      title: "Realtime WebSocket Mesh",
      desc: "Sub-10ms pub/sub synchronization across connected web and mobile clients with delta compression.",
      badge: "CORE PROTOCOL",
      color: "text-[#9ae885]",
    },
    {
      icon: Database,
      title: "Reactive Document Store",
      desc: "Instant JSON collections with atomic batch writes, compound queries, and real-time event triggers.",
      badge: "DATA LAYER",
      color: "text-[#c1f8ff]",
    },
    {
      icon: KeyRound,
      title: "Declarative Auth & RBAC",
      desc: "Passwordless magic auth, GitHub/Google OAuth, and fine-grained row-level security rules.",
      badge: "ZERO TRUST",
      color: "text-[#ffb347]",
    },
    {
      icon: HardDrive,
      title: "Zero-Config Storage",
      desc: "Fast S3-compatible asset store with automatic image transformations and signed download URLs.",
      badge: "OBJECT STORAGE",
      color: "text-[#d8b4fe]",
    },
    {
      icon: Cpu,
      title: "Edge Cloud Compute",
      desc: "Run serverless TypeScript functions worldwide near users with zero cold starts and instant deploys.",
      badge: "SERVERLESS",
      color: "text-[#ff84b5]",
    },
    {
      icon: Layers,
      title: "Swappable Infrastructure",
      desc: "Zero vendor lock-in. Switch underlying engines between PostgreSQL, SQLite, or distributed caches.",
      badge: "OPEN ARCHITECTURE",
      color: "text-[#fef08a]",
    },
  ];

  const comparison = [
    {
      aspect: "Realtime Latency",
      edobase: "Sub-10ms binary WebSocket multiplexing",
      firebase: "Standard HTTP long-polling & WebSockets",
    },
    {
      aspect: "Data Sovereignty",
      edobase: "100% data exportable in standard JSON/SQL",
      firebase: "Proprietary NoSQL format & egress fees",
    },
    {
      aspect: "Pricing Predictability",
      edobase: "Predictable developer tiers with zero bill shock",
      firebase: "Pay-per-document read/write curve",
    },
    {
      aspect: "Self-Hostable",
      edobase: "Deploy anywhere (Docker, Fly, AWS, Bare Metal)",
      firebase: "Strictly locked to Google Cloud Platform",
    },
    {
      aspect: "Developer SDKs",
      edobase: "End-to-end type-safe TypeScript & Go SDKs",
      firebase: "Mature SDKs with complex rule DSL",
    },
  ];

  return (
    <section id="edobase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="sticker-tag bg-[#9ae885] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          THE ENGINE // ABOUT EDOBASE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          Next-Gen Realtime Platform
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body">
          We built Edobase because building real-time collaborative software shouldn&apos;t lock you into proprietary ecosystems.
        </p>
      </motion.div>

      {/* 6 Feature Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#121520] border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-black border-2 border-black flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-gray-300 border border-white/10">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white font-display mb-2 group-hover:text-[#9ae885] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-body">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>EDOBASE ENGINE</span>
                <span className="text-[#9ae885] font-bold">READY</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#121520] border-[3px] border-black rounded-2xl overflow-hidden shadow-brutal-xl"
      >
        <div className="px-6 py-4 bg-[#171b29] border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-white font-display uppercase tracking-wider">
              Technical Comparison Matrix
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Objective architectural comparison: Edobase vs Traditional BaaS
            </p>
          </div>
          <span className="sticker-tag bg-[#c1f8ff] text-black px-2.5 py-1 rounded text-[10px] font-mono font-black">
            DEVELOPER FIRST
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-body">
            <thead>
              <tr className="border-b-2 border-black text-gray-300 font-mono text-xs uppercase bg-black/40">
                <th className="py-3 px-6 font-bold">Architectural Metric</th>
                <th className="py-3 px-6 font-black text-black bg-[#9ae885]">
                  Edobase (This Hackathon)
                </th>
                <th className="py-3 px-6 font-bold text-gray-300">
                  Firebase (Traditional Cloud)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-gray-300">
              {comparison.map((row) => (
                <tr key={row.aspect} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-6 font-bold text-white font-mono text-xs">
                    {row.aspect}
                  </td>
                  <td className="py-3.5 px-6 text-black bg-[#9ae885]/15 font-semibold">
                    <span className="flex items-center gap-1.5 text-white">
                      <Check className="w-4 h-4 text-[#9ae885] shrink-0 stroke-[3]" />
                      {row.edobase}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-gray-400 text-xs">
                    {row.firebase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
