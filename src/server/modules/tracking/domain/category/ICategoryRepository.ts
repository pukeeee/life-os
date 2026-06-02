import type { UniqueEntityID } from "@server/shared/kernel";
import type { Category } from "./Category";

/** Порт репозиторію категорій. */
export interface ICategoryRepository {
  findById(id: UniqueEntityID): Promise<Category | null>;
  listByUser(userId: UniqueEntityID): Promise<Category[]>;
  save(category: Category): Promise<void>;
}
