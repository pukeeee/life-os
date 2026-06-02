"use client";

import { useState, useTransition } from "react";
import { GOAL_LEVELS_VM, type GoalLevelVM } from "@entities/goal";
import { createGoalAction } from "../api/actions";

const LEVEL_LABEL: Record<GoalLevelVM, string> = {
  life: "Життя",
  year: "Рік",
  quarter: "Квартал",
  month: "Місяць",
  week: "Тиждень",
};

export function CreateGoalForm({ defaultLevel = "year", parentId = null }: { defaultLevel?: GoalLevelVM; parentId?: string | null }) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState<GoalLevelVM>(defaultLevel);
  const [targetDate, setTargetDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length === 0) return;
    setError(null);
    startTransition(async () => {
      const res = await createGoalAction({
        title: title.trim(),
        level,
        parentId,
        targetDate: targetDate || null,
      });
      if (res.ok) {
        setTitle("");
        setTargetDate("");
      } else {
        setError(res.error ?? "Помилка");
      }
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Нова ціль…"
        className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as GoalLevelVM)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          {GOAL_LEVELS_VM.map((lvl) => (
            <option key={lvl} value={lvl}>
              {LEVEL_LABEL[lvl]}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        />
        <button
          type="submit"
          disabled={isPending || title.trim().length === 0}
          className="ml-auto inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Додати
        </button>
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </form>
  );
}
