export interface PayeeOrderRequest {
  orderId: string;
  amount: number; // in INR e.g. 200
  currency: string; // "INR"
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  metadata: {
    registrationId: string;
    teamName: string;
    track: string;
  };
  returnUrl: string;
  cancelUrl: string;
}

export interface PayeeOrderResponse {
  orderId: string;
  paymentUrl: string;
  amount: number;
  currency: string;
  status: "created" | "pending";
}

export type PayeeWebhookEventType = 
  | "payment.success"
  | "payment.failed"
  | "order.created"
  | "refund.processed";

export interface PayeeWebhookPayload {
  event: PayeeWebhookEventType;
  timestamp: string;
  data: {
    orderId: string;
    transactionId: string;
    amount: number;
    currency: string;
    method?: string; // "upi" | "card" | "netbanking"
    customerEmail: string;
    metadata: {
      registrationId: string;
      teamName: string;
      track: string;
    };
    errorReason?: string;
  };
}
