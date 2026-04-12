const { defineConfig } = require("drizzle-kit");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

module.exports = defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
