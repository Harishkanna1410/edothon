# ⚡ Edothon — 24-Hour Online Hackathon Website

A modern, high-performance, animated marketing and registration single-page website for **Edothon** — a 24-hour continuous online hackathon showcasing **Edobase** (the developer-first realtime backend platform and Firebase alternative).

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a swappable backend architecture supporting both local file-based storage and direct **Edobase** cloud clusters.

---

## 🎯 Key Facts & Directives

- **Hackathon Dates**: October 17, 2026, 9:00 AM IST → October 18, 2026, 9:00 AM IST (24 continuous hours)
- **Team Size**: 2 to 4 members per team (Leader + 1–3 members)
- **Registration Fee**: ₹200 per team (non-refundable after successful registration)
- **Database Rule**: 🚨 **Mandatory Database Rule**: All teams must use ONLY the official Edobase database provided by organizers. External databases result in automatic disqualification.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (dark cyber-tech aesthetic, custom glows, responsive grid)
- **Animations**: Framer Motion (scroll reveals, layout animations, exit transitions) + Interactive Canvas particle grid
- **Backend & Data Layer**: Swappable repository interface (`IRegistrationRepository`) with:
  - `FileRegistrationRepository`: production-ready zero-config persistent JSON storage in `.data/`
  - `EdobaseRegistrationRepository`: native REST/Realtime client for live Edobase clusters
- **Payment Gateway**: Custom-built **Payee** integration with server-side HMAC-SHA256 signature verification, idempotency, audit logging, and built-in interactive checkout testbench
- **Transactional Emails**: Pre-configured HTML templates dispatched on pending registration and payment confirmation (supporting Resend, Nodemailer, and local console logging)

---

## 🚀 Quick Start

### 1. Installation

Ensure Node.js v18+ is installed:

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Key environment variables:

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Base application URL | `http://localhost:3000` |
| `NEXT_PUBLIC_HACKATHON_START_DATE` | Hackathon start datetime in IST (ISO 8601) | `2026-10-17T09:00:00+05:30` |
| `NEXT_PUBLIC_HACKATHON_END_DATE` | Hackathon end datetime in IST | `2026-10-18T09:00:00+05:30` |
| `NEXT_PUBLIC_REGISTRATION_FEE` | Registration fee in INR | `200` |
| `PAYEE_WEBHOOK_SECRET` | Secret key for verifying Payee HMAC signatures | `dev_payee_webhook_secret_key_123` |
| `PAYEE_API_KEY` | Payee API credentials for production | `payee_live_key_placeholder` |
| `EDOBASE_API_URL` | Live Edobase cluster URL (optional) | `https://api.edobase.io/v1` |
| `EDOBASE_API_KEY` | Edobase service role key (optional) | `your_edobase_key` |
| `EMAIL_PROVIDER` | Transactional email provider (`mock`, `resend`, `nodemailer`) | `mock` |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💳 Payment & Webhook Flow

1. **Submission**: Team leader fills out the registration form (team name, track, 2–4 members).
2. **Pending State**: The backend creates a pending registration record with ID `EDO-XXXX` and generates a Payee order reference.
3. **Checkout**: The user is redirected to Payee checkout (`/checkout?orderId=...&regId=...`).
4. **Server-Side Webhook Verification**:
   - Webhook hits `POST /api/webhooks/payee`.
   - The server verifies the HMAC-SHA256 signature against `x-payee-signature`.
   - On `payment.success`: Marks registration as `paid`, sets `paidAt`, logs audit event to `.data/webhook-logs/`, and dispatches confirmation email with joining instructions.
   - Client-side confirmation is **never** trusted — only the verified server webhook marks a registration as confirmed.
5. **Checkout Simulator**: For local testing without a live bank merchant account, the checkout screen includes an embedded developer testbench that triggers genuine HMAC-signed webhooks with one click!

---

## 🔒 Swapping Data Layer to Edobase

The project abstracts all database interactions behind `IRegistrationRepository` (`src/lib/db/repository.ts`).

To dogfood and switch to your live Edobase instance:
1. Provide `EDOBASE_API_URL` and `EDOBASE_API_KEY` in `.env.local`.
2. The repository factory automatically routes all queries, mutations, and searches to your Edobase collections.

---

## 📦 Production Build

```bash
npm run build
npm start
```
