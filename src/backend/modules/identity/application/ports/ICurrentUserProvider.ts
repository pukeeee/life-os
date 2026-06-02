/**
 * Контекст «поточного користувача», отриманий із запиту/сесії.
 * Абстрагує ДЖЕРЕЛО автентифікації: сьогодні — dev-заглушка з env,
 * завтра — Clerk/Auth.js. Доменні use cases про це джерело не знають.
 */
export interface CurrentUserContext {
  email: string;
  displayName?: string | null;
  timezone?: string;
}

/** Порт постачальника поточного користувача (реалізація — в infrastructure). */
export interface ICurrentUserProvider {
  getContext(): Promise<CurrentUserContext>;
}
