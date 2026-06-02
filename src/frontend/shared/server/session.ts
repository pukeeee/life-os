import { getContainer } from "@backend/container";
import { DayDate } from "@backend/modules/tracking";

/**
 * Серверний резолвер «сесії» для Server Actions: гарантує користувача (через
 * dev-провайдера; згодом — Clerk), виконує ідемпотентний онбординг і обчислює
 * «сьогодні» в таймзоні користувача. Єдине місце цієї логіки → без дублювання
 * між фічами.
 */
export async function resolveSession() {
  const container = getContainer();

  const userResult = await container.useCases.ensureCurrentUser.execute();
  if (userResult.isFailure) {
    throw new Error(userResult.getError().message);
  }
  const user = userResult.getValue();
  const userId = user.id.toString();

  await container.useCases.seedStarterMetrics.execute({ userId });

  const today = DayDate.fromInstant(new Date(), user.timezone.value).value;
  return { container, userId, today, timezone: user.timezone.value };
}
