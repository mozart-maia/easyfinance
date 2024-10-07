// app/api/hello/route.ts

import { NextResponse } from "next/server";

export async function GET() {
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
