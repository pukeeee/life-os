import { getInsights } from "@features/view-insights";
import { InsightsBoard } from "@widgets/insights";

/**
 * Екран Insights: двигун інсайтів (кореляції) + тренди. Серверний компонент;
 * вікно за замовчуванням — 30 днів (перемикач періоду додамо пізніше).
 */
export async function InsightsView() {
  const data = await getInsights(30);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Інсайти</h1>
        <p className="text-sm text-muted-foreground">
          Кореляції та тренди на основі твоїх даних.
        </p>
      </header>
      <InsightsBoard data={data} />
    </main>
  );
}
