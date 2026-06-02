"use server";

import { resolveSession } from "@shared/server/session";
import type { InsightsVM } from "@entities/insight";

/**
 * Збирає знімок інсайтів за вікно (днів): тренди числових метрик + кореляції.
 * Викликає два use cases аналітики й повертає простий VM для UI.
 */
export async function getInsights(days = 30): Promise<InsightsVM> {
  const { container, userId, today } = await resolveSession();

  const [trendsResult, correlationsResult] = await Promise.all([
    container.useCases.getMetricTrends.execute({ userId, to: today, days }),
    container.useCases.getCorrelations.execute({ userId, to: today, days }),
  ]);

  if (trendsResult.isFailure) throw new Error(trendsResult.getError().message);
  if (correlationsResult.isFailure) throw new Error(correlationsResult.getError().message);

  return {
    days,
    trends: trendsResult.getValue().trends,
    correlations: correlationsResult.getValue().correlations,
  };
}
