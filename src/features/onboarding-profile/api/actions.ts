"use server";

import { revalidatePath } from "next/cache";
import { resolveSession } from "@shared/server/session";

export interface OnboardingState {
  birthDate: string | null;
}

/** Стан онбордингу профілю — наразі лише birthDate. */
export async function getOnboardingState(): Promise<OnboardingState> {
  const { container, userId } = await resolveSession();
  const userResult = await container.useCases.ensureCurrentUser.execute();
  if (userResult.isFailure) throw new Error(userResult.getError().message);
  const user = userResult.getValue();
  if (user.id.toString() !== userId) throw new Error("session/user mismatch");
  return { birthDate: user.birthDate };
}

export interface BirthDateActionResult {
  ok: boolean;
  error?: string;
}

/** Зберегти дату народження. */
export async function saveBirthDateAction(birthDate: string): Promise<BirthDateActionResult> {
  const { container, userId } = await resolveSession();
  const result = await container.useCases.setUserBirthDate.execute({ userId, birthDate });
  if (result.isFailure) return { ok: false, error: result.getError().message };
  revalidatePath("/onboarding");
  revalidatePath("/goals");
  revalidatePath("/today");
  return { ok: true };
}
