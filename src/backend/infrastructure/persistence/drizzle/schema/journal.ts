import { pgTable, text, timestamp, date, index, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./identity";

/** Журнал — щоденний запис (один на добу для користувача). */
export const journalEntries = pgTable(
  "journal_entries",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date", { mode: "string" }).notNull(),
    content: text("content").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("journal_entries_user_idx").on(table.userId),
    uniqueIndex("journal_entries_user_date_uq").on(table.userId, table.date),
  ],
);

export type JournalEntryRow = typeof journalEntries.$inferSelect;
