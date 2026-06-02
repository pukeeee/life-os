"use server";

import { resolveSession } from "@shared/server/session";
import type { InsightsVM, MetricHeatmapVM } from "@entities/insight";
import type { InsightsPeriod } from "../model/period";

/**
 * Збирає знімок інсайтів за вікно (днів): тренди + кореляції + day-of-week.
 */
export async function getInsights(days: InsightsPeriod = 30): Promise<InsightsVM> {
  const { container, userId, today } = await resolveSession();

  const [trendsResult, correlationsResult, dowResult] = await Promise.all([
    container.useCases.getMetricTrends.execute({ userId, to: today, days }),
    container.useCases.getCorrelations.execute({ userId, to: today, days }),
    container.useCases.getDayOfWeekStats.execute({ userId, to: today, days }),
  ]);

  if (trendsResult.isFailure) throw new Error(trendsResult.getError().message);
  if (correlationsResult.isFailure) throw new Error(correlationsResult.getError().message);
  if (dowResult.isFailure) throw new Error(dowResult.getError().message);

  return {
    days,
    trends: trendsResult.getValue().trends,
    correlations: correlationsResult.getValue().correlations,
    dowStats: dowResult.getValue().stats,
  };
}

/** Heatmap значень обраної метрики за вікно. */
export async function getMetricHeatmap(
  metricId: string,
  days: InsightsPeriod = 30,
): Promise<MetricHeatmapVM | null> {
  const { container, userId, today } = await resolveSession();
  const result = await container.useCases.getMetricHeatmap.execute({ userId, metricId, to: today, days });
  if (result.isFailure) throw new Error(result.getError().message);
  return result.getValue();
}
