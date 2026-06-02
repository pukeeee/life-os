# Life OS — Архітектура каркаса

Документ описує реалізований фундамент. Продуктове бачення — у `blueprint.md`.

## Принципи

- **Clean Architecture** (бекенд) + **Feature-Sliced Design** (фронтенд).
- **DDD** (тактичні патерни) + **доменні події** (event-driven сайд-ефекти).
- **SOLID / Dependency Inversion**: домен не знає про БД, HTTP, фреймворки.
- **Незалежність від зовнішніх сервісів**: Clerk/Supabase ще не підключені; усе за
  портами. Дефолтний режим — `memory` (працює без БД та інтернету).
- **Портативність БД**: увесь доступ через Drizzle; перехід Supabase → self-hosted
  Postgres = зміна `DATABASE_URL` + `db:migrate`.

## Карта `src/`

```
src/
  server/                         БЕКЕНД (Clean Architecture + DDD)
    shared/kernel/                Result, Guard, Entity, AggregateRoot, ValueObject,
                                  UniqueEntityID, DomainEvents (будівельні блоки)
    modules/
      identity/                   контекст «користувач»
        domain/ application/ infrastructure/
      tracking/                   універсальний движок метрик (+стріки)
        domain/ application/ infrastructure/
      analytics/                  двигун інсайтів (тренди + кореляції)
        domain/ application/
      tasks/                      задачі (action layer)
        domain/ application/ infrastructure/
    shared/
      kernel/                     будівельні блоки DDD
      ports/ICacheStore.ts        порт кешу (cross-cutting)
    infrastructure/
      config/env.ts               типобезпечний env (zod)
      persistence/drizzle/        schema (table-и), client, seed
      cache/                      redis client + InMemory/Redis CacheStore
    container/                    Composition Root (memory|postgres за env)

  shared/ entities/ features/ widgets/ views/ app/   ФРОНТЕНД (FSD)
```

Маршрути Next лишаються в кореневому `app/` і лише імпортують `views`.

## Напрямок залежностей

- Бекенд: `infrastructure → application → domain` (всередину). Composition root
  зв'язує абстракції з реалізаціями.
- Фронтенд (FSD): `app → views → widgets → features → entities → shared` (вниз).
- Межа фронтенд↔бекенд — **Server Actions** у `features/*/api`, що викликають
  `getContainer()` і повертають прості DTO.

## Доменне ядро (DDD)

- **Aggregate Roots**: `User`, `MetricDefinition`, `Entry`, `Day`.
- **Value Objects**: `Email`, `Timezone`, `MetricKind`, `Cadence`,
  `AggregationMethod`, `MetricTarget`, `EntryValue`, `DayDate`.
- **Domain Events**: `UserRegistered`, `MetricLogged` — публікуються репозиторієм
  ПІСЛЯ збереження через `DomainEvents.dispatchEventsForAggregate(...)`.
- Помилки моделюються через `Result`, а не винятками (крім `UnexpectedError`).

### Універсальність движка
`MetricDefinition.kind ∈ {boolean, count, number, scale, duration, rating, choice,
text}`. Звичка = `boolean`, настрій = `scale 1–5`, вода = `count` тощо. Метод
`MetricDefinition.interpret(raw)` перетворює сире введення на `EntryValue` згідно
з типом (валідація діапазону шкали, належності до опцій, цілочисельності…).

## Реалізовані use cases

- `identity`: `EnsureCurrentUser` (резолвить/створює користувача з dev-контексту).
- `tracking`: `DefineMetric`, `LogEntry` (upsert + події), `GetDailyOverview`
  (read-модель), `SeedStarterMetrics` (ідемпотентний онбординг), `CreateCategory`,
  `ListMetrics` (read-модель Trackers), `ArchiveMetric` (toggle, no-destruction),
  `RecalculateStreak`.

## Event-Driven: стріки

Подія `MetricLogged` (публікується після `LogEntry`) має підписника в Composition
Root, який викликає `RecalculateStreak`. Так домен логування не знає про аналітику.
`StreakCalculator` — чистий доменний сервіс (longest + трейлінгова серія) над
успішними датами; «успіх» визначає сама метрика (`MetricDefinition.isSuccess`:
boolean=1 / ціль досягнута / будь-який запис). Стрік кешується в `MetricStreak`
(таблиця `streaks`) і показується як 🔥 на Today та Trackers.

> `Entry` зберігає денормалізовану `date` (DayDate) — фундамент стріків, а далі
> трендів і кореляцій без join-ів.

## Insights (контекст `analytics`)

Окремий read-side контекст, що споживає read-порти `tracking`
(`IMetricDefinitionRepository`, `IEntryRepository.listByUserInRange`).
- Чиста математика: `MovingAverage` (SMA/EMA), `Correlation` (Пірсон) — з тестами.
- Use cases: `GetMetricTrends` (денні ряди + SMA-7), `GetCorrelations` (попарні
  кореляції числових метрик).
- **Кеш**: `GetCorrelations` кешує результат через порт `ICacheStore`
  (`InMemoryCacheStore` у dev, `RedisCacheStore` у self-hosted). Інвалідація —
  версійним лічильником: підписник `MetricLogged` робить `cache.incr(ver:userId)`,
  тож новий лог автоматично знецінює кеш. Екран `/insights` показує кореляційні
  картки + спарклайни трендів.

## Екрани (FSD views + маршрути Next)

- `/today` — `views/today` → віджет `daily-overview` (quick-log метрик доби).
- `/trackers` — `views/trackers` → фіча `manage-trackers` (форма створення під усі
  типи) + віджет `tracker-list` (групування за категоріями, архів).
- `/tasks` — `views/tasks` → фіча `manage-tasks` (швидке додавання + чекбокс) +
  віджет `task-list` (активні/виконані).
- `/insights` — `views/insights` → фіча `view-insights` + віджет `insights`
  (кореляційні картки + спарклайни трендів).
- Каркас `widgets/app-shell` (навігація) загорнутий у кореневий `app/layout.tsx`.

## Контекст `tasks`
Автономний action-layer: агрегат `Task` (+ `Priority` VO), use cases `CreateTask`,
`ListTasks`, `SetTaskCompletion`. Незалежний від Tracking (дедлайн — валідований
рядок-дата). Таблиця `tasks`.

## Запуск

```bash
npm run dev          # memory-режим, без БД; http://localhost:3000 → /today
npm test             # доменні + прикладні тести (Vitest)
npm run typecheck    # tsc --noEmit
npm run lint
npm run build
```

### Перемикання на Postgres
```bash
docker compose up -d            # postgres + redis
# .env: PERSISTENCE=postgres
npm run db:migrate              # накатити згенеровані міграції (drizzle/)
npm run db:seed                 # (опц.) dev-користувач + стартові метрики
npm run dev
```

## Замінність зовнішніх сервісів (за портами)

| Порт (інтерфейс) | Зараз (dev) | Майбутнє |
|---|---|---|
| `ICurrentUserProvider` | `DevCurrentUserProvider` (env) | `ClerkCurrentUserProvider` |
| `IUserRepository` / `I*Repository` | `InMemory*` | `Drizzle*` (вже є) |
| `DomainEvents` (sync) | in-memory dispatch | черга (Redis/Bull) |

Підключення Clerk = новий адаптер `ICurrentUserProvider` + рядок у Composition Root.
Домен і застосунок не змінюються.

## Наступні кроки (за blueprint)

Категорії/CRUD метрик у UI · задачі · журнал · стріки та кореляції (обробники
`MetricLogged`) · weekly review через Resend · Telegram ingestion · self-host swap.
