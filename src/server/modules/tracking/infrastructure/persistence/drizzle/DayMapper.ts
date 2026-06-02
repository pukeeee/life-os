import { UniqueEntityID } from "@server/shared/kernel";
import type { DayRow } from "@server/infrastructure/persistence/drizzle/schema";
import { days } from "@server/infrastructure/persistence/drizzle/schema";
import { Day } from "../../../domain/day/Day";
import { DayDate } from "../../../domain/day/DayDate";

type DayInsert = typeof days.$inferInsert;

/** Мапер Day ↔ рядок БД. */
export class DayMapper {
  public static toDomain(row: DayRow): Day {
    const date = DayDate.create(row.date).getValue();
    return Day.create(
      { userId: new UniqueEntityID(row.userId), date, createdAt: row.createdAt },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(day: Day): DayInsert {
    return {
      id: day.id.toString(),
      userId: day.userId.toString(),
      date: day.date.value,
      createdAt: day.createdAt,
    };
  }
}
