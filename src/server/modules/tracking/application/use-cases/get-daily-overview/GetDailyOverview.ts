import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@server/shared/kernel";
import { DayDate } from "../../../domain/day/DayDate";
import type { Entry } from "../../../domain/entry/Entry";
import type { IEntryRepository } from "../../../domain/entry/IEntryRepository";
import type { IDayRepository } from "../../../domain/day/IDayRepository";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import type { IStreakRepository } from "../../../domain/streak/IStreakRepository";
import type {
  DailyOverviewDTO,
  DailyOverviewMetricDTO,
  GetDailyOverviewRequest,
} from "../../dto/DailyOverviewDTO";

type Response = Result<DailyOverviewDTO, UseCaseError>;

/**
 * Збирає знімок доби для екрана Today: активні метрики, очікувані в цей день,
 * разом з уже залогованими значеннями. Read-модель (повертає плоский DTO).
 */
export class GetDailyOverview implements UseCase<GetDailyOverviewRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
    private readonly days: IDayRepository,
    private readonly streaks: IStreakRepository,
  ) {}

  public async execute(request: GetDailyOverviewRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);

      const dateOrError = DayDate.create(request.date);
      if (dateOrError.isFailure) return Result.fail(ValidationError.create(dateOrError.getError()));
      const date = dateOrError.getValue();

      const activeMetrics = await this.metrics.listActiveByUser(userId);
      const expected = activeMetrics.filter((m) => m.isExpectedOn(date));

      // Кеш стріків користувача → metricId → current.
      const streakList = await this.streaks.listByUser(userId);
      const streakByMetric = new Map(streakList.map((s) => [s.metricId.toString(), s.current]));

      // Записи доби (якщо Day ще не існує — записів немає).
      const day = await this.days.findByUserAndDate(userId, date);
      const entriesByMetric = new Map<string, Entry>();
      if (day) {
        const dayEntries = await this.entries.listByUserAndDay(userId, day.id);
        for (const entry of dayEntries) {
          entriesByMetric.set(entry.metricId.toString(), entry);
        }
      }

      const metrics: DailyOverviewMetricDTO[] = expected
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
        .map((metric) => {
          const entry = entriesByMetric.get(metric.id.toString());
          return {
            metricId: metric.id.toString(),
            name: metric.name,
            kind: metric.kind.value,
            icon: metric.icon,
            color: metric.color,
            unit: metric.unit,
            scaleMin: metric.scaleMin,
            scaleMax: metric.scaleMax,
            choiceOptions: metric.choiceOptions ? [...metric.choiceOptions] : null,
            goalType: metric.target.goalType,
            targetValue: metric.target.targetValue,
            logged: entry !== undefined,
            value: entry
              ? {
                  numeric: entry.value.numeric,
                  text: entry.value.text,
                  display: entry.value.display(),
                }
              : null,
            note: entry?.note ?? null,
            currentStreak: streakByMetric.get(metric.id.toString()) ?? 0,
          };
        });

      return Result.ok({ userId: request.userId, date: request.date, metrics });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
