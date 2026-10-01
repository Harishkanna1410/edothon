"use client";

import { Registration } from "@/lib/db/types";

interface Props {
  registrations: Registration[];
}

export default function StatsCards({ registrations }: Props) {
  const total = registrations.length;
  const paid = registrations.filter((r) => r.status === "paid").length;
  const pending = registrations.filter((r) => r.status === "pending").length;
  const failed = registrations.filter(
    (r) => r.status === "payment_failed"
  ).length;
  const revenue = paid * 200;

  const cards = [
    { label: "Total Teams", value: total, color: "#c1f8ff", text: "#0c0e14" },
    { label: "Paid ✓", value: paid, color: "#9ae885", text: "#0c0e14" },
    { label: "Pending", value: pending, color: "#ffb347", text: "#0c0e14" },
    { label: "Failed", value: failed, color: "#ff6b6b", text: "#fff" },
    {
      label: "Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      color: "#d8b4fe",
      text: "#0c0e14",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="border-2 border-black rounded-none p-4"
          style={{
            backgroundColor: card.color,
            boxShadow: "4px 4px 0px #000",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: card.text, opacity: 0.7 }}
          >
            {card.label}
          </p>
          <p
            className="text-3xl font-black"
            style={{ color: card.text, fontFamily: "Syne, sans-serif" }}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
