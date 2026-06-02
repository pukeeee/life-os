import type Redis from "ioredis";
import type { ICacheStore } from "@backend/shared/ports/ICacheStore";

/** Redis-реалізація кешу. Значення серіалізуються в JSON; incr — нативний INCR. */
export class RedisCacheStore implements ICacheStore {
  constructor(private readonly redis: Redis) {}

  public async get<T>(key: string): Promise<T | null> {
    const raw = await this.redis.get(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  }

  public async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.set(key, payload, "EX", ttlSeconds);
    } else {
      await this.redis.set(key, payload);
    }
  }

  public async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }
}
