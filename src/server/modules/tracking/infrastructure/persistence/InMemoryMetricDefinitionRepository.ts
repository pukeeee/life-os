import type { UniqueEntityID } from "@server/shared/kernel";
import type { IMetricDefinitionRepository } from "../../domain/metric/IMetricDefinitionRepository";
import type { MetricDefinition } from "../../domain/metric/MetricDefinition";

/** In-memory адаптер репозиторію визначень метрик (дефолт без БД). */
export class InMemoryMetricDefinitionRepository implements IMetricDefinitionRepository {
  private readonly store = new Map<string, MetricDefinition>();

  public async findById(id: UniqueEntityID): Promise<MetricDefinition | null> {
    return this.store.get(id.toString()) ?? null;
  }

  public async listActiveByUser(userId: UniqueEntityID): Promise<MetricDefinition[]> {
    return [...this.store.values()].filter((m) => m.userId.equals(userId) && !m.isArchived);
  }

  public async listByUser(userId: UniqueEntityID): Promise<MetricDefinition[]> {
    return [...this.store.values()].filter((m) => m.userId.equals(userId));
  }

  public async save(metric: MetricDefinition): Promise<void> {
    this.store.set(metric.id.toString(), metric);
  }
}
