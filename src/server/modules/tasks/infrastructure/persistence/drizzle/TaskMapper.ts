import { UniqueEntityID } from "@server/shared/kernel";
import type { TaskRow } from "@server/infrastructure/persistence/drizzle/schema";
import { tasks } from "@server/infrastructure/persistence/drizzle/schema";
import { Task } from "../../../domain/Task";
import { Priority } from "../../../domain/Priority";

type TaskInsert = typeof tasks.$inferInsert;

/** Мапер Task ↔ рядок БД. */
export class TaskMapper {
  public static toDomain(row: TaskRow): Task {
    const priority = row.priority ? Priority.create(row.priority).getValue() : null;
    return Task.create(
      {
        userId: new UniqueEntityID(row.userId),
        title: row.title,
        description: row.description,
        dueDate: row.dueDate,
        priority,
        completedAt: row.completedAt,
        createdAt: row.createdAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(task: Task): TaskInsert {
    return {
      id: task.id.toString(),
      userId: task.userId.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority ? task.priority.value : null,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
    };
  }
}
