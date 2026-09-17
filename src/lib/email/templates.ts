import { Registration } from "../db/types";

export function getPendingRegistrationEmail(registration: Registration, checkoutUrl: string) {
  const leader = registration.members[0];
  const subject = `[Action Required] Registration Received for Edothon — Complete Payment`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Edothon Registration</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #08090d; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #0f111a; border: 1px solid #1c2130; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .badge { display: inline-block; background: #8b5cf6; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 16px; }
    h1 { color: #ffffff; font-size: 24px; margin-top: 0; margin-bottom: 8px; }
    p { color: #9ca3af; font-size: 15px; line-height: 1.6; margin: 12px 0; }
    .details { background: #141724; border: 1px solid #232a3d; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; border-bottom: 1px solid #1e2436; }
    .row:last-child { border-bottom: none; }
    .label { color: #9ca3af; }
    .value { color: #e5e7eb; font-weight: 600; }
    .btn { display: inline-block; background: linear-gradient(135deg, #9333ea, #06b6d4); color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; text-align: center; }
    .footer { font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px; border-top: 1px solid #1f2937; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Registration Received</div>
    <h1>Complete Your Payment for Edothon ⚡</h1>
    <p>Hi <strong>${leader.name}</strong>,</p>
    <p>We received your registration for team <strong>"${registration.teamName}"</strong> in the <strong>${registration.track}</strong> track.</p>
    <p>To lock in your spot for the 24-hour hackathon, please complete the team registration fee payment of <strong>₹200</strong>.</p>
    
    <div class="details">
      <div class="row"><span class="label">Temporary Reg ID:</span><span class="value">${registration.id}</span></div>
      <div class="row"><span class="label">Team Name:</span><span class="value">${registration.teamName}</span></div>
      <div class="row"><span class="label">Team Size:</span><span class="value">${registration.members.length} Members</span></div>
      <div class="row"><span class="label">Amount:</span><span class="value">₹200 (Non-refundable)</span></div>
    </div>

    <center>
      <a href="${checkoutUrl}" class="btn">Proceed to Payee Checkout →</a>
    </center>

    <p style="font-size: 13px; color: #9ca3af;">If the button above does not work, copy and paste this URL into your browser:<br/><span style="color: #06b6d4; word-break: break-all;">${checkoutUrl}</span></p>

    <div class="footer">
      Edothon 2026 • Powered by Edobase Realtime Cloud<br/>
      Need assistance? Contact us at support@edothon.dev
    </div>
  </div>
</body>
</html>
`;

  return { subject, html };
}

export function getConfirmedRegistrationEmail(registration: Registration) {
  const leader = registration.members[0];
  const subject = `🎉 You're Confirmed for Edothon! (Registration ID: ${registration.id})`;

  const memberListHtml = registration.members
    .map((m, i) => `<li><strong>${m.name}</strong> (${m.email}) ${i === 0 ? "— <em>Leader</em>" : ""}</li>`)
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Edothon Registration Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #08090d; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #0f111a; border: 1px solid #10b981; border-radius: 12px; padding: 32px; box-shadow: 0 0 30px rgba(16, 185, 129, 0.2); }
    .badge { display: inline-block; background: #10b981; color: #08090d; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 16px; }
    h1 { color: #ffffff; font-size: 24px; margin-top: 0; }
    p { color: #9ca3af; font-size: 15px; line-height: 1.6; margin: 12px 0; }
    .id-box { background: #111e1c; border: 1px dashed #10b981; padding: 14px; text-align: center; border-radius: 8px; margin: 20px 0; }
    .id-val { font-family: monospace; font-size: 28px; font-weight: bold; color: #10b981; letter-spacing: 2px; }
    .details { background: #141724; border: 1px solid #232a3d; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; border-bottom: 1px solid #1e2436; }
    .row:last-child { border-bottom: none; }
    .label { color: #9ca3af; }
    .value { color: #e5e7eb; font-weight: 600; }
    .highlight-box { background: #1f142b; border-left: 4px solid #9333ea; padding: 12px 16px; border-radius: 4px; margin: 20px 0; font-size: 14px; color: #d8b4fe; }
    .footer { font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px; border-top: 1px solid #1f2937; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Official Confirmation</div>
    <h1>Welcome to Edothon 🚀</h1>
    <p>Hi <strong>${leader.name}</strong>,</p>
    <p>Payment successful! Your team <strong>"${registration.teamName}"</strong> is officially registered and confirmed for Edothon 2026.</p>
    
    <div class="id-box">
      <div style="font-size: 12px; text-transform: uppercase; color: #6ee7b7; margin-bottom: 4px;">Official Registration ID</div>
      <div class="id-val">${registration.id}</div>
    </div>

    <div class="details">
      <div class="row"><span class="label">Hackathon Dates:</span><span class="value">Oct 17, 9:00 AM IST → Oct 18, 9:00 AM IST</span></div>
      <div class="row"><span class="label">Track:</span><span class="value">${registration.track}</span></div>
      <div class="row"><span class="label">Payment Status:</span><span class="value" style="color: #10b981;">PAID (₹200)</span></div>
      <div class="row"><span class="label">Payee Order Ref:</span><span class="value">${registration.payeeOrderId}</span></div>
    </div>

    <div class="highlight-box">
      <strong>🚨 Important Hackathon Requirement:</strong>
      <p style="margin: 4px 0 0 0;">All projects must use ONLY the official Edobase database provided by organizers. Using external databases is strictly prohibited. Database credentials will be sent to this email 24 hours prior to kickoff.</p>
    </div>

    <h3 style="color: #fff; margin-top: 24px; font-size: 16px;">Registered Team Members:</h3>
    <ul style="color: #9ca3af; font-size: 14px; padding-left: 20px;">
      ${memberListHtml}
    </ul>

    <p style="margin-top: 24px;">Join the official Discord community to connect with mentors and view the announcements channel:</p>
    <center>
      <a href="https://discord.gg/edothon" style="display: inline-block; background: #5865F2; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">Join Discord Community</a>
    </center>

    <div class="footer">
      Edothon 2026 • Powered by Edobase Realtime Platform<br/>
      Questions? Reach out to support@edothon.dev
    </div>
  </div>
</body>
</html>
`;

  return { subject, html };
}
