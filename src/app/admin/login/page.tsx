"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0c0e14", fontFamily: "Space Grotesk, sans-serif" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-4 py-2 border-2 border-black mb-4"
            style={{ backgroundColor: "#9ae885", boxShadow: "4px 4px 0px #000" }}
          >
            <span
              className="text-black font-black text-xl tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              EDOTHON
            </span>
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="border-2 border-black p-6"
          style={{
            backgroundColor: "#13151f",
            boxShadow: "6px 6px 0px #9ae885",
          }}
        >
          <h1
            className="text-white text-2xl font-black mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            SIGN IN
          </h1>

          <div className="mb-4">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full border-2 border-black px-3 py-3 text-white font-mono text-sm outline-none focus:border-lime-400 transition-colors"
              style={{ backgroundColor: "#1a1d2e" }}
            />
          </div>

          {error && (
            <div
              className="border-2 border-black px-3 py-2 mb-4 text-sm font-bold"
              style={{ backgroundColor: "#ff6b6b", color: "#fff" }}
            >
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-black py-3 font-black uppercase tracking-widest text-black transition-all active:translate-x-1 active:translate-y-1"
            style={{
              backgroundColor: loading ? "#6b7280" : "#9ae885",
              boxShadow: loading ? "none" : "4px 4px 0px #000",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "SIGNING IN..." : "SIGN IN →"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Edothon '26 · Organizer Access Only
        </p>
      </div>
    </div>
  );
}
