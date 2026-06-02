import { UniqueEntityID } from "@server/shared/kernel";
import type { MetricDefinitionRow } from "@server/infrastructure/persistence/drizzle/schema";
import { metricDefinitions } from "@server/infrastructure/persistence/drizzle/schema";
import { MetricDefinition } from "../../../domain/metric/MetricDefinition";
import { MetricKind } from "../../../domain/metric/MetricKind";
import { AggregationMethod } from "../../../domain/metric/AggregationMethod";
import { Cadence } from "../../../domain/metric/Cadence";
import { MetricTarget } from "../../../domain/metric/MetricTarget";

type MetricInsert = typeof metricDefinitions.$inferInsert;

/** Мапер MetricDefinition ↔ рядок БД (відновлює всі value object-и). */
export class MetricDefinitionMapper {
  public static toDomain(row: MetricDefinitionRow): MetricDefinition {
    const kind = MetricKind.create(row.kind).getValue();
    const aggregation = AggregationMethod.create(row.aggregation).getValue();
    const cadence =
      row.cadenceType === "daily"
        ? Cadence.daily()
        : Cadence.create(row.cadenceType, row.activeDays ?? null).getValue();
    const target =
      row.goalType === "none"
        ? MetricTarget.none()
        : MetricTarget.create(row.goalType, row.targetValue ?? null).getValue();

    return MetricDefinition.create(
      {
        userId: new UniqueEntityID(row.userId),
        categoryId: row.categoryId ? new UniqueEntityID(row.categoryId) : null,
        name: row.name,
        kind,
        description: row.description,
        icon: row.icon,
        color: row.color,
        unit: row.unit,
        scaleMin: row.scaleMin,
        scaleMax: row.scaleMax,
        choiceOptions: row.choiceOptions ?? null,
        aggregation,
        cadence,
        target,
        allowPartial: row.allowPartial,
        sortOrder: row.sortOrder,
        archivedAt: row.archivedAt,
        createdAt: row.createdAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(metric: MetricDefinition): MetricInsert {
    return {
      id: metric.id.toString(),
      userId: metric.userId.toString(),
      categoryId: metric.categoryId ? metric.categoryId.toString() : null,
      name: metric.name,
      description: metric.description,
      icon: metric.icon,
      color: metric.color,
      kind: metric.kind.value,
      unit: metric.unit,
      scaleMin: metric.scaleMin,
      scaleMax: metric.scaleMax,
      choiceOptions: metric.choiceOptions ? [...metric.choiceOptions] : null,
      aggregation: metric.aggregation.value,
      cadenceType: metric.cadence.type,
      activeDays: metric.cadence.activeDays ? [...metric.cadence.activeDays] : null,
      goalType: metric.target.goalType,
      targetValue: metric.target.targetValue,
      allowPartial: metric.allowPartial,
      sortOrder: metric.sortOrder,
      archivedAt: metric.archivedAt,
      createdAt: metric.createdAt,
    };
  }
}
