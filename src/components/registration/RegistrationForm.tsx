"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Trash2,
  ArrowRight,
  AlertCircle,
  Loader2,
  Zap,
  Building,
  Mail,
  Phone,
  User,
  Ticket,
} from "lucide-react";
import { HACKATHON_CONFIG } from "@/config/hackathon";

interface MemberFormState {
  name: string;
  email: string;
  phone: string;
  college: string;
}

export default function RegistrationForm() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [track, setTrack] = useState(HACKATHON_CONFIG.tracks[0]?.name || "Realtime Collaborative Apps");
  
  // Enforce 2–4 members
  const [members, setMembers] = useState<MemberFormState[]>([
    { name: "", email: "", phone: "", college: "" }, // Leader
    { name: "", email: "", phone: "", college: "" }, // Member 2
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleMemberChange = (index: number, field: keyof MemberFormState, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);

    const key = `member_${index}_${field}`;
    if (errors[key]) {
      const copy = { ...errors };
      delete copy[key];
      setErrors(copy);
    }
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: "", email: "", phone: "", college: "" }]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 2) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

    if (!teamName.trim() || teamName.trim().length < 2) {
      newErrors.teamName = "Team name must be at least 2 characters.";
    }

    if (!track) {
      newErrors.track = "Please select a hackathon track.";
    }

    const seenEmails = new Set<string>();

    members.forEach((m, idx) => {
      const role = idx === 0 ? "Leader" : `Member ${idx + 1}`;

      if (!m.name.trim() || m.name.trim().length < 2) {
        newErrors[`member_${idx}_name`] = `${role} name is required.`;
      }

      if (!m.email.trim()) {
        newErrors[`member_${idx}_email`] = `${role} email is required.`;
      } else if (!emailRegex.test(m.email.trim())) {
        newErrors[`member_${idx}_email`] = `Invalid email address.`;
      } else {
        const lower = m.email.trim().toLowerCase();
        if (seenEmails.has(lower)) {
          newErrors[`member_${idx}_email`] = `Duplicate email used in this team.`;
        }
        seenEmails.add(lower);
      }

      if (!m.phone.trim()) {
        newErrors[`member_${idx}_phone`] = `${role} phone is required.`;
      } else if (!phoneRegex.test(m.phone.trim())) {
        newErrors[`member_${idx}_phone`] = `Invalid phone number format.`;
      }

      if (!m.college.trim() || m.college.trim().length < 2) {
        newErrors[`member_${idx}_college`] = `${role} college/organization is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const payload = {
        teamName: teamName.trim(),
        track,
        members: members.map((m, idx) => ({
          ...m,
          name: m.name.trim(),
          email: m.email.trim(),
          phone: m.phone.trim(),
          college: m.college.trim(),
          isLeader: idx === 0,
        })),
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit registration");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        router.push(`/checkout?orderId=${data.payeeOrderId}&regId=${data.registrationId}`);
      }
    } catch (err: any) {
      console.error(err);
      setServerError(err.message || "An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t-2 border-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="sticker-tag bg-[#9ae885] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
          REGISTRATION DESK // GET PASS
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 font-display uppercase tracking-tight">
          Register Your Team
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-body max-w-xl mx-auto">
          2 to 4 members per team • ₹200 team pass (non-refundable) • Instant Payee checkout.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#121520] border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-brutal-xl relative"
      >
        {serverError && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border-2 border-red-500 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Name & Track */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider font-display flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#9ae885]" /> 1. Team &amp; Challenge Track
              </h3>
              <span className="text-[10px] font-mono text-gray-400">STEP 01/03</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 font-mono uppercase">
                  Team Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    if (errors.teamName) {
                      const c = { ...errors };
                      delete c.teamName;
                      setErrors(c);
                    }
                  }}
                  placeholder="e.g. NeoHacks"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0c0e14] border-2 text-white text-sm focus:outline-none transition ${
                    errors.teamName ? "border-red-500" : "border-black focus:border-[#9ae885]"
                  }`}
                />
                {errors.teamName && (
                  <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.teamName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 font-mono uppercase">
                  Preferred Track <span className="text-red-400">*</span>
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm focus:border-[#9ae885] focus:outline-none transition"
                >
                  {HACKATHON_CONFIG.tracks.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider font-display flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c1f8ff]" /> 2. Squad Roster ({members.length} of 4)
              </h3>

              {members.length < 4 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="btn-brutal px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider text-black bg-[#c1f8ff] hover:bg-[#d5faff]"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Add Member ({members.length + 1})
                </button>
              )}
            </div>

            <div className="space-y-4">
              {members.map((member, idx) => {
                const isLeader = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border-2 border-black transition-all ${
                      isLeader ? "bg-[#171b29] shadow-brutal" : "bg-[#0c0e14]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded border border-black ${
                          isLeader
                            ? "bg-[#9ae885] text-black shadow-[2px_2px_0px_#000]"
                            : "bg-[#252b3d] text-gray-300"
                        }`}
                      >
                        {isLeader ? "Team Leader (Primary Contact)" : `Team Member ${idx + 1}`}
                      </span>

                      {!isLeader && members.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeMember(idx)}
                          className="text-gray-400 hover:text-red-400 text-xs font-mono font-bold flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1 font-mono uppercase">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                          placeholder="e.g. Alex Rivera"
                          className={`w-full px-3 py-2 rounded-lg bg-[#121520] border-2 text-white text-xs focus:outline-none transition ${
                            errors[`member_${idx}_name`] ? "border-red-500" : "border-black focus:border-[#9ae885]"
                          }`}
                        />
                        {errors[`member_${idx}_name`] && (
                          <p className="text-red-400 text-[10px] mt-1 font-mono">{errors[`member_${idx}_name`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1 font-mono uppercase">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                          placeholder="alex@domain.com"
                          className={`w-full px-3 py-2 rounded-lg bg-[#121520] border-2 text-white text-xs focus:outline-none transition ${
                            errors[`member_${idx}_email`] ? "border-red-500" : "border-black focus:border-[#9ae885]"
                          }`}
                        />
                        {errors[`member_${idx}_email`] && (
                          <p className="text-red-400 text-[10px] mt-1 font-mono">{errors[`member_${idx}_email`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1 font-mono uppercase">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleMemberChange(idx, "phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className={`w-full px-3 py-2 rounded-lg bg-[#121520] border-2 text-white text-xs focus:outline-none transition ${
                            errors[`member_${idx}_phone`] ? "border-red-500" : "border-black focus:border-[#9ae885]"
                          }`}
                        />
                        {errors[`member_${idx}_phone`] && (
                          <p className="text-red-400 text-[10px] mt-1 font-mono">{errors[`member_${idx}_phone`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1 font-mono uppercase">
                          College / Org <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={member.college}
                          onChange={(e) => handleMemberChange(idx, "college", e.target.value)}
                          placeholder="e.g. SSN / SNUC / IIT"
                          className={`w-full px-3 py-2 rounded-lg bg-[#121520] border-2 text-white text-xs focus:outline-none transition ${
                            errors[`member_${idx}_college`] ? "border-red-500" : "border-black focus:border-[#9ae885]"
                          }`}
                        />
                        {errors[`member_${idx}_college`] && (
                          <p className="text-red-400 text-[10px] mt-1 font-mono">{errors[`member_${idx}_college`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Checkout Bar */}
          <div className="bg-[#171b29] border-[3px] border-black rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-brutal">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-black text-[#9ae885] uppercase tracking-wider">
                  TEAM ENTRY FEE
                </span>
                <span className="text-[10px] font-mono text-gray-400">(Non-refundable)</span>
              </div>
              <div className="text-3xl font-black text-white font-display">
                ₹{HACKATHON_CONFIG.registration.feeINR}{" "}
                <span className="text-xs text-gray-400 font-mono font-normal">
                  Total for Team ({members.length} members)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 font-body">
                Secures your official database node and team participation credentials.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-brutal w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#9ae885] hover:bg-[#aef49b] disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Payee...</span>
                </>
              ) : (
                <>
                  <Ticket className="w-4 h-4" />
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
