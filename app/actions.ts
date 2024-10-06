// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import { cookies } from 'next/headers'

export async function getData() {
    const database_env = process.env.DATABASE_URL || "";
    const sql = neon(database_env);
    const data = await sql`SELECT * FROM playing_with_neon;`;
    return data;
}

function parseJwt (token:string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export async function getJwtInfo() {

    const cks = await cookies().get("tokenEF");
    if (cks) {
        return parseJwt(cks!.value);
    }
    return null;    
}