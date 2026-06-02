import { AggregateRoot, Guard, Result, UniqueEntityID } from "@server/shared/kernel";
import { Email } from "./Email";
import { Timezone } from "./Timezone";
import { UserRegistered } from "./events/UserRegistered";

interface UserProps {
  email: Email;
  displayName: string | null;
  timezone: Timezone;
  /** Дата народження "YYYY-MM-DD" або null. Заповнюється на онбордингу. */
  birthDate: string | null;
  createdAt: Date;
}

/** Вхідні дані для створення/відновлення користувача. */
export interface CreateUserProps {
  email: Email;
  displayName?: string | null;
  timezone?: Timezone;
  birthDate?: string | null;
  createdAt?: Date;
}

/**
 * User — корінь агрегату контексту Identity. Власник усіх даних трекінгу.
 * Навмисно НЕ знає про Clerk/Supabase: ідентичність моделюється в домені,
 * а звʼязок із зовнішнім auth (якщо зʼявиться) буде окремим полем у адаптері.
 */
export class User extends AggregateRoot<UserProps> {
  private static readonly MAX_DISPLAY_NAME = 100;
  private static readonly DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

  public get email(): Email {
    return this.props.email;
  }

  public get displayName(): string | null {
    return this.props.displayName;
  }

  public get timezone(): Timezone {
    return this.props.timezone;
  }

  public get birthDate(): string | null {
    return this.props.birthDate;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Фабрика з інваріантами. Якщо `id` не передано — це новий користувач,
   * тож публікуємо UserRegistered. Якщо передано — це гідрація з БД (без події).
   */
  public static create(props: CreateUserProps, id?: UniqueEntityID): Result<User> {
    const displayName = props.displayName ?? null;
    if (displayName !== null) {
      const nameGuard = Guard.againstAtMost(this.MAX_DISPLAY_NAME, displayName, "displayName");
      if (nameGuard.isFailure) return Result.fail(nameGuard.getError());
    }

    if (props.birthDate && !this.DATE_FORMAT.test(props.birthDate)) {
      return Result.fail("birthDate мусить мати формат YYYY-MM-DD.");
    }

    const isNewUser = id === undefined;
    const user = new User(
      {
        email: props.email,
        displayName,
        timezone: props.timezone ?? Timezone.create(Timezone.DEFAULT).getValue(),
        birthDate: props.birthDate ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    if (isNewUser) {
      user.addDomainEvent(new UserRegistered(user));
    }
    return Result.ok(user);
  }

  /** Зміна таймзони (приклад інкапсульованої доменної поведінки). */
  public changeTimezone(timezone: Timezone): void {
    this.props.timezone = timezone;
  }

  public setBirthDate(birthDate: string | null): Result<void> {
    if (birthDate !== null && !User.DATE_FORMAT.test(birthDate)) {
      return Result.fail("birthDate мусить мати формат YYYY-MM-DD.");
    }
    this.props.birthDate = birthDate;
    return Result.ok();
  }

  public rename(displayName: string | null): Result<void> {
    if (displayName !== null) {
      const nameGuard = Guard.againstAtMost(User.MAX_DISPLAY_NAME, displayName, "displayName");
      if (nameGuard.isFailure) return Result.fail(nameGuard.getError());
    }
    this.props.displayName = displayName;
    return Result.ok();
  }
}
