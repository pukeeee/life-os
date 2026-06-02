import { UniqueEntityID } from "@server/shared/kernel";
import type { CategoryRow } from "@server/infrastructure/persistence/drizzle/schema";
import { categories } from "@server/infrastructure/persistence/drizzle/schema";
import { Category } from "../../../domain/category/Category";

type CategoryInsert = typeof categories.$inferInsert;

/** Мапер Category ↔ рядок БД. */
export class CategoryMapper {
  public static toDomain(row: CategoryRow): Category {
    return Category.create(
      {
        userId: new UniqueEntityID(row.userId),
        name: row.name,
        icon: row.icon,
        color: row.color,
        sortOrder: row.sortOrder,
        createdAt: row.createdAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(category: Category): CategoryInsert {
    return {
      id: category.id.toString(),
      userId: category.userId.toString(),
      name: category.name,
      icon: category.icon,
      color: category.color,
      sortOrder: category.sortOrder,
      createdAt: category.createdAt,
    };
  }
}
