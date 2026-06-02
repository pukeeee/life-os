import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { TaskPriorityVM, TaskVM } from "../model/types";

const PRIORITY_COLOR: Record<TaskPriorityVM, string> = {
  high: "#E8643A",
  medium: "#F5A623",
  low: "#A8A79F",
};

/**
 * Презентаційний рядок задачі (entities). Чекбокс передається ззовні слотом
 * (feature) — entities не залежить від features.
 */
export function TaskItem({ task, checkbox }: { task: TaskVM; checkbox?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      {checkbox}
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm", task.completed && "text-muted-foreground line-through")}>
          {task.title}
        </p>
        {task.dueDate && <p className="truncate text-xs text-muted-foreground">До {formatDate(task.dueDate)}</p>}
      </div>
      {task.priority && (
        <span
          aria-label={`Пріоритет: ${task.priority}`}
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: PRIORITY_COLOR[task.priority] }}
        />
      )}
    </div>
  );
}

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "short", timeZone: "UTC" }).format(date);
}
