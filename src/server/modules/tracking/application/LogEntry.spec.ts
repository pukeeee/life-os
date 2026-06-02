import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@server/shared/kernel";
import {
  InMemoryMetricDefinitionRepository,
  InMemoryEntryRepository,
  InMemoryDayRepository,
  InMemoryStreakRepository,
  DefineMetric,
  LogEntry,
  GetDailyOverview,
  DayService,
} from "@server/modules/tracking";

/**
 * Інтеграція доменного ядра з прикладним шаром на in-memory адаптерах:
 * перевіряємо наскрізний потік DefineMetric → LogEntry → GetDailyOverview.
 */
describe("LogEntry (use case)", () => {
  const userId = new UniqueEntityID().toString();
  const date = "2026-06-02";

  let metrics: InMemoryMetricDefinitionRepository;
  let entries: InMemoryEntryRepository;
  let days: InMemoryDayRepository;
  let defineMetric: DefineMetric;
  let logEntry: LogEntry;
  let overview: GetDailyOverview;

  beforeEach(() => {
    metrics = new InMemoryMetricDefinitionRepository();
    entries = new InMemoryEntryRepository();
    days = new InMemoryDayRepository();
    defineMetric = new DefineMetric(metrics);
    logEntry = new LogEntry(metrics, entries, new DayService(days));
    overview = new GetDailyOverview(metrics, entries, days, new InMemoryStreakRepository());
  });

  async function define(req: Parameters<DefineMetric["execute"]>[0]) {
    const res = await defineMetric.execute(req);
    expect(res.isSuccess).toBe(true);
    return res.getValue().metricId;
  }

  it("логує значення, яке потім видно в огляді доби", async () => {
    const metricId = await define({ userId, name: "Вода", kind: "count", unit: "скл" });

    const res = await logEntry.execute({ userId, metricId, date, number: 5 });
    expect(res.isSuccess).toBe(true);

    const ov = await overview.execute({ userId, date });
    const row = ov.getValue().metrics.find((m) => m.metricId === metricId);
    expect(row?.logged).toBe(true);
    expect(row?.value?.numeric).toBe(5);
  });

  it("upsert: повторне логування оновлює значення тієї ж доби", async () => {
    const metricId = await define({ userId, name: "Вода", kind: "count" });

    await logEntry.execute({ userId, metricId, date, number: 3 });
    await logEntry.execute({ userId, metricId, date, number: 7 });

    const ov = await overview.execute({ userId, date });
    const row = ov.getValue().metrics.find((m) => m.metricId === metricId);
    expect(row?.value?.numeric).toBe(7);
  });

  it("відхиляє лог для неіснуючої або чужої метрики", async () => {
    const res = await logEntry.execute({
      userId,
      metricId: new UniqueEntityID().toString(),
      date,
      number: 1,
    });
    expect(res.isFailure).toBe(true);
  });

  it("валідовує значення проти типу метрики (scale поза межами)", async () => {
    const metricId = await define({ userId, name: "Настрій", kind: "scale", scaleMin: 1, scaleMax: 5 });
    const res = await logEntry.execute({ userId, metricId, date, number: 9 });
    expect(res.isFailure).toBe(true);
  });
});
