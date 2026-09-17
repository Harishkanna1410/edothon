import crypto from "crypto";
import { PayeeOrderRequest, PayeeOrderResponse, PayeeWebhookPayload } from "./types";

export class PayeeClient {
  private apiKey: string;
  private webhookSecret: string;
  private checkoutUrl: string;

  constructor() {
    this.apiKey = process.env.PAYEE_API_KEY || "payee_dev_key";
    this.webhookSecret = process.env.PAYEE_WEBHOOK_SECRET || "dev_payee_webhook_secret_key_123";
    this.checkoutUrl = process.env.PAYEE_CHECKOUT_URL || "";
  }

  generateOrderId(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `PAYEE-${ts}-${rand}`;
  }

  async createOrder(request: PayeeOrderRequest): Promise<PayeeOrderResponse> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // If external Payee production endpoint is provided, call it
    if (this.checkoutUrl && this.checkoutUrl.startsWith("https://") && this.apiKey !== "payee_dev_key") {
      try {
        const response = await fetch(`${this.checkoutUrl}/api/v1/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`Payee API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (err) {
        console.error("[PayeeClient] Error creating live Payee order, falling back to local checkout:", err);
      }
    }

    // Default development & testbench mode: redirect to embedded Payee checkout experience
    const checkoutUrl = `${appUrl}/checkout?orderId=${encodeURIComponent(
      request.orderId
    )}&regId=${encodeURIComponent(request.metadata.registrationId)}&amount=${request.amount}`;

    return {
      orderId: request.orderId,
      paymentUrl: checkoutUrl,
      amount: request.amount,
      currency: request.currency,
      status: "created",
    };
  }

  /**
   * Verifies the HMAC-SHA256 signature sent in the x-payee-signature header
   */
  verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
    if (!signature) {
      console.warn("[PayeeClient] Missing webhook signature header");
      return false;
    }

    try {
      const hmac = crypto.createHmac("sha256", this.webhookSecret);
      hmac.update(rawBody);
      const computedSignature = hmac.digest("hex");

      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(computedSignature)
      );
    } catch (err) {
      console.error("[PayeeClient] Signature verification failed with error:", err);
      return false;
    }
  }

  /**
   * Helper to generate a valid signature for simulated webhooks in testing
   */
  generateSignatureForPayload(rawBody: string): string {
    const hmac = crypto.createHmac("sha256", this.webhookSecret);
    hmac.update(rawBody);
    return hmac.digest("hex");
  }
}

export const payeeClient = new PayeeClient();
