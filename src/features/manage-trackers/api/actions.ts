"use server";

import { revalidatePath } from "next/cache";
import { resolveSession } from "@shared/server/session";
import type { MetricKindValue, TrackersVM } from "@entities/metric";

/** Знімок екрана Trackers (метрики + категорії користувача). */
export async function getTrackersData(): Promise<TrackersVM> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.listMetrics.execute({ userId });
  if (result.isFailure) throw new Error(result.getError().message);
  return result.getValue();
}

export interface CreateMetricInput {
  name: string;
  kind: MetricKindValue;
  categoryId?: string | null;
  icon?: string | null;
  color?: string | null;
  unit?: string | null;
  scaleMin?: number | null;
  scaleMax?: number | null;
  choiceOptions?: string[] | null;
  goalType?: string | null;
  targetValue?: number | null;
  cadenceType?: string | null;
  activeDays?: number[] | null;
}

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export async function createMetricAction(input: CreateMetricInput): Promise<ActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.defineMetric.execute({ userId, ...input });
  if (result.isFailure) return { ok: false, error: result.getError().message };

  // Нова метрика зʼявляється і на Today, і на Trackers.
  revalidatePath("/trackers");
  revalidatePath("/today");
  return { ok: true };
}

export async function createCategoryAction(input: {
  name: string;
  icon?: string | null;
  color?: string | null;
}): Promise<ActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.createCategory.execute({ userId, ...input });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/trackers");
  return { ok: true };
}

export async function archiveMetricAction(metricId: string, archived: boolean): Promise<ActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.archiveMetric.execute({ userId, metricId, archived });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/trackers");
  revalidatePath("/today");
  return { ok: true };
}
