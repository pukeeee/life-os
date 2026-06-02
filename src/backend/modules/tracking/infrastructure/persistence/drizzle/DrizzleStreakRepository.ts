import { eq } from "drizzle-orm";
import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Database } from "@backend/infrastructure/persistence/drizzle/client";
import { streaks } from "@backend/infrastructure/persistence/drizzle/schema";
import type { MetricStreak } from "../../../domain/streak/MetricStreak";
import type { IStreakRepository } from "../../../domain/streak/IStreakRepository";
import { StreakMapper } from "./StreakMapper";

/** Postgres-реалізація репозиторію стріків (upsert по metricId). */
export class DrizzleStreakRepository implements IStreakRepository {
  constructor(private readonly db: Database) {}

  public async findByMetric(metricId: UniqueEntityID): Promise<MetricStreak | null> {
    const rows = await this.db
      .select()
      .from(streaks)
      .where(eq(streaks.metricId, metricId.toString()))
      .limit(1);
    return rows[0] ? StreakMapper.toDomain(rows[0]) : null;
  }

  public async listByUser(userId: UniqueEntityID): Promise<MetricStreak[]> {
    const rows = await this.db.select().from(streaks).where(eq(streaks.userId, userId.toString()));
    return rows.map(StreakMapper.toDomain);
  }

  public async save(streak: MetricStreak): Promise<void> {
    const data = StreakMapper.toPersistence(streak);
    await this.db
      .insert(streaks)
      .values(data)
      .onConflictDoUpdate({
        target: streaks.metricId,
        set: {
          current: data.current,
          longest: data.longest,
          lastCompletedDate: data.lastCompletedDate,
          updatedAt: data.updatedAt,
        },
      });
  }
}
