// app/api/hello/route.ts

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("userid");
  try {
    const result = await prisma.expense.findMany({
      where: {
        userId: query || "",
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error at searching expenses: ", error);
    return NextResponse.json({
      message: `unexpected error at search expenses: ${error}`,
    });
  }
}

export async function POST(request: NextRequest) {
  const { value, date, userId, categoryId } = await request.json();

  try {
    const result = await prisma.expense.create({
      data: {
        value,
        date,
        userId,
        categoryId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error at creating expense: ", error);
    return NextResponse.json({ message: "unexpected error at creating expense" });
  }
}
