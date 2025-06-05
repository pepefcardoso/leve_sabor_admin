import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { handleCheckAuth } from '@/services/authLogic';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('leve_sabor_admin_auth_token')?.value;
  return NextResponse.json(handleCheckAuth(token));
}