"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { GOAL_LEVELS_VM, type GoalLevelVM } from "@entities/goal";
import { cn } from "@/lib/utils";

const LEVEL_LABEL: Record<GoalLevelVM | "all", string> = {
  all: "Усі",
  life: "Життя",
  year: "Рік",
  quarter: "Квартал",
  month: "Місяць",
  week: "Тиждень",
};

const OPTIONS: (GoalLevelVM | "all")[] = ["all", ...GOAL_LEVELS_VM];

/**
 * Перемикач рівня цілей через ?level= у query. Стан читається з URL, тож сторінка
 * залишається серверним компонентом.
 */
export function LevelSegment() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("level") ?? "all";
  const [isPending, startTransition] = useTransition();

  function go(option: string) {
    const next = new URLSearchParams(params.toString());
    if (option === "all") next.delete("level");
    else next.set("level", option);
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  }

  return (
    <div
      role="tablist"
      aria-busy={isPending}
      className="inline-flex flex-wrap gap-1 rounded-md border border-border bg-card p-1 text-xs"
    >
      {OPTIONS.map((opt) => {
        const active = opt === current;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => go(opt)}
            className={cn(
              "rounded-sm px-2 py-1 transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {LEVEL_LABEL[opt]}
          </button>
        );
      })}
    </div>
  );
}
