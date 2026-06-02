import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@backend/shared/kernel";
import type { ICacheStore } from "@backend/shared/ports/ICacheStore";
import { DayDate } from "@backend/modules/tracking";
import type { IEntryRepository, IMetricDefinitionRepository } from "@backend/modules/tracking";
import { Correlation } from "../../../domain/Correlation";
import type {
  CorrelationDTO,
  CorrelationDirection,
  CorrelationsResponse,
  CorrelationStrength,
} from "../../dto/InsightsDTO";

export interface GetCorrelationsRequest {
  userId: string;
  to: string;
  days: number;
  /** Мінімум спільних днів для надійності кореляції. */
  minOverlap?: number;
}

type Response = Result<CorrelationsResponse, UseCaseError>;

const DEFAULT_MIN_OVERLAP = 10;
const MIN_ABS_R = 0.3; // нижче — шум, не показуємо
const TOP_N = 12;
const CACHE_TTL_SECONDS = 300;

/**
 * Двигун інсайтів: попарні кореляції Пірсона між числовими метриками за вікно.
 * Результат кешується (ICacheStore) з версійною інвалідацією — версія
 * інкрементується підписником події MetricLogged, тож новий лог робить кеш
 * застарілим без ручного очищення.
 */
export class GetCorrelations implements UseCase<GetCorrelationsRequest, Response> {
  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly entries: IEntryRepository,
    private readonly cache: ICacheStore,
  ) {}

  public static versionKey(userId: string): string {
    return `analytics:ver:${userId}`;
  }

  public async execute(request: GetCorrelationsRequest): Promise<Response> {
    try {
      const minOverlap = request.minOverlap ?? DEFAULT_MIN_OVERLAP;
      const userId = new UniqueEntityID(request.userId);

      const toOrError = DayDate.create(request.to);
      if (toOrError.isFailure) return Result.fail(ValidationError.create(toOrError.getError()));
      const to = toOrError.getValue();

      // Кеш: ключ містить версію даних користувача.
      const version = (await this.cache.get<number>(GetCorrelations.versionKey(request.userId))) ?? 0;
      const cacheKey = `analytics:corr:${request.userId}:${request.days}:${version}`;
      const cached = await this.cache.get<CorrelationsResponse>(cacheKey);
      if (cached) return Result.ok(cached);

      const from = to.shift(-(request.days - 1));
      const numericMetrics = (await this.metrics.listActiveByUser(userId)).filter((m) =>
        m.kind.storesNumeric(),
      );
      const history = await this.entries.listByUserInRange(userId, from, to);

      // metricId → (date → значення); + назви.
      const seriesByMetric = new Map<string, Map<string, number>>();
      const nameById = new Map<string, string>();
      for (const metric of numericMetrics) {
        seriesByMetric.set(metric.id.toString(), new Map());
        nameById.set(metric.id.toString(), metric.name);
      }
      for (const entry of history) {
        if (entry.value.numeric === null) continue;
        seriesByMetric.get(entry.metricId.toString())?.set(entry.date.value, entry.value.numeric);
      }

      const ids = [...seriesByMetric.keys()];
      const correlations: CorrelationDTO[] = [];

      for (let i = 0; i < ids.length; i += 1) {
        for (let j = i + 1; j < ids.length; j += 1) {
          const seriesA = seriesByMetric.get(ids[i])!;
          const seriesB = seriesByMetric.get(ids[j])!;

          // Спільні дати в хронологічному порядку.
          const commonDates = [...seriesA.keys()].filter((d) => seriesB.has(d)).sort();
          if (commonDates.length < minOverlap) continue;

          const xs = commonDates.map((d) => seriesA.get(d)!);
          const ys = commonDates.map((d) => seriesB.get(d)!);
          const outcome = Correlation.pearson(xs, ys);
          if (!outcome || Math.abs(outcome.r) < MIN_ABS_R) continue;

          correlations.push(this.toDto(ids[i], ids[j], nameById, outcome.r, outcome.n));
        }
      }

      correlations.sort((a, b) => Math.abs(b.r) - Math.abs(a.r));
      const response: CorrelationsResponse = {
        days: request.days,
        minOverlap,
        correlations: correlations.slice(0, TOP_N),
      };

      await this.cache.set(cacheKey, response, CACHE_TTL_SECONDS);
      return Result.ok(response);
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }

  private toDto(
    aId: string,
    bId: string,
    names: Map<string, string>,
    r: number,
    n: number,
  ): CorrelationDTO {
    const abs = Math.abs(r);
    const strength: CorrelationStrength = abs >= 0.7 ? "strong" : abs >= 0.4 ? "moderate" : "weak";
    const direction: CorrelationDirection = r >= 0 ? "positive" : "negative";
    const aName = names.get(aId) ?? "?";
    const bName = names.get(bId) ?? "?";
    const verb = direction === "positive" ? "вищий" : "нижчий";
    return {
      metricAId: aId,
      metricAName: aName,
      metricBId: bId,
      metricBName: bName,
      r,
      n,
      strength,
      direction,
      insight: `У дні з вищим «${aName}» зазвичай ${verb} «${bName}» (r=${r.toFixed(2)}, n=${n})`,
    };
  }
}
