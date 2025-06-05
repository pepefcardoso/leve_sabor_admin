import { NextResponse } from "next/server";
import { authenticateUser } from "@/services/authLogic";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const apiUrl = process.env.LARAVEL_API_URL!;
  const result = await authenticateUser(email, password, apiUrl);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true, user: result.user });
  response.cookies.set("leve_sabor_admin_auth_token", result.token, {
    httpOnly: true,
    secure: true, // process.env.NODE_ENV === 'production',
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 120,
  });
  return response;
}
