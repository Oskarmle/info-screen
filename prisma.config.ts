import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "lib/db/schema.prisma",
  migrations: {
    path: "lib/db/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
