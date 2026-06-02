import { UniqueEntityID } from "@server/shared/kernel";
import type { GoalRow } from "@server/infrastructure/persistence/drizzle/schema";
import { goals } from "@server/infrastructure/persistence/drizzle/schema";
import { Goal } from "../../../domain/Goal";
import { GoalLevel } from "../../../domain/GoalLevel";

type GoalInsert = typeof goals.$inferInsert;

export class GoalMapper {
  public static toDomain(row: GoalRow): Goal {
    const level = GoalLevel.create(row.level).getValue();
    return Goal.create(
      {
        userId: new UniqueEntityID(row.userId),
        parentId: row.parentId ? new UniqueEntityID(row.parentId) : null,
        level,
        title: row.title,
        targetDate: row.targetDate,
        progress: Number(row.progress),
        archivedAt: row.archivedAt,
        createdAt: row.createdAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(goal: Goal): GoalInsert {
    return {
      id: goal.id.toString(),
      userId: goal.userId.toString(),
      parentId: goal.parentId?.toString() ?? null,
      level: goal.level.value,
      title: goal.title,
      targetDate: goal.targetDate,
      progress: goal.progress.toFixed(3),
      archivedAt: goal.archivedAt,
      createdAt: goal.createdAt,
    };
  }
}
