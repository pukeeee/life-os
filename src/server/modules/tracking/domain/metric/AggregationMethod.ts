import { Result, ValueObject, Guard } from "@server/shared/kernel";
import type { MetricKind } from "./MetricKind";

/**
 * Спосіб агрегації значень метрики в межах доби/періоду (коли подій кілька або
 * для зведень). Напр. вода → sum, вага → last, настрій → avg.
 */
export const AGGREGATIONS = ["sum", "last", "avg", "max", "min", "count"] as const;
export type AggregationValue = (typeof AGGREGATIONS)[number];

export class AggregationMethod extends ValueObject<{ value: AggregationValue }> {
  public get value(): AggregationValue {
    return this.props.value;
  }

  private constructor(value: AggregationValue) {
    super({ value });
  }

  public static create(value: string): Result<AggregationMethod> {
    const guard = Guard.isOneOf(value as AggregationValue, AGGREGATIONS, "aggregation");
    if (guard.isFailure) return Result.fail(guard.getError());
    return Result.ok(new AggregationMethod(value as AggregationValue));
  }

  /** Розумний дефолт залежно від типу метрики. */
  public static defaultFor(kind: MetricKind): AggregationMethod {
    if (kind.is("boolean")) return new AggregationMethod("last");
    if (kind.is("count") || kind.is("duration")) return new AggregationMethod("sum");
    if (kind.is("scale") || kind.is("rating") || kind.is("number")) return new AggregationMethod("last");
    return new AggregationMethod("count");
  }
}
