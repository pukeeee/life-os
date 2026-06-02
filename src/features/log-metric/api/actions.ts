"use server";

import { revalidatePath } from "next/cache";
import { resolveSession } from "@shared/server/session";
import type { DailyOverviewVM } from "@entities/metric/model/types";

/**
 * Server Actions — ЄДИНА межа між фронтендом і бекендом. Викликають use cases
 * через спільний резолвер сесії й повертають лише прості серіалізовні обʼєкти.
 */

/** Знімок доби для екрана Today. */
export async function getTodayOverview(): Promise<DailyOverviewVM> {
  const { container, userId, today } = await resolveSession();

  const result = await container.useCases.getDailyOverview.execute({ userId, date: today });
  if (result.isFailure) {
    throw new Error(result.getError().message);
  }
  return result.getValue();
}

export interface LogMetricInput {
  metricId: string;
  number?: number | null;
  boolean?: boolean | null;
  text?: string | null;
  note?: string | null;
}

export interface LogMetricResult {
  ok: boolean;
  error?: string;
}

/** Залогувати значення метрики за сьогодні. */
export async function logMetricAction(input: LogMetricInput): Promise<LogMetricResult> {
  const { container, userId, today } = await resolveSession();

  const result = await container.useCases.logEntry.execute({
    userId,
    metricId: input.metricId,
    date: today,
    number: input.number ?? null,
    boolean: input.boolean ?? null,
    text: input.text ?? null,
    note: input.note ?? null,
  });

  if (result.isFailure) {
    return { ok: false, error: result.getError().message };
  }

  revalidatePath("/today");
  return { ok: true };
}
