import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@server/shared/kernel";
import { MetricKind } from "../../../domain/metric/MetricKind";
import { AggregationMethod } from "../../../domain/metric/AggregationMethod";
import { Cadence } from "../../../domain/metric/Cadence";
import { MetricTarget } from "../../../domain/metric/MetricTarget";
import { MetricDefinition } from "../../../domain/metric/MetricDefinition";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import type { DefineMetricRequest, DefineMetricResponse } from "./DefineMetricDTO";

type Response = Result<DefineMetricResponse, UseCaseError>;

/**
 * Створює нове визначення метрики (звичка, шкала, лічильник, нотатка тощо).
 * Збирає value object-и з примітивів, делегує інваріанти домену й персистить.
 */
export class DefineMetric implements UseCase<DefineMetricRequest, Response> {
  constructor(private readonly metrics: IMetricDefinitionRepository) {}

  public async execute(request: DefineMetricRequest): Promise<Response> {
    try {
      const kindOrError = MetricKind.create(request.kind);
      if (kindOrError.isFailure) return Result.fail(ValidationError.create(kindOrError.getError()));
      const kind = kindOrError.getValue();

      // Каденція (за замовчуванням daily).
      let cadence = Cadence.daily();
      if (request.cadenceType) {
        const cadenceOrError = Cadence.create(request.cadenceType, request.activeDays ?? null);
        if (cadenceOrError.isFailure) return Result.fail(ValidationError.create(cadenceOrError.getError()));
        cadence = cadenceOrError.getValue();
      }

      // Агрегація (за замовчуванням — розумний дефолт за типом).
      let aggregation = AggregationMethod.defaultFor(kind);
      if (request.aggregation) {
        const aggOrError = AggregationMethod.create(request.aggregation);
        if (aggOrError.isFailure) return Result.fail(ValidationError.create(aggOrError.getError()));
        aggregation = aggOrError.getValue();
      }

      // Ціль (за замовчуванням none).
      let target = MetricTarget.none();
      if (request.goalType && request.goalType !== "none") {
        const targetOrError = MetricTarget.create(request.goalType, request.targetValue ?? null);
        if (targetOrError.isFailure) return Result.fail(ValidationError.create(targetOrError.getError()));
        target = targetOrError.getValue();
      }

      const metricOrError = MetricDefinition.create({
        userId: new UniqueEntityID(request.userId),
        categoryId: request.categoryId ? new UniqueEntityID(request.categoryId) : null,
        name: request.name,
        kind,
        description: request.description ?? null,
        icon: request.icon ?? null,
        color: request.color ?? null,
        unit: request.unit ?? null,
        scaleMin: request.scaleMin ?? null,
        scaleMax: request.scaleMax ?? null,
        choiceOptions: request.choiceOptions ?? null,
        aggregation,
        cadence,
        target,
        allowPartial: request.allowPartial ?? false,
        sortOrder: request.sortOrder ?? 0,
      });
      if (metricOrError.isFailure) return Result.fail(ValidationError.create(metricOrError.getError()));

      const metric = metricOrError.getValue();
      await this.metrics.save(metric);

      return Result.ok({ metricId: metric.id.toString() });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
