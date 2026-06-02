import { Result, ValueObject, Guard } from "@server/shared/kernel";

/**
 * Ціль метрики: напрям і значення. Напр. вода — at_least 8, екранний час —
 * at_most 120, кроки — exactly 10000, нотатка — none.
 */
export const GOAL_TYPES = ["at_least", "at_most", "exactly", "none"] as const;
export type GoalType = (typeof GOAL_TYPES)[number];

interface MetricTargetProps {
  goalType: GoalType;
  targetValue: number | null;
}

export class MetricTarget extends ValueObject<MetricTargetProps> {
  public get goalType(): GoalType {
    return this.props.goalType;
  }

  public get targetValue(): number | null {
    return this.props.targetValue;
  }

  private constructor(props: MetricTargetProps) {
    super(props);
  }

  public static none(): MetricTarget {
    return new MetricTarget({ goalType: "none", targetValue: null });
  }

  public static create(goalType: string, targetValue: number | null): Result<MetricTarget> {
    const guard = Guard.isOneOf(goalType as GoalType, GOAL_TYPES, "goalType");
    if (guard.isFailure) return Result.fail(guard.getError());

    if (goalType === "none") {
      return Result.ok(new MetricTarget({ goalType: "none", targetValue: null }));
    }
    if (targetValue === null || targetValue === undefined || Number.isNaN(targetValue)) {
      return Result.fail("targetValue обовʼязковий для цілі, відмінної від 'none'.");
    }
    return Result.ok(new MetricTarget({ goalType: goalType as GoalType, targetValue }));
  }

  /** Чи досягнуто ціль для агрегованого значення доби. */
  public isMet(value: number): boolean {
    if (this.props.targetValue === null) return true;
    switch (this.props.goalType) {
      case "at_least":
        return value >= this.props.targetValue;
      case "at_most":
        return value <= this.props.targetValue;
      case "exactly":
        return value === this.props.targetValue;
      default:
        return true;
    }
  }
}
