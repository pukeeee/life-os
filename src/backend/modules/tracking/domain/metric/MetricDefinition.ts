import { AggregateRoot, Guard, Result, UniqueEntityID } from "@backend/shared/kernel";
import { MetricKind } from "./MetricKind";
import { AggregationMethod } from "./AggregationMethod";
import { Cadence } from "./Cadence";
import { MetricTarget } from "./MetricTarget";
import { EntryValue } from "../entry/EntryValue";
import type { DayDate } from "../day/DayDate";

interface MetricDefinitionProps {
  userId: UniqueEntityID;
  categoryId: UniqueEntityID | null;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  kind: MetricKind;
  unit: string | null;
  scaleMin: number | null;
  scaleMax: number | null;
  choiceOptions: string[] | null;
  aggregation: AggregationMethod;
  cadence: Cadence;
  target: MetricTarget;
  allowPartial: boolean;
  sortOrder: number;
  archivedAt: Date | null;
  createdAt: Date;
}

export interface CreateMetricDefinitionProps {
  userId: UniqueEntityID;
  name: string;
  kind: MetricKind;
  categoryId?: UniqueEntityID | null;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  unit?: string | null;
  scaleMin?: number | null;
  scaleMax?: number | null;
  choiceOptions?: string[] | null;
  aggregation?: AggregationMethod;
  cadence?: Cadence;
  target?: MetricTarget;
  allowPartial?: boolean;
  sortOrder?: number;
  archivedAt?: Date | null;
  createdAt?: Date;
}

/** «Сире» введене значення; interpret() приводить його до EntryValue згідно з типом. */
export interface RawEntryInput {
  number?: number | null;
  boolean?: boolean | null;
  text?: string | null;
}

/**
 * MetricDefinition — корінь агрегату «що саме відстежуємо». Інкапсулює як
 * конфігурацію метрики, так і ПРАВИЛА інтерпретації введених значень
 * (interpret), бо саме визначення метрики знає, що є валідним значенням.
 */
export class MetricDefinition extends AggregateRoot<MetricDefinitionProps> {
  private static readonly MAX_NAME = 100;

