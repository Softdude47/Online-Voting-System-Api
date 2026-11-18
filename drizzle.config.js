import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  dialect: "postgresql",
  schema: [
    "./src/schemas/party.schema.js",
    "./src/schemas/user.schema.js",
    "./src/schemas/vote.schema.js",
  ],
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
