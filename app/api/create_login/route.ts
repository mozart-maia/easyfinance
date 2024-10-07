// app/api/hello/route.ts

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  try {
    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(password, salt);

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("Error at creating login: ", error);
    return NextResponse.json({ message: "Unwaited error" });
  }
}

export async function GET(request: NextRequest) {}
