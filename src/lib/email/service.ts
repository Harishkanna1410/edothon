import { Registration } from "../db/types";
import { getPendingRegistrationEmail, getConfirmedRegistrationEmail } from "./templates";

export interface IEmailService {
  sendPendingEmail(registration: Registration, checkoutUrl: string): Promise<boolean>;
  sendConfirmedEmail(registration: Registration): Promise<boolean>;
}

class EmailService implements IEmailService {
  private provider: string;
  private fromAddress: string;

  constructor() {
    this.provider = (process.env.EMAIL_PROVIDER || "mock").toLowerCase();
    this.fromAddress = process.env.EMAIL_FROM || "Edothon Team <team@edothon.dev>";
  }

  async sendPendingEmail(registration: Registration, checkoutUrl: string): Promise<boolean> {
    const leader = registration.members[0];
    const { subject, html } = getPendingRegistrationEmail(registration, checkoutUrl);

    if (this.provider === "resend" && process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: this.fromAddress,
            to: leader.email,
            subject,
            html,
          }),
        });
        if (!res.ok) {
          console.error("[EmailService/Resend] Error sending email:", await res.text());
          return false;
        }
        return true;
      } catch (err) {
        console.error("[EmailService/Resend] Exception:", err);
        return false;
      }
    }

    // Default mock / dev console logger
    console.log("==================================================================");
    console.log(`[EMAIL DISPATCHED - PENDING REGISTRATION]`);
    console.log(`To: ${leader.name} <${leader.email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Checkout URL: ${checkoutUrl}`);
    console.log(`Registration ID: ${registration.id}`);
    console.log("==================================================================");
    return true;
  }

  async sendConfirmedEmail(registration: Registration): Promise<boolean> {
    const leader = registration.members[0];
    const { subject, html } = getConfirmedRegistrationEmail(registration);

    // Also collect all team member emails
    const allEmails = registration.members.map((m) => m.email);

    if (this.provider === "resend" && process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: this.fromAddress,
            to: allEmails,
            subject,
            html,
          }),
        });
        if (!res.ok) {
          console.error("[EmailService/Resend] Error sending confirmation:", await res.text());
          return false;
        }
        return true;
      } catch (err) {
        console.error("[EmailService/Resend] Exception:", err);
        return false;
      }
    }

    // Default mock / dev console logger
    console.log("==================================================================");
    console.log(`[EMAIL DISPATCHED - CONFIRMED REGISTRATION 🎉]`);
    console.log(`To: ${allEmails.join(", ")}`);
    console.log(`Subject: ${subject}`);
    console.log(`Team: ${registration.teamName} | Official ID: ${registration.id}`);
    console.log(`Paid Amount: ₹200 | Payee Order: ${registration.payeeOrderId}`);
    console.log("==================================================================");
    return true;
  }
}

export const emailService = new EmailService();
