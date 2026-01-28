import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/schema/index.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
