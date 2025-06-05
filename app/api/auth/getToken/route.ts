import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { handleGetToken } from "@/services/authLogic";

export async function GET() {
  const token = (await cookies()).get("leve_sabor_admin_auth_token")?.value;
  return NextResponse.json(handleGetToken(token));
}
