import { NextResponse } from "next/server";

const ADMIN_COOKIE = "edothon_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password not configured on server." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
