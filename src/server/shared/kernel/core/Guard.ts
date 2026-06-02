import { Result } from "./Result";

/**
 * Guard — набір переробних перевірок-інваріантів для конструкторів value object-ів
 * та сутностей. Кожен метод повертає Result<void>, який легко зкомбінувати через
 * Result.combine. Тримає валідаційну логіку декларативною й одноманітною.
 */
export interface GuardArgument {
  argument: unknown;
  argumentName: string;
}

export class Guard {
  public static againstNullOrUndefined(argument: unknown, argumentName: string): Result<void> {
    if (argument === null || argument === undefined) {
      return Result.fail(`${argumentName} не може бути null або undefined.`);
    }
    return Result.ok();
  }

  public static againstNullOrUndefinedBulk(args: GuardArgument[]): Result<void> {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  public static againstEmpty(text: string, argumentName: string): Result<void> {
    if (text.trim().length === 0) {
      return Result.fail(`${argumentName} не може бути порожнім.`);
    }
    return Result.ok();
  }

  public static againstAtLeast(numChars: number, text: string, argumentName: string): Result<void> {
    if (text.length < numChars) {
      return Result.fail(`${argumentName} мусить містити щонайменше ${numChars} символів.`);
    }
    return Result.ok();
  }

  public static againstAtMost(numChars: number, text: string, argumentName: string): Result<void> {
    if (text.length > numChars) {
      return Result.fail(`${argumentName} не може перевищувати ${numChars} символів.`);
    }
    return Result.ok();
  }

  public static inRange(num: number, min: number, max: number, argumentName: string): Result<void> {
    if (num < min || num > max) {
      return Result.fail(`${argumentName} мусить бути в межах [${min}; ${max}].`);
    }
    return Result.ok();
  }

  public static isOneOf<T>(value: T, validValues: readonly T[], argumentName: string): Result<void> {
    if (!validValues.includes(value)) {
      return Result.fail(`${argumentName} мусить бути одним із: ${validValues.join(", ")}.`);
    }
    return Result.ok();
  }
}
