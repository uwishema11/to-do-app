import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let sql;
const DB_URL = process.env.DATABASE_URL!;
if (!DB_URL) {
  throw new Error('DATABASE_URL is not defined');
}
sql = neon(DB_URL);
export const db = drizzle(sql, { schema });
