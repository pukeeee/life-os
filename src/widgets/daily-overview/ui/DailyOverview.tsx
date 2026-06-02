import { MetricCard, type MetricVM } from "@entities/metric";
import { MetricLogControl } from "@features/log-metric";

/**
 * Віджет «Огляд доби» — список метрик дня. Заголовок екрана (з датою/прогресом)
 * виноситься на рівень view, тому віджет рендерить лише локальний підзаголовок.
 */
export function DailyOverview({ metrics }: { metrics: MetricVM[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-lg font-semibold tracking-tight">Трекери</h2>
      {metrics.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Поки немає метрик на сьогодні.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.metricId}
              metric={metric}
              control={<MetricLogControl metric={metric} />}
            />
          ))}
        </div>
      )}
    </section>
  );
}
