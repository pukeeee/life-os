import { and, eq, gte, lte } from "drizzle-orm";
import type { UniqueEntityID } from "@server/shared/kernel";
import type { Database } from "@server/infrastructure/persistence/drizzle/client";
import { entries } from "@server/infrastructure/persistence/drizzle/schema";
import type { Entry } from "../../../domain/entry/Entry";
import type { IEntryRepository } from "../../../domain/entry/IEntryRepository";
import type { DayDate } from "../../../domain/day/DayDate";
import { EntryMapper } from "./EntryMapper";

/** Postgres-реалізація репозиторію записів (save = upsert по id). */
export class DrizzleEntryRepository implements IEntryRepository {
  constructor(private readonly db: Database) {}

  public async findById(id: UniqueEntityID): Promise<Entry | null> {
    const rows = await this.db.select().from(entries).where(eq(entries.id, id.toString())).limit(1);
    return rows[0] ? EntryMapper.toDomain(rows[0]) : null;
  }

  public async findByMetricAndDay(
    metricId: UniqueEntityID,
    dayId: UniqueEntityID,
  ): Promise<Entry | null> {
    const rows = await this.db
      .select()
      .from(entries)
      .where(and(eq(entries.metricId, metricId.toString()), eq(entries.dayId, dayId.toString())))
      .limit(1);
    return rows[0] ? EntryMapper.toDomain(rows[0]) : null;
  }

  public async listByUserAndDay(
    userId: UniqueEntityID,
    dayId: UniqueEntityID,
  ): Promise<Entry[]> {
    const rows = await this.db
      .select()
      .from(entries)
      .where(and(eq(entries.userId, userId.toString()), eq(entries.dayId, dayId.toString())));
    return rows.map(EntryMapper.toDomain);
  }

  public async listByMetric(metricId: UniqueEntityID): Promise<Entry[]> {
    const rows = await this.db
      .select()
      .from(entries)
      .where(eq(entries.metricId, metricId.toString()));
    return rows.map(EntryMapper.toDomain);
  }

  public async listByUserInRange(
    userId: UniqueEntityID,
    from: DayDate,
    to: DayDate,
  ): Promise<Entry[]> {
    const rows = await this.db
      .select()
      .from(entries)
      .where(
        and(
          eq(entries.userId, userId.toString()),
          gte(entries.date, from.value),
          lte(entries.date, to.value),
        ),
      );
    return rows.map(EntryMapper.toDomain);
  }

  public async save(entry: Entry): Promise<void> {
    const data = EntryMapper.toPersistence(entry);
    await this.db
      .insert(entries)
      .values(data)
      .onConflictDoUpdate({
        target: entries.id,
        set: {
          valueKind: data.valueKind,
          valueNumeric: data.valueNumeric,
          valueText: data.valueText,
          note: data.note,
          occurredAt: data.occurredAt,
        },
      });
  }
}
