import type { UniqueEntityID } from "@backend/shared/kernel";
import type { MetricDefinition } from "./MetricDefinition";

/** Порт репозиторію визначень метрик. */
export interface IMetricDefinitionRepository {
  findById(id: UniqueEntityID): Promise<MetricDefinition | null>;
  /** Усі неархівовані метрики користувача (для Today/Trackers). */
  listActiveByUser(userId: UniqueEntityID): Promise<MetricDefinition[]>;
  listByUser(userId: UniqueEntityID): Promise<MetricDefinition[]>;
  save(metric: MetricDefinition): Promise<void>;
}
