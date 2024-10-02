// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const database_env = process.env.DATABASE_URL || "";
    const sql = neon(database_env);
    const data = await sql`SELECT * FROM playing_with_neon;`;
    return data;
}