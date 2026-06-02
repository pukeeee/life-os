import type { CorrelationVM } from "@entities/insight";

const STRENGTH_LABEL: Record<CorrelationVM["strength"], string> = {
  strong: "сильна",
  moderate: "помірна",
  weak: "слабка",
};

/**
 * Дошка кореляцій (раніше містила й тренди — їх винесено в окремий
 * widgets/trends-chart, бо тепер це recharts-чарт).
 */
export function InsightsBoard({ correlations }: { correlations: CorrelationVM[] }) {
  if (correlations.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Замало даних для кореляцій. Потрібно щонайменше 10 спільних днів логування
        принаймні двох числових метрик.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {correlations.map((c) => (
        <div
          key={`${c.metricAId}-${c.metricBId}`}
          className="rounded-lg border border-border border-l-2 border-l-primary bg-card p-4"
        >
          <p className="text-sm">{c.insight}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {STRENGTH_LABEL[c.strength]} ·{" "}
            {c.direction === "positive" ? "пряма" : "зворотна"} залежність
          </p>
        </div>
      ))}
    </div>
  );
}
