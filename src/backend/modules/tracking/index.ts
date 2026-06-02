/**
 * Публічний API bounded context-у Tracking (універсальний движок метрик).
 */

// Domain — метрики
export { MetricDefinition } from "./domain/metric/MetricDefinition";
export { MetricKind, METRIC_KINDS } from "./domain/metric/MetricKind";
export type { MetricKindValue } from "./domain/metric/MetricKind";
export { AggregationMethod, AGGREGATIONS } from "./domain/metric/AggregationMethod";
export { Cadence, CADENCE_TYPES } from "./domain/metric/Cadence";
export { MetricTarget, GOAL_TYPES } from "./domain/metric/MetricTarget";
export type { GoalType } from "./domain/metric/MetricTarget";
export type { IMetricDefinitionRepository } from "./domain/metric/IMetricDefinitionRepository";

// Domain — записи та доба
export { Entry, ENTRY_SOURCES } from "./domain/entry/Entry";
export type { EntrySource } from "./domain/entry/Entry";
export { EntryValue } from "./domain/entry/EntryValue";
export { MetricLogged } from "./domain/entry/events/MetricLogged";
export type { IEntryRepository } from "./domain/entry/IEntryRepository";
export { Day } from "./domain/day/Day";
export { DayDate } from "./domain/day/DayDate";
export type { IDayRepository } from "./domain/day/IDayRepository";
export { Category } from "./domain/category/Category";
export type { ICategoryRepository } from "./domain/category/ICategoryRepository";
export { MetricStreak } from "./domain/streak/MetricStreak";
export { StreakCalculator } from "./domain/streak/StreakCalculator";
export type { StreakResult } from "./domain/streak/StreakCalculator";
export type { IStreakRepository } from "./domain/streak/IStreakRepository";

// Application
export { DefineMetric } from "./application/use-cases/define-metric/DefineMetric";
export type {
  DefineMetricRequest,
  DefineMetricResponse,
} from "./application/use-cases/define-metric/DefineMetricDTO";
export { LogEntry } from "./application/use-cases/log-entry/LogEntry";
export { MetricNotFoundError } from "./application/use-cases/log-entry/LogEntryErrors";
export type {
  LogEntryRequest,
  LogEntryResponse,
} from "./application/use-cases/log-entry/LogEntryDTO";
export { GetDailyOverview } from "./application/use-cases/get-daily-overview/GetDailyOverview";
export { SeedStarterMetrics } from "./application/use-cases/seed-starter-metrics/SeedStarterMetrics";
export type {
  SeedStarterMetricsRequest,
  SeedStarterMetricsResponse,
} from "./application/use-cases/seed-starter-metrics/SeedStarterMetrics";
export { CreateCategory } from "./application/use-cases/create-category/CreateCategory";
export type {
  CreateCategoryRequest,
  CreateCategoryResponse,
} from "./application/use-cases/create-category/CreateCategory";
export { ListMetrics } from "./application/use-cases/list-metrics/ListMetrics";
export type { ListMetricsRequest } from "./application/use-cases/list-metrics/ListMetrics";
export { ArchiveMetric } from "./application/use-cases/archive-metric/ArchiveMetric";
export type { ArchiveMetricRequest } from "./application/use-cases/archive-metric/ArchiveMetric";
export { RecalculateStreak } from "./application/use-cases/recalculate-streak/RecalculateStreak";
export type { RecalculateStreakRequest } from "./application/use-cases/recalculate-streak/RecalculateStreak";
export type {
  CategoryDTO,
  MetricSummaryDTO,
  TrackersOverviewDTO,
} from "./application/dto/TrackerDTO";
export type {
  DailyOverviewDTO,
  DailyOverviewMetricDTO,
  OverviewValueDTO,
  GetDailyOverviewRequest,
} from "./application/dto/DailyOverviewDTO";
export { DayService } from "./application/services/DayService";

// Infrastructure — in-memory адаптери
export { InMemoryMetricDefinitionRepository } from "./infrastructure/persistence/InMemoryMetricDefinitionRepository";
export { InMemoryEntryRepository } from "./infrastructure/persistence/InMemoryEntryRepository";
export { InMemoryDayRepository } from "./infrastructure/persistence/InMemoryDayRepository";

export { InMemoryCategoryRepository } from "./infrastructure/persistence/InMemoryCategoryRepository";
export { InMemoryStreakRepository } from "./infrastructure/persistence/InMemoryStreakRepository";

// Infrastructure — Drizzle (Postgres) адаптери
export { DrizzleMetricDefinitionRepository } from "./infrastructure/persistence/drizzle/DrizzleMetricDefinitionRepository";
export { DrizzleEntryRepository } from "./infrastructure/persistence/drizzle/DrizzleEntryRepository";
export { DrizzleDayRepository } from "./infrastructure/persistence/drizzle/DrizzleDayRepository";
export { DrizzleCategoryRepository } from "./infrastructure/persistence/drizzle/DrizzleCategoryRepository";
export { DrizzleStreakRepository } from "./infrastructure/persistence/drizzle/DrizzleStreakRepository";
