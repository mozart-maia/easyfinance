// app/api/hello/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET() {
  const user = await prisma.user.findMany();
  console.log("users find many", user);
  return NextResponse.json(user);
}
