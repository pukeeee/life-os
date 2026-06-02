/**
 * Result — явне моделювання успіху/невдачі без винятків.
 *
 * Замість того, щоб кидати помилки на кожну невалідну операцію, домен повертає
 * Result. Це робить контракти чесними (помилка видима в типі) і дозволяє
 * акумулювати помилки валідації (див. `combine`).
 *
 * @typeParam T — тип значення при успіху
 * @typeParam E — тип помилки при невдачі (за замовчуванням рядок-повідомлення)
 */
export class Result<T, E = string> {
  public readonly isSuccess: boolean;
  private readonly _error?: E;
  private readonly _value?: T;

  private constructor(isSuccess: boolean, error?: E, value?: T) {
    if (isSuccess && error !== undefined) {
      throw new Error("InvalidOperation: успішний Result не може містити помилку.");
    }
    if (!isSuccess && error === undefined) {
      throw new Error("InvalidOperation: невдалий Result мусить містити помилку.");
    }
    this.isSuccess = isSuccess;
    this._error = error;
    this._value = value;
    Object.freeze(this);
  }

  public get isFailure(): boolean {
    return !this.isSuccess;
  }

  /** Значення при успіху. Кидає, якщо викликано на невдалому Result (баг у коді). */
  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Не можна отримати значення з невдалого Result. Спершу перевірте isFailure / помилку.");
    }
    return this._value as T;
  }

  /** Помилка при невдачі. Кидає, якщо викликано на успішному Result. */
  public getError(): E {
    if (this.isSuccess) {
      throw new Error("Успішний Result не має помилки.");
    }
    return this._error as E;
  }

  public static ok<U, E = string>(value?: U): Result<U, E> {
    return new Result<U, E>(true, undefined, value);
  }

  public static fail<U, E = string>(error: E): Result<U, E> {
    return new Result<U, E>(false, error, undefined);
  }

  /**
   * Повертає перший невдалий Result зі списку, або ok(), якщо всі успішні.
   * Зручно для валідації кількох value object-ів одночасно.
   */
  public static combine(results: Result<unknown, string>[]): Result<unknown, string> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}
