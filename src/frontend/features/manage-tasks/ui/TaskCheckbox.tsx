"use client";

import { useTransition } from "react";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { toggleTaskAction } from "../api/actions";

/** Інтерактивний чекбокс задачі (фіча): перемикає completed через Server Action. */
export function TaskCheckbox({ taskId, completed }: { taskId: string; completed: boolean }) {
  const [isPending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      await toggleTaskAction(taskId, !completed);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-pressed={completed}
      aria-label={completed ? "Повернути у відкриті" : "Позначити виконаною"}
      className={cn(
        "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-50",
        completed ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background",
      )}
    >
      {completed && <Check size={14} weight="bold" />}
    </button>
  );
}
