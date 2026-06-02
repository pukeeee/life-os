import { defineConfig } from "drizzle-kit";

/**
 * Конфіг Drizzle Kit (генерація та накат міграцій).
 * Схема навмисно зосереджена в одному місці інфраструктурного шару,
 * а доменні модулі не знають про SQL — лише про порти-репозиторії.
 *
 * Команди:
 *   npm run db:generate  — згенерувати SQL-міграцію зі схеми
 *   npm run db:migrate   — накотити міграції на DATABASE_URL
 *   npm run db:studio    — відкрити Drizzle Studio
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/infrastructure/persistence/drizzle/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://lifeos:lifeos@localhost:5432/lifeos",
  },
  strict: true,
  verbose: true,
});
