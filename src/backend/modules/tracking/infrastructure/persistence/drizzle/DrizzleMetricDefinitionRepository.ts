import { and, asc, eq, isNull } from "drizzle-orm";
import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Database } from "@backend/infrastructure/persistence/drizzle/client";
import { metricDefinitions } from "@backend/infrastructure/persistence/drizzle/schema";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import type { MetricDefinition } from "../../../domain/metric/MetricDefinition";
import { MetricDefinitionMapper } from "./MetricDefinitionMapper";

/** Postgres-реалізація репозиторію визначень метрик. */
export class DrizzleMetricDefinitionRepository implements IMetricDefinitionRepository {
  constructor(private readonly db: Database) {}

  public async findById(id: UniqueEntityID): Promise<MetricDefinition | null> {
    const rows = await this.db
      .select()
      .from(metricDefinitions)
      .where(eq(metricDefinitions.id, id.toString()))
      .limit(1);
    return rows[0] ? MetricDefinitionMapper.toDomain(rows[0]) : null;
  }

  public async listActiveByUser(userId: UniqueEntityID): Promise<MetricDefinition[]> {
    const rows = await this.db
      .select()
      .from(metricDefinitions)
      .where(and(eq(metricDefinitions.userId, userId.toString()), isNull(metricDefinitions.archivedAt)))
      .orderBy(asc(metricDefinitions.sortOrder));
    return rows.map(MetricDefinitionMapper.toDomain);
  }

  public async listByUser(userId: UniqueEntityID): Promise<MetricDefinition[]> {
    const rows = await this.db
      .select()
      .from(metricDefinitions)
      .where(eq(metricDefinitions.userId, userId.toString()))
      .orderBy(asc(metricDefinitions.sortOrder));
    return rows.map(MetricDefinitionMapper.toDomain);
  }

  public async save(metric: MetricDefinition): Promise<void> {
    const data = MetricDefinitionMapper.toPersistence(metric);
    await this.db
      .insert(metricDefinitions)
      .values(data)
      .onConflictDoUpdate({ target: metricDefinitions.id, set: data });
  }
}
