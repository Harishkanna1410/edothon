"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Registration } from "@/lib/db/types";
import StatsCards from "@/components/admin/StatsCards";
import RegistrationsTable from "@/components/admin/RegistrationsTable";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRegistrations(data.registrations);
      setLastRefreshed(new Date());
    } catch {
      setError("Failed to load registrations. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function handleExport() {
    window.open("/api/admin/export", "_blank");
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#0c0e14",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Top Nav */}
      <nav
        className="sticky top-0 z-40 border-b-2 border-black px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: "#13151f" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 border-2 border-black"
            style={{ backgroundColor: "#9ae885", boxShadow: "3px 3px 0px #000" }}
          >
            <span
              className="text-black font-black text-sm"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              EDOTHON
            </span>
          </div>
          <span
            className="text-white font-black text-lg hidden sm:block"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            ADMIN
          </span>
          <span className="text-gray-600 text-sm hidden sm:block">
            Organizer Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          {lastRefreshed && (
            <span className="text-gray-500 text-xs font-mono hidden md:block">
              Updated {lastRefreshed.toLocaleTimeString("en-IN")}
            </span>
          )}
          <button
            onClick={fetchRegistrations}
            className="px-3 py-2 text-xs font-black uppercase border-2 border-black text-lime-400 hover:bg-lime-900 transition-colors"
            style={{ backgroundColor: "#1a1d2e" }}
            title="Refresh"
          >
            ↺ Refresh
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-2 text-xs font-black uppercase border-2 border-black transition-all"
            style={{
              backgroundColor: "#c1f8ff",
              color: "#0c0e14",
              boxShadow: "3px 3px 0px #000",
            }}
          >
            ↓ Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-xs font-black uppercase border-2 border-black text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
            style={{ backgroundColor: "#1a1d2e" }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8 max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl font-black text-white mb-1"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            REGISTRATIONS
          </h1>
          <p className="text-gray-400 text-sm">
            Edothon &apos;26 · Oct 17–18, 2026 · Real-time overview
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="border-2 border-black px-4 py-3 mb-6 font-bold text-sm"
            style={{ backgroundColor: "#ff6b6b", color: "#fff" }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-24">
            <div
              className="inline-block px-6 py-3 border-2 border-black font-black text-black animate-pulse"
              style={{ backgroundColor: "#9ae885" }}
            >
              LOADING...
            </div>
          </div>
        ) : (
          <>
            <StatsCards registrations={registrations} />
            <RegistrationsTable registrations={registrations} />
          </>
        )}
      </main>
    </div>
  );
}
