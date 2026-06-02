# Life OS — Product & Architecture Blueprint

> Головний документ продукту. Джерело істини для vision, моделі даних, архітектури та roadmap.
> Старі специфікації (`doc_v1`, `doc_v2`, `doc_v3`) перенесені в `docs/archive/` як референс.

---

## 0. Контекст і зафіксовані рішення

Life OS — self-hosted «операційна система життя»: єдине місце, де людина фіксує **будь-які показники** свого життя (ежедневник, блокнот, трекери задач/звичок, Notion-подібні шаблони, quantified self) і отримує об'єктивні інсайти через кореляції, а не віртуальні нагороди.

**Стан проєкту:** скафолджено власником — Next.js **16.2.7** (App Router, RSC), React **19.2.4**, Tailwind **v4**, shadcn **4.10** (style `radix-lyra`, baseColor neutral, `cssVariables`), іконки **Phosphor** (`@phosphor-icons/react`). `app/globals.css` уже на OKLCH (нейтральна база shadcn).

> ⚠️ `AGENTS.md`: Next.js 16 має breaking changes — **перед написанням коду читати `node_modules/next/dist/docs/`**.

**Стек:** Postgres (Supabase на старті, потім self-hosted docker) + Redis (docker) + Resend + Clerk + (майбутнє) Telegram-бот. Supabase Auth/RLS/Realtime/Storage **не використовуються**.

**Рішення:**
- **Модель даних — універсальний движок** (MetricDefinition + Event store). Habit і Mood — пресети метрики, не окремі таблиці.
- **Auth — Clerk.**
- **Доступ до БД — тільки Drizzle ORM** (+ Drizzle Kit міграції); портативно між Supabase і self-hosted Postgres через зміну `DATABASE_URL`. Жодних Supabase-specific викликів.
- **Авторизація — app-level scoping** по Clerk `userId` у кожному запиті. Postgres RLS — опційний майбутній bonus при self-host.
- **Design System не фіксуємо жорстко** — власник тюнитиме токени під час розробки; тримаємо OKLCH для консистентності.

---

## 1. Vision

