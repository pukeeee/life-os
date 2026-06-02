import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@backend/shared/kernel";
import { DayDate } from "@backend/modules/tracking";
import type { IEntryRepository, IMetricDefinitionRepository } from "@backend/modules/tracking";
import type { DayOfWeekStatsResponse, MetricDowStatsDTO } from "../../dto/InsightsDTO";

export interface GetDayOfWeekStatsRequest {
  userId: string;
  to: string;
  days: number;
}

type Response = Result<DayOfWeekStatsResponse, UseCaseError>;

/**
 * Агрегує середнє значення кожної числової метрики за днем тижня (0=неділя…6=субота)
 * за останнє вікно. Допомагає побачити «найкращий день тижня» для конкретної звички.
 */
export class GetDayOfWeekStats implements UseCase<GetDayOfWeekStatsRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
  ) {}

  public async execute(request: GetDayOfWeekStatsRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const toOrError = DayDate.create(request.to);
      if (toOrError.isFailure) return Result.fail(ValidationError.create(toOrError.getError()));
      const to = toOrError.getValue();
      const from = to.shift(-(request.days - 1));

      const numeric = (await this.metrics.listActiveByUser(userId)).filter((m) => m.kind.storesNumeric());
      const history = await this.entries.listByUserInRange(userId, from, to);

      // metricId → dow → {sum, count}
      const buckets = new Map<string, Array<{ sum: number; count: number }>>();
      for (const entry of history) {
        if (entry.value.numeric === null) continue;
        const key = entry.metricId.toString();
        let series = buckets.get(key);
        if (!series) {
          series = Array.from({ length: 7 }, () => ({ sum: 0, count: 0 }));
          buckets.set(key, series);
        }
        const dow = entry.date.dayOfWeek();
        series[dow].sum += entry.value.numeric;
        series[dow].count += 1;
      }

      const stats: MetricDowStatsDTO[] = [];
      for (const metric of numeric) {
        const series = buckets.get(metric.id.toString());
        if (!series) continue;
        const byDow = series.map((b, dow) => ({
          dow,
          avg: b.count > 0 ? b.sum / b.count : null,
          count: b.count,
        }));
        if (byDow.every((b) => b.count === 0)) continue;
        stats.push({
          metricId: metric.id.toString(),
          name: metric.name,
          icon: metric.icon,
          color: metric.color,
          unit: metric.unit,
          byDow,
        });
      }

      stats.sort((a, b) => a.name.localeCompare(b.name));
      return Result.ok({ days: request.days, from: from.value, to: to.value, stats });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
