import { and, desc, eq } from "drizzle-orm";
import type { UniqueEntityID } from "@server/shared/kernel";
import type { Database } from "@server/infrastructure/persistence/drizzle/client";
import { journalEntries } from "@server/infrastructure/persistence/drizzle/schema";
import type { IJournalRepository } from "../../../domain/IJournalRepository";
import type { JournalEntry } from "../../../domain/JournalEntry";
import { JournalMapper } from "./JournalMapper";

/** Postgres-реалізація. save = upsert по (user_id, date). */
export class DrizzleJournalRepository implements IJournalRepository {
  constructor(private readonly db: Database) {}

  public async findByDate(userId: UniqueEntityID, date: string): Promise<JournalEntry | null> {
    const rows = await this.db
      .select()
      .from(journalEntries)
      .where(and(eq(journalEntries.userId, userId.toString()), eq(journalEntries.date, date)))
      .limit(1);
    return rows[0] ? JournalMapper.toDomain(rows[0]) : null;
  }

  public async listByUser(userId: UniqueEntityID, limit?: number): Promise<JournalEntry[]> {
    const query = this.db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId.toString()))
      .orderBy(desc(journalEntries.date));
    const rows = await (typeof limit === "number" ? query.limit(limit) : query);
    return rows.map(JournalMapper.toDomain);
  }

  public async save(entry: JournalEntry): Promise<void> {
    const data = JournalMapper.toPersistence(entry);
    await this.db
      .insert(journalEntries)
      .values(data)
      .onConflictDoUpdate({
        target: [journalEntries.userId, journalEntries.date],
        set: { content: data.content, updatedAt: data.updatedAt },
      });
  }
}
