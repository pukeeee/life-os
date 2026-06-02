import { getTodayJournal, listJournal } from "@features/edit-journal";
import { resolveSession } from "@shared/server/session";
import { TodayJournal } from "@widgets/today-journal";
import { JournalList } from "@widgets/journal-list";

/**
 * Екран Журналу: сьогоднішній запис у редакторі вгорі, історія — нижче.
 */
export async function JournalView() {
  const [{ today }, todayEntry, recent] = await Promise.all([
    resolveSession(),
    getTodayJournal(),
    listJournal(30),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Журнал</h1>
        <p className="text-sm text-muted-foreground">Один запис на день, Markdown.</p>
      </header>

      <TodayJournal date={today} entry={todayEntry} />

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-semibold tracking-tight">Раніше</h2>
        <JournalList entries={recent} todayDate={today} />
      </section>
    </main>
  );
}
