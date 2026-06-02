import { Result, ValueObject, Guard } from "@backend/shared/kernel";

interface EmailProps {
  value: string;
}

/** Email як value object: нормалізований (lowercase/trim) і валідований за форматом. */
export class Email extends ValueObject<EmailProps> {
  private static readonly FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public get value(): string {
    return this.props.value;
  }

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Result<Email> {
    const guard = Guard.againstNullOrUndefined(email, "email");
    if (guard.isFailure) return Result.fail(guard.getError());

    const normalized = email.trim().toLowerCase();
    if (!this.FORMAT.test(normalized)) {
      return Result.fail("Невалідний формат email.");
    }
    return Result.ok(new Email({ value: normalized }));
  }
}
