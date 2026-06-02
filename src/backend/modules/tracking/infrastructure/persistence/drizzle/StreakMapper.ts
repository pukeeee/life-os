import { UniqueEntityID } from "@backend/shared/kernel";
import type { StreakRow } from "@backend/infrastructure/persistence/drizzle/schema";
import { streaks } from "@backend/infrastructure/persistence/drizzle/schema";
import { MetricStreak } from "../../../domain/streak/MetricStreak";

type StreakInsert = typeof streaks.$inferInsert;

/** Мапер MetricStreak ↔ рядок БД. */
export class StreakMapper {
  public static toDomain(row: StreakRow): MetricStreak {
    return MetricStreak.create(
      {
        userId: new UniqueEntityID(row.userId),
        metricId: new UniqueEntityID(row.metricId),
        current: row.current,
        longest: row.longest,
        lastCompletedDate: row.lastCompletedDate,
        updatedAt: row.updatedAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(streak: MetricStreak): StreakInsert {
    return {
      id: streak.id.toString(),
      userId: streak.userId.toString(),
      metricId: streak.metricId.toString(),
      current: streak.current,
      longest: streak.longest,
      lastCompletedDate: streak.lastCompletedDate,
      updatedAt: streak.updatedAt,
    };
  }
}
