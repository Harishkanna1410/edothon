"use client";

import { Registration } from "@/lib/db/types";

interface Props {
  registration: Registration;
  onClose: () => void;
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  paid: { bg: "#9ae885", text: "#0c0e14" },
  pending: { bg: "#ffb347", text: "#0c0e14" },
  payment_failed: { bg: "#ff6b6b", text: "#fff" },
};

export default function TeamDetailModal({ registration: reg, onClose }: Props) {
  const style = STATUS_STYLES[reg.status] || { bg: "#eee", text: "#000" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border-2 border-black rounded-none overflow-hidden"
        style={{
          backgroundColor: "#13151f",
          boxShadow: "8px 8px 0px #9ae885",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b-2 border-black"
          style={{ backgroundColor: "#1a1d2e" }}
        >
          <div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
              {reg.id}
            </p>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {reg.teamName}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 text-xs font-black uppercase border-2 border-black"
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {reg.status.replace("_", " ")}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Track</p>
              <p className="text-white font-bold">{reg.track}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Registered</p>
              <p className="text-white font-bold">
                {new Date(reg.registeredAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>
            {reg.paidAt && (
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Paid At</p>
                <p className="text-white font-bold">
                  {new Date(reg.paidAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
              </div>
            )}
            {reg.paymentDetails?.transactionId && (
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Transaction ID</p>
                <p className="text-white font-mono text-xs break-all">
                  {reg.paymentDetails.transactionId}
                </p>
              </div>
            )}
          </div>

          {/* Members */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">
              Team Members ({reg.members.length})
            </p>
            <div className="space-y-2">
              {reg.members.map((member, i) => (
                <div
                  key={i}
                  className="border-2 border-gray-700 p-3"
                  style={{
                    backgroundColor: member.isLeader ? "#1e2a1e" : "#1a1d2e",
                    borderColor: member.isLeader ? "#9ae885" : "#374151",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">{member.name}</p>
                    {member.isLeader && (
                      <span
                        className="text-xs font-black px-2 border border-black"
                        style={{ backgroundColor: "#9ae885", color: "#0c0e14" }}
                      >
                        LEADER
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{member.email}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {member.phone} · {member.college}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payee Order ID */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Payee Order ID</p>
            <p className="text-gray-300 font-mono text-xs break-all">
              {reg.payeeOrderId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
