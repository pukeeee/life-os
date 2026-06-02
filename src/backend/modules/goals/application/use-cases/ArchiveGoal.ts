import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { IGoalRepository } from "../../domain/IGoalRepository";
import { GoalNotFoundError } from "./UpdateGoalProgress";

export interface ArchiveGoalRequest {
  userId: string;
  goalId: string;
  archived: boolean;
}

type Response = Result<void, UseCaseError>;

export class ArchiveGoal implements UseCase<ArchiveGoalRequest, Response> {
  constructor(private readonly goals: IGoalRepository) {}

  public async execute(request: ArchiveGoalRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const goal = await this.goals.findById(new UniqueEntityID(request.goalId));
      if (!goal || !goal.userId.equals(userId)) {
        return Result.fail(new GoalNotFoundError(request.goalId));
      }
      if (request.archived) goal.archive();
      else goal.unarchive();

      await this.goals.save(goal);
      return Result.ok();
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
