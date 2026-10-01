import { NextRequest, NextResponse } from "next/server";
import { getRegistrationRepository } from "@/lib/db/repository";

const ADMIN_COOKIE = "edothon_admin_session";

export async function GET(req: NextRequest) {
  const session = req.cookies.get(ADMIN_COOKIE);
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const repo = getRegistrationRepository();
    const registrations = await repo.listAll();

    // Sort newest first
    const sorted = registrations.sort(
      (a, b) =>
        new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
    );

    return NextResponse.json({ registrations: sorted });
  } catch (err) {
    console.error("[admin/registrations] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch registrations." },
      { status: 500 }
    );
  }
}
