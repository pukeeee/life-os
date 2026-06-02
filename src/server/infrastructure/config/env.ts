import { z } from "zod";

/**
 * Єдина типобезпечна точка доступу до змінних середовища. Валідуємо один раз і
 * кешуємо. Жодного `process.env` поза цим файлом — це спрощує заміну джерела
 * конфігурації та робить помилки конфігу явними на старті.
 */
const EnvSchema = z.object({
  PERSISTENCE: z.enum(["memory", "postgres"]).default("memory"),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  DEV_USER_EMAIL: z.string().min(1).default("dev@life-os.local"),
  DEV_USER_NAME: z.string().default("Dev User"),
  DEV_USER_TIMEZONE: z.string().default("UTC"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof EnvSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;

  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Невалідна конфігурація env:\n${z.prettifyError(parsed.error)}`);
  }

  const env = parsed.data;
  if (env.PERSISTENCE === "postgres" && !env.DATABASE_URL) {
    throw new Error("PERSISTENCE=postgres вимагає заданого DATABASE_URL.");
  }

  cached = env;
  return env;
}
