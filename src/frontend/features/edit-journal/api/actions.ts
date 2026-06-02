"use server";

import { revalidatePath } from "next/cache";
import { resolveSession } from "@shared/server/session";
import type { JournalEntryVM } from "@entities/journal";

/** Запис журналу за сьогодні (або null, якщо немає). */
export async function getTodayJournal(): Promise<JournalEntryVM | null> {
  const { container, userId, today } = await resolveSession();
  const result = await container.useCases.getJournalEntry.execute({ userId, date: today });
  if (result.isFailure) throw new Error(result.getError().message);
  return result.getValue();
}

/** Останні записи журналу (за датою спадно). */
export async function listJournal(limit?: number): Promise<JournalEntryVM[]> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.listJournal.execute({ userId, limit });
  if (result.isFailure) throw new Error(result.getError().message);
  return result.getValue();
}

export interface UpsertJournalInput {
  date: string;
  content: string;
}

export interface JournalActionResult {
  ok: boolean;
  error?: string;
  entry?: JournalEntryVM;
}

/** Створити/оновити запис журналу за датою. */
export async function upsertJournalAction(input: UpsertJournalInput): Promise<JournalActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.upsertJournalEntry.execute({
    userId,
    date: input.date,
    content: input.content,
  });
  if (result.isFailure) return { ok: false, error: result.getError().message };

  revalidatePath("/journal");
  revalidatePath("/today");
  return { ok: true, entry: result.getValue() };
}
