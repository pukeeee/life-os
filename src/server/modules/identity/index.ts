/**
 * Публічний API bounded context-у Identity.
 * Інші контексти/композиційний корінь імпортують лише звідси.
 */

// Domain
export { User } from "./domain/User";
export { Email } from "./domain/Email";
export { Timezone } from "./domain/Timezone";
export type { IUserRepository } from "./domain/IUserRepository";
export { UserRegistered } from "./domain/events/UserRegistered";

// Application
export { EnsureCurrentUser } from "./application/use-cases/ensure-current-user/EnsureCurrentUser";
export type {
  ICurrentUserProvider,
  CurrentUserContext,
} from "./application/ports/ICurrentUserProvider";

// Infrastructure (адаптери для composition root)
export { InMemoryUserRepository } from "./infrastructure/persistence/InMemoryUserRepository";
export { DrizzleUserRepository } from "./infrastructure/persistence/drizzle/DrizzleUserRepository";
export { DevCurrentUserProvider } from "./infrastructure/identity/DevCurrentUserProvider";
export type { DevUserConfig } from "./infrastructure/identity/DevCurrentUserProvider";
