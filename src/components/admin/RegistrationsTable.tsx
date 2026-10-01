"use client";

import { useState, useMemo } from "react";
import { Registration, RegistrationStatus } from "@/lib/db/types";
import TeamDetailModal from "./TeamDetailModal";

interface Props {
  registrations: Registration[];
}

const STATUS_BADGE: Record<RegistrationStatus, { bg: string; text: string; label: string }> = {
  paid: { bg: "#9ae885", text: "#0c0e14", label: "PAID" },
  pending: { bg: "#ffb347", text: "#0c0e14", label: "PENDING" },
  payment_failed: { bg: "#ff6b6b", text: "#fff", label: "FAILED" },
};

export default function RegistrationsTable({ registrations }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RegistrationStatus>("all");
  const [selected, setSelected] = useState<Registration | null>(null);

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.teamName.toLowerCase().includes(q) ||
        r.track.toLowerCase().includes(q) ||
        r.members.some(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q)
        );
      return matchStatus && matchSearch;
    });
  }, [registrations, search, statusFilter]);

  const filterButtons: { label: string; value: "all" | RegistrationStatus }[] = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "payment_failed" },
  ];

  return (
    <>
      {selected && (
        <TeamDetailModal
          registration={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by ID, team, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-2 border-black px-3 py-2 text-sm font-mono outline-none"
          style={{ backgroundColor: "#1a1d2e", color: "#fff" }}
        />
        <div className="flex gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setStatusFilter(btn.value)}
              className="px-3 py-2 text-xs font-black uppercase border-2 border-black transition-all"
              style={{
                backgroundColor:
                  statusFilter === btn.value ? "#9ae885" : "#1a1d2e",
                color: statusFilter === btn.value ? "#0c0e14" : "#9ae885",
                boxShadow:
                  statusFilter === btn.value ? "3px 3px 0px #000" : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-gray-400 text-xs mb-3 font-mono">
        Showing {filtered.length} of {registrations.length} registrations
      </p>

      {/* Table */}
      <div
        className="border-2 border-black overflow-x-auto"
        style={{ boxShadow: "4px 4px 0px #000" }}
      >
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr style={{ backgroundColor: "#1a1d2e", borderBottom: "2px solid #000" }}>
              {["Reg ID", "Team", "Track", "Members", "Leader Email", "Registered", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-gray-400"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-500 font-mono"
                >
                  No registrations found.
                </td>
              </tr>
            )}
            {filtered.map((reg, i) => {
              const badge = STATUS_BADGE[reg.status];
              const leader =
                reg.members.find((m) => m.isLeader) || reg.members[0];
              return (
                <tr
                  key={reg.id}
                  onClick={() => setSelected(reg)}
                  className="cursor-pointer transition-colors"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#13151f" : "#0f1118",
                    borderBottom: "1px solid #1e2030",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#1a2a1a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      i % 2 === 0 ? "#13151f" : "#0f1118";
                  }}
                >
                  <td className="px-4 py-3 font-mono text-xs text-lime-400">
                    {reg.id}
                  </td>
                  <td className="px-4 py-3 font-bold text-white">
                    {reg.teamName}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-xs">
                    {reg.track}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{reg.members.length}</td>
                  <td className="px-4 py-3 text-gray-300 text-xs">
                    {leader?.email || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">
                    {new Date(reg.registeredAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 text-xs font-black border border-black"
                      style={{ backgroundColor: badge.bg, color: badge.text }}
                    >
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
