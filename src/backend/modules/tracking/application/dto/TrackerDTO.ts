import type { MetricKindValue } from "../../domain/metric/MetricKind";
import type { GoalType } from "../../domain/metric/MetricTarget";
import type { CadenceType } from "../../domain/metric/Cadence";

/** Категорія для UI. */
export interface CategoryDTO {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  sortOrder: number;
}

/** Стислий опис метрики для екрана керування трекерами. */
export interface MetricSummaryDTO {
  metricId: string;
  name: string;
  kind: MetricKindValue;
  icon: string | null;
  color: string | null;
  unit: string | null;
  cadenceType: CadenceType;
  goalType: GoalType;
  targetValue: number | null;
  archived: boolean;
  categoryId: string | null;
  sortOrder: number;
  currentStreak: number;
  longestStreak: number;
}

/** Повний знімок екрана Trackers. */
export interface TrackersOverviewDTO {
  categories: CategoryDTO[];
  metrics: MetricSummaryDTO[];
}
