import type { UniqueEntityID } from "@backend/shared/kernel";
import type { MetricStreak } from "./MetricStreak";

/** Порт репозиторію стріків (один запис на метрику). */
export interface IStreakRepository {
  findByMetric(metricId: UniqueEntityID): Promise<MetricStreak | null>;
  listByUser(userId: UniqueEntityID): Promise<MetricStreak[]>;
  save(streak: MetricStreak): Promise<void>;
}