Унікальна ніша = перетин чотирьох продуктів, яких поодинці недостатньо:
- **Nomie** — «трекай будь-що» (гнучкість метрик).
- **Exist.io / Bearable** — автоматичні кореляції між метриками («у дні з 8к+ кроків настрій вищий»).
- **Things 3** — теплий мінімалістичний дизайн, «один екран — весь день».
- **Notion Life OS** — цілісність життя (цілі, журнал, друга-пам'ять) без складності налаштування Notion.

**Принципи:** Clarity over Streaks (інсайти важливіші за серії), no guilt design (нейтральні кольори для пропусків, аналіз причин), calm tech + progressive disclosure, mobile-first / desktop-dense, self-hosted & portable (дані власника — у власній БД).

**Чим НЕ є:** не соцмережа, не гра з badge'ами, не AI-коуч у MVP, не заміна календаря.

---

## 2. Конкурентний аналіз

| Продукт | Сильне | Чого бракує (наша перевага) |
|---|---|---|
| Habitica / Streaks / Loop | прості серії, нагадування | бінарність, поверхнева статистика, без кореляцій |
| Daylio | швидкий настрій + теги | настрій ізольований від дій |
| TickTick / Todoist / Things 3 | задачі, дизайн | немає зв'язку execution → well-being, без аналітики |
| Notion / Coda | гнучкість | бар'єр входу, manual, важко на мобільному |
| **Exist.io / Bearable** | **автокореляції** | закриті, прив'язані до інтеграцій/wearables; ми — self-hosted + кастомні метрики |
| **Nomie** | **трекай будь-що** | слабка аналітика/цілі/задачі; ми додаємо кореляції + цілі + задачі |
| Obsidian / Logseq | backlinks, second brain | немає структурованого трекінгу/аналітики |

**Висновок:** ринок ($1.9B → $5.5B до 2033, CAGR ~14%) фрагментований; ~47% видаляють застосунки через складність, ~52% користуються кількома інструментами одночасно. Наш виграш — **гнучкість + кореляції + цілісність в одному self-hosted застосунку з гарним UX**.

---

## 3. Універсальна модель даних (ядро)

Замість зашитих Habit/Mood — **визначення метрики + події**. Приклади як конфігурація однієї сутності:
- Звичка = `boolean`-метрика з денною каденцією;
- Настрій = `scale 1–5`;
- Вага = `number`, unit `kg`, aggregation `last`;
- Вода = `count`, target 8;
- Читання = `duration`;
- Витрати = `number`, unit `$`, aggregation `sum`.

### Сутності (усі scoped по `user_id`)

- **`users`** — `id`, `clerk_user_id` (unique), `email`, `display_name`, `timezone`, `preferences` (jsonb: theme, week_start, default_view), `identity_statements` (jsonb — «якою людиною хочу стати»), soft-delete.
- **`categories`** — сфери життя (Health, Work, Mind, Finance, Relationships, Learning + кастомні): `name`, `icon`, `color`, `sort_order`.
- **`metric_definitions`** — **серце системи**: `category_id`, `name`, `description`, `icon`, `color`, `kind` enum(`boolean|count|number|scale|duration|rating|choice|text`), `unit`, `scale_min`/`scale_max`, `choice_options` (jsonb), `aggregation` enum(`sum|last|avg|max|min|count`), `goal_type` enum(`at_least|at_most|exactly|none`), `target_value`, `cadence` enum(`daily|weekly|monthly|custom`), `active_days` int[], `allow_partial` bool, `sort_order`, `archived_at`. Пресети («Habit», «Mood», «Water», «Weight», «Sleep») — шаблони, що створюють відповідний запис.
- **`entries`** (**event store**) — `metric_id`, `day_id`, `ts` (з timezone), `value_numeric`, `value_text`, `value_json`, `note`, `source` enum(`app|telegram|import|api`), `tags`. Каденція daily → один запис на день (upsert по `(metric_id, day_id)`); пост-MVP — кілька подій/день.
- **`days`** — контейнер доби `(user_id, date)` UNIQUE + кешовані агрегати (`metrics_total/completed`, `tasks_total/completed`, `overall_score`).
- **`streaks`** — кеш по метриці (`current`, `longest`, `last_completed_date`).
- **`tasks` / `projects` / `task_completions`** — action layer; `task` може лінкуватися на `goal` і на `metric` (виконання → лог метрики); конвертація задачі у звичку.
- **`goals`** — ієрархія `life→year→quarter→month→week`; лінки на метрики/задачі; прогрес derived; зв'язок з identity statements.
- **`notes` / `journal_entries`** — Markdown; `note_links` (backlinks між нотатками й до days/metrics/tasks) → second brain.
- **`tags`** + поліморфне тегування.
- **`correlations`** — кеш обчислених пар (`metric_a`, `metric_b`, `pearson_r`, `n`, `period`).
- *(майбутнє)* **`integrations` / `ingestion`** — джерела (Telegram, Apple Health, Google Fit), абстракція quick-log через зовнішні канали.

**Чому так:** одна модель покриває «будь-який показник», аналітика працює однаково над усіма числовими рядами, нові домени додаються як пресети без зміни схеми.

---

## 4. Технічна архітектура (self-hosted, портативна)

- **Frontend/Backend:** Next.js 16.2.7 (App Router, RSC, Server Actions для мутацій + optimistic UI), React 19, shadcn 4.10 (`radix-lyra`), Tailwind v4 (theme через OKLCH CSS-змінні в `app/globals.css`), іконки **Phosphor**. ⚠️ Перед кодом читати `node_modules/next/dist/docs/`.
- **Auth:** Clerk (`@clerk/nextjs`). Clerk `userId` — ключ власника. `users` синхронізується через **webhook** (`user.created/updated/deleted` → upsert у Postgres через Drizzle). У Clerk — лише identity, жодних даних трекінгу.
- **БД-доступ:** **Drizzle ORM** для 100% запитів (schema у TS, типобезпека), **Drizzle Kit** для міграцій. `DATABASE_URL` → Supabase зараз, self-hosted Postgres потім. Жодних supabase-js/RLS/Realtime/Storage. Важкі обчислення (стріки, кореляції) — **portable Postgres SQL** (window functions, вбудований `corr()`), виконуються через Drizzle і працюють на будь-якому Postgres.
- **Авторизація:** репозиторій-шар, де кожен запит фільтрується по `userId` із Clerk-сесії. Опційний майбутній варіант — Postgres RLS через `SET LOCAL app.user_id` при self-host.
- **Redis (docker):** кеш агрегатів/інсайтів, rate-limiting, у майбутньому черга задач (BullMQ для дайджестів/перерахунків) і pub/sub для realtime.
- **Email:** Resend — щотижневі review-дайджести, нагадування, сповіщення.
- **Telegram-бот (закладка на майбутнє):** abstraction `ingestion API` (webhook → нормалізована подія → `entries` з `source='telegram'`). Не будуємо зараз, але модель і контракт ендпойнта закладаємо.
- **Валідація:** Zod (спільні схеми клієнт/сервер).
- **Графіки:** Recharts. **Стан:** TanStack Query + мінімальний Zustand для UI-стану.
- **Портативність:** усе Supabase-агностичне; перехід на self-host = зміна `DATABASE_URL` + `drizzle-kit migrate` + (опц.) свій S3-сумісний storage для медіа.

---

## 5. Аналітика та інсайти

- **Кореляції:** Пірсон (`corr()` Postgres) між денними рядами метрик; поріг даних ≥30 днів; кеш у `correlations` + Redis. Інсайт-картка — герой-елемент Insights.
- **Згладжування/тренди:** SMA-7 / EMA для ковзних середніх; лінійні графіки overlay (mood/energy/productivity).
- **Стріки:** портативний ROW_NUMBER-трюк (групи послідовних днів), кеш у `streaks`, перерахунок на запис; підтримка «часткових перемог» і пропусків без guilt.
- **Heatmaps:** GitHub-стиль по метриці; день-тижня патерни («найкраще в суботу»).
- **Habit Strength:** зважений показник регулярності понад голий стрік.
- **Grid of Life:** сітка тижнів на 80–90 років (екзистенційна перспектива, зв'язок з цілями).
- **Daily/Weekly/Monthly summary:** агрегати в `days` + матеріалізовані представлення/кеш.

---

## 6. Sitemap & UX (mobile-first, desktop-dense)

- **Today (Dashboard):** quick-log усіх due-метрик, задач, настрою, журналу — «один екран, весь день». North-star метрика зверху-ліворуч (F-патерн).
- **Trackers:** керування `metric_definitions` за категоріями, пресети-шаблони, архівування.
- **Tasks / Projects:** списки (Today/overdue/без дати), пріоритети, Kanban (пост-MVP), time-blocking (пізніше).
- **Goals + Grid of Life:** ієрархія цілей, прогрес, лінки на метрики/задачі, identity statements.
- **Journal / Notes:** Markdown-редактор, backlinks, прив'язка до дня/метрики/задачі.
- **Insights:** кореляційна матриця, тренди, heatmaps, день-тижня, експорт.
- **Settings:** категорії, тема, експорт/імпорт (CSV/JSON), інтеграції (майбутнє), приватність/видалення даних.
- **Навігація:** desktop — sidebar (масштабується під багато модулів); mobile — bottom tab bar + центральний quick-add FAB (bottom sheet).

---

## 7. Design System (НЕ фіксуємо — орієнтир)

Поточний стан `app/globals.css` залишаємо й **не переробляємо зараз**: нейтральна OKLCH-база shadcn (`radix-lyra`), dark через `.dark`, токени `--background/--primary/--accent/...`, `--radius` 0.625rem. Усі майбутні кольори — **тільки OKLCH** для консистентності (без hex/rgb), щоб переключення теми й чарти лишались узгодженими.

Необов'язковий напрям (за бажанням, не зараз) — теплий мінімалізм у стилі Things 3: тепла теракота-акцент, off-white фони, серіф-заголовки. Реалізується **зміною значень існуючих OKLCH-токенів**, без структурних правок. UX-патерни-орієнтири: quick-add bottom sheet, swipe complete/delete, drag-handle, calm/no-guilt кольори, spring-мікроанімації.

Іконки — Phosphor (вже в проєкті). Шрифти/типографіка — на розсуд власника під час розробки.

---

## 8. Roadmap

- **Phase 0 — Blueprint (зараз):** цей документ; архів старих docs; видалення `spec.md`.
- **Phase 1 — Foundation:** каркас Next.js 16 + shadcn + OKLCH-токени **вже є**. Лишається: docker-compose (postgres+redis); встановити Drizzle + Drizzle Kit + Clerk + Resend + Redis-клієнт; Drizzle schema ядра + перші міграції; Clerk + webhook-синк `users`; `.env` (`DATABASE_URL` на Supabase). Перед кодом — прочитати `node_modules/next/dist/docs/`.
- **Phase 2 — Core vertical:** Today + універсальні метрики (CRUD definitions, quick-log entries, days-агрегати, streaks), задачі, журнал.
- **Phase 3 — Goals & Notes:** ієрархія цілей, backlinks-нотатки, Grid of Life.
- **Phase 4 — Insights:** кореляції (Пірсон), тренди (SMA/EMA), heatmaps, weekly review через Resend.
- **Phase 5 — Channels:** Telegram-бот (ingestion API), імпорт/експорт, PWA/offline (Service Worker + IndexedDB sync queue).
- **Phase 6 — Self-host swap:** зміна `DATABASE_URL` на docker Postgres, `drizzle-kit migrate`, перевірка портативності.

---

## 9. Ризики та рішення

- **Складність універсального движка** → пом'якшуємо пресетами/шаблонами метрик і progressive disclosure в UI.
- **Switch Supabase → self-host** → дисципліна «лише Drizzle, лише portable SQL», жодних Supabase-API; перевіряється у Phase 6.
- **Clerk vendor lock (identity)** → у БД зберігаємо `clerk_user_id`, але вся бізнес-модель на власному `users.id`; заміна auth не торкається трекінг-даних.
- **Retention / UX-friction** (~47% відтоку в індустрії) → quick-log ≤2 хв/день, no-guilt дизайн, інсайти як цінність.
- **Аналітика потребує даних** → кореляції вмикаються після ≥30 днів; до того — базова статистика й тренди.
