import {
  DomainEvents,
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@server/shared/kernel";
import { DayDate } from "../../../domain/day/DayDate";
import { Entry } from "../../../domain/entry/Entry";
import type { IEntryRepository } from "../../../domain/entry/IEntryRepository";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import { DayService } from "../../services/DayService";
import { MetricNotFoundError } from "./LogEntryErrors";
import type { LogEntryRequest, LogEntryResponse } from "./LogEntryDTO";

type Response = Result<LogEntryResponse, UseCaseError>;

/**
 * Логує значення метрики за добу. Ключовий «командний» сценарій движка:
 *  1) знаходить метрику й перевіряє належність користувачу (авторизація app-рівня);
 *  2) гарантує існування Day у таймзоні користувача;
 *  3) делегує інтерпретацію значення визначенню метрики (interpret);
 *  4) робить upsert запису (одна daily-подія на метрику/добу);
 *  5) публікує MetricLogged ПІСЛЯ збереження.
 */
export class LogEntry implements UseCase<LogEntryRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
    private readonly dayService: DayService,
  ) {}

  public async execute(request: LogEntryRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const metricId = new UniqueEntityID(request.metricId);

      const metric = await this.metrics.findById(metricId);
      if (!metric || !metric.userId.equals(userId)) {
        return Result.fail(new MetricNotFoundError(request.metricId));
      }

      const dateOrError = DayDate.create(request.date);
      if (dateOrError.isFailure) return Result.fail(ValidationError.create(dateOrError.getError()));
      const date = dateOrError.getValue();

      // Інтерпретація сирого значення згідно з типом метрики.
      const valueOrError = metric.interpret({
        number: request.number ?? null,
        boolean: request.boolean ?? null,
        text: request.text ?? null,
      });
      if (valueOrError.isFailure) return Result.fail(ValidationError.create(valueOrError.getError()));
      const value = valueOrError.getValue();

      const day = await this.dayService.ensure(userId, date);

      // Upsert: оновлюємо існуючий запис доби або створюємо новий.
      const existing = await this.entries.findByMetricAndDay(metricId, day.id);
      const entry =
        existing ??
        Entry.create({
          userId,
          metricId,
          dayId: day.id,
          date,
          value,
          note: request.note ?? null,
          source: request.source ?? "app",
        }).getValue();

      if (existing) {
        existing.updateValue(value, request.note ?? null);
      }

      await this.entries.save(entry);
      DomainEvents.dispatchEventsForAggregate(entry.id);

      return Result.ok({ entryId: entry.id.toString() });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
