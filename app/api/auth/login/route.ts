import { NextResponse } from "next/server";
import {
  createOwnerSession,
  isOwnerAccessConfigured,
  OWNER_COOKIE,
  ownerSessionMaxAge,
  passwordMatches,
} from "../../../lib/owner-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isOwnerAccessConfigured()) {
    return NextResponse.json({ message: "Owner access is not configured." }, { status: 503 });
  }

  if (!(await passwordMatches(password))) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const session = await createOwnerSession();
  if (!session) {
    return NextResponse.json({ message: "Unable to create a secure session." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: OWNER_COOKIE,
    value: session,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ownerSessionMaxAge,
  });
  return response;
}
