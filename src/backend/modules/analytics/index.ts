/**
 * Публічний API bounded context-у Analytics (двигун інсайтів).
 * Споживає read-порти контексту Tracking; має власну чисту доменну математику.
 */

// Domain
export { MovingAverage } from "./domain/MovingAverage";
export { Correlation } from "./domain/Correlation";
export type { CorrelationOutcome } from "./domain/Correlation";

// Application
export { GetMetricTrends } from "./application/use-cases/get-metric-trends/GetMetricTrends";
export type { GetMetricTrendsRequest } from "./application/use-cases/get-metric-trends/GetMetricTrends";
export { GetCorrelations } from "./application/use-cases/get-correlations/GetCorrelations";
export type { GetCorrelationsRequest } from "./application/use-cases/get-correlations/GetCorrelations";
export { GetDayOfWeekStats } from "./application/use-cases/get-day-of-week-stats/GetDayOfWeekStats";
export type { GetDayOfWeekStatsRequest } from "./application/use-cases/get-day-of-week-stats/GetDayOfWeekStats";
export { GetMetricHeatmap } from "./application/use-cases/get-metric-heatmap/GetMetricHeatmap";
export type { GetMetricHeatmapRequest } from "./application/use-cases/get-metric-heatmap/GetMetricHeatmap";
export type {
  TrendPointDTO,
  MetricTrendDTO,
  MetricTrendsResponse,
  CorrelationDTO,
  CorrelationsResponse,
  CorrelationStrength,
  CorrelationDirection,
  DowBucketDTO,
  MetricDowStatsDTO,
  DayOfWeekStatsResponse,
  HeatmapCellDTO,
  MetricHeatmapResponse,
} from "./application/dto/InsightsDTO";
