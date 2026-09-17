import { NextRequest, NextResponse } from "next/server";
import { getRegistrationRepository } from "@/lib/db/repository";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const query = params.id?.trim();
    if (!query) {
      return NextResponse.json({ error: "Registration ID or email is required" }, { status: 400 });
    }

    const repo = getRegistrationRepository();
    
    // Check if query is email or ID
    let registration = null;
    if (query.includes("@")) {
      registration = await repo.findByEmail(query);
    } else {
      registration = await repo.findById(query);
    }

    if (!registration) {
      return NextResponse.json({ found: false, message: "No registration found" }, { status: 404 });
    }

    // Return sanitized public status
    return NextResponse.json({
      found: true,
      registration: {
        id: registration.id,
        teamName: registration.teamName,
        track: registration.track,
        status: registration.status,
        memberCount: registration.members.length,
        leaderName: registration.members[0]?.name,
        registeredAt: registration.registeredAt,
        paidAt: registration.paidAt,
        payeeOrderId: registration.payeeOrderId,
        transactionId: registration.paymentDetails?.transactionId,
      },
    });
  } catch (err: any) {
    console.error("[api/status] Error querying status:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
