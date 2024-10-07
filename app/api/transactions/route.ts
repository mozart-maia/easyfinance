// app/api/hello/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const transactions = [
    { id: 1, description: "Salário", amount: 5000, type: "income" },
    { id: 2, description: "Aluguel", amount: 1500, type: "expense" },
    { id: 3, description: "Comida", amount: 200, type: "expense" },
    { id: 4, description: "Trabalho freelance", amount: 1000, type: "income" },
    { id: 5, description: "Diversos", amount: 150, type: "expense" },
  ];

  return NextResponse.json(transactions);
}
