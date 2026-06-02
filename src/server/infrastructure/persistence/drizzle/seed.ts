import { getContainer } from "@server/container";

/**
 * Скрипт сидингу: створює dev-користувача та стартові метрики.
 * Запуск: `npm run db:seed` (потрібен PERSISTENCE=postgres і піднятий Postgres).
 */
async function main(): Promise<void> {
  const { useCases, env } = getContainer();
  if (env.PERSISTENCE !== "postgres") {
    console.warn("[seed] PERSISTENCE != postgres — сидинг у памʼяті не зберігається.");
  }

  const userResult = await useCases.ensureCurrentUser.execute();
  if (userResult.isFailure) throw new Error(userResult.getError().message);
  const user = userResult.getValue();

  const seedResult = await useCases.seedStarterMetrics.execute({ userId: user.id.toString() });
  if (seedResult.isFailure) throw new Error(seedResult.getError().message);

  console.log(
    `[seed] користувач ${user.email.value}; створено метрик: ${seedResult.getValue().created}`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed] помилка:", err);
    process.exit(1);
  });
