/**
 * Узагальнений порт кешу (cross-cutting). Дозволяє кешувати дорогі обчислення
 * (напр. кореляції) і реалізувати інвалідацію через версійний лічильник (incr).
 * Реалізації: in-memory (dev) та Redis (self-hosted). Споживач не знає, яка саме.
 */
export interface ICacheStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  /** Атомарно інкрементує лічильник і повертає нове значення (для версій кешу). */
  incr(key: string): Promise<number>;
}
