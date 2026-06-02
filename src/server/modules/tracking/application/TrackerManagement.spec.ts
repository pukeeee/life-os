import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@server/shared/kernel";
import {
  InMemoryMetricDefinitionRepository,
  InMemoryCategoryRepository,
  InMemoryStreakRepository,
  DefineMetric,
  CreateCategory,
  ListMetrics,
  ArchiveMetric,
} from "@server/modules/tracking";

describe("Tracker management (use cases)", () => {
  const userId = new UniqueEntityID().toString();

  let metrics: InMemoryMetricDefinitionRepository;
  let categories: InMemoryCategoryRepository;
  let defineMetric: DefineMetric;
  let createCategory: CreateCategory;
  let listMetrics: ListMetrics;
  let archiveMetric: ArchiveMetric;

  beforeEach(() => {
    metrics = new InMemoryMetricDefinitionRepository();
    categories = new InMemoryCategoryRepository();
    defineMetric = new DefineMetric(metrics);
    createCategory = new CreateCategory(categories);
    listMetrics = new ListMetrics(metrics, categories, new InMemoryStreakRepository());
    archiveMetric = new ArchiveMetric(metrics);
  });

  it("привʼязує метрику до категорії та повертає її в огляді", async () => {
    const cat = await createCategory.execute({ userId, name: "Здоровʼя" });
    const categoryId = cat.getValue().categoryId;

    const def = await defineMetric.execute({ userId, name: "Сон", kind: "duration", categoryId });
    const metricId = def.getValue().metricId;

    const overview = await listMetrics.execute({ userId });
    const data = overview.getValue();
    expect(data.categories).toHaveLength(1);
    const m = data.metrics.find((x) => x.metricId === metricId);
    expect(m?.categoryId).toBe(categoryId);
    expect(m?.archived).toBe(false);
  });

  it("архівує та розархівовує метрику", async () => {
    const def = await defineMetric.execute({ userId, name: "Біг", kind: "boolean" });
    const metricId = def.getValue().metricId;

    expect((await archiveMetric.execute({ userId, metricId, archived: true })).isSuccess).toBe(true);
    let m = (await listMetrics.execute({ userId })).getValue().metrics.find((x) => x.metricId === metricId);
    expect(m?.archived).toBe(true);
    // Активний список (для Today) не містить архівованих.
    expect(await metrics.listActiveByUser(new UniqueEntityID(userId))).toHaveLength(0);

    await archiveMetric.execute({ userId, metricId, archived: false });
    m = (await listMetrics.execute({ userId })).getValue().metrics.find((x) => x.metricId === metricId);
    expect(m?.archived).toBe(false);
  });

  it("відхиляє архівування чужої метрики", async () => {
    const def = await defineMetric.execute({ userId, name: "Біг", kind: "boolean" });
    const res = await archiveMetric.execute({
      userId: new UniqueEntityID().toString(),
      metricId: def.getValue().metricId,
      archived: true,
    });
    expect(res.isFailure).toBe(true);
  });
});
