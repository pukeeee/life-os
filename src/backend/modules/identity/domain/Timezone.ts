import { Result, ValueObject, Guard } from "@backend/shared/kernel";

interface TimezoneProps {
  value: string;
}

/**
 * Таймзона користувача (IANA, напр. "Europe/Kyiv"). Критична для коректного
 * визначення «доби» при логуванні метрик. Валідується через Intl.
 */
export class Timezone extends ValueObject<TimezoneProps> {
  public static readonly DEFAULT = "UTC";

  public get value(): string {
    return this.props.value;
  }

  private constructor(props: TimezoneProps) {
    super(props);
  }

  public static create(timezone: string): Result<Timezone> {
    const guard = Guard.againstNullOrUndefined(timezone, "timezone");
    if (guard.isFailure) return Result.fail(guard.getError());

    try {
      // Кине RangeError, якщо таймзона невідома середовищу.
      new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    } catch {
      return Result.fail(`Невідома таймзона: ${timezone}`);
    }
    return Result.ok(new Timezone({ value: timezone }));
  }
}
