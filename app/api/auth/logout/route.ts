import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleLogoutRemoto } from "@/services/authLogic";

export async function POST() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("leve_sabor_admin_auth_token")?.value;
  const response = NextResponse.json({ success: true });

  await handleLogoutRemoto(token, process.env.LARAVEL_API_URL || "");

  response.cookies.delete("leve_sabor_admin_auth_token");
  return response;
}
