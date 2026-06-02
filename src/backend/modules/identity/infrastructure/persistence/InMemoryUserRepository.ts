import type { UniqueEntityID } from "@backend/shared/kernel";
import type { IUserRepository } from "../../domain/IUserRepository";
import type { User } from "../../domain/User";
import type { Email } from "../../domain/Email";

/**
 * In-memory реалізація порту IUserRepository. Дефолтний адаптер: дозволяє запускати
 * й тестувати систему без БД та будь-яких зовнішніх сервісів. Контейнер тримає
 * єдиний екземпляр на час життя процесу (dev).
 */
export class InMemoryUserRepository implements IUserRepository {
  private readonly store = new Map<string, User>();

  public async findById(id: UniqueEntityID): Promise<User | null> {
    return this.store.get(id.toString()) ?? null;
  }

  public async findByEmail(email: Email): Promise<User | null> {
    for (const user of this.store.values()) {
      if (user.email.equals(email)) return user;
    }
    return null;
  }

  public async exists(email: Email): Promise<boolean> {
    return (await this.findByEmail(email)) !== null;
  }

  public async save(user: User): Promise<void> {
    this.store.set(user.id.toString(), user);
  }
}
