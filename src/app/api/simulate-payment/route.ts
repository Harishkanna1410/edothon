import { NextRequest, NextResponse } from "next/server";
import { payeeClient } from "@/lib/payee/client";
import { getRegistrationRepository } from "@/lib/db/repository";
import { PayeeWebhookPayload } from "@/lib/payee/types";

export async function POST(req: NextRequest) {
  try {
    const { regId, orderId, outcome } = await req.json();

    if (!regId || !orderId) {
      return NextResponse.json({ error: "Missing regId or orderId" }, { status: 400 });
    }

    const repo = getRegistrationRepository();
    const registration = await repo.findById(regId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const isSuccess = outcome !== "failed";
    const payload: PayeeWebhookPayload = {
      event: isSuccess ? "payment.success" : "payment.failed",
      timestamp: new Date().toISOString(),
      data: {
        orderId,
        transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
        amount: 200,
        currency: "INR",
        method: "UPI",
        customerEmail: registration.members[0].email,
        metadata: {
          registrationId: registration.id,
          teamName: registration.teamName,
          track: registration.track,
        },
        errorReason: isSuccess ? undefined : "Simulated bank payment decline",
      },
    };

    const rawBody = JSON.stringify(payload);
    const signature = payeeClient.generateSignatureForPayload(rawBody);

    // Call internal webhook route with valid signature
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const webhookRes = await fetch(`${appUrl}/api/webhooks/payee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-payee-signature": signature,
      },
      body: rawBody,
    });

    const webhookResult = await webhookRes.json();

    return NextResponse.json({
      success: webhookRes.ok,
      webhookStatus: webhookRes.status,
      result: webhookResult,
    });
  } catch (err: any) {
    console.error("[api/simulate-payment] Error:", err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
