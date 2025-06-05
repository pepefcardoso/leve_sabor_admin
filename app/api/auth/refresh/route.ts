import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleRefreshToken } from "@/services/authLogic";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token não encontrado." }, { status: 401 });
  }

  const result = await handleRefreshToken(refreshToken);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status || 401 });
  }
  return NextResponse.json({ accessToken: result.accessToken });
}

export const dynamic = "force-dynamic";
