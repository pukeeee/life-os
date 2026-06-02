"use server";

import { revalidatePath } from "next/cache";
import { resolveSession } from "@shared/server/session";
import type { TaskVM } from "@entities/task";

/** Перелік задач користувача. */
export async function getTasks(): Promise<TaskVM[]> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.listTasks.execute({ userId });
  if (result.isFailure) throw new Error(result.getError().message);
  return result.getValue();
}

export interface CreateTaskInput {
  title: string;
  dueDate?: string | null;
  priority?: string | null;
}

export interface TaskActionResult {
  ok: boolean;
  error?: string;
}

export async function createTaskAction(input: CreateTaskInput): Promise<TaskActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.createTask.execute({ userId, ...input });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/tasks");
  return { ok: true };
}

export async function toggleTaskAction(taskId: string, completed: boolean): Promise<TaskActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.setTaskCompletion.execute({ userId, taskId, completed });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/tasks");
  return { ok: true };
}
