import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let sql;
const DB_UL = process.env.DATABASE_URL as string;
sql = neon(DB_UL);
export const db = drizzle(sql, { schema });

// const NEON_DATABASE_URL = process.env.NEON_DATABASE_URL!;

// if (NEON_DATABASE_URL) {
//   throw new Error(
//     "No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?"
//   );
// }
// const sql = neon(NEON_DATABASE_URL!);
// const db = drizzle(sql,{schema});

// export default db;
