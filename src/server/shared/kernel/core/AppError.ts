import { UseCaseError } from "./UseCaseError";

/**
 * Помилка валідації вхідних даних (порушення формату/інваріантів VO).
 * Узагальнює повідомлення з доменних Guard-перевірок у типізовану помилку
 * прикладного шару.
 */
export class ValidationError extends UseCaseError {
  private constructor(message: string) {
    super(message);
  }

  public static create(message: string): ValidationError {
    return new ValidationError(message);
  }
}

/**
 * Несподівана технічна помилка (збій БД, мережі тощо). Use case ловить виняток
 * у try/catch і повертає її через Result.fail, не розкриваючи деталей назовні.
 */
export class UnexpectedError extends UseCaseError {
  public readonly cause: unknown;

  private constructor(cause: unknown) {
    super("Несподівана помилка. Спробуйте пізніше.");
    this.cause = cause;
  }

  public static create(cause: unknown): UnexpectedError {
    return new UnexpectedError(cause);
  }
}
