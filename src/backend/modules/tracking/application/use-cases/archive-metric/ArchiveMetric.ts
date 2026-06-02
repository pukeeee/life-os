import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import { MetricNotFoundError } from "../log-entry/LogEntryErrors";

export interface ArchiveMetricRequest {
  userId: string;
  metricId: string;
  archived: boolean;
}

type Response = Result<void, UseCaseError>;

/**
 * Архівує/розархівовує метрику. Історичні записи зберігаються; архівована метрика
 * зникає з Today, але лишається в аналітиці (no-destruction за замовчуванням).
 */
export class ArchiveMetric implements UseCase<ArchiveMetricRequest, Response> {
  constructor(private readonly metrics: IMetricDefinitionRepository) {}

  public async execute(request: ArchiveMetricRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const metric = await this.metrics.findById(new UniqueEntityID(request.metricId));
      if (!metric || !metric.userId.equals(userId)) {
        return Result.fail(new MetricNotFoundError(request.metricId));
      }

      if (request.archived) metric.archive();
      else metric.unarchive();

      await this.metrics.save(metric);
      return Result.ok();
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
