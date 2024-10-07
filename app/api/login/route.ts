// app/api/hello/route.ts

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isSamePassword = await bcrypt.compare(password, user!.password);

  if (isSamePassword) {
    const tokenData = {
      id: user?.id,
      username: user?.name,
      email: user?.email,
    };
    const secret = process.env.JWT_SECRET || "abcd";
    const token = await jwt.sign(tokenData, secret);
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("tokenEF", token, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
      sameSite: "none",
    });
    return response;
  } else {
    return NextResponse.json({ message: "Error in authentication" });
  }
}

export async function GET(request: NextRequest) {}
