import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { IMetricDefinitionRepository } from "../../../domain/metric/IMetricDefinitionRepository";
import { DefineMetric } from "../define-metric/DefineMetric";
import type { DefineMetricRequest } from "../define-metric/DefineMetricDTO";

export interface SeedStarterMetricsRequest {
  userId: string;
}
export interface SeedStarterMetricsResponse {
  created: number;
}

type Response = Result<SeedStarterMetricsResponse, UseCaseError>;

/**
 * Ідемпотентний онбординг: якщо у користувача ще немає жодної метрики — створює
 * невеликий стартовий набір (настрій, енергія, вода, читання, медитація), щоб
 * екран Today одразу мав сенс. Повторні виклики нічого не роблять.
 *
 * Це приклад оркестрації кількох доменних дій на рівні застосунку (через інший
 * use case DefineMetric), без дублювання доменної логіки.
 */
export class SeedStarterMetrics implements UseCase<SeedStarterMetricsRequest, Response> {
  private static readonly DEFAULTS: Omit<DefineMetricRequest, "userId">[] = [
    { name: "Настрій", kind: "scale", scaleMin: 1, scaleMax: 5, icon: "🙂", color: "#E8643A", sortOrder: 0 },
    { name: "Енергія", kind: "scale", scaleMin: 1, scaleMax: 5, icon: "⚡", color: "#F5A623", sortOrder: 1 },
    { name: "Вода", kind: "count", unit: "склянок", goalType: "at_least", targetValue: 8, icon: "💧", color: "#2196F3", sortOrder: 2 },
    { name: "Читання", kind: "duration", unit: "хв", icon: "📚", color: "#4CAF72", sortOrder: 3 },
    { name: "Медитація", kind: "boolean", icon: "🧘", color: "#9C27B0", sortOrder: 4 },
  ];

  constructor(
    private readonly metrics: IMetricDefinitionRepository,
    private readonly defineMetric: DefineMetric,
  ) {}

  public async execute(request: SeedStarterMetricsRequest): Promise<Response> {
    try {
      const existing = await this.metrics.listByUser(new UniqueEntityID(request.userId));
      if (existing.length > 0) return Result.ok({ created: 0 });

      for (const preset of SeedStarterMetrics.DEFAULTS) {
        const result = await this.defineMetric.execute({ userId: request.userId, ...preset });
        if (result.isFailure) return Result.fail(result.getError());
      }
      return Result.ok({ created: SeedStarterMetrics.DEFAULTS.length });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
