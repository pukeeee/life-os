import type {
  CurrentUserContext,
  ICurrentUserProvider,
} from "../../application/ports/ICurrentUserProvider";

export interface DevUserConfig {
  email: string;
  displayName?: string | null;
  timezone?: string;
}

/**
 * Тимчасова заглушка автентифікації (замість Clerk на час розробки каркасу).
 * Повертає фіксованого користувача з конфігу (env). Коли підключатимемо Clerk —
 * створимо ClerkCurrentUserProvider з тим самим інтерфейсом і замінимо в контейнері.
 */
export class DevCurrentUserProvider implements ICurrentUserProvider {
  constructor(private readonly config: DevUserConfig) {}

  public async getContext(): Promise<CurrentUserContext> {
    return {
      email: this.config.email,
      displayName: this.config.displayName ?? null,
      timezone: this.config.timezone,
    };
  }
}
