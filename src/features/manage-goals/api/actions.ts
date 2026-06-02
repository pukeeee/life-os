"use server";

import { revalidatePath } from "next/cache";
import { resolveSession } from "@shared/server/session";
import type { GoalLevelVM, GoalTreeVM } from "@entities/goal";

export async function getGoalsTree(level?: GoalLevelVM, includeArchived = false): Promise<GoalTreeVM[]> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.listGoalsTree.execute({ userId, level, includeArchived });
  if (result.isFailure) throw new Error(result.getError().message);
  return result.getValue() as GoalTreeVM[];
}

export interface CreateGoalInput {
  level: GoalLevelVM;
  title: string;
  parentId?: string | null;
  targetDate?: string | null;
}

export interface GoalActionResult {
  ok: boolean;
  error?: string;
}

export async function createGoalAction(input: CreateGoalInput): Promise<GoalActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.createGoal.execute({
    userId,
    level: input.level,
    title: input.title,
    parentId: input.parentId ?? null,
    targetDate: input.targetDate ?? null,
  });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/goals");
  return { ok: true };
}

export async function updateGoalProgressAction(goalId: string, progress: number): Promise<GoalActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.updateGoalProgress.execute({ userId, goalId, progress });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/goals");
  return { ok: true };
}

export async function archiveGoalAction(goalId: string, archived: boolean): Promise<GoalActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.archiveGoal.execute({ userId, goalId, archived });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/goals");
  return { ok: true };
}