  // ── getters ────────────────────────────────────────────────────────────────
  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get categoryId(): UniqueEntityID | null {
    return this.props.categoryId;
  }
  public get name(): string {
    return this.props.name;
  }
  public get description(): string | null {
    return this.props.description;
  }
  public get icon(): string | null {
    return this.props.icon;
  }
  public get color(): string | null {
    return this.props.color;
  }
  public get kind(): MetricKind {
    return this.props.kind;
  }
  public get unit(): string | null {
    return this.props.unit;
  }
  public get scaleMin(): number | null {
    return this.props.scaleMin;
  }
  public get scaleMax(): number | null {
    return this.props.scaleMax;
  }
  public get choiceOptions(): readonly string[] | null {
    return this.props.choiceOptions;
  }
  public get aggregation(): AggregationMethod {
    return this.props.aggregation;
  }
  public get cadence(): Cadence {
    return this.props.cadence;
  }
  public get target(): MetricTarget {
    return this.props.target;
  }
  public get allowPartial(): boolean {
    return this.props.allowPartial;
  }
  public get sortOrder(): number {
    return this.props.sortOrder;
  }
  public get archivedAt(): Date | null {
    return this.props.archivedAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get isArchived(): boolean {
    return this.props.archivedAt !== null;
  }

  private constructor(props: MetricDefinitionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CreateMetricDefinitionProps,
    id?: UniqueEntityID,
  ): Result<MetricDefinition> {
    const nameGuard = Guard.againstEmpty(props.name ?? "", "name");
    if (nameGuard.isFailure) return Result.fail(nameGuard.getError());
    const lengthGuard = Guard.againstAtMost(this.MAX_NAME, props.name, "name");
    if (lengthGuard.isFailure) return Result.fail(lengthGuard.getError());

    // Інваріанти, специфічні для типу метрики.
    if (props.kind.is("scale") || props.kind.is("rating")) {
      const min = props.scaleMin;
      const max = props.scaleMax;
      if (min === null || min === undefined || max === null || max === undefined) {
        return Result.fail("Для scale/rating обовʼязкові scaleMin та scaleMax.");
      }
      if (min >= max) return Result.fail("scaleMin мусить бути меншим за scaleMax.");
    }
    if (props.kind.is("choice")) {
      if (!props.choiceOptions || props.choiceOptions.length === 0) {
        return Result.fail("Для choice потрібен непорожній choiceOptions.");
      }
    }

    const metric = new MetricDefinition(
      {
        userId: props.userId,
        categoryId: props.categoryId ?? null,
        name: props.name.trim(),
        description: props.description ?? null,
        icon: props.icon ?? null,
        color: props.color ?? null,
        kind: props.kind,
        unit: props.unit ?? null,
        scaleMin: props.scaleMin ?? null,
        scaleMax: props.scaleMax ?? null,
        choiceOptions: props.choiceOptions ?? null,
        aggregation: props.aggregation ?? AggregationMethod.defaultFor(props.kind),
        cadence: props.cadence ?? Cadence.daily(),
        target: props.target ?? MetricTarget.none(),
        allowPartial: props.allowPartial ?? false,
        sortOrder: props.sortOrder ?? 0,
        archivedAt: props.archivedAt ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return Result.ok(metric);
  }

  /**
   * Приводить «сире» введене значення до EntryValue згідно з типом метрики,
   * перевіряючи всі інваріанти (діапазон шкали, належність до опцій тощо).
   */
  public interpret(raw: RawEntryInput): Result<EntryValue> {
    const kind = this.props.kind.value;
    switch (kind) {
      case "boolean": {
        const bool = raw.boolean ?? (raw.number !== null && raw.number !== undefined ? raw.number !== 0 : undefined);
        if (bool === undefined) return Result.fail("Для boolean-метрики потрібно значення так/ні.");
        return Result.ok(EntryValue.numeric("boolean", bool ? 1 : 0));
      }
      case "count": {
        const n = raw.number;
        if (n === null || n === undefined) return Result.fail("Потрібне числове значення.");
        if (!Number.isInteger(n) || n < 0) return Result.fail("count мусить бути цілим ≥ 0.");
        return Result.ok(EntryValue.numeric("count", n));
      }
      case "duration": {
        const n = raw.number;
        if (n === null || n === undefined) return Result.fail("Потрібне числове значення.");
        if (n < 0) return Result.fail("duration мусить бути ≥ 0.");
        return Result.ok(EntryValue.numeric("duration", n));
      }
      case "number": {
        const n = raw.number;
        if (n === null || n === undefined || !Number.isFinite(n)) {
          return Result.fail("Потрібне скінченне числове значення.");
        }
        return Result.ok(EntryValue.numeric("number", n));
      }
      case "scale":
      case "rating": {
        const n = raw.number;
        if (n === null || n === undefined) return Result.fail("Потрібне числове значення.");
        const min = this.props.scaleMin as number;
        const max = this.props.scaleMax as number;
        const range = Guard.inRange(n, min, max, "value");
        if (range.isFailure) return Result.fail(range.getError());
        return Result.ok(EntryValue.numeric(kind, n));
      }
      case "choice": {
        const text = raw.text?.trim();
        if (!text) return Result.fail("Потрібно вибрати опцію.");
        if (!(this.props.choiceOptions ?? []).includes(text)) {
          return Result.fail(`Опція має бути однією з: ${(this.props.choiceOptions ?? []).join(", ")}.`);
        }
        return Result.ok(EntryValue.text("choice", text));
      }
      case "text": {
        const text = raw.text?.trim();
        if (!text) return Result.fail("Текст не може бути порожнім.");
        return Result.ok(EntryValue.text("text", text));
      }
      default:
        return Result.fail(`Непідтримуваний тип метрики: ${kind}.`);
    }
  }

  /** Чи показувати метрику в конкретну добу (активна + збігається з періодичністю). */
  public isExpectedOn(date: DayDate): boolean {
    return !this.isArchived && this.props.cadence.isActiveOn(date);
  }

  /**
   * Чи вважається залогований день «успішним» для стріку. Сама метрика знає, що
   * є успіхом: boolean → 1; за наявності цілі → ціль досягнута; інакше будь-який
   * запис рахується.
   */
  public isSuccess(value: EntryValue): boolean {
    if (this.props.kind.is("boolean")) return value.numeric === 1;
    if (this.props.target.goalType !== "none" && value.numeric !== null) {
      return this.props.target.isMet(value.numeric);
    }
    return true;
  }

  public archive(at: Date = new Date()): void {
    if (!this.isArchived) this.props.archivedAt = at;
  }

  public unarchive(): void {
    this.props.archivedAt = null;
  }
}
