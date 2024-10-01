


  // app/api/hello/route.ts

  import { NextResponse } from 'next/server';

  export async function GET() {


    const transactions = [
        { id: 1, description: 'Salary', amount: 5000, type: 'income' },
        { id: 2, description: 'Rent', amount: 1500, type: 'expense' },
        { id: 3, description: 'Groceries', amount: 200, type: 'expense' },
        { id: 4, description: 'Freelance Work', amount: 1000, type: 'income' },
        { id: 5, description: 'Utilities', amount: 150, type: 'expense' },
      ]

  return NextResponse.json(transactions);
  
      
  }
  