import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./lib/drizzle",
  dialect: "supabase", // Change dialect to supabase
  dbCredentials: {
    url: process.env.SUPABASE_URL!, // Use SUPABASE_URL instead of POSTGRES_URL
    // You may also want to include the API key for Supabase
    apiKey: process.env.SUPABASE_API_KEY!, // Optional: include if needed
  },
});
