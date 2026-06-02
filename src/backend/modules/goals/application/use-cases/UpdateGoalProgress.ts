import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@backend/shared/kernel";
import type { IGoalRepository } from "../../domain/IGoalRepository";

export class GoalNotFoundError extends UseCaseError {
  constructor(goalId: string) {
    super(`Ціль не знайдено: ${goalId}`);
  }
}

export interface UpdateGoalProgressRequest {
  userId: string;
  goalId: string;
  /** 0..1 */
  progress: number;
}

type Response = Result<void, UseCaseError>;

export class UpdateGoalProgress implements UseCase<UpdateGoalProgressRequest, Response> {
  constructor(private readonly goals: IGoalRepository) {}

  public async execute(request: UpdateGoalProgressRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const goal = await this.goals.findById(new UniqueEntityID(request.goalId));
      if (!goal || !goal.userId.equals(userId)) {
        return Result.fail(new GoalNotFoundError(request.goalId));
      }
      const upd = goal.setProgress(request.progress);
      if (upd.isFailure) return Result.fail(ValidationError.create(upd.getError()));

      await this.goals.save(goal);
      return Result.ok();
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
