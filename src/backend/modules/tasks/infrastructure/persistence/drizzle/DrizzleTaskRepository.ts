import { eq } from "drizzle-orm";
import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Database } from "@backend/infrastructure/persistence/drizzle/client";
import { tasks } from "@backend/infrastructure/persistence/drizzle/schema";
import type { ITaskRepository } from "../../../domain/ITaskRepository";
import type { Task } from "../../../domain/Task";
import { TaskMapper } from "./TaskMapper";

/** Postgres-реалізація репозиторію задач (save = upsert по id). */
export class DrizzleTaskRepository implements ITaskRepository {
  constructor(private readonly db: Database) {}

  public async findById(id: UniqueEntityID): Promise<Task | null> {
    const rows = await this.db.select().from(tasks).where(eq(tasks.id, id.toString())).limit(1);
    return rows[0] ? TaskMapper.toDomain(rows[0]) : null;
  }

  public async listByUser(userId: UniqueEntityID): Promise<Task[]> {
    const rows = await this.db.select().from(tasks).where(eq(tasks.userId, userId.toString()));
    return rows.map(TaskMapper.toDomain);
  }

  public async save(task: Task): Promise<void> {
    const data = TaskMapper.toPersistence(task);
    await this.db
      .insert(tasks)
      .values(data)
      .onConflictDoUpdate({
        target: tasks.id,
        set: {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          priority: data.priority,
          completedAt: data.completedAt,
        },
      });
  }
}
