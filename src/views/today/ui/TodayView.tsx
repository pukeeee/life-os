import { getTodayOverview } from "@features/log-metric";
import { getTodayTasks } from "@features/manage-tasks";
import { DailyOverview } from "@widgets/daily-overview";
import { MoodHero } from "@widgets/mood-hero";
import { TodayProgress } from "@widgets/today-progress";
import { TodayTasks } from "@widgets/today-tasks";

const MOOD_METRIC_NAME = "Настрій";

/**
 * Екран Today — головний дашборд доби. Серверний компонент: паралельно
 * підтягує метрики й задачі на сьогодні, після чого складає сторінку з віджетів.
 */
export async function TodayView() {
  const [overview, tasks] = await Promise.all([getTodayOverview(), getTodayTasks()]);

  const mood = overview.metrics.find((m) => m.name === MOOD_METRIC_NAME) ?? null;
  const restMetrics = mood ? overview.metrics.filter((m) => m.metricId !== mood.metricId) : overview.metrics;

  const metricsLogged = overview.metrics.filter((m) => m.logged).length;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10">
      <TodayProgress
        date={overview.date}
        metricsLogged={metricsLogged}
        metricsTotal={overview.metrics.length}
        tasksOpen={tasks.length}
      />
      <MoodHero metric={mood} />
      <DailyOverview metrics={restMetrics} />
      <TodayTasks tasks={tasks} today={overview.date} />
    </main>
  );
}
