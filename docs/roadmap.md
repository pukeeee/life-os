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
- **Tasks**: `Task` (+`Priority`); CreateTask, ListTasks, SetTaskCompletion.
- Екрани: `/today` (quick-log метрик доби), `/tasks`, `/trackers` (CRUD метрик+категорії,
  архів), `/insights` (кореляції + тренди-спарклайни). Навігація — `widgets/app-shell`.

**Якість**: typecheck ✓ · 33 unit-тести (Vitest) ✓ · lint ✓ · `next build` ✓ ·
7 таблиць, міграції `drizzle/0000..0002`.

**Команди**: `npm run dev | test | typecheck | lint | build | db:generate | db:migrate | db:seed`

---

## 🟡 Що залишилось (за пріоритетом)

### 1. Збагатити екран Today — «один екран, весь день» (S–M)
Зараз `/today` показує лише метрики. Додати на нього секції:
- **Задачі на сьогодні** (overdue + due today) — нова дія в `tasks` (напр.
  `ListTodayTasks({userId,date})`) або фільтр на клієнті; віджет на Today.
- **Настрій** — це вже метрика (`scale`), просто винести акцентом.
- **Журнал дня** — після реалізації контексту Journal (п.2).
- Прогрес-хедер: виконано задач/метрик.
- Патерн: новий `widget` + composition у `views/today`, дані через існуючі/нові server actions.

### 2. Контекст **Journal / Notes** (M) — «другий мозок»
- Домен: агрегат `JournalEntry` (userId, `date` або вільна нотатка, content Markdown,
  createdAt/updatedAt). Окремо `Note` + `note_links` (backlinks) — можна почати з
  щоденного запису (один на добу), backlinks — пост-MVP.
- Порт `IJournalRepository` + InMemory/Drizzle + таблиця `journal_entries`
  (UNIQUE (user_id, date) для one-per-day).
- Use cases: `UpsertJournalEntry`, `GetJournalEntry({userId,date})`, `ListJournal`.
- FSD: `entities/journal`, `features/edit-journal` (Markdown textarea + autosave),
  `widgets`, `views/journal` + маршрут `/journal` + пункт навігації.
- Інтеграція: показати/редагувати запис дня на Today.

### 3. Контекст **Goals** + Grid of Life (M–L)
- Домен: `Goal` з ієрархією (`parentId`, `level`: life/year/quarter/month/week),
  `targetDate`, прогрес (derived або ручний), лінки на метрики/задачі.
- Порт `IGoalRepository` + адаптери + таблиця `goals`.
- Use cases: CreateGoal, ListGoals (дерево), UpdateGoalProgress, LinkMetric/LinkTask.
- FSD: `views/goals` (segment Рік/Місяць/Тиждень), прогрес-бари, зв'язки.
- **Grid of Life**: окремий віджет (сітка тижнів життя) — потребує дату народження в
  профілі (додати `birthDate` у `User`/preferences).

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
