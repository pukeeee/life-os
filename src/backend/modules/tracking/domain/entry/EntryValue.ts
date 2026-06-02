import { ValueObject } from "@backend/shared/kernel";
import type { MetricKindValue } from "../metric/MetricKind";

interface EntryValueProps {
  kind: MetricKindValue;
  /** Числове подання (для аналітики). boolean → 0/1. null для text/choice. */
  numeric: number | null;
  /** Текстове подання (для text/choice; також людиночитний опис вибору). */
  text: string | null;
}

/**
 * Поліморфне значення запису. Конкретний зміст залежить від типу метрики, але
 * назовні воно завжди має узгоджене числове та/або текстове подання. Створюється
 * винятково через MetricDefinition.interpret(...), який гарантує відповідність типу.
 */
export class EntryValue extends ValueObject<EntryValueProps> {
  public get kind(): MetricKindValue {
    return this.props.kind;
  }

  public get numeric(): number | null {
    return this.props.numeric;
  }

  public get text(): string | null {
    return this.props.text;
  }

  private constructor(props: EntryValueProps) {
    super(props);
  }

  public static numeric(kind: MetricKindValue, value: number, text: string | null = null): EntryValue {
    return new EntryValue({ kind, numeric: value, text });
  }

  public static text(kind: MetricKindValue, value: string): EntryValue {
    return new EntryValue({ kind, numeric: null, text: value });
  }

  /** Відновлення зі сховища (валідність уже гарантована при першому записі). */
  public static hydrate(props: EntryValueProps): EntryValue {
    return new EntryValue(props);
  }

  /** Значення для аналітики (кореляції/тренди); null, якщо метрика нечислова. */
  public toAnalyticsNumber(): number | null {
    return this.props.numeric;
  }

  public display(): string {
    if (this.props.text !== null) return this.props.text;
    if (this.props.numeric !== null) return String(this.props.numeric);
    return "";
  }
}
