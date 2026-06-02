import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { ITaskRepository } from "../../domain/ITaskRepository";

/** Задачу не знайдено або вона належить іншому користувачу. */
export class TaskNotFoundError extends UseCaseError {
  constructor(taskId: string) {
    super(`Задачу не знайдено: ${taskId}`);
  }
}

export interface SetTaskCompletionRequest {
  userId: string;
  taskId: string;
  completed: boolean;
}

type Response = Result<void, UseCaseError>;

/** Позначає задачу виконаною / повертає у відкриті. */
export class SetTaskCompletion implements UseCase<SetTaskCompletionRequest, Response> {
  constructor(private readonly tasks: ITaskRepository) {}

  public async execute(request: SetTaskCompletionRequest): Promise<Response> {
    try {
      const userId = new UniqueEntityID(request.userId);
      const task = await this.tasks.findById(new UniqueEntityID(request.taskId));
      if (!task || !task.userId.equals(userId)) {
        return Result.fail(new TaskNotFoundError(request.taskId));
      }

      if (request.completed) task.complete();
      else task.reopen();

      await this.tasks.save(task);
      return Result.ok();
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
