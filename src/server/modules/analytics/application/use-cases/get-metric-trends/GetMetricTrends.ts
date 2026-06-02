import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@server/shared/kernel";
import { DayDate } from "@server/modules/tracking";
import type { IEntryRepository, IMetricDefinitionRepository } from "@server/modules/tracking";
import { MovingAverage } from "../../../domain/MovingAverage";
import type { MetricTrendDTO, MetricTrendsResponse, TrendPointDTO } from "../../dto/InsightsDTO";

export interface GetMetricTrendsRequest {
  userId: string;
  /** Кінець вікна "YYYY-MM-DD" (зазвичай сьогодні в таймзоні користувача). */
  to: string;
  /** Глибина вікна в днях (7 / 30 / 90). */
  days: number;
}

type Response = Result<MetricTrendsResponse, UseCaseError>;

const SMA_WINDOW = 7;

/**
 * Будує денні ряди числових метрик за вікно + SMA-7 для згладжування.
 * Read-модель для графіків трендів на екрані Insights.
 */
export class GetMetricTrends implements UseCase<GetMetricTrendsRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
  ) {}

  public async execute(request: GetMetricTrendsRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);

      const toOrError = DayDate.create(request.to);
      if (toOrError.isFailure) return Result.fail(ValidationError.create(toOrError.getError()));
      const to = toOrError.getValue();
      const from = to.shift(-(request.days - 1));

      const numericMetrics = (await this.metrics.listActiveByUser(userId)).filter((m) =>
        m.kind.storesNumeric(),
      );
      const history = await this.entries.listByUserInRange(userId, from, to);

      // metricId → (date → значення).
      const byMetric = new Map<string, Map<string, number>>();
      for (const entry of history) {
        if (entry.value.numeric === null) continue;
        const key = entry.metricId.toString();
        const series = byMetric.get(key) ?? new Map<string, number>();
        series.set(entry.date.value, entry.value.numeric);
        byMetric.set(key, series);
      }

      const trends: MetricTrendDTO[] = [];
      for (const metric of numericMetrics) {
        const series = byMetric.get(metric.id.toString());
        if (!series || series.size === 0) continue;

        const points: TrendPointDTO[] = [...series.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([date, value]) => ({ date, value }));

        const values = points.map((p) => p.value);
        const sum = values.reduce((a, b) => a + b, 0);

        trends.push({
          metricId: metric.id.toString(),
          name: metric.name,
          icon: metric.icon,
          color: metric.color,
          unit: metric.unit,
          points,
          sma: MovingAverage.sma(values, SMA_WINDOW),
          latest: values[values.length - 1],
          average: sum / values.length,
        });
      }

      trends.sort((a, b) => a.name.localeCompare(b.name));
      return Result.ok({ days: request.days, from: from.value, to: to.value, trends });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
