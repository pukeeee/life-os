import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@server/shared/kernel";
import { MetricStreak } from "../../../domain/streak/MetricStreak";
import { StreakCalculator } from "../../../domain/streak/StreakCalculator";
import type { IStreakRepository } from "../../../domain/streak/IStreakRepository";
import type { IEntryRepository } from "../../../domain/entry/IEntryRepository";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";

export interface RecalculateStreakRequest {
  metricId: string;
}

type Response = Result<void, UseCaseError>;

/**
 * Перераховує стрік метрики на основі всієї історії записів. Викликається
 * обробником події MetricLogged (event-driven), а отже домен логування лишається
 * непричетним до аналітики. Ідемпотентна (можна викликати скільки завгодно).
 */
export class RecalculateStreak implements UseCase<RecalculateStreakRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
    private readonly streaks: IStreakRepository,
  ) {}

  public async execute(request: RecalculateStreakRequest): Promise<Response> {
    try {
      const metricId = new UniqueEntityID(request.metricId);
      const metric = await this.metrics.findById(metricId);
      if (!metric) return Result.ok(); // метрику видалили — нічого рахувати

      const history = await this.entries.listByMetric(metricId);
      const successDates = history
        .filter((entry) => metric.isSuccess(entry.value))
        .map((entry) => entry.date.value);

      const result = StreakCalculator.compute(successDates);

      const existing = await this.streaks.findByMetric(metricId);
      const streak =
        existing ?? MetricStreak.create({ userId: metric.userId, metricId }).getValue();
      streak.apply(result);

      await this.streaks.save(streak);
      return Result.ok();
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
