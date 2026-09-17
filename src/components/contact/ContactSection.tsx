"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, PhoneCall, ExternalLink, ArrowUpRight } from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

export default function ContactSection() {
  const contact = HACKATHON_CONFIG.contact;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="sticker-tag bg-[#9ae885] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          COMMUNICATIONS // WAR ROOMS
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          Connect With Organizers
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body">
          Need a team, technical mentorship, or support? Join our live hackathon frequency.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Discord Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#121520] border-[3px] border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-brutal hover:shadow-brutal-xl transition-all duration-200 group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#5865F2] border-2 border-black flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_#000]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white font-display mb-1">Official Discord</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-body">
              Primary event operational channel: live keynote voice lounges, mentor ticket queues, and peer code discussions.
            </p>
          </div>

          <a
            href={contact.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-brutal w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-black text-xs uppercase tracking-wider text-center"
          >
            <span>Join Discord</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* WhatsApp Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#121520] border-[3px] border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-brutal hover:shadow-brutal-xl transition-all duration-200 group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#9ae885] border-2 border-black flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_#000]">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white font-display mb-1">WhatsApp Broadcast</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-body">
              Critical mobile announcements, urgent schedule updates, food delivery coordinates, and submission alerts.
            </p>
          </div>

          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-brutal w-full py-3 rounded-xl bg-[#9ae885] hover:bg-[#aef49b] text-black font-black text-xs uppercase tracking-wider text-center"
          >
            <span>Join Broadcast</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Support Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#121520] border-[3px] border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-brutal hover:shadow-brutal-xl transition-all duration-200 group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#c1f8ff] border-2 border-black flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_#000]">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white font-display mb-1">Organizer Desk</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-body">
              For payment reconciliation, college delegations, campus brand sponsorships, or institutional queries.
            </p>
          </div>

          <a
            href={`mailto:${contact.supportEmail}`}
            className="btn-brutal w-full py-3 rounded-xl bg-[#c1f8ff] hover:bg-[#d5faff] text-black font-black text-xs uppercase tracking-wider text-center"
          >
            <span>Email Desk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
