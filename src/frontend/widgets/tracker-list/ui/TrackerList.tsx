import type { CategoryVM, MetricKindValue, MetricSummaryVM, TrackersVM } from "@entities/metric";
import { ArchiveMetricButton } from "@features/manage-trackers";

const KIND_LABEL: Record<MetricKindValue, string> = {
  boolean: "Звичка",
  count: "Лічильник",
  number: "Число",
  scale: "Шкала",
  duration: "Тривалість",
  rating: "Оцінка",
  choice: "Вибір",
  text: "Нотатка",
};

/**
 * Віджет «Список трекерів»: активні метрики, згруповані за категоріями, плюс
 * окрема секція архіву. Кнопки архівування — фіча manage-trackers.
 */
export function TrackerList({ data }: { data: TrackersVM }) {
  const active = data.metrics.filter((m) => !m.archived);
  const archived = data.metrics.filter((m) => m.archived);

  // Групуємо активні метрики за категорією.
  const byCategory = new Map<string | null, MetricSummaryVM[]>();
  for (const metric of active) {
    const key = metric.categoryId;
    const bucket = byCategory.get(key) ?? [];
    bucket.push(metric);
    byCategory.set(key, bucket);
  }

  const orderedCategories: (CategoryVM | null)[] = [...data.categories];
  if (byCategory.has(null)) orderedCategories.push(null); // «Інше» — в кінці

  return (
    <div className="flex flex-col gap-6">
      {active.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Ще немає метрик. Створи першу вище.
        </p>
      )}

      {orderedCategories.map((category) => {
        const key = category?.id ?? null;
        const metrics = byCategory.get(key);
        if (!metrics || metrics.length === 0) return null;
        return (
          <section key={key ?? "uncategorized"} className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {category ? category.name : "Інше"}
            </h2>
            <div className="flex flex-col gap-2">
              {metrics.map((metric) => (
                <MetricRow key={metric.metricId} metric={metric} />
              ))}
            </div>
          </section>
        );
      })}

      {archived.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Архів</h2>
          <div className="flex flex-col gap-2 opacity-60">
            {archived.map((metric) => (
              <MetricRow key={metric.metricId} metric={metric} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function MetricRow({ metric }: { metric: MetricSummaryVM }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-lg"
          style={metric.color ? { backgroundColor: `${metric.color}1a` } : undefined}
        >
          {metric.icon ?? "•"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{metric.name}</p>
          <p className="truncate text-xs text-muted-foreground">{meta(metric)}</p>
        </div>
      </div>
      <ArchiveMetricButton metricId={metric.metricId} archived={metric.archived} />
    </div>
  );
}

function meta(metric: MetricSummaryVM): string {
  const parts: string[] = [KIND_LABEL[metric.kind]];
  if (metric.unit) parts.push(metric.unit);
  if (metric.goalType !== "none" && metric.targetValue !== null) {
    const sign = metric.goalType === "at_least" ? "≥" : metric.goalType === "at_most" ? "≤" : "=";
    parts.push(`ціль ${sign} ${metric.targetValue}`);
  }
  if (metric.cadenceType === "weekly") parts.push("певні дні");
  if (metric.currentStreak > 0) parts.push(`🔥 ${metric.currentStreak}`);
  return parts.join(" · ");
}
