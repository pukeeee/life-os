import { Result, ValueObject } from "@backend/shared/kernel";

/**
 * Календарна доба у вигляді "YYYY-MM-DD". Ключовий VO: «день» визначається
 * в ТАЙМЗОНІ користувача, а не сервера, тож подія о 23:30 у Києві належить
 * правильній добі. Зберігання як рядок-дата робить групування/порівняння
 * портативним між БД.
 */
export class DayDate extends ValueObject<{ value: string }> {
  private static readonly FORMAT = /^\d{4}-\d{2}-\d{2}$/;

  public get value(): string {
    return this.props.value;
  }

  private constructor(value: string) {
    super({ value });
  }

  public static create(value: string): Result<DayDate> {
    if (!this.FORMAT.test(value)) {
      return Result.fail("Дата мусить мати формат YYYY-MM-DD.");
    }
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    const valid =
      date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
    if (!valid) return Result.fail(`Неіснуюча дата: ${value}.`);
    return Result.ok(new DayDate(value));
  }

  /** Обчислює календарну добу для моменту часу в заданій таймзоні. */
  public static fromInstant(instant: Date, timezone: string): DayDate {
    // en-CA дає формат YYYY-MM-DD.
    const formatted = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(instant);
    return new DayDate(formatted);
  }

  /** День тижня: 0 = неділя ... 6 = субота. */
  public dayOfWeek(): number {
    const [y, m, d] = this.props.value.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  }

  public compareTo(other: DayDate): number {
    return this.props.value.localeCompare(other.props.value);
  }

  /** Зсув на N днів (відʼємне — у минуле). Повертає нову добу. */
  public shift(days: number): DayDate {
    const [y, m, d] = this.props.value.split("-").map(Number);
    const ms = Date.UTC(y, m - 1, d) + days * 24 * 60 * 60 * 1000;
    return new DayDate(new Date(ms).toISOString().slice(0, 10));
  }
}
