"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { INSIGHTS_PERIODS, type InsightsPeriod } from "../model/period";

/**
 * Перемикач 7/30/90 через ?days= у query. Стан читається з URL — Insights
 * залишається серверним компонентом.
 */
export function PeriodSwitcher({ current }: { current: InsightsPeriod }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function go(value: InsightsPeriod) {
    const next = new URLSearchParams(params.toString());
    next.set("days", String(value));
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  }

  return (
    <div
      role="tablist"
      aria-busy={isPending}
      className="inline-flex gap-1 rounded-md border border-border bg-card p-1 text-xs"
    >
      {INSIGHTS_PERIODS.map((p) => {
        const active = p === current;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => go(p)}
            className={cn(
              "rounded-sm px-3 py-1 transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {p} дн
          </button>
        );
      })}
    </div>
  );
}
