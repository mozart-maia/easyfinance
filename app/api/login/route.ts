// app/api/hello/route.ts

import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
   const { name, email, password } = await request.json();

   const saltRounds = 10;

   let result = null;

   await bcrypt.genSalt(saltRounds, async function(err, salt) {

    if (err) {
        return NextResponse.json({message: "Error when generating salt for password"});
    }

    await bcrypt.hash(password, salt, async function(err, hash) {

        if (err) {
            return NextResponse.json({message: "Error when creating hash for password"});
        }

        result = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
           })
        console.log("result", result)
        return NextResponse.json(result);
    });
});

    return NextResponse.json({message: "Erro inesperado"});
  
}

export async function GET(request: NextRequest){
    
}
