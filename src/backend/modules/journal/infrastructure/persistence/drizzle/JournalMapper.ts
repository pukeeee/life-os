import { UniqueEntityID } from "@backend/shared/kernel";
import type { JournalEntryRow } from "@backend/infrastructure/persistence/drizzle/schema";
import { journalEntries } from "@backend/infrastructure/persistence/drizzle/schema";
import { JournalEntry } from "../../../domain/JournalEntry";

type JournalInsert = typeof journalEntries.$inferInsert;

/** Мапер JournalEntry ↔ рядок БД. */
export class JournalMapper {
  public static toDomain(row: JournalEntryRow): JournalEntry {
    return JournalEntry.create(
      {
        userId: new UniqueEntityID(row.userId),
        date: row.date,
        content: row.content,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
      new UniqueEntityID(row.id),
    ).getValue();
  }

  public static toPersistence(entry: JournalEntry): JournalInsert {
    return {
      id: entry.id.toString(),
      userId: entry.userId.toString(),
      date: entry.date,
      content: entry.content,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };
  }
}
