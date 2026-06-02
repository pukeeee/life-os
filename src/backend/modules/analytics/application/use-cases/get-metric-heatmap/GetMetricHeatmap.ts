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
import type { MetricHeatmapResponse, HeatmapCellDTO } from "../../dto/InsightsDTO";

export interface GetMetricHeatmapRequest {
  userId: string;
  metricId: string;
  to: string;
  days: number;
}

type Response = Result<MetricHeatmapResponse | null, UseCaseError>;

/**
 * Будує денний heatmap значень обраної метрики за вікно. Інтенсивність 0..1
 * нормалізована до max за період — щоб клієнт малював GitHub-стиль сітку без
 * власних обчислень. Повертає null, якщо метрика не існує/нечислова.
 */
export class GetMetricHeatmap implements UseCase<GetMetricHeatmapRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
  ) {}

  public async execute(request: GetMetricHeatmapRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const metric = await this.metrics.findById(new UniqueEntityID(request.metricId));
      if (!metric || !metric.userId.equals(userId) || !metric.kind.storesNumeric()) {
        return Result.ok(null);
      }
      const toOrError = DayDate.create(request.to);
      if (toOrError.isFailure) return Result.fail(ValidationError.create(toOrError.getError()));
      const to = toOrError.getValue();
      const from = to.shift(-(request.days - 1));

      const history = await this.entries.listByUserInRange(userId, from, to);
      const byDate = new Map<string, number>();
      let max = 0;
      for (const entry of history) {
        if (!entry.metricId.equals(metric.id)) continue;
        if (entry.value.numeric === null) continue;
        byDate.set(entry.date.value, entry.value.numeric);
        if (entry.value.numeric > max) max = entry.value.numeric;
      }

      const cells: HeatmapCellDTO[] = [];
      for (let d = 0; d < request.days; d++) {
        const date = from.shift(d);
        const value = byDate.get(date.value) ?? null;
        const intensity = value !== null && max > 0 ? Math.max(0, value / max) : 0;
        cells.push({ date: date.value, value, intensity });
      }

      return Result.ok({
        metricId: metric.id.toString(),
        name: metric.name,
        color: metric.color,
        days: request.days,
        from: from.value,
        to: to.value,
        cells,
      });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
