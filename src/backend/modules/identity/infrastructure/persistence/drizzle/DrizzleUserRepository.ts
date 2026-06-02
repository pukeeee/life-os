import { eq } from "drizzle-orm";
import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Database } from "@backend/infrastructure/persistence/drizzle/client";
import { users } from "@backend/infrastructure/persistence/drizzle/schema";
import type { IUserRepository } from "../../../domain/IUserRepository";
import type { User } from "../../../domain/User";
import type { Email } from "../../../domain/Email";
import { UserMapper } from "./UserMapper";

/** Postgres-реалізація IUserRepository через Drizzle. */
export class DrizzleUserRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  public async findById(id: UniqueEntityID): Promise<User | null> {
    const rows = await this.db.select().from(users).where(eq(users.id, id.toString())).limit(1);
    return rows[0] ? UserMapper.toDomain(rows[0]) : null;
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const rows = await this.db.select().from(users).where(eq(users.email, email.value)).limit(1);
    return rows[0] ? UserMapper.toDomain(rows[0]) : null;
  }

  public async exists(email: Email): Promise<boolean> {
    return (await this.findByEmail(email)) !== null;
  }

  public async save(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);
    await this.db
      .insert(users)
      .values(data)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: data.email,
          displayName: data.displayName,
          timezone: data.timezone,
          updatedAt: new Date(),
        },
      });
  }
}
