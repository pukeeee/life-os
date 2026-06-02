"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricTrendVM } from "@entities/insight";

/**
 * Recharts LineChart на дату-агреговану формою. Кожна метрика — окрема лінія.
 * Якщо метрик понад MAX_LINES — показуємо лише топ за середнім значенням,
 * щоб графік не перетворювався на спагеті.
 */
const MAX_LINES = 4;

interface ChartRow {
  date: string;
  [metric: string]: string | number | null;
}

export function TrendsChart({ trends }: { trends: MetricTrendVM[] }) {
  if (trends.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Ще немає числових даних за цей період.
      </p>
    );
  }

  const top = [...trends]
    .sort((a, b) => (b.average ?? 0) - (a.average ?? 0))
    .slice(0, MAX_LINES);

  const dateSet = new Set<string>();
  for (const t of top) for (const p of t.points) dateSet.add(p.date);
  const dates = [...dateSet].sort();

  const rows: ChartRow[] = dates.map((date) => {
    const row: ChartRow = { date };
    for (const t of top) {
      const point = t.points.find((p) => p.date === date);
      row[t.metricId] = point?.value ?? null;
    }
    return row;
  });

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
        {top.map((t) => (
          <span key={t.metricId} className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: t.color ?? "currentColor" }}
            />
            {t.name}
          </span>
        ))}
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 4, right: 12, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickFormatter={shortDate}
              minTickGap={24}
            />
            <YAxis tick={{ fontSize: 10 }} width={28} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              labelFormatter={(v) => shortDate(String(v))}
            />
            {top.map((t) => (
              <Line
                key={t.metricId}
                type="monotone"
                dataKey={t.metricId}
                name={t.name}
                stroke={t.color ?? "var(--color-primary)"}
                strokeWidth={1.5}
                dot={false}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "short", timeZone: "UTC" }).format(d);
}
