import { UseCaseError } from "@server/shared/kernel";

/** Метрику не знайдено або вона належить іншому користувачу. */
export class MetricNotFoundError extends UseCaseError {
  constructor(metricId: string) {
    super(`Метрику не знайдено: ${metricId}`);
  }
}
