import type { UniqueEntityID } from "@server/shared/kernel";
import type { Category } from "../../domain/category/Category";
import type { ICategoryRepository } from "../../domain/category/ICategoryRepository";

/** In-memory адаптер репозиторію категорій. */
export class InMemoryCategoryRepository implements ICategoryRepository {
  private readonly store = new Map<string, Category>();

  public async findById(id: UniqueEntityID): Promise<Category | null> {
    return this.store.get(id.toString()) ?? null;
  }

  public async listByUser(userId: UniqueEntityID): Promise<Category[]> {
    return [...this.store.values()]
      .filter((c) => c.userId.equals(userId))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  }

  public async save(category: Category): Promise<void> {
    this.store.set(category.id.toString(), category);
  }
}
