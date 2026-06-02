import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@backend/shared/kernel";
import {
  InMemoryMetricDefinitionRepository,
  InMemoryEntryRepository,
  InMemoryDayRepository,
  DefineMetric,
  LogEntry,
  DayService,
} from "@backend/modules/tracking";
import { GetDayOfWeekStats, GetMetricHeatmap } from "@backend/modules/analytics";

describe("Analytics period queries", () => {
  const userId = new UniqueEntityID().toString();
  const today = "2026-06-07"; // субота
  const days = 7;

  let metrics: InMemoryMetricDefinitionRepository;
  let entries: InMemoryEntryRepository;
  let dayRepo: InMemoryDayRepository;
  let define: DefineMetric;
  let log: LogEntry;
  let dow: GetDayOfWeekStats;
  let heatmap: GetMetricHeatmap;

  beforeEach(() => {
    metrics = new InMemoryMetricDefinitionRepository();
    entries = new InMemoryEntryRepository();
    dayRepo = new InMemoryDayRepository();
    define = new DefineMetric(metrics);
    log = new LogEntry(metrics, entries, new DayService(dayRepo));
    dow = new GetDayOfWeekStats(metrics, entries);
    heatmap = new GetMetricHeatmap(metrics, entries);
  });

  async function defineMetric(name: string) {
    const res = await define.execute({ userId, name, kind: "count" });
    expect(res.isSuccess).toBe(true);
    return res.getValue().metricId;
  }

  it("GetDayOfWeekStats: середнє за днем тижня тільки для метрик, де є записи", async () => {
    const water = await defineMetric("Вода");
    await defineMetric("Сон"); // без записів — не має зʼявитися

    // 2026-06-01 пн → 6, 2026-06-08 пн → 10, середнє = 8
    await log.execute({ userId, metricId: water, date: "2026-06-01", number: 6 });
    await log.execute({ userId, metricId: water, date: "2026-06-02", number: 4 }); // вт

    const res = (await dow.execute({ userId, to: today, days })).getValue();
    expect(res.stats).toHaveLength(1);
    const buckets = res.stats[0].byDow;
    const monday = buckets.find((b) => b.dow === 1)!;
    expect(monday.avg).toBeCloseTo(6);
    expect(monday.count).toBe(1);
    const tuesday = buckets.find((b) => b.dow === 2)!;
    expect(tuesday.avg).toBeCloseTo(4);
    const sunday = buckets.find((b) => b.dow === 0)!;
    expect(sunday.avg).toBeNull();
    expect(sunday.count).toBe(0);
  });

  it("GetMetricHeatmap: повертає клітинки для всього вікна з нормалізованою інтенсивністю", async () => {
    const metricId = await defineMetric("Вода");
    await log.execute({ userId, metricId, date: "2026-06-01", number: 5 });
    await log.execute({ userId, metricId, date: "2026-06-05", number: 10 }); // max

    const res = (await heatmap.execute({ userId, metricId, to: today, days })).getValue();
    expect(res).not.toBeNull();
    expect(res!.cells).toHaveLength(7);
    const cell5 = res!.cells.find((c) => c.date === "2026-06-05")!;
    expect(cell5.value).toBe(10);
    expect(cell5.intensity).toBeCloseTo(1);
    const cell1 = res!.cells.find((c) => c.date === "2026-06-01")!;
    expect(cell1.intensity).toBeCloseTo(0.5);
    const empty = res!.cells.find((c) => c.date === "2026-06-03")!;
    expect(empty.value).toBeNull();
    expect(empty.intensity).toBe(0);
  });

  it("GetMetricHeatmap: null для неіснуючої метрики", async () => {
    const fake = new UniqueEntityID().toString();
    const res = (await heatmap.execute({ userId, metricId: fake, to: today, days })).getValue();
    expect(res).toBeNull();
  });
});
