import type { UniqueEntityID } from "@server/shared/kernel";
import type { MetricStreak } from "../../domain/streak/MetricStreak";
import type { IStreakRepository } from "../../domain/streak/IStreakRepository";

/** In-memory адаптер репозиторію стріків (ключ — metricId). */
export class InMemoryStreakRepository implements IStreakRepository {
  private readonly store = new Map<string, MetricStreak>();

  public async findByMetric(metricId: UniqueEntityID): Promise<MetricStreak | null> {
    return this.store.get(metricId.toString()) ?? null;
  }

  public async listByUser(userId: UniqueEntityID): Promise<MetricStreak[]> {
    return [...this.store.values()].filter((s) => s.userId.equals(userId));
  }

  public async save(streak: MetricStreak): Promise<void> {
    this.store.set(streak.metricId.toString(), streak);
  }
}
