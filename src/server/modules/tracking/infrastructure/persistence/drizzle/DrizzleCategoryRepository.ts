import { asc, eq } from "drizzle-orm";
import type { UniqueEntityID } from "@server/shared/kernel";
import type { Database } from "@server/infrastructure/persistence/drizzle/client";
import { categories } from "@server/infrastructure/persistence/drizzle/schema";
import type { Category } from "../../../domain/category/Category";
import type { ICategoryRepository } from "../../../domain/category/ICategoryRepository";
import { CategoryMapper } from "./CategoryMapper";

/** Postgres-реалізація репозиторію категорій. */
export class DrizzleCategoryRepository implements ICategoryRepository {
  constructor(private readonly db: Database) {}

  public async findById(id: UniqueEntityID): Promise<Category | null> {
    const rows = await this.db.select().from(categories).where(eq(categories.id, id.toString())).limit(1);
    return rows[0] ? CategoryMapper.toDomain(rows[0]) : null;
  }

  public async listByUser(userId: UniqueEntityID): Promise<Category[]> {
    const rows = await this.db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId.toString()))
      .orderBy(asc(categories.sortOrder));
    return rows.map(CategoryMapper.toDomain);
  }

  public async save(category: Category): Promise<void> {
    const data = CategoryMapper.toPersistence(category);
    await this.db.insert(categories).values(data).onConflictDoUpdate({ target: categories.id, set: data });
  }
}
