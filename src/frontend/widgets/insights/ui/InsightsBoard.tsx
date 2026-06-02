import type { CorrelationVM, InsightsVM, MetricTrendVM } from "@entities/insight";
import { Sparkline } from "@shared/ui/Sparkline";

const STRENGTH_LABEL: Record<CorrelationVM["strength"], string> = {
  strong: "сильна",
  moderate: "помірна",
  weak: "слабка",
};

/**
 * Дошка інсайтів: кореляційні картки (двигун інсайтів) + тренди числових метрик
 * зі спарклайнами. Порожні стани пояснюють, що потрібно більше даних.
 */
export function InsightsBoard({ data }: { data: InsightsVM }) {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Кореляції
        </h2>
        {data.correlations.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Замало даних для кореляцій. Потрібно щонайменше 10 спільних днів логування
            принаймні двох числових метрик.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.correlations.map((c) => (
              <CorrelationCard key={`${c.metricAId}-${c.metricBId}`} correlation={c} />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Тренди · {data.days} дн
        </h2>
        {data.trends.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Ще немає числових даних за цей період.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.trends.map((t) => (
              <TrendRow key={t.metricId} trend={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CorrelationCard({ correlation }: { correlation: CorrelationVM }) {
  return (
    <div className="rounded-lg border border-border border-l-2 border-l-primary bg-card p-4">
      <p className="text-sm">{correlation.insight}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {STRENGTH_LABEL[correlation.strength]} ·{" "}
        {correlation.direction === "positive" ? "пряма" : "зворотна"} залежність
      </p>
    </div>
  );
}

function TrendRow({ trend }: { trend: MetricTrendVM }) {
  const values = trend.points.map((p) => p.value);
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-3">
      <div className="flex min-w-0 items-center gap-3">
        <span aria-hidden className="text-lg">
          {trend.icon ?? "•"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{trend.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            Зараз: {format(trend.latest)} · Середнє: {format(trend.average)}
            {trend.unit ? ` ${trend.unit}` : ""}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-primary" style={trend.color ? { color: trend.color } : undefined}>
        <Sparkline points={values} color={trend.color} />
      </div>
    </div>
  );
}

function format(value: number | null): string {
  if (value === null) return "—";
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
