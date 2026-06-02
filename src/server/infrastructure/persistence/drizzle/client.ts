import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

let cached: { url: string; db: Database; sql: postgres.Sql } | null = null;

/**
 * Лінива singleton-фабрика клієнта БД (postgres-js + Drizzle). Один пул на процес.
 * Портативність: тип БД не «зашитий» ніде — для переходу достатньо змінити URL.
 */
export function getDatabase(databaseUrl: string): Database {
  if (cached && cached.url === databaseUrl) return cached.db;

  const sql = postgres(databaseUrl, { max: 10 });
  const db = drizzle(sql, { schema });
  cached = { url: databaseUrl, db, sql };
  return db;
}
