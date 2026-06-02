import { JournalMarkdown, type JournalEntryVM } from "@entities/journal";

/**
 * Список історичних записів журналу (за датою спадно). На цьому етапі —
 * просто список карток із preview; редагування — лише на Today або через
 * деталь майбутнього маршруту.
 */
export function JournalList({ entries, todayDate }: { entries: JournalEntryVM[]; todayDate: string }) {
  const historic = entries.filter((e) => e.date !== todayDate);

  if (historic.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Поки немає попередніх записів.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {historic.map((entry) => (
        <article key={entry.entryId} className="rounded-lg border border-border bg-card p-4">
          <header className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            {formatDate(entry.date)}
          </header>
          <JournalMarkdown content={entry.content} />
        </article>
      ))}
    </div>
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
