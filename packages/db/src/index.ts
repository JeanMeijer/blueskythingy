import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env";

// Supavisor transaction mode does not support prepared statements.
const client = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle({ client });

export type Database = typeof db;
