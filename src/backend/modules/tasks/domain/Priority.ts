import { Result, ValueObject, Guard } from "@backend/shared/kernel";

export const PRIORITIES = ["low", "medium", "high"] as const;
export type PriorityValue = (typeof PRIORITIES)[number];

/** Пріоритет задачі. Окремий VO заради валідації та явної семантики. */
export class Priority extends ValueObject<{ value: PriorityValue }> {
  public get value(): PriorityValue {
    return this.props.value;
  }

  private constructor(value: PriorityValue) {
    super({ value });
  }

  public static create(value: string): Result<Priority> {
    const guard = Guard.isOneOf(value as PriorityValue, PRIORITIES, "priority");
    if (guard.isFailure) return Result.fail(guard.getError());
    return Result.ok(new Priority(value as PriorityValue));
  }
}
