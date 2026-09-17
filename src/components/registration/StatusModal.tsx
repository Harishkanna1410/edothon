"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, CheckCircle2, AlertCircle, Clock, ArrowRight, Loader2, Ticket } from "lucide-react";
import Link from "next/link";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatusModal({ isOpen, onClose }: StatusModalProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/status/${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.found) {
        setError(data.message || "No registration found for that ID or email.");
      } else {
        setResult(data.registration);
      }
    } catch (err: any) {
      setError("Failed to query registration status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#121520] border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-brutal-xl overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-black hover:bg-black hover:text-white bg-[#c1f8ff] border-2 border-black transition shadow-[2px_2px_0px_#000]"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          <div className="mb-6">
            <span className="sticker-tag bg-[#c1f8ff] text-black px-2.5 py-0.5 rounded text-[10px] font-mono font-black rotate-1">
              PARTICIPANT DESK // QUERY
            </span>
            <h3 className="text-2xl font-black text-white mt-2 font-display uppercase">
              Check Team Status
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Enter Registration ID (e.g. EDO-XXXX) or registered leader email.
            </p>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="EDO-1234 or team@gmail.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm focus:border-[#9ae885] focus:outline-none font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-brutal px-5 py-2.5 rounded-xl bg-[#9ae885] text-black text-xs font-black uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Lookup
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border-2 border-red-500 text-red-400 text-xs flex items-center gap-2 mb-4 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div className="bg-[#171b29] border-2 border-black rounded-2xl p-5 space-y-3 font-mono text-xs shadow-brutal">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="text-gray-400">Team:</span>
                <span className="text-white font-black text-base font-display">{result.teamName}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Reg ID:</span>
                <span className="text-[#c1f8ff] font-bold">{result.id}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Status:</span>
                {result.status === "paid" ? (
                  <span className="inline-flex items-center gap-1 text-[#9ae885] font-black">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" /> CONFIRMED &amp; PAID
                  </span>
                ) : result.status === "payment_failed" ? (
                  <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                    <AlertCircle className="w-4 h-4" /> PAYMENT FAILED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[#ffb347] font-bold">
                    <Clock className="w-4 h-4" /> PENDING PAYMENT
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Track:</span>
                <span className="text-gray-200 font-body font-medium">{result.track}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Leader:</span>
                <span className="text-white font-semibold">{result.leaderName} ({result.memberCount} members)</span>
              </div>

              {result.status !== "paid" && (
                <div className="pt-3 border-t-2 border-black">
                  <Link
                    href={`/checkout?orderId=${result.payeeOrderId}&regId=${result.id}`}
                    onClick={onClose}
                    className="btn-brutal w-full py-2.5 rounded-xl bg-[#9ae885] text-black font-black text-xs tracking-wider uppercase text-center flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Complete Payment (₹200)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
