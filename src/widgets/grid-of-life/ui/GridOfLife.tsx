import Link from "next/link";

const WEEKS_PER_YEAR = 52;
const DEFAULT_LIFESPAN_YEARS = 90;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Сітка тижнів життя: WEEKS_PER_YEAR × lifespanYears клітинок. «Прожиті» тижні
 * залиті primary, «майбутні» — muted. Не намагається бути астрономічно точним
 * (рік = 52 тижні рівно): мета — візуальне відчуття скінченності часу.
 */
export function GridOfLife({
  birthDate,
  lifespanYears = DEFAULT_LIFESPAN_YEARS,
}: {
  birthDate: string | null;
  lifespanYears?: number;
}) {
  if (!birthDate) {
    return (
      <section className="rounded-lg border border-dashed border-border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Щоб увімкнути сітку тижнів життя, задай дату народження.
        </p>
        <Link
          href="/onboarding"
          className="mt-3 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Заповнити профіль
        </Link>
      </section>
    );
  }

  const weeksLived = computeWeeksLived(birthDate);
  const totalWeeks = WEEKS_PER_YEAR * lifespanYears;

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">Сітка життя</h2>
          <p className="text-xs text-muted-foreground">
            {weeksLived} з {totalWeeks} тижнів · ~{Math.round((weeksLived / totalWeeks) * 100)}%
          </p>
        </div>
      </header>
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${WEEKS_PER_YEAR}, minmax(0, 1fr))` }}
        aria-label="Сітка тижнів життя"
      >
        {Array.from({ length: totalWeeks }, (_, i) => {
          const lived = i < weeksLived;
          return (
            <span
              key={i}
              aria-hidden
              className={lived ? "h-1.5 w-full rounded-sm bg-primary" : "h-1.5 w-full rounded-sm bg-muted"}
            />
          );
        })}
      </div>
    </section>
  );
}

function computeWeeksLived(birthDate: string): number {
  const birth = new Date(`${birthDate}T00:00:00Z`).getTime();
  const now = Date.now();
  if (!Number.isFinite(birth) || now <= birth) return 0;
  return Math.max(0, Math.floor((now - birth) / MS_PER_WEEK));
}
