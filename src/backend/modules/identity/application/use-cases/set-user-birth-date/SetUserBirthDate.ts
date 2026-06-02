import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@backend/shared/kernel";
import type { IUserRepository } from "../../../domain/IUserRepository";

/** Користувача не знайдено. */
export class UserNotFoundError extends UseCaseError {
  constructor(userId: string) {
    super(`Користувача не знайдено: ${userId}`);
  }
}

export interface SetUserBirthDateRequest {
  userId: string;
  /** YYYY-MM-DD або null (скидання). */
  birthDate: string | null;
}

type Response = Result<void, UseCaseError>;

/** Задає або скидає дату народження користувача (для онбордингу профілю). */
export class SetUserBirthDate implements UseCase<SetUserBirthDateRequest, Response> {
  constructor(private readonly users: IUserRepository) {}

  public async execute(request: SetUserBirthDateRequest): Promise<Response> {
    try {
      const user = await this.users.findById(new UniqueEntityID(request.userId));
      if (!user) return Result.fail(new UserNotFoundError(request.userId));

      const upd = user.setBirthDate(request.birthDate);
      if (upd.isFailure) return Result.fail(ValidationError.create(upd.getError()));

      await this.users.save(user);
      return Result.ok();
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
