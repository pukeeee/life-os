import { getTodayOverview } from "@features/log-metric";
import { DailyOverview } from "@widgets/daily-overview";

/**
 * Екран Today (FSD view). Серверний компонент: тягне знімок доби через Server
 * Action і складає сторінку з віджетів. Маршрут Next лише імпортує цей view.
 */
export async function TodayView() {
  const data = await getTodayOverview();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <DailyOverview data={data} />
    </main>
  );
}
