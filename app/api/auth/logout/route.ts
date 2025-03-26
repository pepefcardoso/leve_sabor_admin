import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("leve_sabor_admin_auth_token")?.value;
  const response = NextResponse.json({ success: true });

  try {
    await fetch(process.env.LARAVEL_API_URL + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro no logout remoto:", error);
  } finally {
    response.cookies.delete("leve_sabor_admin_auth_token");
  }

  return response;
}
