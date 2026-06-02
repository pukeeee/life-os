/**
 * View-моделі сутності «метрика» для фронтенду. Свідомо НЕ імпортуємо доменні
 * типи із `src/server` — клієнт лишається відокремленим. Форма збігається з DTO,
 * що повертають Server Actions (структурна сумісність).
 */
export type MetricKindValue =
  | "boolean"
  | "count"
  | "number"
  | "scale"
  | "duration"
  | "rating"
  | "choice"
  | "text";

export interface MetricValueVM {
  numeric: number | null;
  text: string | null;
  display: string;
}

export interface MetricVM {
  metricId: string;
  name: string;
  kind: MetricKindValue;
  icon: string | null;
  color: string | null;
  unit: string | null;
  scaleMin: number | null;
  scaleMax: number | null;
  choiceOptions: string[] | null;
  goalType: string;
  targetValue: number | null;
  logged: boolean;
  value: MetricValueVM | null;
  note: string | null;
  currentStreak: number;
}

export interface DailyOverviewVM {
  userId: string;
  date: string;
  metrics: MetricVM[];
}

/** ── Trackers (екран керування метриками) ──────────────────────────────── */

export interface CategoryVM {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  sortOrder: number;
}

export interface MetricSummaryVM {
  metricId: string;
  name: string;
  kind: MetricKindValue;
  icon: string | null;
  color: string | null;
  unit: string | null;
  cadenceType: string;
  goalType: string;
  targetValue: number | null;
  archived: boolean;
  categoryId: string | null;
  sortOrder: number;
  currentStreak: number;
  longestStreak: number;
}

export interface TrackersVM {
  categories: CategoryVM[];
  metrics: MetricSummaryVM[];
}
