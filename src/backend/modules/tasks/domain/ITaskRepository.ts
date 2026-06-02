import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Task } from "./Task";

/** Порт репозиторію задач. */
export interface ITaskRepository {
  findById(id: UniqueEntityID): Promise<Task | null>;
  listByUser(userId: UniqueEntityID): Promise<Task[]>;
  save(task: Task): Promise<void>;
}
