import type { ReactNode } from "react";
import type { MetricVM } from "../model/types";

/**
 * Презентаційна картка метрики (шар entities). НЕ знає про логування — контрол
 * передається ззовні через слот `control` (так entities не залежить від features,
 * як вимагає FSD).
 */
export function MetricCard({ metric, control }: { metric: MetricVM; control?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xl"
          style={metric.color ? { backgroundColor: `${metric.color}1a` } : undefined}
        >
          {metric.icon ?? "•"}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 truncate font-medium">
            <span className="truncate">{metric.name}</span>
            {metric.currentStreak > 0 && (
              <span className="shrink-0 text-xs font-normal text-muted-foreground">
                🔥 {metric.currentStreak}
              </span>
            )}
          </p>
          <p className="truncate text-xs text-muted-foreground">{subtitle(metric)}</p>
        </div>
      </div>
      {control ? <div className="shrink-0">{control}</div> : null}
    </div>
  );
}

function subtitle(metric: MetricVM): string {
  if (metric.logged && metric.value) {
    const unit = metric.unit ? ` ${metric.unit}` : "";
    return `Сьогодні: ${metric.value.display}${unit}`;
  }
  if (metric.goalType !== "none" && metric.targetValue !== null) {
    const label =
      metric.goalType === "at_least" ? "≥" : metric.goalType === "at_most" ? "≤" : "=";
    const unit = metric.unit ? ` ${metric.unit}` : "";
    return `Ціль: ${label} ${metric.targetValue}${unit}`;
  }
  return metric.unit ?? KIND_LABEL[metric.kind];
}

const KIND_LABEL: Record<MetricVM["kind"], string> = {
  boolean: "Звичка",
  count: "Лічильник",
  number: "Число",
  scale: "Шкала",
  duration: "Тривалість",
  rating: "Оцінка",
  choice: "Вибір",
  text: "Нотатка",
};
