# Life OS — Стан і план (handoff між сесіями)

> Для нової сесії: спершу прочитай `docs/architecture.md` (правила шарів/конвенції) і
> `docs/blueprint.md` (продуктове бачення). Цей файл — що вже зроблено й що далі.

---

## ✅ Що вже зроблено

**Стек / інфраструктура**
- Next.js 16.2.7 + React 19 + Tailwind v4 + shadcn (`radix-lyra`), іконки Phosphor, OKLCH-токени.
- `docker-compose.yml` (Postgres + Redis), Drizzle ORM + Drizzle Kit, Vitest, ESLint.
- **Дефолт `PERSISTENCE=memory`** — застосунок працює без БД та зовнішніх сервісів.
- **Clerk і Supabase ще НЕ підключені** (свідомо, за планом — у кінці).

**Архітектура** (детально в `docs/architecture.md`)
- Backend: Clean Architecture + DDD у `src/server/` (`shared/kernel`, bounded contexts
  `modules/{identity,tracking,analytics,tasks}`, `infrastructure/`, `container/`).
- Frontend: FSD у `src/{shared,entities,features,widgets,views}`; Next-роутинг у `app/`
  лише імпортує `views`. Межа FE↔BE — Server Actions у `features/*/api` з простими DTO.
- Ports & Adapters: кожен репозиторій має `InMemory*` і `Drizzle*` реалізації; вибір
  у Composition Root за `env`.
- EDD: подія `MetricLogged` → підписник перераховує стрік і інвалідує кеш інсайтів.

**Реалізовані домени та екрани**
- **Identity**: `User` (+`Email`,`Timezone`), `EnsureCurrentUser`, dev-заглушка auth за
  портом `ICurrentUserProvider`.
- **Tracking** (універсальний движок): `MetricDefinition` (8 типів: boolean/count/number/
  scale/duration/rating/choice/text), `Entry` (event store, з денормалізованою `date`),
  `Day`, `Category`, `MetricStreak`. Use cases: DefineMetric, LogEntry, GetDailyOverview,
  SeedStarterMetrics, CreateCategory, ListMetrics, ArchiveMetric, RecalculateStreak.
- **Analytics**: `MovingAverage` (SMA/EMA), `Correlation` (Пірсон); GetMetricTrends,
  GetCorrelations (Redis-кеш через `ICacheStore` з версійною інвалідацією).
- **Tasks**: `Task` (+`Priority`); CreateTask, ListTasks, **ListTodayTasks** (overdue + due today),
  SetTaskCompletion.
- **Journal**: `JournalEntry` (one-per-day, Markdown); UpsertJournalEntry, GetJournalEntry, ListJournal.
- **Goals**: `Goal` (+`GoalLevel` VO: life/year/quarter/month/week, ієрархія через `parentId`,
  `progress 0..1`, `targetDate`, архівація); CreateGoal, ListGoalsTree, UpdateGoalProgress, ArchiveGoal.
- **Identity (профіль)**: опціональне поле `birthDate` у `User`; use case `SetUserBirthDate`.
- Екрани: `/today` (дашборд доби — прогрес-хедер, mood hero, журнал дня, метрики, задачі),
  `/tasks`, `/journal` (Markdown-щоденник з autosave + історія), `/goals` (дерево цілей + Grid of Life
  + перемикач рівня), `/onboarding` (форма birthDate), `/trackers` (CRUD метрик+категорії, архів),
  `/insights` (кореляції + тренди-спарклайни). Навігація — `widgets/app-shell`.

**Якість**: typecheck ✓ · 46 unit-тестів (Vitest) ✓ · lint ✓ · `next build` ✓ ·
9 таблиць, міграції `drizzle/0000..0004`.

**Команди**: `npm run dev | test | typecheck | lint | build | db:generate | db:migrate | db:seed`

---

## 🟡 Що залишилось (за пріоритетом)

### ✅ ~~1. Збагатити екран Today~~ — зроблено
Дашборд доби: прогрес-хедер метрик, mood hero (виносить «Настрій» окремо),
журнал дня (інлайн редактор), список метрик, задачі на сьогодні з badge
«Прострочено». Backend: новий use case `ListTodayTasks` (overdue + due today).
Журнальна секція додалась на Today після реалізації п.2.

### ✅ ~~2. Контекст Journal / Notes~~ — зроблено
- Агрегат `JournalEntry` (userId, date, content Markdown, createdAt/updatedAt);
  one-per-day гарантується унікальним індексом `(user_id, date)` в `journal_entries`
  (міграція `drizzle/0003`).
- Use cases: `UpsertJournalEntry`, `GetJournalEntry`, `ListJournal`; обидва адаптери
  (InMemory + Drizzle).
