import { Result, ValueObject } from "@server/shared/kernel";

export const GOAL_LEVELS = ["life", "year", "quarter", "month", "week"] as const;
export type GoalLevelValue = (typeof GOAL_LEVELS)[number];

interface GoalLevelProps {
  value: GoalLevelValue;
}

/**
 * Рівень цілі — частина ієрархії «життя → рік → квартал → місяць → тиждень».
 * Тримаємо як VO, щоб не дозволяти довільні рядки в домені.
 */
export class GoalLevel extends ValueObject<GoalLevelProps> {
  public get value(): GoalLevelValue {
    return this.props.value;
  }

  private constructor(props: GoalLevelProps) {
    super(props);
  }

  public static create(raw: string): Result<GoalLevel> {
    if (!(GOAL_LEVELS as readonly string[]).includes(raw)) {
      return Result.fail(`Невідомий рівень цілі: ${raw}`);
    }
    return Result.ok(new GoalLevel({ value: raw as GoalLevelValue }));
  }
}
