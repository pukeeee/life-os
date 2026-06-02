"use client";

import { useState, useTransition } from "react";
import { archiveGoalAction, updateGoalProgressAction } from "../api/actions";

/**
 * Інтерактивні дії над ціллю: повзунок прогресу + кнопка архівації.
 * Для прозорості UX — індикатор pending.
 */
export function GoalActions({
  goalId,
  progress,
  archived,
}: {
  goalId: string;
  progress: number;
  archived: boolean;
}) {
  const [value, setValue] = useState(Math.round(progress * 100));
  const [isPending, startTransition] = useTransition();

  function commit(next: number) {
    setValue(next);
    startTransition(async () => {
      await updateGoalProgressAction(goalId, next / 100);
    });
  }

  function toggleArchive() {
    startTransition(async () => {
      await archiveGoalAction(goalId, !archived);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        disabled={isPending}
        onChange={(e) => setValue(Number(e.target.value))}
        onMouseUp={(e) => commit(Number((e.target as HTMLInputElement).value))}
        onTouchEnd={(e) => commit(Number((e.target as HTMLInputElement).value))}
        className="flex-1 accent-primary"
        aria-label="Прогрес"
      />
      <button
        type="button"
        onClick={toggleArchive}
        disabled={isPending}
        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
      >
        {archived ? "Повернути" : "Архівувати"}
      </button>
    </div>
  );
}
