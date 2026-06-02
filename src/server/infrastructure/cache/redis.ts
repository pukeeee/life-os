import Redis from "ioredis";

let cached: { url: string; client: Redis } | null = null;

/**
 * Лінива singleton-фабрика Redis. Поки не використовується активно (кеш/черги/
 * pub-sub зʼявляться у фазах аналітики та каналів), але інфраструктура закладена.
 * `lazyConnect` — щоб відсутній Redis не блокував старт у memory-режимі.
 */
export function getRedis(redisUrl: string): Redis {
  if (cached && cached.url === redisUrl) return cached.client;

  const client = new Redis(redisUrl, { lazyConnect: true, maxRetriesPerRequest: 2 });
  cached = { url: redisUrl, client };
  return client;
}
