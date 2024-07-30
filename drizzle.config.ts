import './envConfig';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/db/schema.ts',
  // migrations: "./src/db/migrations",
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
