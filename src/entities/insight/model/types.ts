/** View-моделі інсайтів (дзеркало DTO аналітики; клієнт не залежить від server). */
export interface TrendPointVM {
  date: string;
  value: number;
}

export interface MetricTrendVM {
  metricId: string;
  name: string;
  icon: string | null;
  color: string | null;
  unit: string | null;
  points: TrendPointVM[];
  sma: (number | null)[];
  latest: number | null;
  average: number | null;
}

export type CorrelationStrengthVM = "strong" | "moderate" | "weak";
export type CorrelationDirectionVM = "positive" | "negative";

export interface CorrelationVM {
  metricAId: string;
  metricAName: string;
  metricBId: string;
  metricBName: string;
  r: number;
  n: number;
  strength: CorrelationStrengthVM;
  direction: CorrelationDirectionVM;
  insight: string;
}

export interface InsightsVM {
  days: number;
  trends: MetricTrendVM[];
  correlations: CorrelationVM[];
}
