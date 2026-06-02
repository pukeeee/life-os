import { UniqueEntityID } from "@server/shared/kernel";
import type { EntryRow } from "@server/infrastructure/persistence/drizzle/schema";
import { entries } from "@server/infrastructure/persistence/drizzle/schema";
import { Entry, type EntrySource } from "../../../domain/entry/Entry";
import { EntryValue } from "../../../domain/entry/EntryValue";
import { DayDate } from "../../../domain/day/DayDate";
import type { MetricKindValue } from "../../../domain/metric/MetricKind";

type EntryInsert = typeof entries.$inferInsert;

/** Мапер Entry ↔ рядок БД. */
export class EntryMapper {
  public static toDomain(row: EntryRow): Entry {
    const value = EntryValue.hydrate({
      kind: row.valueKind as MetricKindValue,
      numeric: row.valueNumeric,
      text: row.valueText,
    });
    return Entry.create(
      {
        userId: new UniqueEntityID(row.userId),
        metricId: new UniqueEntityID(row.metricId),
        dayId: new UniqueEntityID(row.dayId),
        date: DayDate.create(row.date).getValue(),
        value,
        note: row.note,
        source: row.source as EntrySource,
        occurredAt: row.occurredAt,
        createdAt: row.createdAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(entry: Entry): EntryInsert {
    return {
      id: entry.id.toString(),
      userId: entry.userId.toString(),
      metricId: entry.metricId.toString(),
      dayId: entry.dayId.toString(),
      date: entry.date.value,
      valueKind: entry.value.kind,
      valueNumeric: entry.value.numeric,
      valueText: entry.value.text,
      note: entry.note,
      source: entry.source,
      occurredAt: entry.occurredAt,
      createdAt: entry.createdAt,
    };
  }
}
