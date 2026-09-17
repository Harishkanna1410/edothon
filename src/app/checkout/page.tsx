"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  Lock,
  Zap,
  Ticket,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId") || "";
  const regId = searchParams.get("regId") || "";
  const amount = searchParams.get("amount") || "200";

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("builder@okhdfcbank");
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [fetchingDetails, setFetchingDetails] = useState(true);

  useEffect(() => {
    if (regId) {
      fetch(`/api/status/${regId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.found) {
            setRegistrationData(data.registration);
            if (data.registration.status === "paid") {
              setPaymentStatus("success");
            }
          }
        })
        .catch(console.error)
        .finally(() => setFetchingDetails(false));
    } else {
      setFetchingDetails(false);
    }
  }, [regId]);

  const handleSimulatePayment = async (outcome: "success" | "failed") => {
    setLoading(true);
    setPaymentStatus("processing");

    try {
      const res = await fetch("/api/simulate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regId, orderId, outcome }),
      });

      const data = await res.json();
      if (res.ok && outcome === "success") {
        setPaymentStatus("success");
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setPaymentStatus("failed");
      }
    } catch (err) {
      console.error(err);
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  if (!orderId || !regId) {
    return (
      <div className="min-h-screen bg-[#0c0e14] text-white flex items-center justify-center p-4">
        <div className="bg-[#121520] border-[3px] border-black rounded-2xl p-8 max-w-md w-full text-center shadow-brutal-xl">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black font-display mb-2 uppercase">Invalid Session</h2>
          <p className="text-gray-400 text-xs font-mono mb-6">
            Missing required order reference or registration ID. Please submit your team registration from the main page.
          </p>
          <Link
            href="/"
            className="btn-brutal px-5 py-2.5 rounded-xl bg-[#9ae885] text-black font-black text-xs uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Edothon
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0e14] text-gray-100 flex flex-col justify-between">
      {/* Top Payee Header */}
      <header className="border-b-2 border-black bg-[#121520]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#9ae885] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-black text-black text-lg">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-lg font-display tracking-tight">Payee</span>
                <span className="text-[10px] uppercase font-mono font-black px-2 py-0.5 rounded bg-[#c1f8ff] text-black border border-black shadow-[1px_1px_0px_#000]">
                  OFFICIAL GATEWAY
                </span>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3 text-[#9ae885]" /> 256-bit Encrypted Checkout
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs font-mono font-bold uppercase text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Edothon
          </Link>
        </div>
      </header>

      {/* Main Checkout Container */}
      <main className="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1 flex items-center justify-center">
        {paymentStatus === "success" ? (
          <div className="bg-[#121520] border-[3px] border-black rounded-3xl p-8 md:p-12 text-center max-w-lg w-full shadow-brutal-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#9ae885] border-2 border-black text-black flex items-center justify-center mx-auto mb-6 shadow-brutal">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="sticker-tag bg-[#9ae885] text-black px-3 py-1 rounded text-xs font-mono font-black -rotate-1">
              PAYMENT VERIFIED // OFFICIAL PASS
            </span>

            <h2 className="text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tight mt-4 mb-2">
              You&apos;re Confirmed for Edothon &apos;26!
            </h2>
            <p className="text-gray-400 text-xs font-mono mb-6">
              Your registration fee has been successfully reconciled via server webhook.
            </p>

            <div className="bg-[#171b29] border-2 border-black rounded-2xl p-5 mb-8 text-left space-y-3 font-mono text-xs shadow-brutal">
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-400">Official Reg ID:</span>
                <span className="text-[#c1f8ff] font-bold text-sm">{regId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Payee Order:</span>
                <span className="text-gray-300">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Amount Paid:</span>
                <span className="text-white font-bold">₹{amount}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Team:</span>
                <span className="text-[#9ae885] font-bold">
                  {registrationData?.teamName || "Registered Team"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="btn-brutal flex-1 py-3 px-4 rounded-xl bg-[#9ae885] text-black font-black text-xs uppercase"
              >
                Go to Event Hub
              </Link>
              <a
                href="https://discord.gg/edothon"
                target="_blank"
                rel="noreferrer"
                className="btn-brutal flex-1 py-3 px-4 rounded-xl bg-[#5865F2] text-white font-black text-xs uppercase"
              >
                Join Discord <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
            {/* Left Column: Pass Summary */}
            <div className="md:col-span-5 bg-[#121520] border-[3px] border-black rounded-3xl p-6 flex flex-col justify-between shadow-brutal-xl">
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono font-black text-[#9ae885]">
                  <Ticket className="w-4 h-4" /> OFFICIAL HACKATHON ENTRY PASS
                </div>

                <h3 className="text-2xl font-black text-white font-display mb-1">Edothon &apos;26</h3>
                <p className="text-xs text-gray-400 font-mono mb-6">24-Hour Continuous Realtime Hackathon</p>

                <div className="space-y-3 border-t-2 border-b-2 border-black py-4 text-xs font-mono">
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Reg ID:</span>
                    <span className="text-[#c1f8ff] font-bold">{regId}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Order Ref:</span>
                    <span className="text-gray-300">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Team:</span>
                    <span className="text-white font-bold font-display">
                      {registrationData?.teamName || "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Track:</span>
                    <span className="text-[#9ae885] font-semibold">{registrationData?.track || "Hackathon Track"}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Database:</span>
                    <span className="text-white font-semibold">Official Edobase</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-mono font-bold">Total Due</span>
                    <span className="text-[11px] text-gray-500 font-mono">Non-refundable pass fee</span>
                  </div>
                  <span className="text-4xl font-black text-white font-display">₹{amount}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black text-[11px] text-gray-400 flex items-center gap-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#9ae885] shrink-0" />
                <span>Protected by Payee Fraud Detection &amp; Webhook Reconciliation.</span>
              </div>
            </div>

            {/* Right Column: Methods */}
            <div className="md:col-span-7 bg-[#121520] border-[3px] border-black rounded-3xl p-6 shadow-brutal-xl">
              <h3 className="text-xl font-black text-white font-display uppercase tracking-tight mb-4">
                Select Payment Mode
              </h3>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("upi")}
                  className={`py-3 px-3 rounded-xl border-2 border-black text-xs font-mono font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === "upi"
                      ? "bg-[#9ae885] text-black shadow-brutal"
                      : "bg-[#171b29] text-gray-400 hover:text-white"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-black" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("card")}
                  className={`py-3 px-3 rounded-xl border-2 border-black text-xs font-mono font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === "card"
                      ? "bg-[#c1f8ff] text-black shadow-brutal"
                      : "bg-[#171b29] text-gray-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-black" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("netbanking")}
                  className={`py-3 px-3 rounded-xl border-2 border-black text-xs font-mono font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === "netbanking"
                      ? "bg-[#ffb347] text-black shadow-brutal"
                      : "bg-[#171b29] text-gray-400 hover:text-white"
                  }`}
                >
                  <Lock className="w-5 h-5 text-black" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Method Content */}
              {selectedMethod === "upi" && (
                <div className="bg-[#171b29] border-2 border-black rounded-2xl p-5 mb-6 space-y-4 shadow-brutal">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-300 font-bold uppercase">UPI ID / Virtual Address</span>
                    <span className="text-[#9ae885] font-bold">Instant Hook</span>
                  </div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="builder@okhdfcbank"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm font-mono focus:border-[#9ae885] focus:outline-none"
                  />
                  <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                    <span className="px-2 py-0.5 rounded bg-black text-gray-300 border border-white/10">Google Pay</span>
                    <span className="px-2 py-0.5 rounded bg-black text-gray-300 border border-white/10">PhonePe</span>
                    <span className="px-2 py-0.5 rounded bg-black text-gray-300 border border-white/10">Paytm</span>
                    <span className="px-2 py-0.5 rounded bg-black text-gray-300 border border-white/10">BHIM</span>
                  </div>
                </div>
              )}

              {selectedMethod === "card" && (
                <div className="bg-[#171b29] border-2 border-black rounded-2xl p-5 mb-6 space-y-3 shadow-brutal">
                  <input
                    type="text"
                    placeholder="Card Number"
                    defaultValue="4111 •••• •••• 1234"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm font-mono focus:border-[#c1f8ff] focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="12/28"
                      className="px-4 py-2.5 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm font-mono focus:border-[#c1f8ff] focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="982"
                      className="px-4 py-2.5 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm font-mono focus:border-[#c1f8ff] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "netbanking" && (
                <div className="bg-[#171b29] border-2 border-black rounded-2xl p-5 mb-6 text-xs font-mono space-y-2 text-gray-300 shadow-brutal">
                  <p>Choose your bank to authenticate and complete pass payment:</p>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e14] border-2 border-black text-white text-sm focus:border-[#ffb347] focus:outline-none">
                    <option>HDFC Bank</option>
                    <option>State Bank of India</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}

              {/* Webhook Execution Testbench */}
              <div className="border-2 border-dashed border-[#9ae885]/60 bg-[#9ae885]/5 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-black text-[#9ae885] uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Payee Gateway Execution
                  </span>
                  <span className="text-[10px] font-mono font-bold text-black bg-[#9ae885] px-2 py-0.5 rounded border border-black">
                    HMAC Verified
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4 font-body">
                  Trigger checkout. The Payee server-side webhook will execute with valid HMAC-SHA256 signature, mark the database record as <strong>paid</strong>, and trigger transactional confirmation email.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSimulatePayment("success")}
                    className="btn-brutal flex-1 py-3 px-4 rounded-xl bg-[#9ae885] hover:bg-[#aef49b] text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    )}
                    Pay ₹{amount} (Confirm Pass)
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSimulatePayment("failed")}
                    className="btn-brutal py-3 px-4 rounded-xl bg-[#1f1717] border-red-500 text-red-400 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Simulate Decline
                  </button>
                </div>
              </div>

              {paymentStatus === "failed" && (
                <div className="p-3 bg-red-500/10 border-2 border-red-500 rounded-xl text-red-400 text-xs font-mono flex items-center gap-2">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Payment was declined by issuing bank. You can retry with another payment mode.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black py-4 text-center text-xs font-mono text-gray-500">
        Payee Payments Inc. • Official Payment Gateway for Edothon &apos;26
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0c0e14] flex items-center justify-center text-white font-mono">
          <Loader2 className="w-8 h-8 animate-spin text-[#9ae885]" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
