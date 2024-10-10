// app/api/hello/route.ts

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("userid");
  //TODO: mudar o return dessa api para refletir no uso do front
  try {
    const result = await prisma.categories.findMany({
      where: {
        userId: query || "",
      },
    });
    console.log(result);
    // return NextResponse.json(result);
  } catch (error) {
    console.error("Error at searching category: ", error);
    return NextResponse.json({
      message: `unexpected error at search category: ${error}`,
    });
  }

  const expenseCategories = {
    labels: ["Aluguel", "Comida", "Transporte", "Saúde", "Lazer", "Diversos"],
    datasets: [
      {
        data: [1500, 500, 300, 200, 150, 350],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return NextResponse.json(expenseCategories);
}

export async function POST(request: NextRequest) {
  const { name, description, userId } = await request.json();

  try {
    const result = await prisma.categories.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error at creating category: ", error);
    return NextResponse.json({ message: "unexpected error at creating category" });
  }
}
