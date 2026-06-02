import type { UniqueEntityID } from "@backend/shared/kernel";
import type { ITaskRepository } from "../../domain/ITaskRepository";
import type { Task } from "../../domain/Task";

/** In-memory адаптер репозиторію задач. */
export class InMemoryTaskRepository implements ITaskRepository {
  private readonly store = new Map<string, Task>();

  public async findById(id: UniqueEntityID): Promise<Task | null> {
    return this.store.get(id.toString()) ?? null;
  }

  public async listByUser(userId: UniqueEntityID): Promise<Task[]> {
    return [...this.store.values()].filter((t) => t.userId.equals(userId));
  }

  public async save(task: Task): Promise<void> {
    this.store.set(task.id.toString(), task);
  }
}
