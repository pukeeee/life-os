/**
 * Прогрес-хедер дня: дата, смужка прогресу метрик, лічильник задач на сьогодні.
 * Чистий презентаційний компонент — арифметика на стороні view.
 */
export function TodayProgress({
  date,
  metricsLogged,
  metricsTotal,
  tasksOpen,
}: {
  date: string;
  metricsLogged: number;
  metricsTotal: number;
  tasksOpen: number;
}) {
  const ratio = metricsTotal > 0 ? Math.min(1, metricsLogged / metricsTotal) : 0;

  return (
    <header className="flex flex-col gap-3">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Сьогодні</h1>
        <p className="text-sm text-muted-foreground capitalize">{formatDate(date)}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-16 text-xs uppercase tracking-wide text-muted-foreground">Метрики</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
        <span className="w-12 text-right font-mono text-xs tabular-nums text-muted-foreground">
          {metricsLogged}/{metricsTotal}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-16 text-xs uppercase tracking-wide text-muted-foreground">Задачі</span>
        <span className="flex-1 text-xs text-muted-foreground">
          {tasksOpen === 0 ? "Усе чисто" : `${tasksOpen} відкритих`}
        </span>
      </div>
    </header>
  );
}

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}
