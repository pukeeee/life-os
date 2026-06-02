import {
  pgTable,
  text,
  timestamp,
  doublePrecision,
  integer,
  boolean,
  jsonb,
  date,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./identity";

/** Категорії (сфери життя). Поки лише структура — наповнення UI пізніше. */
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  icon: text("icon"),
  color: text("color"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Визначення метрик — серце движка. Типи (kind/aggregation/cadence/goal) зберігаємо
 * як text заради портативності між Postgres-сумісними БД (без міграцій pg-enum).
 */
export const metricDefinitions = pgTable(
  "metric_definitions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    description: text("description"),
    icon: text("icon"),
    color: text("color"),
    kind: text("kind").notNull(),
    unit: text("unit"),
    scaleMin: doublePrecision("scale_min"),
    scaleMax: doublePrecision("scale_max"),
    choiceOptions: jsonb("choice_options").$type<string[]>(),
    aggregation: text("aggregation").notNull(),
    cadenceType: text("cadence_type").notNull(),
    activeDays: jsonb("active_days").$type<number[]>(),
    goalType: text("goal_type").notNull(),
    targetValue: doublePrecision("target_value"),
    allowPartial: boolean("allow_partial").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("metric_definitions_user_idx").on(table.userId)],
);

/** Контейнер доби (дата в таймзоні користувача). */
export const days = pgTable(
  "days",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("days_user_date_unique").on(table.userId, table.date)],
);

/** Записи (event store): атомарні факти логування метрик. */
export const entries = pgTable(
  "entries",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    metricId: text("metric_id")
      .notNull()
      .references(() => metricDefinitions.id, { onDelete: "cascade" }),
    dayId: text("day_id")
      .notNull()
      .references(() => days.id, { onDelete: "cascade" }),
    date: date("date", { mode: "string" }).notNull(),
    valueKind: text("value_kind").notNull(),
    valueNumeric: doublePrecision("value_numeric"),
    valueText: text("value_text"),
    note: text("note"),
    source: text("source").notNull().default("app"),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("entries_metric_day_unique").on(table.metricId, table.dayId),
    index("entries_user_day_idx").on(table.userId, table.dayId),
    index("entries_metric_date_idx").on(table.metricId, table.date),
  ],
);

/** Кешований стрік по метриці (проєкція над entries; перераховується на MetricLogged). */
export const streaks = pgTable(
  "streaks",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    metricId: text("metric_id")
      .notNull()
      .references(() => metricDefinitions.id, { onDelete: "cascade" }),
    current: integer("current").notNull().default(0),
    longest: integer("longest").notNull().default(0),
    lastCompletedDate: date("last_completed_date", { mode: "string" }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("streaks_metric_unique").on(table.metricId)],
);

export type CategoryRow = typeof categories.$inferSelect;
export type MetricDefinitionRow = typeof metricDefinitions.$inferSelect;
export type DayRow = typeof days.$inferSelect;
export type EntryRow = typeof entries.$inferSelect;
export type StreakRow = typeof streaks.$inferSelect;
