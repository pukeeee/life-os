import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { ITaskRepository } from "../../domain/ITaskRepository";
import type { Task } from "../../domain/Task";
import { Priority } from "../../domain/Priority";
import type { TaskDTO } from "../dto/TaskDTO";

export interface ListTodayTasksRequest {
  userId: string;
  /** Сьогоднішня дата в таймзоні користувача, формат YYYY-MM-DD. */
  today: string;
}

type Response = Result<TaskDTO[], UseCaseError>;

const PRIORITY_WEIGHT: Record<string, number> = { high: 0, medium: 1, low: 2 };

/**
 * Відкриті задачі, що потребують уваги сьогодні: прострочені (dueDate < today)
 * та з дедлайном на сьогодні (dueDate == today). Задачі без дедлайну та
 * майбутні — виключені; виконані — теж.
 */
export class ListTodayTasks implements UseCase<ListTodayTasksRequest, Response> {
  constructor(private readonly tasks: ITaskRepository) {}

  public async execute(request: ListTodayTasksRequest): Promise<Response> {
    try {
      const all = await this.tasks.listByUser(new UniqueEntityID(request.userId));
      const filtered = all.filter(
        (t) => !t.isCompleted && t.dueDate !== null && t.dueDate <= request.today,
      );
      const sorted = filtered.sort((a, b) => this.compare(a, b, request.today));
      return Result.ok(sorted.map(this.toDto));
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }

  private compare(a: Task, b: Task, today: string): number {
    // Прострочені раніше за сьогоднішні.
    const aOverdue = (a.dueDate as string) < today;
    const bOverdue = (b.dueDate as string) < today;
    if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
    // Серед прострочених — найдавніші зверху; серед сьогоднішніх — за пріоритетом.
    if (aOverdue && bOverdue) {
      return (a.dueDate as string).localeCompare(b.dueDate as string);
    }
    const pa = priorityWeight(a.priority);
    const pb = priorityWeight(b.priority);
    if (pa !== pb) return pa - pb;
    return a.createdAt.getTime() - b.createdAt.getTime();
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

function priorityWeight(priority: Priority | null): number {
  if (!priority) return 3;
  return PRIORITY_WEIGHT[priority.value] ?? 3;
}
