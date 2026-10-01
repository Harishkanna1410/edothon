import { NextResponse } from "next/server";

const ADMIN_COOKIE = "edothon_admin_session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
