import { and, eq } from "drizzle-orm";
import type { UniqueEntityID } from "@server/shared/kernel";
import type { Database } from "@server/infrastructure/persistence/drizzle/client";
import { days } from "@server/infrastructure/persistence/drizzle/schema";
import type { Day } from "../../../domain/day/Day";
import type { DayDate } from "../../../domain/day/DayDate";
import type { IDayRepository } from "../../../domain/day/IDayRepository";
import { DayMapper } from "./DayMapper";

/** Postgres-реалізація репозиторію діб. */
export class DrizzleDayRepository implements IDayRepository {
  constructor(private readonly db: Database) {}

  public async findByUserAndDate(userId: UniqueEntityID, date: DayDate): Promise<Day | null> {
    const rows = await this.db
      .select()
      .from(days)
      .where(and(eq(days.userId, userId.toString()), eq(days.date, date.value)))
      .limit(1);
    return rows[0] ? DayMapper.toDomain(rows[0]) : null;
  }

  public async save(day: Day): Promise<void> {
    const data = DayMapper.toPersistence(day);
    // Доба незмінна після створення — конфлікт просто ігноруємо.
    await this.db.insert(days).values(data).onConflictDoNothing();
  }
}
