import { NextRequest, NextResponse } from "next/server";
import { getRegistrationRepository } from "@/lib/db/repository";
import { Registration } from "@/lib/db/types";

const ADMIN_COOKIE = "edothon_admin_session";

function escapeCsv(value: string | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function registrationToCsvRow(reg: Registration): string {
  const leader = reg.members.find((m) => m.isLeader) || reg.members[0];
  const memberNames = reg.members.map((m) => m.name).join(" | ");
  const memberEmails = reg.members.map((m) => m.email).join(" | ");
  const memberColleges = Array.from(new Set(reg.members.map((m) => m.college))).join(" | ");

  return [
    escapeCsv(reg.id),
    escapeCsv(reg.teamName),
    escapeCsv(reg.track),
    escapeCsv(String(reg.members.length)),
    escapeCsv(memberNames),
    escapeCsv(leader?.email),
    escapeCsv(leader?.phone),
    escapeCsv(memberEmails),
    escapeCsv(memberColleges),
    escapeCsv(reg.status),
    escapeCsv(reg.registeredAt),
    escapeCsv(reg.paidAt || ""),
    escapeCsv(reg.paymentDetails?.transactionId || ""),
    escapeCsv(reg.paymentDetails?.method || ""),
  ].join(",");
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(ADMIN_COOKIE);
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const repo = getRegistrationRepository();
    const registrations = await repo.listAll();

    const sorted = registrations.sort(
      (a, b) =>
        new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
    );

    const headers = [
      "Reg ID",
      "Team Name",
      "Track",
      "Members Count",
      "Member Names",
      "Leader Email",
      "Leader Phone",
      "All Emails",
      "Colleges",
      "Status",
      "Registered At",
      "Paid At",
      "Transaction ID",
      "Payment Method",
    ].join(",");

    const rows = sorted.map(registrationToCsvRow);
    const csv = [headers, ...rows].join("\n");

    const now = new Date().toISOString().split("T")[0];
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="edothon-registrations-${now}.csv"`,
      },
    });
  } catch (err) {
    console.error("[admin/export] Error:", err);
    return NextResponse.json(
      { error: "Failed to export registrations." },
      { status: 500 }
    );
  }
}
