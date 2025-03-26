import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const laravelResponse = await fetch(process.env.LARAVEL_API_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!laravelResponse.ok) {
    const errorData = await laravelResponse.json();
    return NextResponse.json(
      { error: errorData.message || "Falha no login" },
      { status: 401 }
    );
  }

  const data = await laravelResponse.json();
  const token = data.token;
  if (!token) {
    return NextResponse.json(
      { error: "Token de autenticação não foi reconhecido" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("leve_sabor_admin_auth_token", token, {
    httpOnly: true,
    secure: true, // process.env.NODE_ENV === 'production',
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 120,
  });
  return response;
}
