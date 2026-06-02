import type { JournalEntryVM } from "@entities/journal";
import { JournalEditor } from "@features/edit-journal";

/**
 * Компактний блок щоденника на екрані Today. Редактор завжди inline — тренує
 * звичку нічого не пропускати.
 */
export function TodayJournal({ date, entry }: { date: string; entry: JournalEntryVM | null }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-lg font-semibold tracking-tight">Журнал</h2>
      <JournalEditor date={date} initialContent={entry?.content ?? ""} />
    </section>
  );
}
