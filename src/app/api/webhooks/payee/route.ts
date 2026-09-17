import { NextRequest, NextResponse } from "next/server";
import { getRegistrationRepository } from "@/lib/db/repository";
import { payeeClient } from "@/lib/payee/client";
import { emailService } from "@/lib/email/service";
import { PayeeWebhookPayload } from "@/lib/payee/types";
import fs from "fs";
import path from "path";

function logWebhookAudit(payload: any, signatureValid: boolean, statusNote: string) {
  try {
    const logsDir = path.join(process.cwd(), ".data", "webhook-logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logEntry = {
      timestamp: new Date().toISOString(),
      signatureValid,
      statusNote,
      payload,
    };
    const logFile = path.join(logsDir, `webhook-${Date.now()}.json`);
    fs.writeFileSync(logFile, JSON.stringify(logEntry, null, 2), "utf-8");
  } catch (err) {
    console.error("[Webhook Audit] Failed to save log:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-payee-signature");

    // 1. Signature Verification
    const isVerified = payeeClient.verifyWebhookSignature(rawBody, signature);
    if (!isVerified) {
      console.warn("[Webhook] Rejected unauthorized webhook with invalid signature.");
      logWebhookAudit(rawBody, false, "Signature verification failed");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    let payload: PayeeWebhookPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log(`[Webhook/Payee] Received event: ${payload.event} for order: ${payload.data?.orderId}`);

    const repo = getRegistrationRepository();
    const { orderId, transactionId, amount, currency, method, metadata, errorReason } = payload.data || {};
    const regId = metadata?.registrationId;

    // Find corresponding registration
    let registration = null;
    if (regId) {
      registration = await repo.findById(regId);
    }
    if (!registration && orderId) {
      registration = await repo.findByPayeeOrderId(orderId);
    }

    if (!registration) {
      console.error(`[Webhook] Registration record not found for Order: ${orderId} / RegId: ${regId}`);
      logWebhookAudit(payload, true, "Registration not found");
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // 2. Event Handling
    if (payload.event === "payment.success") {
      // Idempotency check: if already paid, do not double-process
      if (registration.status === "paid") {
        console.log(`[Webhook] Registration ${registration.id} is already marked as paid.`);
        logWebhookAudit(payload, true, "Already processed (idempotent)");
        return NextResponse.json({ received: true, message: "Already processed" });
      }

      const updatedRegistration = await repo.updateStatus(registration.id, "paid", {
        transactionId: transactionId || `TXN-${Date.now()}`,
        amount: amount || 200,
        currency: currency || "INR",
        method: method || "UPI",
        paidAt: new Date().toISOString(),
      });

      console.log(`[Webhook] Successfully confirmed payment for team: ${updatedRegistration.teamName} (${updatedRegistration.id})`);
      logWebhookAudit(payload, true, "Payment confirmed successfully");

      // Trigger confirmed registration email
      emailService.sendConfirmedEmail(updatedRegistration).catch((err) => {
        console.error("[Webhook] Failed to send confirmation email:", err);
      });

      return NextResponse.json({
        received: true,
        status: "paid",
        registrationId: updatedRegistration.id,
      });
    } else if (payload.event === "payment.failed") {
      await repo.updateStatus(registration.id, "payment_failed", {
        transactionId,
        amount,
        currency,
        paidAt: new Date().toISOString(),
      });

      console.warn(`[Webhook] Payment failed for team: ${registration.teamName} - Reason: ${errorReason || "Unknown"}`);
      logWebhookAudit(payload, true, `Payment failed: ${errorReason || "Unknown"}`);

      return NextResponse.json({
        received: true,
        status: "payment_failed",
        registrationId: registration.id,
      });
    }

    logWebhookAudit(payload, true, `Unhandled event: ${payload.event}`);
    return NextResponse.json({ received: true, note: "Event ignored" });
  } catch (err: any) {
    console.error("[Webhook/Payee] Fatal webhook error:", err);
    return NextResponse.json(
      { error: err?.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
