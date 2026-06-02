"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricDowStatsVM } from "@entities/insight";

const DOW_LABELS = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

/**
 * Аналітика «найкращий день тижня» для кожної метрики. Кожна метрика —
 * окремий міні-чарт із 7 барами; компактно лягає в сітку.
 */
export function DowStats({ stats }: { stats: MetricDowStatsVM[] }) {
  if (stats.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Замало даних для розбивки по днях тижня.
      </p>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {stats.map((s) => (
        <MetricCard key={s.metricId} stats={s} />
      ))}
    </div>
  );
}

function MetricCard({ stats }: { stats: MetricDowStatsVM }) {
  const data = stats.byDow.map((b) => ({
    label: DOW_LABELS[b.dow],
    avg: b.avg ?? 0,
    count: b.count,
  }));
  const best = stats.byDow
    .filter((b) => b.avg !== null)
    .sort((a, b) => (b.avg ?? 0) - (a.avg ?? 0))[0];

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <header className="mb-2 flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span aria-hidden>{stats.icon ?? "•"}</span>
          <span className="truncate">{stats.name}</span>
        </p>
        {best && (
          <span className="text-xs text-muted-foreground">
            Найкраще: <strong className="text-foreground">{DOW_LABELS[best.dow]}</strong>
          </span>
        )}
      </header>
      <div className="h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis hide />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="avg" fill={stats.color ?? "var(--color-primary)"} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
