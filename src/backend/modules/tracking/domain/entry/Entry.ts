import { AggregateRoot, Result, UniqueEntityID } from "@backend/shared/kernel";
import { EntryValue } from "./EntryValue";
import { MetricLogged } from "./events/MetricLogged";
import type { DayDate } from "../day/DayDate";

/** Звідки надійшов запис (для майбутніх каналів: бот, імпорт, публічне API). */
export const ENTRY_SOURCES = ["app", "telegram", "import", "api"] as const;
export type EntrySource = (typeof ENTRY_SOURCES)[number];

interface EntryProps {
  userId: UniqueEntityID;
  metricId: UniqueEntityID;
  dayId: UniqueEntityID;
  /** Денормалізована календарна доба — основа аналітики (стріки/тренди/кореляції). */
  date: DayDate;
  value: EntryValue;
  note: string | null;
  source: EntrySource;
  occurredAt: Date;
  createdAt: Date;
}

export interface CreateEntryProps {
  userId: UniqueEntityID;
  metricId: UniqueEntityID;
  dayId: UniqueEntityID;
  date: DayDate;
  value: EntryValue;
  note?: string | null;
  source?: EntrySource;
  occurredAt?: Date;
  createdAt?: Date;
}

/**
 * Entry — атомарний факт логування метрики (event store). Це «подія життя»:
 * саме над послідовностями Entry будується вся аналітика (стріки, тренди,
 * кореляції). Створення нового запису публікує доменну подію MetricLogged.
 */
export class Entry extends AggregateRoot<EntryProps> {
  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get metricId(): UniqueEntityID {
    return this.props.metricId;
  }
  public get dayId(): UniqueEntityID {
    return this.props.dayId;
  }
  public get date(): DayDate {
    return this.props.date;
  }
  public get value(): EntryValue {
    return this.props.value;
  }
  public get note(): string | null {
    return this.props.note;
  }
  public get source(): EntrySource {
    return this.props.source;
  }
  public get occurredAt(): Date {
    return this.props.occurredAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: EntryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateEntryProps, id?: UniqueEntityID): Result<Entry> {
    const isNew = id === undefined;
    const entry = new Entry(
      {
        userId: props.userId,
        metricId: props.metricId,
        dayId: props.dayId,
        date: props.date,
        value: props.value,
        note: props.note ?? null,
        source: props.source ?? "app",
        occurredAt: props.occurredAt ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    if (isNew) {
      entry.addDomainEvent(new MetricLogged(entry));
    }
    return Result.ok(entry);
  }

  /** Оновлення значення вже існуючого запису (повторне логування тієї ж доби). */
  public updateValue(value: EntryValue, note: string | null = this.props.note): void {
    this.props.value = value;
    this.props.note = note;
    this.props.occurredAt = new Date();
    this.addDomainEvent(new MetricLogged(this));
  }
}
