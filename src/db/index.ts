import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let sql;
const DB_UL = process.env.DATABASE_URL as string;
sql = neon(DB_UL);
export const db = drizzle(sql, { schema });
