import {
  Result,
  UnexpectedError,
  UseCase,
  UseCaseError,
  ValidationError,
  DomainEvents,
} from "@server/shared/kernel";
import { Email } from "../../../domain/Email";
import { Timezone } from "../../../domain/Timezone";
import { User } from "../../../domain/User";
import type { IUserRepository } from "../../../domain/IUserRepository";
import type { ICurrentUserProvider } from "../../ports/ICurrentUserProvider";

type Response = Result<User, UseCaseError>;

/**
 * Гарантує наявність агрегату User для поточного контексту автентифікації:
 * знаходить за email або створює нового. Це «міст» між шаром auth (поки dev-заглушка)
 * і доменом — інші use cases (логування метрик тощо) отримують вже існуючого User.
 *
 * Замінивши лише ICurrentUserProvider на Clerk-адаптер, ми ввімкнемо реальний auth
 * без жодних змін у домені/застосунку.
 */
export class EnsureCurrentUser implements UseCase<void, Response> {
  constructor(
    private readonly users: IUserRepository,
    private readonly currentUser: ICurrentUserProvider,
  ) {}

  public async execute(): Promise<Response> {
    try {
      const ctx = await this.currentUser.getContext();

      const emailOrError = Email.create(ctx.email);
      if (emailOrError.isFailure) {
        return Result.fail(ValidationError.create(emailOrError.getError()));
      }
      const email = emailOrError.getValue();

      const existing = await this.users.findByEmail(email);
      if (existing) {
        return Result.ok(existing);
      }

      const timezoneOrError = Timezone.create(ctx.timezone ?? Timezone.DEFAULT);
      if (timezoneOrError.isFailure) {
        return Result.fail(ValidationError.create(timezoneOrError.getError()));
      }

      const userOrError = User.create({
        email,
        displayName: ctx.displayName ?? null,
        timezone: timezoneOrError.getValue(),
      });
      if (userOrError.isFailure) {
        return Result.fail(ValidationError.create(userOrError.getError()));
      }

      const user = userOrError.getValue();
      await this.users.save(user);
      // Публікуємо доменні події (UserRegistered) лише після успішного збереження.
      DomainEvents.dispatchEventsForAggregate(user.id);

      return Result.ok(user);
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
