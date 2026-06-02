import type { ReactNode } from "react";
import type { GoalVM } from "../model/types";

const LEVEL_LABEL: Record<GoalVM["level"], string> = {
  life: "Життя",
  year: "Рік",
  quarter: "Квартал",
  month: "Місяць",
  week: "Тиждень",
};

/**
 * Презентаційна картка цілі (entities). Контрол прогресу/архівації — у слоті
 * `actions`, бо це features.
 */
export function GoalCard({ goal, actions }: { goal: GoalVM; actions?: ReactNode }) {
  const pct = Math.round(goal.progress * 100);
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <span>{LEVEL_LABEL[goal.level]}</span>
            {goal.targetDate && <span>· до {formatDate(goal.targetDate)}</span>}
          </p>
          <p className="truncate font-medium">{goal.title}</p>
        </div>
        <span className="font-mono text-sm tabular-nums text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
      {actions ? <div className="pt-1">{actions}</div> : null}
    </div>
  );
}

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "short", timeZone: "UTC" }).format(date);
}
