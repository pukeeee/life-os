import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@server/shared/kernel";
import {
  InMemoryMetricDefinitionRepository,
  InMemoryEntryRepository,
  InMemoryDayRepository,
  InMemoryStreakRepository,
  DefineMetric,
  LogEntry,
  RecalculateStreak,
  DayService,
} from "@server/modules/tracking";

/** Перевіряємо перерахунок стріку над реальними записами (через LogEntry). */
describe("RecalculateStreak (use case)", () => {
  const userId = new UniqueEntityID().toString();

  let metrics: InMemoryMetricDefinitionRepository;
  let entries: InMemoryEntryRepository;
  let days: InMemoryDayRepository;
  let streaks: InMemoryStreakRepository;
  let defineMetric: DefineMetric;
  let logEntry: LogEntry;
  let recalc: RecalculateStreak;

  beforeEach(() => {
    metrics = new InMemoryMetricDefinitionRepository();
    entries = new InMemoryEntryRepository();
    days = new InMemoryDayRepository();
    streaks = new InMemoryStreakRepository();
    defineMetric = new DefineMetric(metrics);
    logEntry = new LogEntry(metrics, entries, new DayService(days));
    recalc = new RecalculateStreak(metrics, entries, streaks);
  });

  it("рахує стрік звички за послідовні дні виконання", async () => {
    const metricId = (await defineMetric.execute({ userId, name: "Медитація", kind: "boolean" }))
      .getValue()
      .metricId;

    for (const date of ["2026-06-01", "2026-06-02", "2026-06-03"]) {
      await logEntry.execute({ userId, metricId, date, boolean: true });
    }
    // пропуск 04, потім ще один день
    await logEntry.execute({ userId, metricId, date: "2026-06-05", boolean: true });

    await recalc.execute({ metricId });

    const streak = await streaks.findByMetric(new UniqueEntityID(metricId));
    expect(streak?.longest).toBe(3);
    expect(streak?.current).toBe(1); // трейлінговий день 05
    expect(streak?.lastCompletedDate).toBe("2026-06-05");
  });

  it("невиконані дні (boolean=false) не входять у стрік", async () => {
    const metricId = (await defineMetric.execute({ userId, name: "Біг", kind: "boolean" }))
      .getValue()
      .metricId;

    await logEntry.execute({ userId, metricId, date: "2026-06-01", boolean: true });
    await logEntry.execute({ userId, metricId, date: "2026-06-02", boolean: false });
    await logEntry.execute({ userId, metricId, date: "2026-06-03", boolean: true });

    await recalc.execute({ metricId });

    const streak = await streaks.findByMetric(new UniqueEntityID(metricId));
    expect(streak?.longest).toBe(1);
  });

  it("враховує ціль для числової метрики (успіх = ціль досягнута)", async () => {
    const metricId = (
      await defineMetric.execute({
        userId,
        name: "Вода",
        kind: "count",
        goalType: "at_least",
        targetValue: 8,
      })
    )
      .getValue()
      .metricId;

    await logEntry.execute({ userId, metricId, date: "2026-06-01", number: 9 }); // успіх
    await logEntry.execute({ userId, metricId, date: "2026-06-02", number: 3 }); // ні
    await logEntry.execute({ userId, metricId, date: "2026-06-03", number: 8 }); // успіх

    await recalc.execute({ metricId });

    const streak = await streaks.findByMetric(new UniqueEntityID(metricId));
    expect(streak?.longest).toBe(1);
    expect(streak?.lastCompletedDate).toBe("2026-06-03");
  });
});
