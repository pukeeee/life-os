import { Result, ValueObject, Guard } from "@server/shared/kernel";
import type { DayDate } from "../day/DayDate";

/**
 * Періодичність метрики: як часто вона «очікується». Визначає, чи показувати
 * метрику в певний день і чи рахувати його пропуском.
 */
export const CADENCE_TYPES = ["daily", "weekly", "monthly", "custom"] as const;
export type CadenceType = (typeof CADENCE_TYPES)[number];

interface CadenceProps {
  type: CadenceType;
  /** Дні тижня (0=нд..6=сб) для weekly/custom; null для daily/monthly. */
  activeDays: number[] | null;
}

export class Cadence extends ValueObject<CadenceProps> {
  public get type(): CadenceType {
    return this.props.type;
  }

  public get activeDays(): readonly number[] | null {
    return this.props.activeDays;
  }

  private constructor(props: CadenceProps) {
    super(props);
  }

  public static daily(): Cadence {
    return new Cadence({ type: "daily", activeDays: null });
  }

  public static create(type: string, activeDays?: number[] | null): Result<Cadence> {
    const guard = Guard.isOneOf(type as CadenceType, CADENCE_TYPES, "cadence");
    if (guard.isFailure) return Result.fail(guard.getError());

    if (type === "weekly" || type === "custom") {
      if (!activeDays || activeDays.length === 0) {
        return Result.fail("Для weekly/custom потрібен непорожній перелік activeDays.");
      }
      const allValid = activeDays.every((d) => Number.isInteger(d) && d >= 0 && d <= 6);
      if (!allValid) return Result.fail("activeDays мусять бути цілими в межах [0; 6].");
      const unique = [...new Set(activeDays)].sort((a, b) => a - b);
      return Result.ok(new Cadence({ type: type as CadenceType, activeDays: unique }));
    }

    return Result.ok(new Cadence({ type: type as CadenceType, activeDays: null }));
  }

  /** Чи «очікується» метрика в конкретну добу. */
  public isActiveOn(date: DayDate): boolean {
    switch (this.props.type) {
      case "daily":
      case "monthly":
        return true;
      case "weekly":
      case "custom":
        return this.props.activeDays?.includes(date.dayOfWeek()) ?? false;
      default:
        return true;
    }
  }
}
