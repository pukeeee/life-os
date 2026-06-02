import type { MetricKindValue } from "../../domain/metric/MetricKind";
import type { GoalType } from "../../domain/metric/MetricTarget";

/** Подання значення метрики для UI (без доменних обʼєктів — лише примітиви). */
export interface OverviewValueDTO {
  numeric: number | null;
  text: string | null;
  display: string;
}

/** Рядок огляду: метрика + її стан на конкретну добу. */
export interface DailyOverviewMetricDTO {
  metricId: string;
  name: string;
  kind: MetricKindValue;
  icon: string | null;
  color: string | null;
  unit: string | null;
  scaleMin: number | null;
  scaleMax: number | null;
  choiceOptions: string[] | null;
  goalType: GoalType;
  targetValue: number | null;
  logged: boolean;
  value: OverviewValueDTO | null;
  note: string | null;
  currentStreak: number;
}

/** Повний знімок доби для екрана Today. */
export interface DailyOverviewDTO {
  userId: string;
  date: string;
  metrics: DailyOverviewMetricDTO[];
}

export interface GetDailyOverviewRequest {
  userId: string;
  date: string;
}
