import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@server/shared/kernel";
import { Goal } from "../../domain/Goal";
import { GoalLevel } from "../../domain/GoalLevel";
import type { IGoalRepository } from "../../domain/IGoalRepository";

export interface CreateGoalRequest {
  userId: string;
  parentId?: string | null;
  level: string;
  title: string;
  targetDate?: string | null;
}

export interface CreateGoalResponse {
  goalId: string;
}

type Response = Result<CreateGoalResponse, UseCaseError>;

export class CreateGoal implements UseCase<CreateGoalRequest, Response> {
  constructor(private readonly goals: IGoalRepository) {}

  public async execute(request: CreateGoalRequest): Promise<Response> {
    try {
      const levelOrError = GoalLevel.create(request.level);
      if (levelOrError.isFailure) return Result.fail(ValidationError.create(levelOrError.getError()));

      const goalOrError = Goal.create({
        userId: new UniqueEntityID(request.userId),
        parentId: request.parentId ? new UniqueEntityID(request.parentId) : null,
        level: levelOrError.getValue(),
        title: request.title,
        targetDate: request.targetDate ?? null,
      });
      if (goalOrError.isFailure) return Result.fail(ValidationError.create(goalOrError.getError()));

      const goal = goalOrError.getValue();
      await this.goals.save(goal);
      return Result.ok({ goalId: goal.id.toString() });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
