import type { UniqueEntityID } from "@server/shared/kernel";
import type { User } from "./User";
import type { Email } from "./Email";

/**
 * Порт репозиторію User (інтерфейс у домені — реалізації в infrastructure).
 * Use cases залежать ЛИШЕ від цього інтерфейсу → інверсія залежностей.
 */
export interface IUserRepository {
  findById(id: UniqueEntityID): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  exists(email: Email): Promise<boolean>;
  save(user: User): Promise<void>;
}
