import { pgTable, text, timestamp, date, uniqueIndex } from "drizzle-orm/pg-core";

/**
 * Таблиця користувачів. Навмисно без полів Clerk/Supabase — ідентичність
 * автономна. Коли підключимо зовнішній auth, додамо нульований `external_auth_id`
 * окремою міграцією, не ламаючи доменну модель.
 */
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    displayName: text("display_name"),
    timezone: text("timezone").notNull().default("UTC"),
    birthDate: date("birth_date", { mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export type UserRow = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
