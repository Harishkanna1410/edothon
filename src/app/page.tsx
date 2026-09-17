"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ExploreGrid from "@/components/explore/ExploreGrid";
import AboutEdothon from "@/components/about/AboutEdothon";
import AboutEdobase from "@/components/about/AboutEdobase";
import ProblemStatement from "@/components/problem-statement/ProblemStatement";
import Timeline from "@/components/timeline/Timeline";
import RulesSection from "@/components/rules/RulesSection";
import RegistrationForm from "@/components/registration/RegistrationForm";
import FAQSection from "@/components/faq/FAQSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import StatusModal from "@/components/registration/StatusModal";
import MarqueeTicker from "@/components/ui/MarqueeTicker";

export default function Home() {
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0c0e14] text-gray-100 relative selection:bg-[#9ae885] selection:text-black">
      {/* Sticky & shrinking neo-brutalist navigation */}
      <Navbar onOpenStatusModal={() => setStatusModalOpen(true)} />

      {/* Hero section with "A GIANT LEAP, OUT OF THE BOX" & cassette countdown */}
      <Hero />

      {/* Invente-Style Interactive Puzzle Directory: "Find your way into Edothon '26" */}
      <ExploreGrid />

      {/* Marquee Divider */}
      <MarqueeTicker
        text="⚡ THINK BEYOND THE EXPECTED ⚡ 24 CONTINUOUS HOURS ⚡ OCTOBER 17-18, 2026 ⚡ 100% ONLINE ⚡"
        className="bg-[#c1f8ff] text-black border-y-2 border-black"
      />

      {/* About Edothon (Duration, format, collegiate spirit) */}
      <AboutEdothon />

      {/* About Edobase (Features & technical BaaS comparison) */}
      <AboutEdobase />

      {/* Marquee Divider Reverse */}
      <MarqueeTicker
        text="🚨 MANDATORY DATABASE RULE: EDOBASE REALTIME CLOUD ONLY 🚨 SUBMISSION DEADLINE: OCT 18, 9:00 AM IST 🚨"
        className="bg-[#ffb347] text-black border-y-2 border-black font-black"
        reverse={true}
      />

      {/* Problem statement (Config-driven Coming Soon / Live reveal) + Tracks */}
      <ProblemStatement />

      {/* 24-Hour Timeline & Milestones */}
      <Timeline />

      {/* 12 Rules & Regulations (Collapsible dossier accordion + database alert) */}
      <RulesSection />

      {/* Marquee Divider */}
      <MarqueeTicker
        text="🎟️ GET YOUR PASS 🎟️ TEAM ENTRY FEE: ₹200 🎟️ SQUAD SIZE: 2 TO 4 MEMBERS 🎟️ INSTANT CHECKOUT 🎟️"
        className="bg-[#9ae885] text-black border-y-2 border-black"
      />

      {/* Dynamic 2-4 members registration form */}
      <RegistrationForm />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Contact & Community War Rooms */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Check Registration Status Modal */}
      <StatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </main>
  );
}
