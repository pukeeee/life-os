import { InsightsView } from "@views/insights";

// Тонка точка входу маршруту /insights — параметри періоду в query.
export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string; metric?: string }>;
}) {
  const { days, metric } = await searchParams;
  return <InsightsView days={days} metricId={metric} />;
}
