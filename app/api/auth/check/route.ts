import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('leve_sabor_admin_auth_token')?.value;

  return NextResponse.json({
    isAuthenticated: !!token
  });
}