import { DomainEvents } from "@server/shared/kernel";
import type { ICacheStore } from "@server/shared/ports/ICacheStore";
import { getEnv, type Env } from "@server/infrastructure/config/env";
import { getDatabase } from "@server/infrastructure/persistence/drizzle/client";
import { getRedis } from "@server/infrastructure/cache/redis";
import { InMemoryCacheStore } from "@server/infrastructure/cache/InMemoryCacheStore";
import { RedisCacheStore } from "@server/infrastructure/cache/RedisCacheStore";
import { GetMetricTrends, GetCorrelations } from "@server/modules/analytics";

import {
  EnsureCurrentUser,
  DevCurrentUserProvider,
  InMemoryUserRepository,
  DrizzleUserRepository,
  type IUserRepository,
} from "@server/modules/identity";

import {
  DefineMetric,
  LogEntry,
  GetDailyOverview,
  SeedStarterMetrics,
  CreateCategory,
  ListMetrics,
  ArchiveMetric,
  RecalculateStreak,
  MetricLogged,
  DayService,
  InMemoryMetricDefinitionRepository,
  InMemoryEntryRepository,
  InMemoryDayRepository,
  InMemoryCategoryRepository,
  InMemoryStreakRepository,
  DrizzleMetricDefinitionRepository,
  DrizzleEntryRepository,
  DrizzleDayRepository,
  DrizzleCategoryRepository,
  DrizzleStreakRepository,
  type IMetricDefinitionRepository,
  type IEntryRepository,
  type IDayRepository,
  type ICategoryRepository,
  type IStreakRepository,
} from "@server/modules/tracking";

import {
  CreateTask,
  ListTasks,
  SetTaskCompletion,
  InMemoryTaskRepository,
  DrizzleTaskRepository,
  type ITaskRepository,
} from "@server/modules/tasks";

/**
 * Публічний контракт зібраного застосунку: лише use cases + конфіг.
 * Зовнішні шари (Server Actions) працюють виключно через ці сценарії — і ніколи
 * напряму з репозиторіями чи доменом.
 */
export interface AppContainer {
  readonly env: Env;
  readonly useCases: {
    readonly ensureCurrentUser: EnsureCurrentUser;
    readonly defineMetric: DefineMetric;
    readonly logEntry: LogEntry;
    readonly getDailyOverview: GetDailyOverview;
    readonly seedStarterMetrics: SeedStarterMetrics;
    readonly createCategory: CreateCategory;
    readonly listMetrics: ListMetrics;
    readonly archiveMetric: ArchiveMetric;
    readonly recalculateStreak: RecalculateStreak;
    readonly getMetricTrends: GetMetricTrends;
    readonly getCorrelations: GetCorrelations;
    readonly createTask: CreateTask;
    readonly listTasks: ListTasks;
    readonly setTaskCompletion: SetTaskCompletion;
  };
}

/**
 * Composition Root — ЄДИНЕ місце, де абстракції зʼєднуються з реалізаціями.
 * Тут (і лише тут) приймається рішення memory vs postgres за конфігом.
 * Зміна сховища = зміна env, без правок у домені/застосунку.
 */
function build(): AppContainer {
  const env = getEnv();

  let users: IUserRepository;
  let metrics: IMetricDefinitionRepository;
  let entries: IEntryRepository;
  let days: IDayRepository;
  let categories: ICategoryRepository;
  let streaks: IStreakRepository;
  let taskRepo: ITaskRepository;

  if (env.PERSISTENCE === "postgres") {
    const db = getDatabase(env.DATABASE_URL as string);
    users = new DrizzleUserRepository(db);
    metrics = new DrizzleMetricDefinitionRepository(db);
    entries = new DrizzleEntryRepository(db);
    days = new DrizzleDayRepository(db);
    categories = new DrizzleCategoryRepository(db);
    streaks = new DrizzleStreakRepository(db);
    taskRepo = new DrizzleTaskRepository(db);
  } else {
    // Дефолт: усе в памʼяті — застосунок працює без БД та зовнішніх сервісів.
    users = new InMemoryUserRepository();
    metrics = new InMemoryMetricDefinitionRepository();
    entries = new InMemoryEntryRepository();
    days = new InMemoryDayRepository();
    categories = new InMemoryCategoryRepository();
    streaks = new InMemoryStreakRepository();
    taskRepo = new InMemoryTaskRepository();
  }

  // Кеш: Redis у self-hosted режимі, інакше in-memory.
  const cache: ICacheStore =
    env.PERSISTENCE === "postgres" && env.REDIS_URL
      ? new RedisCacheStore(getRedis(env.REDIS_URL))
      : new InMemoryCacheStore();

  const currentUserProvider = new DevCurrentUserProvider({
    email: env.DEV_USER_EMAIL,
    displayName: env.DEV_USER_NAME,
    timezone: env.DEV_USER_TIMEZONE,
  });

  const dayService = new DayService(days);
  const defineMetric = new DefineMetric(metrics);
  const recalculateStreak = new RecalculateStreak(metrics, entries, streaks);

  // EDD: при кожному залогованому значенні (1) перераховуємо стрік метрики,
  // (2) інвалідуємо кеш інсайтів користувача (bump версії). Домен трекінгу не
  // знає про ці сайд-ефекти — звʼязок лише через подію.
  DomainEvents.register((event) => {
    const entry = (event as MetricLogged).entry;
    void recalculateStreak.execute({ metricId: entry.metricId.toString() });
    void cache.incr(GetCorrelations.versionKey(entry.userId.toString()));
  }, MetricLogged.name);

  return {
    env,
    useCases: {
      ensureCurrentUser: new EnsureCurrentUser(users, currentUserProvider),
      defineMetric,
      logEntry: new LogEntry(metrics, entries, dayService),
      getDailyOverview: new GetDailyOverview(metrics, entries, days, streaks),
      seedStarterMetrics: new SeedStarterMetrics(metrics, defineMetric),
      createCategory: new CreateCategory(categories),
      listMetrics: new ListMetrics(metrics, categories, streaks),
      archiveMetric: new ArchiveMetric(metrics),
      recalculateStreak,
      getMetricTrends: new GetMetricTrends(metrics, entries),
      getCorrelations: new GetCorrelations(metrics, entries, cache),
      createTask: new CreateTask(taskRepo),
      listTasks: new ListTasks(taskRepo),
      setTaskCompletion: new SetTaskCompletion(taskRepo),
    },
  };
}

let instance: AppContainer | null = null;

/**
 * Singleton-доступ до контейнера. У memory-режимі це також забезпечує
 * збереження стану між запитами в межах процесу розробки.
 */
export function getContainer(): AppContainer {
  instance ??= build();
  return instance;
}
