import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@backend/shared/kernel";
import { Task } from "../../domain/Task";
import { Priority } from "../../domain/Priority";
import type { ITaskRepository } from "../../domain/ITaskRepository";

export interface CreateTaskRequest {
  userId: string;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority?: string | null;
}
export interface CreateTaskResponse {
  taskId: string;
}

type Response = Result<CreateTaskResponse, UseCaseError>;

/** Створює нову задачу. */
export class CreateTask implements UseCase<CreateTaskRequest, Response> {
  constructor(private readonly tasks: ITaskRepository) {}

  public async execute(request: CreateTaskRequest): Promise<Response> {
    try {
      let priority: Priority | null = null;
      if (request.priority) {
        const priorityOrError = Priority.create(request.priority);
        if (priorityOrError.isFailure) return Result.fail(ValidationError.create(priorityOrError.getError()));
        priority = priorityOrError.getValue();
      }

      const taskOrError = Task.create({
        userId: new UniqueEntityID(request.userId),
        title: request.title,
        description: request.description ?? null,
        dueDate: request.dueDate ?? null,
        priority,
      });
      if (taskOrError.isFailure) return Result.fail(ValidationError.create(taskOrError.getError()));

      const task = taskOrError.getValue();
      await this.tasks.save(task);
      return Result.ok({ taskId: task.id.toString() });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
