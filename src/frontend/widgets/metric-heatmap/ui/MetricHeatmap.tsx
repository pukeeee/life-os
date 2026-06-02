import type { MetricHeatmapVM } from "@entities/insight";

/**
 * GitHub-стиль heatmap: тижні — стовпчики, дні тижня — рядки. Інтенсивність
 * приходить нормалізованою з бекенду (0..1), тут лише накладається на колір
 * через альфа-канал. Чистий CSS — без recharts.
 */
const DOW_LABELS = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export function MetricHeatmap({ heatmap }: { heatmap: MetricHeatmapVM | null }) {
  if (!heatmap || heatmap.cells.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Немає даних для heatmap.
      </p>
    );
  }

  // Згрупувати клітинки за тижнями за `dow` першої клітинки.
  const firstDow = dayOfWeek(heatmap.cells[0].date);
  const weeks: ((typeof heatmap.cells)[number] | null)[][] = [];
  let current: ((typeof heatmap.cells)[number] | null)[] = Array.from({ length: firstDow }, () => null);

  for (const cell of heatmap.cells) {
    current.push(cell);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  const color = heatmap.color ?? "var(--color-primary)";

  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{heatmap.name}</h3>
        <span className="text-xs text-muted-foreground">{heatmap.days} дн</span>
      </header>
      <div className="flex gap-1.5">
        <div className="flex flex-col justify-around text-[10px] text-muted-foreground">
          {DOW_LABELS.map((l, i) => (
            <span key={i} className={i % 2 === 0 ? "h-3" : "h-3 opacity-0"} aria-hidden>
              {i % 2 === 0 ? l : ""}
            </span>
          ))}
        </div>
        <div className="flex gap-[3px] overflow-x-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((cell, di) =>
                cell ? (
                  <span
                    key={cell.date}
                    title={`${cell.date}: ${cell.value ?? "—"}`}
                    className="h-3 w-3 rounded-[2px]"
                    style={{
                      backgroundColor:
                        cell.value === null
                          ? "var(--color-muted)"
                          : withAlpha(color, 0.15 + cell.intensity * 0.85),
                    }}
                  />
                ) : (
                  <span key={`${wi}-${di}`} className="h-3 w-3" aria-hidden />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function dayOfWeek(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function withAlpha(color: string, alpha: number): string {
  // Працює для hex (#xxx, #xxxxxx) і css-функцій (oklch(...), var(...)).
  if (color.startsWith("#") && color.length === 7) {
    const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${a}`;
  }
  return `color-mix(in oklch, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}
