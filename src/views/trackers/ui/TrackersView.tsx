import { getTrackersData, CreateMetricForm } from "@features/manage-trackers";
import { TrackerList } from "@widgets/tracker-list";

/**
 * Екран Trackers: керування метриками. Складає форму створення (фіча) і список
 * трекерів (віджет). Дані тягне через Server Action.
 */
export async function TrackersView() {
  const data = await getTrackersData();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Трекери</h1>
        <p className="text-sm text-muted-foreground">Створюй і впорядковуй будь-які показники свого життя.</p>
      </header>

      <div className="mb-6">
        <CreateMetricForm categories={data.categories} />
      </div>

      <TrackerList data={data} />
    </main>
  );
}
