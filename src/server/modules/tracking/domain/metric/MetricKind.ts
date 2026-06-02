import { Result, ValueObject, Guard } from "@server/shared/kernel";

/**
 * Тип метрики — ключ універсальності движка. Будь-який «показник життя» — це одна
 * з цих форм, тож звичка (boolean), настрій (scale), вага (number), вода (count),
 * сон (duration), категорійний вибір (choice) чи нотатка (text) описуються однією
 * моделлю даних.
 */
export const METRIC_KINDS = [
  "boolean", // так/ні (звичка) → зберігається як 0/1
  "count", // лічильник (склянки води) → ціле ≥ 0
  "number", // довільне число (вага, $)
  "scale", // шкала в межах [min; max] (настрій 1–5)
  "duration", // тривалість у хвилинах ≥ 0
  "rating", // оцінка в межах [min; max] (близько до scale, окрема семантика)
  "choice", // вибір з фіксованого списку → зберігається як текст-опція
  "text", // вільний текст
] as const;

export type MetricKindValue = (typeof METRIC_KINDS)[number];

/** Підмножина типів, значення яких числові (придатні для кореляцій/трендів). */
const NUMERIC_KINDS: readonly MetricKindValue[] = [
  "boolean",
  "count",
  "number",
  "scale",
  "duration",
  "rating",
];

export class MetricKind extends ValueObject<{ value: MetricKindValue }> {
  public get value(): MetricKindValue {
    return this.props.value;
  }

  private constructor(value: MetricKindValue) {
    super({ value });
  }

  public static create(value: string): Result<MetricKind> {
    const guard = Guard.isOneOf(value as MetricKindValue, METRIC_KINDS, "kind");
    if (guard.isFailure) return Result.fail(guard.getError());
    return Result.ok(new MetricKind(value as MetricKindValue));
  }

  /** Значення зберігається числом (аналітика працює лише з такими). */
  public storesNumeric(): boolean {
    return NUMERIC_KINDS.includes(this.props.value);
  }

  /** Значення зберігається текстом (choice/text). */
  public storesText(): boolean {
    return this.props.value === "text" || this.props.value === "choice";
  }

  public is(value: MetricKindValue): boolean {
    return this.props.value === value;
  }
}
