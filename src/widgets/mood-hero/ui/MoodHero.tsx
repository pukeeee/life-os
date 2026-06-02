import type { MetricVM } from "@entities/metric/model/types";
import { MetricLogControl } from "@features/log-metric";

/**
 * Hero-блок «настрій» на екрані Today. Робить акцент на метриці настрою:
 * великий заголовок, контрол шкали поруч. Якщо метрики настрою немає — нічого
 * не рендериться (екран працює і без неї).
 */
export function MoodHero({ metric }: { metric: MetricVM | null }) {
  if (!metric) return null;

  return (
    <section
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      style={metric.color ? { backgroundColor: `${metric.color}0d` } : undefined}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span aria-hidden>{metric.icon ?? "🙂"}</span>
            <span>{metric.name}</span>
          </p>
          <p className="mt-1 truncate font-heading text-xl font-semibold tracking-tight">
            {metric.logged && metric.value ? metric.value.display : "Як ти зараз?"}
          </p>
        </div>
        {metric.currentStreak > 0 && (
          <span className="shrink-0 text-xs text-muted-foreground">🔥 {metric.currentStreak}</span>
        )}
      </div>
      <div className="mt-4">
        <MetricLogControl metric={metric} />
      </div>
    </section>
  );
}
