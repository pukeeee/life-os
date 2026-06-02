import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@backend/shared/kernel";
import {
  InMemoryJournalRepository,
  UpsertJournalEntry,
  GetJournalEntry,
  ListJournal,
} from "@backend/modules/journal";

describe("Journal (use cases)", () => {
  const userId = new UniqueEntityID().toString();
  const date = "2026-06-02";

  let repo: InMemoryJournalRepository;
  let upsert: UpsertJournalEntry;
  let get: GetJournalEntry;
  let list: ListJournal;

  beforeEach(() => {
    repo = new InMemoryJournalRepository();
    upsert = new UpsertJournalEntry(repo);
    get = new GetJournalEntry(repo);
    list = new ListJournal(repo);
  });

  it("створює запис, get повертає його", async () => {
    const res = await upsert.execute({ userId, date, content: "Перший день" });
    expect(res.isSuccess).toBe(true);

    const found = (await get.execute({ userId, date })).getValue();
    expect(found).not.toBeNull();
    expect(found!.content).toBe("Перший день");
    expect(found!.date).toBe(date);
  });

  it("повторний upsert оновлює content, дата та entryId зберігаються", async () => {
    const first = (await upsert.execute({ userId, date, content: "v1" })).getValue();
    const second = (await upsert.execute({ userId, date, content: "v2" })).getValue();

    expect(second.entryId).toBe(first.entryId);
    expect(second.content).toBe("v2");

    const found = (await get.execute({ userId, date })).getValue();
    expect(found!.content).toBe("v2");
  });

  it("get повертає null, якщо запису на дату немає", async () => {
    const found = (await get.execute({ userId, date: "2030-01-01" })).getValue();
    expect(found).toBeNull();
  });

  it("list повертає записи спадно за датою з обмеженням", async () => {
    await upsert.execute({ userId, date: "2026-06-01", content: "A" });
    await upsert.execute({ userId, date: "2026-06-03", content: "C" });
    await upsert.execute({ userId, date: "2026-06-02", content: "B" });

    const all = (await list.execute({ userId })).getValue();
    expect(all.map((e) => e.date)).toEqual(["2026-06-03", "2026-06-02", "2026-06-01"]);

    const limited = (await list.execute({ userId, limit: 2 })).getValue();
    expect(limited).toHaveLength(2);
    expect(limited[0].date).toBe("2026-06-03");
  });

  it("відхиляє неправильний формат дати", async () => {
    const res = await upsert.execute({ userId, date: "2026/06/02", content: "x" });
    expect(res.isFailure).toBe(true);
  });
});
