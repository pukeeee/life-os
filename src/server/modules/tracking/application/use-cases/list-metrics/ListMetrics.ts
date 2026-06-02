import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@server/shared/kernel";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import type { ICategoryRepository } from "../../../domain/category/ICategoryRepository";
import type { IStreakRepository } from "../../../domain/streak/IStreakRepository";
import type { CategoryDTO, MetricSummaryDTO, TrackersOverviewDTO } from "../../dto/TrackerDTO";

export interface ListMetricsRequest {
  userId: string;
}

type Response = Result<TrackersOverviewDTO, UseCaseError>;

/**
 * Read-модель екрана Trackers: усі метрики користувача (включно з архівованими)
 * та його категорії. Групування за категоріями виконує UI.
 */
export class ListMetrics implements UseCase<ListMetricsRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly categories: ICategoryRepository,
    private readonly streaks: IStreakRepository,
  ) {}

  public async execute(request: ListMetricsRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);

      const [metricList, categoryList, streakList] = await Promise.all([
        this.metrics.listByUser(userId),
        this.categories.listByUser(userId),
        this.streaks.listByUser(userId),
      ]);

      const streakByMetric = new Map(streakList.map((s) => [s.metricId.toString(), s]));

      const categories: CategoryDTO[] = categoryList.map((c) => ({
        id: c.id.toString(),
        name: c.name,
        icon: c.icon,
        color: c.color,
        sortOrder: c.sortOrder,
      }));

      const metrics: MetricSummaryDTO[] = metricList
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
        .map((m) => ({
          metricId: m.id.toString(),
          name: m.name,
          kind: m.kind.value,
          icon: m.icon,
          color: m.color,
          unit: m.unit,
          cadenceType: m.cadence.type,
          goalType: m.target.goalType,
          targetValue: m.target.targetValue,
          archived: m.isArchived,
          categoryId: m.categoryId ? m.categoryId.toString() : null,
          sortOrder: m.sortOrder,
          currentStreak: streakByMetric.get(m.id.toString())?.current ?? 0,
          longestStreak: streakByMetric.get(m.id.toString())?.longest ?? 0,
        }));

      return Result.ok({ categories, metrics });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
