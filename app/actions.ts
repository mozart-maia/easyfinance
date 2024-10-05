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

export async function getCookies() {
    return cookies().get("tokenEF");
}