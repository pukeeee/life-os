import { pgTable, text, timestamp, date, numeric, index, type AnyPgColumn } from "drizzle-orm/pg-core";
import { users } from "./identity";

/** Цілі користувача з ієрархією через parent_id (self-reference). */
export const goals = pgTable(
  "goals",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentId: text("parent_id").references((): AnyPgColumn => goals.id, { onDelete: "set null" }),
    level: text("level").notNull(),
    title: text("title").notNull(),
    targetDate: date("target_date", { mode: "string" }),
    progress: numeric("progress", { precision: 4, scale: 3 }).notNull().default("0"),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("goals_user_level_idx").on(table.userId, table.level),
    index("goals_user_parent_idx").on(table.userId, table.parentId),
  ],
);

export type GoalRow = typeof goals.$inferSelect;
