// app/api/hello/route.ts

import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  if (query) {
    return NextResponse.json({ message: `Query found ${query}` });
  } else
  return NextResponse.json({ message: `Query empty!` }); 

}
