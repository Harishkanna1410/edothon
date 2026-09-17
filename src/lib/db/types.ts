export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
  isLeader?: boolean;
}

export type RegistrationStatus = "pending" | "paid" | "payment_failed";

export interface PaymentDetails {
  transactionId?: string;
  amount?: number;
  currency?: string;
  method?: string;
  paidAt?: string;
  signature?: string;
}

export interface Registration {
  id: string; // e.g. EDO-8472
  teamName: string;
  members: TeamMember[];
  track: string;
  status: RegistrationStatus;
  payeeOrderId: string;
  registeredAt: string; // ISO 8601
  paidAt?: string;      // ISO 8601
  paymentDetails?: PaymentDetails;
  notes?: string;
}

export interface CreateRegistrationInput {
  teamName: string;
  track: string;
  members: TeamMember[];
}
