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
