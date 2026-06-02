import { and, eq, isNull, type SQL } from "drizzle-orm";
import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Database } from "@backend/infrastructure/persistence/drizzle/client";
import { goals } from "@backend/infrastructure/persistence/drizzle/schema";
import type { Goal } from "../../../domain/Goal";
import type { IGoalRepository, ListGoalsFilter } from "../../../domain/IGoalRepository";
import { GoalMapper } from "./GoalMapper";

export class DrizzleGoalRepository implements IGoalRepository {
  constructor(private readonly db: Database) {}

  public async findById(id: UniqueEntityID): Promise<Goal | null> {
    const rows = await this.db.select().from(goals).where(eq(goals.id, id.toString())).limit(1);
    return rows[0] ? GoalMapper.toDomain(rows[0]) : null;
  }

  public async listByUser(userId: UniqueEntityID, filter?: ListGoalsFilter): Promise<Goal[]> {
    const conditions: SQL[] = [eq(goals.userId, userId.toString())];
    if (!filter?.includeArchived) conditions.push(isNull(goals.archivedAt));
    if (filter?.level) conditions.push(eq(goals.level, filter.level));
    if (filter?.parentId !== undefined) {
      conditions.push(filter.parentId === null ? isNull(goals.parentId) : eq(goals.parentId, filter.parentId));
    }
    const rows = await this.db.select().from(goals).where(and(...conditions));
    return rows.map(GoalMapper.toDomain);
  }

  public async save(goal: Goal): Promise<void> {
    const data = GoalMapper.toPersistence(goal);
    await this.db
      .insert(goals)
      .values(data)
      .onConflictDoUpdate({
        target: goals.id,
        set: {
          parentId: data.parentId,
          level: data.level,
          title: data.title,
          targetDate: data.targetDate,
          progress: data.progress,
          archivedAt: data.archivedAt,
        },
      });
  }
}
