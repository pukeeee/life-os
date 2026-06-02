import { getInsights, getMetricHeatmap, normalizePeriod, PeriodSwitcher } from "@features/view-insights";
import { InsightsBoard } from "@widgets/insights";
import { TrendsChart } from "@widgets/trends-chart";
import { DowStats } from "@widgets/dow-stats";
import { MetricHeatmap } from "@widgets/metric-heatmap";

/**
 * Екран Insights: кореляції + тренди (recharts) + day-of-week + heatmap топ-метрики.
 * Період керується через ?days=7|30|90; view залишається серверним компонентом.
 */
export async function InsightsView({ days: raw, metricId }: { days?: string; metricId?: string }) {
  const days = normalizePeriod(raw);
  const data = await getInsights(days);

  // Heatmap показуємо для обраної через ?metric= метрики або для метрики з максимальним середнім.
  const focusMetricId =
    metricId && data.trends.some((t) => t.metricId === metricId)
      ? metricId
      : data.trends.length > 0
        ? [...data.trends].sort((a, b) => (b.average ?? 0) - (a.average ?? 0))[0].metricId
        : null;
  const heatmap = focusMetricId ? await getMetricHeatmap(focusMetricId, days) : null;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Інсайти</h1>
          <p className="text-sm text-muted-foreground">
            Кореляції, тренди та розподіл по днях тижня за обране вікно.
          </p>
        </div>
        <PeriodSwitcher current={days} />
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Кореляції
        </h2>
        <InsightsBoard correlations={data.correlations} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Тренди · {data.days} дн
        </h2>
        <TrendsChart trends={data.trends} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          По днях тижня
        </h2>
        <DowStats stats={data.dowStats} />
      </section>

      {heatmap && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Heatmap
          </h2>
          <MetricHeatmap heatmap={heatmap} />
        </section>
      )}
    </main>
  );
}