- Frontend: `react-markdown` + `remark-gfm`; `features/edit-journal` (editor з
  debounced autosave 1.5s через `useTransition` + перемикач Edit/Preview),
  `widgets/today-journal`, `widgets/journal-list`, `views/journal` + маршрут
  `/journal` + пункт меню.
- Інтеграція: запис дня редагується інлайн на `/today` між mood hero і трекерами.
- Backlinks / окремі вільні нотатки — поза MVP, повернемось пізніше.

### ✅ ~~3. Контекст Goals + Grid of Life~~ — зроблено
- Агрегат `Goal` з `GoalLevel` VO (life/year/quarter/month/week), ієрархія через `parentId`,
  `progress 0..1`, `targetDate`, архівація; обидва адаптери репозиторію (InMemory + Drizzle).
- Use cases: `CreateGoal`, `ListGoalsTree` (плоский query → дерево в application), `UpdateGoalProgress`,
  `ArchiveGoal`. `LinkMetric/LinkTask` — свідомо поза MVP (пост-MVP, коли стане потреба).
- Identity: опціональне поле `User.birthDate` (YYYY-MM-DD) + use case `SetUserBirthDate`;
  міграція додає колонку `users.birth_date`.
- FSD: `entities/goal`, `features/manage-goals` (CRUD + повзунок прогресу + архівація),
  `features/onboarding-profile`, `widgets/goals-tree` (рекурсивне дерево), `widgets/grid-of-life`
  (CSS-grid 52 × 90 років), `widgets/level-segment` (перемикач через `?level=`),
  `views/goals`, `views/onboarding`, маршрути `/goals` і `/onboarding`, пункт «Цілі» в Nav.
- Онбординг: окрема сторінка `/onboarding` — якщо `birthDate` уже задана, редирект на `/today`;
  інакше форма-дата → редирект.

### 4. Покращення **Insights** (S–M)
- Перемикач періоду 7/30/90 (клієнтський компонент → викликає `getInsights(days)`),
  зараз зашито 30.
- Замінити SVG-спарклайни на **recharts** (LineChart з 3 лініями mood/energy/productivity).
- Аналітика день-тижня («найкраще в суботу»), heatmap звичок (GitHub-стиль).
- Нові use cases в `analytics` за тим самим патерном (читають `entries.date`).

### 5. **Clerk** (фінальний крок авторизації) (M)
- Встановити `@clerk/nextjs`, `ClerkProvider` у `app/layout.tsx`, middleware.
- Створити `ClerkCurrentUserProvider implements ICurrentUserProvider` в
  `modules/identity/infrastructure/identity/` і замінити `DevCurrentUserProvider` у
  Composition Root (домен/застосунок НЕ міняються).
- Webhook `user.created/updated/deleted` → синк у `users` через Drizzle (skill: clerk-webhooks).
- Прибрати dev-env поля користувача.

### 6. Перехід на **Postgres** (S) — перевірка портативності (Phase 6)
- `docker compose up -d` → `.env: PERSISTENCE=postgres` → `npm run db:migrate` →
  `npm run db:seed` → `npm run dev`. Переконатися, що все працює без змін коду.

### 7. **Resend** + сповіщення (M)
- Тижневий review-дайджест (cron/route) і нагадування. Порт `IEmailSender` +
  `ResendEmailSender`. Можна підписати на доменні події (напр. тижневий агрегат).

### 8. **Settings** + експорт/імпорт (S–M)
- Екран `/settings`: керування категоріями, тема (light/dark toggle), таймзона,
  експорт даних (CSV/JSON), видалення акаунта.

### 9. Майбутнє (L, не терміново)
- **Telegram-бот**: ingestion API (`source='telegram'` вже в `Entry`).
- **PWA/offline**: Service Worker + IndexedDB sync queue.
- Темна тема toggle, мобільні жести (swipe), графіки кореляцій (scatter).

---

## ⚠️ Важливі нагадування для нової сесії
- Перед кодом читати `node_modules/next/dist/docs/` (Next 16 breaking changes, `AGENTS.md`).
- Дотримуватись напрямку залежностей: домен не знає про БД/HTTP/фреймворки; помилки —
  через `Result`, не винятками; доменні події публікувати після `save`.
- Кожна нова сутність: domain (агрегат+VO+порт) → InMemory + Drizzle адаптери + схема →
  use cases → Composition Root → FSD (entities→features→widgets→views→route→nav) →
  unit-тест → `db:generate`.
- Кольори лише OKLCH; іконки Phosphor; Design System не переробляти без прохання власника.
- Після змін: `npm run typecheck && npm run test && npm run lint && npm run build`.
