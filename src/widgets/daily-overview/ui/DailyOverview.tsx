import { MetricCard, type DailyOverviewVM } from "@entities/metric";
import { MetricLogControl } from "@features/log-metric";

/**
 * Віджет «Огляд доби» — самодостатній блок екрана Today. Композує сутність
 * (MetricCard) з фічею логування (MetricLogControl), передаючи контрол у слот.
 */
export function DailyOverview({ data }: { data: DailyOverviewVM }) {
  const total = data.metrics.length;
  const logged = data.metrics.filter((m) => m.logged).length;

  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Сьогодні</h1>
          <p className="text-sm text-muted-foreground capitalize">{formatDate(data.date)}</p>
        </div>
        <span className="font-mono text-sm tabular-nums text-muted-foreground">
          {logged}/{total}
        </span>
      </header>

      {total === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Поки немає метрик на сьогодні.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.metrics.map((metric) => (
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

/** "2026-06-02" → людиночитна дата українською (без зсуву таймзони). */
function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}
