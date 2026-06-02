export interface TrendPointDTO {
  date: string;
  value: number;
}

export interface MetricTrendDTO {
  metricId: string;
  name: string;
  icon: string | null;
  color: string | null;
  unit: string | null;
  points: TrendPointDTO[];
  /** SMA-7 (паралельно points; null доки бракує вікна). */
  sma: (number | null)[];
  latest: number | null;
  average: number | null;
}

export interface MetricTrendsResponse {
  days: number;
  from: string;
  to: string;
  trends: MetricTrendDTO[];
}

export type CorrelationStrength = "strong" | "moderate" | "weak";
export type CorrelationDirection = "positive" | "negative";

export interface CorrelationDTO {
  metricAId: string;
  metricAName: string;
  metricBId: string;
  metricBName: string;
  r: number;
  n: number;
  strength: CorrelationStrength;
  direction: CorrelationDirection;
  insight: string;
}

export interface CorrelationsResponse {
  days: number;
  minOverlap: number;
  correlations: CorrelationDTO[];
}

/** ── Day-of-week stats ──────────────────────────────────────────────── */

export interface DowBucketDTO {
  /** 0 = неділя ... 6 = субота. */
  dow: number;
  /** Середнє значення для цього дня тижня; null якщо не було записів. */
  avg: number | null;
  count: number;
}

export interface MetricDowStatsDTO {
  metricId: string;
  name: string;
  icon: string | null;
  color: string | null;
  unit: string | null;
  byDow: DowBucketDTO[];
}

export interface DayOfWeekStatsResponse {
  days: number;
  from: string;
  to: string;
  stats: MetricDowStatsDTO[];
}

/** ── Heatmap ────────────────────────────────────────────────────────── */

export interface HeatmapCellDTO {
  date: string;
  value: number | null;
  /** Нормалізована інтенсивність 0..1 (відносно max за період). */
  intensity: number;
}

export interface MetricHeatmapResponse {
  metricId: string;
  name: string;
  color: string | null;
  days: number;
  from: string;
  to: string;
  cells: HeatmapCellDTO[];
}
