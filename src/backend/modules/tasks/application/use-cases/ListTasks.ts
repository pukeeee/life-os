import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { ITaskRepository } from "../../domain/ITaskRepository";
import type { Task } from "../../domain/Task";
import type { TaskDTO } from "../dto/TaskDTO";

export interface ListTasksRequest {
  userId: string;
}

type Response = Result<TaskDTO[], UseCaseError>;

/**
 * Перелік задач користувача. Сортування: спершу відкриті (за дедлайном, потім за
 * створенням), завершені — в кінці.
 */
export class ListTasks implements UseCase<ListTasksRequest, Response> {
  constructor(private readonly tasks: ITaskRepository) {}

  public async execute(request: ListTasksRequest): Promise<Response> {
    try {
      const list = await this.tasks.listByUser(new UniqueEntityID(request.userId));
      const sorted = [...list].sort(this.compare);
      return Result.ok(sorted.map(this.toDto));
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }

  private compare(a: Task, b: Task): number {
    // Відкриті перед завершеними.
    if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
    // Серед відкритих — за дедлайном (null в кінці).
    if (!a.isCompleted) {
      if (a.dueDate && b.dueDate && a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    // Завершені — найновіші зверху.
    return (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0);
  }

  private toDto(task: Task): TaskDTO {
    return {
      taskId: task.id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority ? task.priority.value : null,
      completed: task.isCompleted,
      createdAt: task.createdAt.toISOString(),
    };
  }
}
