/**
 * Синхронні хелпери для перемикача періоду Insights. Тримаємо окремо від
 * `api/actions.ts`, бо файл із `"use server"` дозволяє лише async-експорти.
 */
export type InsightsPeriod = 7 | 30 | 90;
export const INSIGHTS_PERIODS: readonly InsightsPeriod[] = [7, 30, 90];

export function normalizePeriod(raw: string | number | undefined): InsightsPeriod {
  const n = typeof raw === "string" ? Number(raw) : raw;
  if (n === 7 || n === 30 || n === 90) return n;
  return 30;
}
