import type { ICacheStore } from "@backend/shared/ports/ICacheStore";

interface Slot {
  value: unknown;
  expiresAt: number | null;
}

/** In-memory реалізація кешу (дефолт без Redis). TTL відстежується вручну. */
export class InMemoryCacheStore implements ICacheStore {
  private readonly store = new Map<string, Slot>();

  public async get<T>(key: string): Promise<T | null> {
    const slot = this.store.get(key);
    if (!slot) return null;
    if (slot.expiresAt !== null && slot.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return slot.value as T;
  }

  public async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
  }

  public async incr(key: string): Promise<number> {
    const current = (await this.get<number>(key)) ?? 0;
    const next = current + 1;
    await this.set(key, next);
    return next;
  }
}
