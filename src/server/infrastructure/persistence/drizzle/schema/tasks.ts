import { pgTable, text, timestamp, date, index } from "drizzle-orm/pg-core";
import { users } from "./identity";

/** Задачі (action layer). Окремий контекст; стрічки/проєкти — у майбутньому. */
export const tasks = pgTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: date("due_date", { mode: "string" }),
    priority: text("priority"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("tasks_user_idx").on(table.userId)],
);

export type TaskRow = typeof tasks.$inferSelect;
