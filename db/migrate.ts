import { config } from "dotenv";
import { drizzle } from "drizzle-orm/supabase-js"; // Change this import for Supabase
import { migrate } from "drizzle-orm/supabase-js/migrator"; // Change this import for Supabase
import { createClient } from "@supabase/supabase-js"; // Import Supabase client

config({
  path: ".env.local",
});

const runMigrate = async () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
    throw new Error("SUPABASE_URL or SUPABASE_API_KEY is not defined");
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
  const db = drizzle(supabase);

  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db, { migrationsFolder: "./lib/drizzle" });
  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
