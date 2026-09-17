import { NextRequest, NextResponse } from "next/server";
import { getRegistrationRepository } from "@/lib/db/repository";
import { payeeClient } from "@/lib/payee/client";
import { emailService } from "@/lib/email/service";
import { HACKATHON_CONFIG } from "@/config/hackathon";
import { TeamMember } from "@/lib/db/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { teamName, track, members } = body;

    // 1. Basic validation
    if (!teamName || typeof teamName !== "string" || teamName.trim().length < 2) {
      return NextResponse.json(
        { error: "Team name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    if (!track || typeof track !== "string") {
      return NextResponse.json(
        { error: "Please select a valid hackathon track." },
        { status: 400 }
      );
    }

    if (!Array.isArray(members) || members.length < 2 || members.length > 4) {
      return NextResponse.json(
        { error: "Team size must be between 2 and 4 members." },
        { status: 400 }
      );
    }

    // 2. Member validation
    const seenEmails = new Set<string>();
    const sanitizedMembers: TeamMember[] = [];

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const role = i === 0 ? "Leader" : `Member ${i + 1}`;

      if (!m.name || m.name.trim().length < 2) {
        return NextResponse.json(
          { error: `${role} name is required and must be at least 2 characters.` },
          { status: 400 }
        );
      }

      if (!m.email || !EMAIL_REGEX.test(m.email.trim())) {
        return NextResponse.json(
          { error: `${role} email address is invalid.` },
          { status: 400 }
        );
      }

      const lowerEmail = m.email.trim().toLowerCase();
      if (seenEmails.has(lowerEmail)) {
        return NextResponse.json(
          { error: `Duplicate email detected within team: ${lowerEmail}` },
          { status: 400 }
        );
      }
      seenEmails.add(lowerEmail);

      if (!m.phone || !PHONE_REGEX.test(m.phone.trim())) {
        return NextResponse.json(
          { error: `${role} phone number is invalid.` },
          { status: 400 }
        );
      }

      if (!m.college || m.college.trim().length < 2) {
        return NextResponse.json(
          { error: `${role} college/organization is required.` },
          { status: 400 }
        );
      }

      sanitizedMembers.push({
        name: m.name.trim(),
        email: lowerEmail,
        phone: m.phone.trim(),
        college: m.college.trim(),
        isLeader: i === 0,
      });
    }

    const repo = getRegistrationRepository();

    // 3. Check for existing team name
    const existingTeam = await repo.findByTeamName(teamName);
    if (existingTeam && existingTeam.status === "paid") {
      return NextResponse.json(
        { error: "A team with this name is already registered." },
        { status: 409 }
      );
    }

    // 4. Check for duplicate registered emails that are already paid
    for (const mem of sanitizedMembers) {
      const existing = await repo.findByEmail(mem.email);
      if (existing && existing.status === "paid") {
        return NextResponse.json(
          { error: `Participant with email ${mem.email} is already registered in team "${existing.teamName}".` },
          { status: 409 }
        );
      }
    }

    // 5. Generate Payee Order & Pending Registration
    const payeeOrderId = payeeClient.generateOrderId();
    const registration = await repo.create(
      {
        teamName,
        track,
        members: sanitizedMembers,
      },
      payeeOrderId
    );

    const leader = sanitizedMembers[0];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const payeeOrder = await payeeClient.createOrder({
      orderId: payeeOrderId,
      amount: HACKATHON_CONFIG.registration.feeINR,
      currency: "INR",
      customer: {
        name: leader.name,
        email: leader.email,
        phone: leader.phone,
      },
      metadata: {
        registrationId: registration.id,
        teamName: registration.teamName,
        track: registration.track,
      },
      returnUrl: `${appUrl}/checkout?orderId=${payeeOrderId}&regId=${registration.id}&status=success`,
      cancelUrl: `${appUrl}/checkout?orderId=${payeeOrderId}&regId=${registration.id}&status=cancelled`,
    });

    // 6. Trigger pending email asynchronously
    emailService.sendPendingEmail(registration, payeeOrder.paymentUrl).catch((err) => {
      console.error("[api/register] Failed to send pending email:", err);
    });

    return NextResponse.json(
      {
        success: true,
        registrationId: registration.id,
        teamName: registration.teamName,
        payeeOrderId,
        checkoutUrl: payeeOrder.paymentUrl,
        amount: HACKATHON_CONFIG.registration.feeINR,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[api/register] Error processing registration:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process registration. Please try again." },
      { status: 500 }
    );
  }
}
