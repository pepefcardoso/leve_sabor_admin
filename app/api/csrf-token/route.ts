import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { handleCsrfToken } from "@/services/authLogic";

// Gera e retorna um token CSRF seguro
export async function GET() {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hora
  });
  return NextResponse.json(handleCsrfToken(csrfToken));
}

export const dynamic = "force-dynamic";
