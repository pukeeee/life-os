/** Вхідні дані для створення визначення метрики (примітиви — межа застосунку). */
export interface DefineMetricRequest {
  userId: string;
  name: string;
  kind: string;
  categoryId?: string | null;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  unit?: string | null;
  scaleMin?: number | null;
  scaleMax?: number | null;
  choiceOptions?: string[] | null;
  aggregation?: string | null;
  cadenceType?: string | null;
  activeDays?: number[] | null;
  goalType?: string | null;
  targetValue?: number | null;
  allowPartial?: boolean;
  sortOrder?: number;
}

export interface DefineMetricResponse {
  metricId: string;
}
