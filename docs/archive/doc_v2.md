# Life OS / Productivity & Analytics Platform
## Повна продуктова та технічна документація

---

# 1. BUSINESS ANALYSIS

## 1.1 Аналіз ринку Productivity & Habit Tracking

### Популярні продукти та їх підходи

| Продукт | Сильні сторони | Проблеми |
|---------|---------------|----------|
| **Habitica** | Гейміфікація, спільноти, мотивація | Перевантаження механіками, відволікає від даних, складний onboarding |
| **Daylio** | Швидкий mood tracking, простота, приватність | Обмежена кастомізація, слабка аналітика, відсутність контексту (задачі, звички) |
| **TickTick** | Потужний task manager, календар, Pomodoro | Трекінг звичок — додаток, не інтегрований з productivity context |
| **Notion** | Універсальність, гнучкість | Складність налаштування, відсутність готової аналітики, немає mobile-first experience |
| **Streaks** | Мінімалізм, фокус на виконанні | Тільки бінарні звички, нема контексту настрою/продуктивності |
| **Loop Habit Tracker** | Open-source, статистика, offline | Застарілий UX, тільки звички, нема broader context |

### Реальні проблеми користувачів

1. **Фрагментація даних**
   - Звички в одному застосунку, задачі в іншому, настрій — у третьому
   - Неможливо побачити connections між різними аспектами життя
   - Експорт/синхронізація між сервісами не працює

2. **Мотивація vs Аналітика**
   - Більшість продуктів фокусуються на gamification
   - Streaks, badges, XP — короткочасна мотивація
   - Користувачі хочуть **розуміти себе**, а не збирати досягнення

3. **Складність vs Простота**
   - Прості продукти (Streaks) — занадто обмежені
   - Складні (Notion) — вимагають години налаштування
   - Золота середина відсутня

4. **Слабка довгострокова аналітика**
   - Графіки за 7–30 днів
   - Нема інструментів для пошуку patterns на дистанції місяців/років
   - Відсутність кореляційного аналізу

5. **Mobile experience**
   - Desktop-first продукти (Notion) незручні на телефоні
   - Mobile-only (Daylio) обмежені для глибокого аналізу
   - Logging має бути швидким (< 10 секунд)

### Формати трекінгу, що реально використовуються

**Звички:**
- **Бінарні (Yes/No)**: 70% use cases — медитація, тренування, читання
- **Кількісні (число)**: 25% — води (літри), сну (години), кроків
- **Categorical**: 5% — занадто складно для щоденного логування

**Настрій:**
- **1–5 шкала**: найпопулярніший формат (Daylio)
- **1–10**: занадто детально для щоденного use
- **Емоції (tags)**: корисні як secondary data
- **Контекст**: що вплинуло на настрій (activities, events)

**Задачі:**
- Більшість користувачів планують 3–7 задач на день
- 80% задач — без складних залежностей
- Priority/difficulty важливіші за складні ієрархії

### Перевантаження функціоналом

**Що НЕ потрібно в MVP:**
- Складна гейміфікація (аватари, pet, RPG mechanics)
- Social features (друзі, челенджі, leaderboards)
- Календар із зовнішньою синхронізацією
- Pomodoro timer
- Нотатки як Notion (WYSIWYG editor)
- Файли/медіа в журналі
- Вкладені задачі (sub-tasks)
- Time tracking на рівні хвилин

**Що створює складність без цінності:**
- Багаторівневі категорії
- Custom поля для кожної сутності
- Automation/webhooks
- Інтеграції з третіми сервісами

---

## 1.2 Висновки для MVP

### Включити:
1. **Unified Daily View** — всі дані дня на одному екрані
2. **Швидкий logging** — звички, настрій, задачі за 5–15 секунд
3. **Довгострокова аналітика** — графіки за 3–6–12 місяців
4. **Кореляційний аналіз** — автоматичне виявлення patterns
5. **Мінімалістичний дизайн** — інформаційна щільність без clutter
6. **Mobile-first** — 80% interaction на телефоні

### Не включати:
1. Гейміфікація (крім базових streaks)
2. Social features
3. Зовнішні інтеграції
4. Advanced task management (projects, dependencies)
5. Time tracking з точністю до хвилин
6. Медіа в журналі (фото/відео)

### Стратегічні рішення:
- **Data ownership** — повний експорт у JSON/CSV
- **Privacy-first** — жодних публічних даних у MVP
- **Analytics-driven** — статистика не як afterthought, а core feature
- **Schema flexibility** — можливість додати AI/teams у майбутньому без migration hell

---

# 2. PRODUCT VISION

## 2.1 Навіщо існує продукт

Life OS створений для людей, які хочуть **розуміти своє життя через дані**, а не покладатися на мотиваційні гасла та тимчасові streaks.

**Центральна ідея:**
> "Ти не можеш покращити те, що не вимірюєш. Але вимірювання без аналізу — марна трата часу."

**Філософія:**
- Об'єктивність замість self-deception
- Patterns замість isolated events
- Long-term trends замість daily fluctuations
- Data-driven decisions замість gut feelings

## 2.2 Яку реальну проблему вирішує

### Проблема №1: Фрагментація
Люди використовують 3–5 застосунків:
- Todoist для задач
- Daylio для настрою
- Loop для звичок
- Notes для журналу

**Наслідок:** Неможливо побачити connections. Чому я був у поганому настрої у вівторок? Бо не спав? Бо не тренувався? Бо були дедлайни?

**Рішення Life OS:**
Всі дані в одному місці. День як atomic unit. Аналітика з correlation insights.

### Проблема №2: Відсутність довгострокової перспективи
Більшість продуктів показують "streak: 7 днів" або графік за місяць.

**Питання, на які не можна відповісти:**
- Як змінився мій sleep pattern за останні 6 місяців?
- В які місяці я був найпродуктивнішим?
- Чи є сезонність у моєму настрої?
- Як медитація вплинула на якість сну (корреляція)?

**Рішення Life OS:**
- Timeline view з zoom in/out (тиждень → місяць → рік)
- Rolling averages
- Year-over-year comparisons
- Correlation matrix (habits ↔ mood ↔ productivity)

### Проблема №3: Logging як обов'язок
В більшості продуктів logging відчувається як chore:
- Багато кліків
- Складні форми
- Непотрібні поля

**Рішення Life OS:**
- Quick actions — одна кнопка для toggle habit
- Smart defaults — Day створюється автоматично
- Minimal friction — logging за 5–10 секунд
- Bulk edit — історичні дані можна швидко корегувати

## 2.3 Чим принципово кращий за конкурентів

| Параметр | Конкуренти | Life OS |
|----------|-----------|---------|
| **Інтеграція даних** | Розділені застосунки | Unified daily view |
| **Аналітика** | 7–30 днів, базові графіки | 3–12 місяців, кореляції, trends |
| **Mobile UX** | Або спрощений, або desktop-copy | Designed for mobile, enhanced on desktop |
| **Logging speed** | 30–60 секунд | 5–15 секунд |
| **Privacy** | Cloud-only, часто з social features | Self-contained, future self-hosted option |
| **Flexibility** | Або rigid, або chaos (Notion) | Structured flexibility — templates + customization |
| **Data ownership** | Export як afterthought | CSV/JSON export built-in |

**Унікальна цінність:**
1. **Analytics as core feature** — не додаток, а фундамент
2. **Day as atomic unit** — не isolated events
3. **Correlation engine** — автоматичне виявлення patterns
4. **Timeline perspective** — життя на дистанції, а не щоденні коливання

## 2.4 Що НЕ є метою продукту

❌ **Не є task manager з advanced features**
- Не замінює Asana/Jira для команд
- Не для складних project dependencies
- Особистий productivity, не team collaboration

❌ **Не є соціальна мережа**
- Не для публічних челенджів
- Не для competition з друзями
- Privacy-first approach

❌ **Не є гейміфікований додаток**
- Нема avatars, pets, XP
- Нема artificial achievements
- Intrinsic motivation, а не extrinsic rewards

❌ **Не є Notion-killer**
- Не для wiki/knowledge base
- Не для документів та collaboration
- Фокус на structured daily data

❌ **Не є календар**
- Не замінює Google Calendar
- Не для event scheduling з іншими людьми
- Retrospective view, а не planning calendar

**Принцип:**
> "Do one thing exceptionally well: дай людині розуміння їхнього життя через об'єктивні дані."

---

# 3. USER SCENARIOS

## 3.1 Daily Flow (5–15 хвилин протягом дня)

### Ранок (2–3 хвилини)
**Контекст:** Користувач прокинувся, п'є каву, відкриває телефон.

**Дії:**
1. Відкриває Life OS → автоматично на Today view
2. Бачить:
   - Список звичок на сьогодні (unpopulated)
   - Задачі на день (якщо додавав раніше)
   - Поле для Morning Reflection (optional)
3. **Quick log:**
   - Tap на "Meditation" — toggle до Yes
   - Tap на "Sleep hours" — вводить "7.5"
   - Swipe up — закриває застосунок

**Час:** < 30 секунд (якщо тільки звички)

---

### День (протягом дня, 3–5 хвилин сумарно)

**Use case 1: Завершив задачу**
- Notification/widget або відкрив застосунок
- Today view → Tasks секція
- Tap checkbox біля задачі "Написати звіт"
- Автоматично timestamp + completed = true

**Use case 2: Випив воду**
- Quick action з Home Screen (PWA shortcut)
- Tap "Water +1" → increment counter
- Без відкриття основного застосунку

**Use case 3: Настрій змінився**
- Відчув тривогу → хоче залогувати
- Today → Mood section
- Slider з 1 до 5 → вибрав 2
- Optional: додав тег "Work stress"

---

### Вечір (5–10 хвилин перед сном)

**Контекст:** Користувач підбиває підсумки дня.

**Дії:**
1. Відкриває Today view
2. **Завершує звички:**
   - "Workout" → No (пропустив сьогодні)
   - "Reading" → Yes
   - "No alcohol" → Yes
3. **Задачі:**
   - Бачить 3 з 5 completed
   - 2 incomplete → drag до завтра (reschedule) або mark failed
4. **Mood final check:**
   - Встановлює фінальний mood за день (якщо не робив раніше)
   - Overall: 4/5
5. **Journal:**
   - Tap "Add journal entry"
   - Вибирає template "Daily Reflection" або blank
   - Пише 2–3 речення: "Productive day. Finished report. Skipped gym — tomorrow better."
   - Додає теги: #work #productive
6. **Завершує день:**
   - Автоматично відбувається при переході на наступний day
   - Статистика оновлюється (streaks, counts)

**Час:** 5–10 хвилин

---

## 3.2 Weekly Review (15–30 хвилин, вихідні)

**Контекст:** Субота/неділя. Користувач хоче проаналізувати тиждень.

**Дії:**
1. **Перехід до Analytics:**
   - Головне меню → Analytics
   - За замовчуванням: Last 7 days view
2. **Habits overview:**
   - Бачить heatmap: 7 днів × N звичок
   - Meditation: 5/7 (71%) — зелений
   - Workout: 3/7 (43%) — жовтий
   - Reading: 6/7 (86%) — зелений
3. **Tasks completed:**
   - Bar chart: tasks per day
   - Average: 4.2 tasks/day
   - Best day: середа (7 tasks)
   - Worst: п'ятниця (2 tasks)
4. **Mood trend:**
   - Line graph: mood протягом тижня
   - Average: 3.7/5
   - Помічає: п'ятниця був dip (2/5)
5. **Correlation insights (якщо доступно):**
   - "Workout days: avg mood 4.2"
   - "No workout: avg mood 3.1"
   - Висновок: тренування +1.1 до настрою
6. **Scrolling через days:**
   - Timeline view — scroll через 7 днів
   - Клік на п'ятницю → бачить детальний день
   - Читає journal: "Tired. Deadline stress."
   - Розуміє контекст низького mood
7. **Планує наступний тиждень:**
   - Вирішує: більше workout днів
   - Додає нову звичку "Morning walk" (експеримент)

**Час:** 15–30 хвилин

**Outcome:**
- Розуміння patterns
- Усвідомлення connections (workout → mood)
- Actionable insights для наступного тижня

---

## 3.3 Monthly Reflection (45–60 хвилин, кінець місяця)

**Контекст:** Останній день місяця або перший день нового. Користувач хоче deeper analysis.

**Дії:**

### 1. Огляд місяця (10 хв)
- Analytics → Switch to "Last 30 days"
- **Habits heatmap:**
  - Calendar view (30 cells)
  - Колір-кодування за completion rate
  - Виділяє слабкі періоди (mid-month dip?)
- **Tasks performance:**
  - Total tasks: 127
  - Completed: 98 (77%)
  - Average per day: 4.2
  - Peak productivity week: week 2
- **Mood distribution:**
  - Pie chart або histogram
  - 40% днів — mood 4
  - 30% днів — mood 3
  - 15% днів — mood 5
  - 15% днів — mood 1–2

### 2. Deep dive в звички (15 хв)
- **Вибирає конкретну звичку: "Meditation"**
  - Completion: 23/30 днів (77%)
  - Longest streak: 9 днів
  - Breaks: 2 перерви (3 дні + 4 дні)
- **Overlay з іншими даними:**
  - Meditation days: avg mood 4.1
  - Non-meditation days: avg mood 3.0
  - Correlation: +1.1 mood improvement
- **Scrolling через journal entries:**
  - Фільтрує дні з meditation = Yes
  - Читає, що писав у ці дні
  - Бачить patterns: більше clarity, less anxiety

### 3. Порівняння з попереднім місяцем (10 хв)
- **Month-over-month:**
  - Habits: +12% completion rate
  - Tasks: +8% productivity
  - Mood: +0.3 points average
- **Trends:**
  - Workout consistency покращилась
  - Reading впала (було 20 днів, стало 15)
- **Висновки:**
  - Треба prioritize reading знову
  - Meditation showing clear impact → continue

### 4. Correlation explorer (15 хв)
- **Automatic correlations (if feature available):**
  - Sleep > 7h → mood +0.8
  - Workout → mood +1.1
  - Workout + Meditation → mood +1.5 (combined effect)
  - Late tasks (after 10pm) → mood -0.5 next day
- **Manual exploration:**
  - Вибирає 2 metrics: "Sleep hours" vs "Mood"
  - Scatter plot
  - Бачить positive correlation
- **Insights:**
  - Sleep є foundational
  - Workout multiplier ефект
  - Evening productivity негативно впливає

### 5. Планування експериментів (10 хв)
- **На основі аналізу вирішує:**
  - Збільшити sleep target з 7 до 7.5h
  - Додати нову звичку: "No work after 8pm" (тест на місяць)
  - Продовжити meditation streak
  - Re-commit до reading (мінімум 15 днів у місяць)
- **Створює notes:**
  - В Journal додає entry "March Reflection"
  - Пише insights та goals на April

**Час:** 45–60 хвилин

**Outcome:**
- Глибоке розуміння поведінки за місяць
- Виявлені кореляції
- Data-driven goals на наступний місяць
- Documented learnings

---

## 3.4 Long-Term Analysis (60–90 хв, кожні 3–6 місяців)

**Контекст:** Користувач має 6+ місяців даних. Хоче побачити big picture.

**Дії:**

### 1. Timeline Overview (15 хв)
- **Analytics → "Last 6 months" view**
- **Aggregated metrics:**
  - Total habits tracked: 8
  - Total habit completions: 847
  - Total tasks completed: 542
  - Average mood: 3.8/5
  - Journal entries: 154
- **Visual timeline:**
  - Month-by-month bars
  - Бачить productivity waves
  - Виділяє best/worst місяці

### 2. Trends Analysis (20 хв)
- **Habit consistency over time:**
  - Line graphs для кожної звички
  - "Meditation": trend вгору (40% → 77%)
  - "Workout": plateau на 60%
  - "Reading": decline (70% → 50%)
- **Mood trajectory:**
  - 6-month line graph
  - Rolling 30-day average (згладжує fluctuations)
  - Помічає: January (low), March (high), June (stable)
- **Productivity cycles:**
  - Tasks completed per week (line graph)
  - Виявляє pattern: high productivity weeks 1–2 of month, decline weeks 3–4
  - Hypothesis: monthly planning helps start, loses steam mid-month

### 3. Seasonal Patterns (15 хв)
- **Month-over-month comparison:**
  - Heatmap: 6 місяців × ключові metrics
  - Winter (Jan–Feb): lower mood, lower workout
  - Spring (Mar–Apr): peak productivity
  - Summer (May–Jun): stable, balanced
- **External factors:**
  - Scrolling через journal entries
  - Помічає: January = work deadline stress
  - March = new project excitement
  - Correlation з mood data

### 4. Correlation Deep Dive (20 хв)
- **Multi-variable analysis:**
  - Sleep + Workout + Meditation → Mood (combined model)
  - Бачить: Sleep — foundational (+0.8)
  - Workout на good sleep → +1.2
  - Meditation на good sleep → +0.9
  - All three → +1.8 cumulative
- **Negative correlations:**
  - Late tasks → mood -0.6 next day
  - Zero workout week → mood -0.9
  - <6h sleep → mood -1.2
- **Insights:**
  - Sleep non-negotiable
  - Workout has strongest mood ROI
  - Meditation — consistency matters more than intensity

### 5. Reflection & Goal Setting (20 хв)
- **What worked:**
  - Building meditation habit (40% → 77%)
  - Task system — cleared 542 tasks
  - Logging consistency — 154 journal entries
- **What didn't:**
  - Reading declined
  - Mid-month productivity drops
  - Sleep inconsistency (5–9h range)
- **Experiments to run:**
  - Stricter sleep schedule (7–8h window)
  - Weekly goals instead of monthly (prevent mid-month dip)
  - Reading accountability (share progress?)
- **Documents in Journal:**
  - "6-Month Review — June 2026"
  - Key learnings
  - Goals for next 6 months

**Час:** 60–90 хвилин

**Outcome:**
- Longitudinal perspective
- Seasonal/cyclical patterns identified
- Data-backed understanding of what moves the needle
- Long-term strategy adjustments

---

## 3.5 Edge Scenarios

### Scenario A: Пропустив кілька днів
**Ситуація:** Був у відпустці, не логував 5 днів.

**Дії:**
1. Повертається → Today view показує today
2. Меню → "History" або Calendar view
3. Бачить missing days (grey або empty state)
4. **Опції:**
   - Залишити пусті (accepted gap in data)
   - Bulk fill: "Mark all as No" для певних habits
   - Skip — не backfill, просто continue
5. **Результат:**
   - Streak broken, але overall data integrity maintained
   - Analytics показує gap, але не penalize

---

### Scenario B: Помилка в минулому
**Ситуація:** Помітив, що 3 дні тому вніс неправильний mood (3 замість 5).

**Дії:**
1. History → Calendar view
2. Клік на день (3 дні тому)
3. Day detail view → Edit mode
4. Змінює mood: 3 → 5
5. Save → Trigger recalculation:
   - Weekly average recalculated
   - Correlation data updated (SQL trigger)
6. **Результат:**
   - Історичні дані виправлені
   - Analytics accurately reflects reality

---

### Scenario C: Експеримент з новою звичкою
**Ситуація:** Хоче почати tracking "Cold shower" на місяць (експеримент).

**Дії:**
1. Settings → Habits
2. Add new habit:
   - Name: "Cold shower"
   - Type: Binary
   - Category: Health
   - Goal: Daily
3. Звичка з'являється в Today view (starting tomorrow)
4. **Після місяця:**
   - Analytics → Habit detail
   - Completion rate: 18/30 (60%)
   - Mood correlation: +0.3 (weak)
   - Вирішує: not worth it → Archive habit
5. **Результат:**
   - Habit archived (не видалена)
   - Historical data збережена
   - Може reactivate пізніше

---

# 4. DOMAIN MODEL (CORE ENTITIES)

## 4.1 Overview

Модель даних побудована на принципах:
- **Day as atomic unit** — день є центральною сутністю
- **Event-driven** — всі зміни логуються як події
- **Immutable history** — історичні дані не видаляються, тільки архівуються
- **Flexible aggregation** — статистика обчислюється динамічно через SQL
- **User isolation** — строга RLS політика

---

## 4.2 Core Entities

### 4.2.1 User

**Призначення:** Власник всіх даних. Один користувач = один акаунт.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key (Supabase Auth UUID) |
| `email` | VARCHAR(255) | NOT NULL | Email (з Supabase Auth) |
| `created_at` | TIMESTAMPTZ | NOT NULL | Timestamp реєстрації |
| `timezone` | VARCHAR(50) | NOT NULL | User timezone (для day boundaries) |
| `preferences` | JSONB | NULL | User settings (theme, notifications, etc) |
| `onboarding_completed` | BOOLEAN | NOT NULL | Чи пройшов onboarding |
| `last_active_at` | TIMESTAMPTZ | NULL | Останній вхід (для retention) |

**Constraints:**
- `UNIQUE(email)`

**Indexes:**
- Primary key на `id`
- Index на `email`

**Lifecycle:**
- **Created:** При реєстрації через Supabase Auth
- **Updated:** preferences, last_active_at
- **Deleted:** Soft delete → hard delete через 14 днів

**Relations:**
- `has_many` Days
- `has_many` Habits
- `has_many` Tasks
- `has_many` MoodEntries
- `has_many` JournalEntries

---

### 4.2.2 Day

**Призначення:** Atomic unit. Контейнер для всіх даних за один день.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `date` | DATE | NOT NULL | День (у timezone користувача) |
| `created_at` | TIMESTAMPTZ | NOT NULL | Коли створено запис |
| `updated_at` | TIMESTAMPTZ | NOT NULL | Остання зміна |
| `overall_mood` | INTEGER | NULL | Загальний mood за день (1–5) |
| `notes` | TEXT | NULL | Quick notes (legacy, deprecated → use JournalEntry) |
| `is_completed` | BOOLEAN | NOT NULL | Чи "закритий" день (user завершив logging) |

**Constraints:**
- `UNIQUE(user_id, date)` — один запис на день на користувача
- `CHECK(overall_mood >= 1 AND overall_mood <= 5)`

**Indexes:**
- Primary key на `id`
- **Composite index:** `(user_id, date DESC)` — для швидкого пошуку днів
- Index на `user_id`

**Lifecycle:**
- **Created:** 
  - Автоматично через SQL trigger при першому логуванні даних за день
  - Або manually через UI (user відкриває Today view)
- **Updated:** 
  - При кожному додаванні HabitLog, Task, MoodEntry
  - `updated_at` оновлюється тригером
- **Deleted:** Ніколи (архівується разом з user)

**Relations:**
- `belongs_to` User
- `has_many` HabitLogs
- `has_many` TaskCompletions
- `has_many` MoodEntries
- `has_many` JournalEntries

**Business Logic:**
- День вважається "поточним" якщо `date = CURRENT_DATE IN user.timezone`
- Автоматично створюється при переході на новий день (midnight trigger або lazy creation)
- `is_completed` = TRUE → user завершив день, нагадування припиняються

---

### 4.2.3 Habit

**Призначення:** Визначення звички (template). Користувач створює один раз, логує щодня.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `name` | VARCHAR(100) | NOT NULL | Назва звички |
| `description` | TEXT | NULL | Опис (опціонально) |
| `type` | VARCHAR(20) | NOT NULL | 'binary' або 'quantitative' |
| `unit` | VARCHAR(20) | NULL | Одиниця виміру (для quantitative): 'liters', 'hours', 'count' |
| `target_value` | DECIMAL(10,2) | NULL | Ціль (для quantitative): 2.5 liters, 8 hours |
| `category` | VARCHAR(50) | NULL | Категорія: 'health', 'productivity', 'mindfulness', custom |
| `color` | VARCHAR(7) | NULL | Hex color для UI (#3B82F6) |
| `icon` | VARCHAR(50) | NULL | Icon identifier (для UI) |
| `frequency` | VARCHAR(20) | NOT NULL | 'daily', 'weekly', 'custom' (MVP тільки daily) |
| `is_active` | BOOLEAN | NOT NULL | Чи активна звичка (archived = false) |
| `created_at` | TIMESTAMPTZ | NOT NULL | Коли створено |
| `archived_at` | TIMESTAMPTZ | NULL | Коли заархівовано |
| `sort_order` | INTEGER | NOT NULL | Порядок відображення (user drag-and-drop) |

**Constraints:**
- `CHECK(type IN ('binary', 'quantitative'))`
- `CHECK(frequency IN ('daily', 'weekly', 'custom'))`
- `CHECK(target_value IS NULL OR type = 'quantitative')`
- `CHECK(unit IS NULL OR type = 'quantitative')`

**Indexes:**
- Primary key на `id`
- Composite: `(user_id, is_active, sort_order)` — для списку активних звичок
- Index на `user_id`

**Lifecycle:**
- **Created:** User через UI (Settings → Habits → Add)
- **Updated:** name, description, target_value, category, sort_order
- **Archived:** `is_active = FALSE`, `archived_at = NOW()`
- **Reactivated:** `is_active = TRUE`, `archived_at = NULL`
- **Deleted:** Soft delete (is_active = false), ніколи hard delete (зберігає historical data integrity)

**Relations:**
- `belongs_to` User
- `has_many` HabitLogs

**Business Logic:**
- Binary habits: logged as Yes/No (boolean)
- Quantitative habits: logged as number (with unit)
- Archived habits не показуються в Today view, але доступні в Analytics

---

### 4.2.4 HabitLog

**Призначення:** Лог виконання звички за конкретний день.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id (denormalized для RLS) |
| `habit_id` | UUID | NOT NULL | Foreign key → habits.id |
| `day_id` | UUID | NOT NULL | Foreign key → days.id |
| `date` | DATE | NOT NULL | День (denormalized для швидких запитів) |
| `completed` | BOOLEAN | NULL | Для binary: TRUE/FALSE/NULL (не логовано) |
| `value` | DECIMAL(10,2) | NULL | Для quantitative: число |
| `logged_at` | TIMESTAMPTZ | NOT NULL | Коли залоговано (для порядку подій) |
| `updated_at` | TIMESTAMPTZ | NOT NULL | Остання зміна |

**Constraints:**
- `UNIQUE(habit_id, day_id)` — один лог на звичку на день
- `CHECK((completed IS NOT NULL AND value IS NULL) OR (completed IS NULL AND value IS NOT NULL))` — або binary, або quantitative

**Indexes:**
- Primary key на `id`
- **Composite:** `(user_id, date DESC)` — для швидкого фільтру по дням
- **Composite:** `(habit_id, date DESC)` — для статистики по звичці
- Index на `day_id`

**Lifecycle:**
- **Created:** User toggle/input в Today view
- **Updated:** User змінює значення (completed або value)
- **Deleted:** Можливо (якщо user видаляє помилковий лог)

**Relations:**
- `belongs_to` User
- `belongs_to` Habit
- `belongs_to` Day

**Business Logic:**
- `completed = NULL` → не логовано (не показувати в streaks)
- `completed = FALSE` → свідомо пропущено (break streak)
- `value` для quantitative: може бути 0 (валідне значення)

---

### 4.2.5 Task

**Призначення:** Задача. Створюється один раз, може бути виконана або перенесена.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `title` | VARCHAR(255) | NOT NULL | Назва задачі |
| `description` | TEXT | NULL | Опис (Markdown) |
| `status` | VARCHAR(20) | NOT NULL | 'pending', 'completed', 'failed', 'rescheduled' |
| `priority` | INTEGER | NULL | 1 (high) – 3 (low), nullable (no priority) |
| `difficulty` | INTEGER | NULL | 1 (easy) – 5 (hard), для analytics |
| `estimated_duration` | INTEGER | NULL | Хвилини (для майбутнього time tracking) |
| `scheduled_date` | DATE | NULL | На який день заплановано |
| `completed_at` | TIMESTAMPTZ | NULL | Коли виконано |
| `created_at` | TIMESTAMPTZ | NOT NULL | Коли створено |
| `updated_at` | TIMESTAMPTZ | NOT NULL | Остання зміна |
| `tags` | TEXT[] | NULL | Array тегів ['work', 'urgent'] |

**Constraints:**
- `CHECK(status IN ('pending', 'completed', 'failed', 'rescheduled'))`
- `CHECK(priority BETWEEN 1 AND 3 OR priority IS NULL)`
- `CHECK(difficulty BETWEEN 1 AND 5 OR difficulty IS NULL)`

**Indexes:**
- Primary key на `id`
- **Composite:** `(user_id, scheduled_date, status)` — для Today view
- **Composite:** `(user_id, status, created_at DESC)` — для backlog
- Index на `user_id`
- GIN index на `tags` (для пошуку по тегах)

**Lifecycle:**
- **Created:** User додає задачу (Today, або Future)
- **Updated:** title, description, scheduled_date, priority
- **Completed:** `status = 'completed'`, `completed_at = NOW()`
- **Failed:** `status = 'failed'` (user вирішив не робити)
- **Rescheduled:** `status = 'rescheduled'`, створюється нова копія з новою датою
- **Deleted:** Soft delete можливий, але краще archive через status

**Relations:**
- `belongs_to` User
- `has_many` TaskCompletions (якщо task виконувався частинами — future feature)

**Business Logic:**
- `scheduled_date = NULL` → backlog (unscheduled)
- `scheduled_date = TODAY` → в Today view
- `scheduled_date < TODAY AND status = 'pending'` → overdue (підсвічується)

---

### 4.2.6 TaskCompletion

**Призначення:** Лог виконання задачі (зв'язує Task з Day). Для майбутнього: partial completions.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `task_id` | UUID | NOT NULL | Foreign key → tasks.id |
| `day_id` | UUID | NOT NULL | Foreign key → days.id |
| `completed_at` | TIMESTAMPTZ | NOT NULL | Коли виконано |
| `time_spent` | INTEGER | NULL | Хвилини (future: time tracking) |

**Constraints:**
- `UNIQUE(task_id, day_id)` — поки що один completion на задачу (MVP)

**Indexes:**
- Primary key на `id`
- Composite: `(user_id, day_id)` — для статистики по дню
- Index на `task_id`

**Lifecycle:**
- **Created:** Автоматично через trigger при `tasks.status = 'completed'`
- **Deleted:** Якщо task uncompleted

**Relations:**
- `belongs_to` User
- `belongs_to` Task
- `belongs_to` Day

**Business Logic:**
- Використовується для підрахунку: "tasks completed per day"
- Майбутнє: partial completions (task виконувався протягом декількох днів)

---

### 4.2.7 MoodEntry

**Призначення:** Запис настрою. Може бути декілька на день (morning, evening, ad-hoc).

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `day_id` | UUID | NOT NULL | Foreign key → days.id |
| `date` | DATE | NOT NULL | День (denormalized) |
| `mood_value` | INTEGER | NOT NULL | 1–5 scale |
| `mood_type` | VARCHAR(20) | NULL | 'morning', 'evening', 'adhoc' (для context) |
| `energy_level` | INTEGER | NULL | 1–5 (опціонально) |
| `stress_level` | INTEGER | NULL | 1–5 (опціонально) |
| `tags` | TEXT[] | NULL | Context tags: ['work_stress', 'tired', 'excited'] |
| `logged_at` | TIMESTAMPTZ | NOT NULL | Коли залоговано |

**Constraints:**
- `CHECK(mood_value BETWEEN 1 AND 5)`
- `CHECK(energy_level BETWEEN 1 AND 5 OR energy_level IS NULL)`
- `CHECK(stress_level BETWEEN 1 AND 5 OR stress_level IS NULL)`

**Indexes:**
- Primary key на `id`
- Composite: `(user_id, date DESC, logged_at DESC)` — хронологія
- Index на `day_id`
- GIN index на `tags`

**Lifecycle:**
- **Created:** User логує mood (може бути декілька разів на день)
- **Updated:** Можливо (якщо user виправляє)
- **Deleted:** Soft delete

**Relations:**
- `belongs_to` User
- `belongs_to` Day

**Business Logic:**
- `mood_type` допомагає розрізняти: ранковий mood vs вечірній
- Якщо декілька entries за день → для `days.overall_mood` береться:
  - Evening mood (якщо є)
  - Або average всіх entries
  - Або останній logged
- Tags для контексту: чому саме такий mood

---

### 4.2.8 JournalEntry

**Призначення:** Текстовий запис дня. Notes, reflections, learnings.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `day_id` | UUID | NOT NULL | Foreign key → days.id |
| `date` | DATE | NOT NULL | День (denormalized) |
| `content` | TEXT | NOT NULL | Текст запису (Markdown) |
| `template_used` | VARCHAR(50) | NULL | Який template використано ('daily_reflection', 'gratitude', etc) |
| `tags` | TEXT[] | NULL | Tags для пошуку |
| `created_at` | TIMESTAMPTZ | NOT NULL | Коли створено |
| `updated_at` | TIMESTAMPTZ | NOT NULL | Остання зміна |

**Constraints:**
- Немає UNIQUE constraint — може бути декілька entries на день

**Indexes:**
- Primary key на `id`
- Composite: `(user_id, date DESC)`
- Index на `day_id`
- GIN index на `tags`
- Full-text search index на `content` (для пошуку)

**Lifecycle:**
- **Created:** User пише в журналі
- **Updated:** User редагує текст
- **Deleted:** Soft delete

**Relations:**
- `belongs_to` User
- `belongs_to` Day

**Business Logic:**
- Може бути 0, 1 або N entries на день
- `template_used` для майбутніх features: predefined prompts
- Full-text search для пошуку через journal

---

### 4.2.9 Streak

**Призначення:** Streak для звички. Обчислюється автоматично.

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `habit_id` | UUID | NOT NULL | Foreign key → habits.id |
| `current_streak` | INTEGER | NOT NULL | Поточний streak (днів) |
| `longest_streak` | INTEGER | NOT NULL | Найдовший streak (історія) |
| `last_completed_date` | DATE | NULL | Остання дата виконання |
| `updated_at` | TIMESTAMPTZ | NOT NULL | Коли оновлено |

**Constraints:**
- `UNIQUE(habit_id)` — один streak record на звичку

**Indexes:**
- Primary key на `id`
- Unique index на `habit_id`
- Index на `user_id`

**Lifecycle:**
- **Created:** Автоматично при створенні Habit
- **Updated:** Через trigger після кожного HabitLog insert/update
- **Deleted:** При видаленні Habit (cascade)

**Relations:**
- `belongs_to` User
- `belongs_to` Habit

**Business Logic:**
- `current_streak` збільшується при `HabitLog.completed = TRUE` на consecutive days
- Reset до 0 при пропуску дня (`completed = FALSE` або відсутність логу)
- `longest_streak` ніколи не зменшується (historical max)

---

### 4.2.10 MetricsEvent

**Призначення:** Event log для аудиту та майбутньої аналітики (feature usage, patterns).

**Поля:**

| Поле | Тип | Nullable | Опис |
|------|-----|----------|------|
| `id` | UUID | NOT NULL | Primary key |
| `user_id` | UUID | NOT NULL | Foreign key → users.id |
| `event_type` | VARCHAR(50) | NOT NULL | Тип події: 'habit_logged', 'task_completed', 'mood_logged', etc |
| `entity_type` | VARCHAR(50) | NULL | 'habit', 'task', 'mood', 'journal' |
| `entity_id` | UUID | NULL | ID сутності |
| `metadata` | JSONB | NULL | Додаткові дані (flexible) |
| `created_at` | TIMESTAMPTZ | NOT NULL | Timestamp події |

**Constraints:**
- Немає (pure event log)

**Indexes:**
- Primary key на `id`
- Composite: `(user_id, created_at DESC)` — хронологія подій
- Index на `event_type`
- GIN index на `metadata`

**Lifecycle:**
- **Created:** Автоматично через triggers або application code
- **Never updated or deleted** — immutable log

**Relations:**
- `belongs_to` User

**Business Logic:**
- Використовується для:
  - Analytics: коли користувач найактивніший (time of day)
  - Feature usage tracking
  - Debugging (event replay)
- Майбутнє: ML features (predict churn, recommend habits)

---

### 4.2.11 Tag / Category

**Призначення:** Tags для гнучкої категоризації (habits, tasks, journal).

**Рішення:** Використовуємо PostgreSQL arrays (`TEXT[]`) замість окремої таблиці для MVP.

**Чому:**
- Простіше для MVP
- Достатньо для filtering та grouping
- GIN indexes підтримують швидкий пошук

**Майбутнє:** Якщо потрібна складна tag hierarchy → винести в окрему таблицю `tags`.

---

## 4.3 Denormalization Strategy

**Denormalized поля:**

1. **`user_id` в усіх таблицях** (навіть якщо є через foreign keys)
   - **Чому:** RLS policies швидше працюють з прямим `user_id`
   - **Trade-off:** Трохи більше storage, але значно швидші запити

2. **`date` в HabitLog, MoodEntry, JournalEntry** (дублює з Day)
   - **Чому:** Частий filter по датах, уникаємо JOIN з `days`
   - **Trade-off:** Sync при зміні Day (але дата не змінюється)

3. **`last_completed_date` в Streak**
   - **Чому:** Уникаємо subquery в HabitLogs для перевірки streak
   - **Trade-off:** Оновлюється тригером

**Правило:** Denormalize тільки якщо:
- Поле часто використовується в WHERE/ORDER BY
- JOIN створює performance bottleneck
- Дані змінюються рідко або predictably

---

## 4.4 Entity Lifecycle Summary

| Entity | Create Trigger | Update Pattern | Delete Strategy |
|--------|---------------|----------------|-----------------|
| User | Supabase Auth | Preferences update | Soft → Hard (14d) |
| Day | Auto (first log) або manual | Continuous (logs) | Never (archive with user) |
| Habit | Manual (user) | Rare | Soft (archive) |
| HabitLog | Manual (user) | Editable | Deletable (rare) |
| Task | Manual (user) | Status transitions | Soft (status) |
| TaskCompletion | Auto (task complete) | Immutable | Cascade with task |
| MoodEntry | Manual (user) | Editable | Soft delete |
| JournalEntry | Manual (user) | Editable | Soft delete |
| Streak | Auto (habit create) | Auto (trigger) | Cascade with habit |
| MetricsEvent | Auto (triggers) | Immutable | Never (retention policy) |

---

## 4.5 Data Integrity Rules

### Referential Integrity
- Всі foreign keys з `ON DELETE CASCADE` або `ON DELETE SET NULL` (залежно від логіки)
- **Habit delete:** CASCADE до HabitLogs? **НІ** — soft delete habit, logs залишаються

### Consistency Rules
1. **Day автогенерація:**
   - При insert в HabitLog/Task/MoodEntry → якщо Day не існує, створюється автоматично
   
2. **Streak consistency:**
   - При update HabitLog → trigger recalculates Streak
   - При delete HabitLog → trigger recalculates Streak

3. **Overall mood:**
   - При insert/update MoodEntry → trigger recalculates `days.overall_mood`

### Validation Rules
1. **Dates:**
   - `date` не може бути в майбутньому (CHECK constraint або trigger)
   - `scheduled_date` може бути в майбутньому (tasks)

2. **Values:**
   - Mood/energy/stress: 1–5 range
   - Priority: 1–3 or NULL
   - Difficulty: 1–5 or NULL

3. **Enums:**
   - Використовуємо VARCHAR + CHECK замість ENUM (гнучкіше для змін)

---

# 5. DATABASE ARCHITECTURE

## 5.1 PostgreSQL Schema (Full DDL)

### 5.1.1 Extensions

```sql
-- Enable necessary PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- для full-text search
```

---

### 5.1.2 Users Table

```sql
-- Users table (синхронізується з Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    preferences JSONB DEFAULT '{}',
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    last_active_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_timezone CHECK (timezone ~ '^[A-Za-z_]+/[A-Za-z_]+$')
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_last_active ON users(last_active_at DESC) WHERE last_active_at IS NOT NULL;

-- Comments
COMMENT ON TABLE users IS 'User profiles, synchronized with Supabase Auth';
COMMENT ON COLUMN users.timezone IS 'IANA timezone for day boundary calculations';
COMMENT ON COLUMN users.preferences IS 'JSON: {theme, language, notifications, etc}';
```

---

### 5.1.3 Days Table

```sql
-- Days table
CREATE TABLE days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    overall_mood INTEGER CHECK (overall_mood BETWEEN 1 AND 5),
    notes TEXT, -- deprecated, use journal_entries
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Constraints
    CONSTRAINT unique_user_date UNIQUE(user_id, date)
);

-- Indexes
CREATE INDEX idx_days_user_date ON days(user_id, date DESC);
CREATE INDEX idx_days_user_id ON days(user_id);
CREATE INDEX idx_days_date ON days(date);

-- Comments
COMMENT ON TABLE days IS 'Atomic unit: one record per user per day';
COMMENT ON COLUMN days.overall_mood IS 'Calculated from mood_entries or set manually';
COMMENT ON COLUMN days.is_completed IS 'User marked day as completed (stops reminders)';
```

---

### 5.1.4 Habits Table

```sql
-- Habits table
CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('binary', 'quantitative')),
    unit VARCHAR(20), -- 'liters', 'hours', 'count', 'km', etc
    target_value DECIMAL(10,2),
    category VARCHAR(50),
    color VARCHAR(7), -- hex: #3B82F6
    icon VARCHAR(50),
    frequency VARCHAR(20) NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'custom')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    archived_at TIMESTAMPTZ,
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- Constraints
    CONSTRAINT valid_quantitative CHECK (
        (type = 'quantitative' AND unit IS NOT NULL) OR
        (type = 'binary' AND unit IS NULL AND target_value IS NULL)
    ),
    CONSTRAINT valid_color CHECK (color IS NULL OR color ~ '^#[0-9A-Fa-f]{6}$')
);

-- Indexes
CREATE INDEX idx_habits_user_active ON habits(user_id, is_active, sort_order) WHERE is_active = TRUE;
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habits_category ON habits(category) WHERE category IS NOT NULL;

-- Comments
COMMENT ON TABLE habits IS 'Habit definitions (templates), logged daily via habit_logs';
COMMENT ON COLUMN habits.type IS 'binary = yes/no, quantitative = number with unit';
COMMENT ON COLUMN habits.frequency IS 'MVP supports only daily; weekly/custom reserved for future';
COMMENT ON COLUMN habits.sort_order IS 'User-defined display order (drag-and-drop)';
```

---

### 5.1.5 Habit Logs Table

```sql
-- Habit logs table
CREATE TABLE habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
    date DATE NOT NULL, -- denormalized для швидкості
    completed BOOLEAN, -- для binary habits
    value DECIMAL(10,2), -- для quantitative habits
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_habit_day UNIQUE(habit_id, day_id),
    CONSTRAINT valid_log_type CHECK (
        (completed IS NOT NULL AND value IS NULL) OR
        (completed IS NULL AND value IS NOT NULL) OR
        (completed IS NULL AND value IS NULL) -- not logged yet
    )
);

-- Indexes
CREATE INDEX idx_habit_logs_user_date ON habit_logs(user_id, date DESC);
CREATE INDEX idx_habit_logs_habit_date ON habit_logs(habit_id, date DESC);
CREATE INDEX idx_habit_logs_day_id ON habit_logs(day_id);
CREATE INDEX idx_habit_logs_logged_at ON habit_logs(logged_at DESC);

-- Comments
COMMENT ON TABLE habit_logs IS 'Daily habit execution logs';
COMMENT ON COLUMN habit_logs.date IS 'Denormalized from days.date for query performance';
COMMENT ON COLUMN habit_logs.completed IS 'NULL=not logged, TRUE=done, FALSE=skipped';
```

---

### 5.1.6 Tasks Table

```sql
-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'rescheduled')),
    priority INTEGER CHECK (priority BETWEEN 1 AND 3),
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
    estimated_duration INTEGER, -- minutes
    scheduled_date DATE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    
    -- Constraints
    CONSTRAINT valid_completion CHECK (
        (status = 'completed' AND completed_at IS NOT NULL) OR
        (status != 'completed' AND completed_at IS NULL)
    )
);

-- Indexes
CREATE INDEX idx_tasks_user_scheduled ON tasks(user_id, scheduled_date, status) WHERE scheduled_date IS NOT NULL;
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status, created_at DESC);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_tags ON tasks USING GIN(tags);
CREATE INDEX idx_tasks_scheduled_date ON tasks(scheduled_date) WHERE scheduled_date IS NOT NULL;

-- Comments
COMMENT ON TABLE tasks IS 'User tasks with scheduling and completion tracking';
COMMENT ON COLUMN tasks.scheduled_date IS 'NULL = backlog, date = scheduled for specific day';
COMMENT ON COLUMN tasks.priority IS '1=high, 2=medium, 3=low, NULL=no priority';
COMMENT ON COLUMN tasks.difficulty IS '1=easy, 5=hard, used for analytics';
```

---

### 5.1.7 Task Completions Table

```sql
-- Task completions table
CREATE TABLE task_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    time_spent INTEGER, -- minutes, future feature
    
    -- Constraints
    CONSTRAINT unique_task_day UNIQUE(task_id, day_id) -- MVP: one completion per task
);

-- Indexes
CREATE INDEX idx_task_completions_user_day ON task_completions(user_id, day_id);
CREATE INDEX idx_task_completions_task_id ON task_completions(task_id);
CREATE INDEX idx_task_completions_completed_at ON task_completions(completed_at DESC);

-- Comments
COMMENT ON TABLE task_completions IS 'Links tasks to days; supports future partial completions';
COMMENT ON COLUMN task_completions.time_spent IS 'Reserved for time tracking feature';
```

---

### 5.1.8 Mood Entries Table

```sql
-- Mood entries table
CREATE TABLE mood_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
    date DATE NOT NULL, -- denormalized
    mood_value INTEGER NOT NULL CHECK (mood_value BETWEEN 1 AND 5),
    mood_type VARCHAR(20) CHECK (mood_type IN ('morning', 'evening', 'adhoc')),
    energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 5),
    stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 5),
    tags TEXT[] DEFAULT '{}',
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- No unique constraint - multiple entries per day allowed
    CONSTRAINT valid_date CHECK (date <= CURRENT_DATE)
);

-- Indexes
CREATE INDEX idx_mood_entries_user_date ON mood_entries(user_id, date DESC, logged_at DESC);
CREATE INDEX idx_mood_entries_day_id ON mood_entries(day_id);
CREATE INDEX idx_mood_entries_tags ON mood_entries USING GIN(tags);
CREATE INDEX idx_mood_entries_logged_at ON mood_entries(logged_at DESC);

-- Comments
COMMENT ON TABLE mood_entries IS 'Mood tracking with multiple entries per day support';
COMMENT ON COLUMN mood_entries.mood_type IS 'Context: when was mood logged (morning/evening/adhoc)';
COMMENT ON COLUMN mood_entries.tags IS 'Context tags: work_stress, tired, excited, etc';
```

---

### 5.1.9 Journal Entries Table

```sql
-- Journal entries table
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
    date DATE NOT NULL, -- denormalized
    content TEXT NOT NULL,
    template_used VARCHAR(50),
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_journal_entries_user_date ON journal_entries(user_id, date DESC);
CREATE INDEX idx_journal_entries_day_id ON journal_entries(day_id);
CREATE INDEX idx_journal_entries_tags ON journal_entries USING GIN(tags);
CREATE INDEX idx_journal_entries_content_fts ON journal_entries USING GIN(to_tsvector('english', content));

-- Comments
COMMENT ON TABLE journal_entries IS 'Daily journal/notes with full-text search';
COMMENT ON COLUMN journal_entries.template_used IS 'Template identifier: daily_reflection, gratitude, etc';
```

---

### 5.1.10 Streaks Table

```sql
-- Streaks table
CREATE TABLE streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_completed_date DATE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_habit_streak UNIQUE(habit_id),
    CONSTRAINT valid_streaks CHECK (current_streak >= 0 AND longest_streak >= 0 AND longest_streak >= current_streak)
);

-- Indexes
CREATE UNIQUE INDEX idx_streaks_habit_id ON streaks(habit_id);
CREATE INDEX idx_streaks_user_id ON streaks(user_id);
CREATE INDEX idx_streaks_current ON streaks(current_streak DESC);

-- Comments
COMMENT ON TABLE streaks IS 'Automatically calculated habit streaks';
COMMENT ON COLUMN streaks.current_streak IS 'Current consecutive days (resets on skip)';
COMMENT ON COLUMN streaks.longest_streak IS 'Historical maximum streak';
```

---

### 5.1.11 Metrics Events Table

```sql
-- Metrics events table
CREATE TABLE metrics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_metrics_events_user_created ON metrics_events(user_id, created_at DESC);
CREATE INDEX idx_metrics_events_type ON metrics_events(event_type);
CREATE INDEX idx_metrics_events_created ON metrics_events(created_at DESC);
CREATE INDEX idx_metrics_events_metadata ON metrics_events USING GIN(metadata);

-- Partitioning (optional, для scale)
-- CREATE TABLE metrics_events_2026_01 PARTITION OF metrics_events
--     FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

-- Comments
COMMENT ON TABLE metrics_events IS 'Immutable event log for analytics and debugging';
COMMENT ON COLUMN metrics_events.event_type IS 'habit_logged, task_completed, mood_logged, etc';
```

---

## 5.2 Migrations Strategy

### 5.2.1 Migration Principles

1. **Forward-only migrations** — ніколи не змінювати існуючі migrations
2. **Idempotent scripts** — можна запускати повторно без помилок
3. **Zero-downtime** — new columns nullable, drop columns через deprecation period
4. **Version control** — кожна migration з timestamp prefix
5. **Rollback plan** — для кожної migration є rollback SQL (але не автоматичний)

### 5.2.2 Migration Naming Convention

```
{timestamp}_{description}.sql
```

Приклади:
```
20260101_000000_initial_schema.sql
20260115_100000_add_habit_colors.sql
20260120_143000_add_mood_energy_level.sql
```

### 5.2.3 Initial Migration

**File:** `migrations/20260101_000000_initial_schema.sql`

```sql
-- Life OS: Initial Schema Migration
-- Version: 1.0.0
-- Date: 2026-01-01

BEGIN;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    preferences JSONB DEFAULT '{}',
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    last_active_at TIMESTAMPTZ,
    CONSTRAINT valid_timezone CHECK (timezone ~ '^[A-Za-z_]+/[A-Za-z_]+$')
);

CREATE INDEX idx_users_email ON users(email);

-- Days table
CREATE TABLE days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    overall_mood INTEGER CHECK (overall_mood BETWEEN 1 AND 5),
    notes TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT unique_user_date UNIQUE(user_id, date)
);

CREATE INDEX idx_days_user_date ON days(user_id, date DESC);

-- ... (всі інші таблиці з секції 5.1)

COMMIT;
```

### 5.2.4 Example: Adding New Feature

**File:** `migrations/20260215_100000_add_habit_categories.sql`

```sql
-- Add predefined categories for habits
-- Version: 1.1.0

BEGIN;

-- Add category column (nullable для backward compatibility)
ALTER TABLE habits 
ADD COLUMN IF NOT EXISTS category VARCHAR(50);

-- Create index
CREATE INDEX IF NOT EXISTS idx_habits_category 
ON habits(category) WHERE category IS NOT NULL;

-- Backfill existing habits
UPDATE habits 
SET category = 'health' 
WHERE category IS NULL AND name ILIKE ANY(ARRAY['%gym%', '%workout%', '%exercise%', '%meditation%']);

UPDATE habits 
SET category = 'productivity' 
WHERE category IS NULL AND name ILIKE ANY(ARRAY['%work%', '%task%', '%study%']);

-- Default для нових записів
ALTER TABLE habits 
ALTER COLUMN category SET DEFAULT 'other';

COMMIT;
```

**Rollback file:** `migrations/rollbacks/20260215_100000_rollback.sql`

```sql
BEGIN;

ALTER TABLE habits DROP COLUMN IF EXISTS category;
DROP INDEX IF EXISTS idx_habits_category;

COMMIT;
```

### 5.2.5 Migration Execution (Supabase)

```bash
# Apply migration через Supabase CLI
supabase db push

# Або через SQL Editor в Supabase Dashboard
# Copy-paste migration file
```

**Tracking:**
```sql
-- Migration tracking table (створюється автоматично Supabase)
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 5.3 Row Level Security (RLS) Policies

### 5.3.1 RLS Philosophy

**Принципи:**
1. **Default deny** — весь доступ заборонений за замовчуванням
2. **User isolation** — користувач бачить тільки свої дані
3. **Performance** — RLS policies оптимізовані (використовують indexes)
4. **Future-proof** — структура дозволяє додати teams/sharing пізніше

### 5.3.2 Enable RLS на всіх таблицях

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE days ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics_events ENABLE ROW LEVEL SECURITY;
```

### 5.3.3 Helper Function

```sql
-- Helper function: get current user ID
CREATE OR REPLACE FUNCTION auth.user_id()
RETURNS UUID AS $$
    SELECT COALESCE(
        auth.uid(), -- Supabase auth user ID
        (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')::uuid
    );
$$ LANGUAGE SQL STABLE;
```

### 5.3.4 Users Table Policies

```sql
-- Users: READ own profile
CREATE POLICY "Users can read own profile"
ON users FOR SELECT
USING (auth.user_id() = id);

-- Users: UPDATE own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.user_id() = id)
WITH CHECK (auth.user_id() = id);

-- Users: INSERT during signup (handled by trigger)
CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
WITH CHECK (auth.user_id() = id);
```

### 5.3.5 Days Table Policies

```sql
-- Days: SELECT own days
CREATE POLICY "Users can view own days"
ON days FOR SELECT
USING (auth.user_id() = user_id);

-- Days: INSERT own days
CREATE POLICY "Users can create own days"
ON days FOR INSERT
WITH CHECK (auth.user_id() = user_id);

-- Days: UPDATE own days
CREATE POLICY "Users can update own days"
ON days FOR UPDATE
USING (auth.user_id() = user_id)
WITH CHECK (auth.user_id() = user_id);

-- Days: DELETE own days (soft delete через application logic)
CREATE POLICY "Users can delete own days"
ON days FOR DELETE
USING (auth.user_id() = user_id);
```

### 5.3.6 Habits Table Policies

```sql
-- Habits: CRUD own habits
CREATE POLICY "Users can view own habits"
ON habits FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own habits"
ON habits FOR INSERT
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can update own habits"
ON habits FOR UPDATE
USING (auth.user_id() = user_id)
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete own habits"
ON habits FOR DELETE
USING (auth.user_id() = user_id);
```

### 5.3.7 Habit Logs Table Policies

```sql
-- Habit Logs: CRUD own logs
CREATE POLICY "Users can view own habit logs"
ON habit_logs FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own habit logs"
ON habit_logs FOR INSERT
WITH CHECK (
    auth.user_id() = user_id AND
    EXISTS (SELECT 1 FROM habits WHERE id = habit_logs.habit_id AND user_id = auth.user_id()) AND
    EXISTS (SELECT 1 FROM days WHERE id = habit_logs.day_id AND user_id = auth.user_id())
);

CREATE POLICY "Users can update own habit logs"
ON habit_logs FOR UPDATE
USING (auth.user_id() = user_id)
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete own habit logs"
ON habit_logs FOR DELETE
USING (auth.user_id() = user_id);
```

### 5.3.8 Tasks & Task Completions Policies

```sql
-- Tasks: CRUD
CREATE POLICY "Users can view own tasks"
ON tasks FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own tasks"
ON tasks FOR INSERT
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can update own tasks"
ON tasks FOR UPDATE
USING (auth.user_id() = user_id)
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete own tasks"
ON tasks FOR DELETE
USING (auth.user_id() = user_id);

-- Task Completions: CRUD
CREATE POLICY "Users can view own task completions"
ON task_completions FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own task completions"
ON task_completions FOR INSERT
WITH CHECK (
    auth.user_id() = user_id AND
    EXISTS (SELECT 1 FROM tasks WHERE id = task_completions.task_id AND user_id = auth.user_id()) AND
    EXISTS (SELECT 1 FROM days WHERE id = task_completions.day_id AND user_id = auth.user_id())
);

CREATE POLICY "Users can delete own task completions"
ON task_completions FOR DELETE
USING (auth.user_id() = user_id);
```

### 5.3.9 Mood Entries Policies

```sql
-- Mood Entries: CRUD
CREATE POLICY "Users can view own mood entries"
ON mood_entries FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own mood entries"
ON mood_entries FOR INSERT
WITH CHECK (
    auth.user_id() = user_id AND
    EXISTS (SELECT 1 FROM days WHERE id = mood_entries.day_id AND user_id = auth.user_id())
);

CREATE POLICY "Users can update own mood entries"
ON mood_entries FOR UPDATE
USING (auth.user_id() = user_id)
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete own mood entries"
ON mood_entries FOR DELETE
USING (auth.user_id() = user_id);
```

### 5.3.10 Journal Entries Policies

```sql
-- Journal Entries: CRUD
CREATE POLICY "Users can view own journal entries"
ON journal_entries FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own journal entries"
ON journal_entries FOR INSERT
WITH CHECK (
    auth.user_id() = user_id AND
    EXISTS (SELECT 1 FROM days WHERE id = journal_entries.day_id AND user_id = auth.user_id())
);

CREATE POLICY "Users can update own journal entries"
ON journal_entries FOR UPDATE
USING (auth.user_id() = user_id)
WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete own journal entries"
ON journal_entries FOR DELETE
USING (auth.user_id() = user_id);
```

### 5.3.11 Streaks & Metrics Policies

```sql
-- Streaks: SELECT + UPDATE (no INSERT/DELETE, handled by triggers)
CREATE POLICY "Users can view own streaks"
ON streaks FOR SELECT
USING (auth.user_id() = user_id);

-- Metrics Events: INSERT + SELECT (immutable)
CREATE POLICY "Users can view own metrics events"
ON metrics_events FOR SELECT
USING (auth.user_id() = user_id);

CREATE POLICY "Users can create own metrics events"
ON metrics_events FOR INSERT
WITH CHECK (auth.user_id() = user_id);
```

### 5.3.12 Future: Teams/Sharing (Structure)

```sql
-- Example: додати команди у майбутньому
-- Поки закоментовано, але RLS структура готова

-- CREATE TABLE teams (
--     id UUID PRIMARY KEY,
--     name VARCHAR(255),
--     created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- CREATE TABLE team_members (
--     team_id UUID REFERENCES teams(id),
--     user_id UUID REFERENCES users(id),
--     role VARCHAR(20), -- 'admin', 'member'
--     PRIMARY KEY (team_id, user_id)
-- );

-- Modify RLS: users can see data of team members
-- CREATE POLICY "Team members can view shared days"
-- ON days FOR SELECT
-- USING (
--     auth.user_id() = user_id OR
--     EXISTS (
--         SELECT 1 FROM team_members tm1
--         JOIN team_members tm2 ON tm1.team_id = tm2.team_id
--         WHERE tm1.user_id = auth.user_id() AND tm2.user_id = days.user_id
--     )
-- );
```

---

## 5.4 SQL Functions & Triggers

### 5.4.1 Auto-generate Day

**Function:**
```sql
-- Function: створити Day якщо не існує
CREATE OR REPLACE FUNCTION ensure_day_exists(
    p_user_id UUID,
    p_date DATE
)
RETURNS UUID AS $$
DECLARE
    v_day_id UUID;
BEGIN
    -- Спробувати знайти існуючий день
    SELECT id INTO v_day_id
    FROM days
    WHERE user_id = p_user_id AND date = p_date;
    
    -- Якщо не існує — створити
    IF v_day_id IS NULL THEN
        INSERT INTO days (user_id, date)
        VALUES (p_user_id, p_date)
        RETURNING id INTO v_day_id;
    END IF;
    
    RETURN v_day_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION ensure_day_exists IS 'Auto-creates day record if not exists';
```

**Trigger:** При insert в habit_logs/mood_entries/etc

```sql
-- Trigger: auto-create day before inserting habit_log
CREATE OR REPLACE FUNCTION trigger_ensure_day_for_habit_log()
RETURNS TRIGGER AS $$
BEGIN
    -- Викликати ensure_day_exists
    NEW.day_id := ensure_day_exists(NEW.user_id, NEW.date);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_habit_log_ensure_day
BEFORE INSERT ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION trigger_ensure_day_for_habit_log();
```

---

### 5.4.2 Update Streaks

**Function:**
```sql
-- Function: recalculate streak для habit
CREATE OR REPLACE FUNCTION recalculate_streak(p_habit_id UUID)
RETURNS VOID AS $$
DECLARE
    v_user_id UUID;
    v_current_streak INTEGER := 0;
    v_longest_streak INTEGER := 0;
    v_last_completed_date DATE;
    v_temp_streak INTEGER := 0;
    v_prev_date DATE;
    v_record RECORD;
BEGIN
    -- Отримати user_id
    SELECT user_id INTO v_user_id FROM habits WHERE id = p_habit_id;
    
    -- Ітеруватись по habit_logs (від найновішого до найстарішого)
    FOR v_record IN (
        SELECT date, completed
        FROM habit_logs
        WHERE habit_id = p_habit_id AND completed IS NOT NULL
        ORDER BY date DESC
    ) LOOP
        IF v_record.completed = TRUE THEN
            -- Якщо це перший запис або consecutive day
            IF v_prev_date IS NULL OR v_prev_date - v_record.date = 1 THEN
                v_temp_streak := v_temp_streak + 1;
                v_last_completed_date := v_record.date;
            ELSE
                -- Break у streak
                EXIT;
            END IF;
            v_prev_date := v_record.date;
        ELSE
            -- Completed = FALSE → break
            EXIT;
        END IF;
    END LOOP;
    
    v_current_streak := v_temp_streak;
    
    -- Знайти longest streak (через window function)
    SELECT COALESCE(MAX(streak_length), 0) INTO v_longest_streak
    FROM (
        SELECT 
            COUNT(*) as streak_length
        FROM (
            SELECT 
                date,
                date - ROW_NUMBER() OVER (ORDER BY date)::INTEGER AS grp
            FROM habit_logs
            WHERE habit_id = p_habit_id AND completed = TRUE
        ) sub
        GROUP BY grp
    ) streaks;
    
    -- Update streaks table
    INSERT INTO streaks (user_id, habit_id, current_streak, longest_streak, last_completed_date)
    VALUES (v_user_id, p_habit_id, v_current_streak, v_longest_streak, v_last_completed_date)
    ON CONFLICT (habit_id) DO UPDATE
    SET 
        current_streak = EXCLUDED.current_streak,
        longest_streak = GREATEST(streaks.longest_streak, EXCLUDED.longest_streak),
        last_completed_date = EXCLUDED.last_completed_date,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Trigger:**
```sql
-- Trigger: recalculate streak після INSERT/UPDATE habit_log
CREATE OR REPLACE FUNCTION trigger_recalculate_streak()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM recalculate_streak(NEW.habit_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_habit_log_change
AFTER INSERT OR UPDATE OF completed ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION trigger_recalculate_streak();

-- Trigger: recalculate streak після DELETE habit_log
CREATE OR REPLACE FUNCTION trigger_recalculate_streak_on_delete()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM recalculate_streak(OLD.habit_id);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_habit_log_delete
AFTER DELETE ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION trigger_recalculate_streak_on_delete();
```

---

### 5.4.3 Update Overall Mood

**Function:**
```sql
-- Function: recalculate overall_mood для day
CREATE OR REPLACE FUNCTION recalculate_overall_mood(p_day_id UUID)
RETURNS VOID AS $$
DECLARE
    v_avg_mood DECIMAL;
    v_evening_mood INTEGER;
BEGIN
    -- Спробувати знайти evening mood
    SELECT mood_value INTO v_evening_mood
    FROM mood_entries
    WHERE day_id = p_day_id AND mood_type = 'evening'
    ORDER BY logged_at DESC
    LIMIT 1;
    
    -- Якщо є evening mood → використати його
    IF v_evening_mood IS NOT NULL THEN
        UPDATE days SET overall_mood = v_evening_mood WHERE id = p_day_id;
        RETURN;
    END IF;
    
    -- Інакше → average всіх mood entries за день
    SELECT ROUND(AVG(mood_value)) INTO v_avg_mood
    FROM mood_entries
    WHERE day_id = p_day_id;
    
    UPDATE days 
    SET overall_mood = v_avg_mood::INTEGER
    WHERE id = p_day_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Trigger:**
```sql
-- Trigger: recalculate після INSERT/UPDATE mood_entry
CREATE OR REPLACE FUNCTION trigger_recalculate_overall_mood()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM recalculate_overall_mood(NEW.day_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_mood_entry_change
AFTER INSERT OR UPDATE OF mood_value, mood_type ON mood_entries
FOR EACH ROW
EXECUTE FUNCTION trigger_recalculate_overall_mood();

CREATE TRIGGER after_mood_entry_delete
AFTER DELETE ON mood_entries
FOR EACH ROW
EXECUTE FUNCTION trigger_recalculate_overall_mood();
```

---

### 5.4.4 Update Days.updated_at

**Trigger:**
```sql
-- Generic trigger function: update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply на всі таблиці з updated_at
CREATE TRIGGER update_days_timestamp
BEFORE UPDATE ON days
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_habit_logs_timestamp
BEFORE UPDATE ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_tasks_timestamp
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_journal_entries_timestamp
BEFORE UPDATE ON journal_entries
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_streaks_timestamp
BEFORE UPDATE ON streaks
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();
```

---

### 5.4.5 Auto-create TaskCompletion

**Trigger:**
```sql
-- Trigger: створити task_completion при tasks.status = 'completed'
CREATE OR REPLACE FUNCTION trigger_create_task_completion()
RETURNS TRIGGER AS $$
DECLARE
    v_day_id UUID;
BEGIN
    -- Тільки якщо status змінився на 'completed'
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        -- Знайти або створити день
        v_day_id := ensure_day_exists(NEW.user_id, COALESCE(NEW.scheduled_date, CURRENT_DATE));
        
        -- Створити completion record
        INSERT INTO task_completions (user_id, task_id, day_id, completed_at)
        VALUES (NEW.user_id, NEW.id, v_day_id, NOW())
        ON CONFLICT (task_id, day_id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_task_status_change
AFTER UPDATE OF status ON tasks
FOR EACH ROW
EXECUTE FUNCTION trigger_create_task_completion();
```

---

### 5.4.6 Log Metrics Events

**Function:**
```sql
-- Function: log metrics event
CREATE OR REPLACE FUNCTION log_metrics_event(
    p_user_id UUID,
    p_event_type VARCHAR(50),
    p_entity_type VARCHAR(50) DEFAULT NULL,
    p_entity_id UUID DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO metrics_events (user_id, event_type, entity_type, entity_id, metadata)
    VALUES (p_user_id, p_event_type, p_entity_type, p_entity_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Triggers:**
```sql
-- Trigger: log habit_logged event
CREATE OR REPLACE FUNCTION trigger_log_habit_event()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM log_metrics_event(
        NEW.user_id,
        'habit_logged',
        'habit',
        NEW.habit_id,
        jsonb_build_object('date', NEW.date, 'completed', NEW.completed, 'value', NEW.value)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_habit_log_insert
AFTER INSERT ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION trigger_log_habit_event();

-- Trigger: log task_completed event
CREATE OR REPLACE FUNCTION trigger_log_task_event()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        PERFORM log_metrics_event(
            NEW.user_id,
            'task_completed',
            'task',
            NEW.id,
            jsonb_build_object('title', NEW.title, 'completed_at', NEW.completed_at)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_task_completed
AFTER UPDATE OF status ON tasks
FOR EACH ROW
EXECUTE FUNCTION trigger_log_task_event();

-- Trigger: log mood_logged event
CREATE OR REPLACE FUNCTION trigger_log_mood_event()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM log_metrics_event(
        NEW.user_id,
        'mood_logged',
        'mood',
        NEW.id,
        jsonb_build_object('mood_value', NEW.mood_value, 'mood_type', NEW.mood_type)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_mood_entry_insert
AFTER INSERT ON mood_entries
FOR EACH ROW
EXECUTE FUNCTION trigger_log_mood_event();
```

---

### 5.4.7 Create Streak on Habit Creation

**Trigger:**
```sql
-- Trigger: створити streak record при створенні habit
CREATE OR REPLACE FUNCTION trigger_create_streak_for_habit()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO streaks (user_id, habit_id, current_streak, longest_streak)
    VALUES (NEW.user_id, NEW.id, 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_habit_create
AFTER INSERT ON habits
FOR EACH ROW
EXECUTE FUNCTION trigger_create_streak_for_habit();
```

---

## 5.5 Performance Optimization

### 5.5.1 Query Patterns

**Typical queries:**

1. **Today view (most frequent):**
```sql
-- Отримати день + habits + tasks + mood
SELECT * FROM days WHERE user_id = $1 AND date = CURRENT_DATE;
SELECT * FROM habit_logs WHERE user_id = $1 AND date = CURRENT_DATE;
SELECT * FROM tasks WHERE user_id = $1 AND scheduled_date = CURRENT_DATE AND status = 'pending';
SELECT * FROM mood_entries WHERE user_id = $1 AND date = CURRENT_DATE ORDER BY logged_at DESC;
```

**Optimization:** Composite indexes на `(user_id, date)` + denormalized date.

2. **Habit statistics:**
```sql
-- Completion rate за 30 днів
SELECT 
    date,
    COUNT(*) FILTER (WHERE completed = TRUE) as completed_count,
    COUNT(*) as total_count
FROM habit_logs
WHERE habit_id = $1 AND date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY date
ORDER BY date;
```

**Optimization:** Index на `(habit_id, date DESC)`.

3. **Analytics (heavy):**
```sql
-- Mood vs Habits correlation
SELECT 
    hl.habit_id,
    h.name,
    AVG(d.overall_mood) FILTER (WHERE hl.completed = TRUE) as avg_mood_when_done,
    AVG(d.overall_mood) FILTER (WHERE hl.completed = FALSE OR hl.completed IS NULL) as avg_mood_when_skipped
FROM days d
LEFT JOIN habit_logs hl ON d.id = hl.day_id
LEFT JOIN habits h ON hl.habit_id = h.id
WHERE d.user_id = $1 AND d.date >= $2
GROUP BY hl.habit_id, h.name;
```

**Optimization:** 
- Materialized view (не для MVP, але для scale)
- Cache результати в Redis (майбутнє)

### 5.5.2 Indexes Summary

| Table | Index | Purpose |
|-------|-------|---------|
| days | (user_id, date DESC) | Today + history |
| habit_logs | (user_id, date DESC) | User's logs by date |
| habit_logs | (habit_id, date DESC) | Habit statistics |
| tasks | (user_id, scheduled_date, status) | Today view tasks |
| mood_entries | (user_id, date DESC, logged_at DESC) | Mood chronology |
| journal_entries | GIN on content (tsvector) | Full-text search |

### 5.5.3 Connection Pooling

**Supabase:** Built-in connection pooling (PgBouncer).

**Next.js:** Використовувати Supabase client (вбудований pooling).

---

## 5.6 Backup & Disaster Recovery

### 5.6.1 Supabase Backups

**Automatic:**
- Point-in-time recovery (PITR) — до 7 днів (free tier) або 30+ днів (paid)
- Daily snapshots

**Manual:**
```bash
# Export database через Supabase CLI
supabase db dump -f backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20260121.sql
```

### 5.6.2 Data Export (User-facing)

**Feature:** Export всіх даних у JSON/CSV.

**Implementation:** SQL function або Next.js API route.

```sql
-- Function: export user data as JSON
CREATE OR REPLACE FUNCTION export_user_data(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'user', (SELECT row_to_json(u.*) FROM users u WHERE id = p_user_id),
        'days', (SELECT jsonb_agg(row_to_json(d.*)) FROM days d WHERE user_id = p_user_id),
        'habits', (SELECT jsonb_agg(row_to_json(h.*)) FROM habits h WHERE user_id = p_user_id),
        'habit_logs', (SELECT jsonb_agg(row_to_json(hl.*)) FROM habit_logs hl WHERE user_id = p_user_id),
        'tasks', (SELECT jsonb_agg(row_to_json(t.*)) FROM tasks t WHERE user_id = p_user_id),
        'mood_entries', (SELECT jsonb_agg(row_to_json(m.*)) FROM mood_entries m WHERE user_id = p_user_id),
        'journal_entries', (SELECT jsonb_agg(row_to_json(j.*)) FROM journal_entries j WHERE user_id = p_user_id)
    ) INTO v_result;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

# 6. FUNCTIONAL REQUIREMENTS

## 6.1 Habit System

### 6.1.1 Overview

**Призначення:** Трекінг повторюваних дій (habits) з підтримкою бінарних та кількісних метрик.

**Типи звичок:**
1. **Binary habits:** Yes/No (медитація, тренування, читання)
2. **Quantitative habits:** Число + одиниця виміру (вода: 2.5 літри, сон: 7.5 годин)

**Core principles:**
- Одна звичка = один template
- Логується щодня через habit_logs
- Автоматичний розрахунок streaks
- Гнучка категоризація

---

### 6.1.2 Habit Creation

**User flow:**

1. **Entry point:**
   - Settings → Habits → "Add Habit" button
   - Або: Today view → "Add new habit" quick action

2. **Form fields:**
   ```
   Name*: [Text input, max 100 chars]
   Description: [Textarea, optional]
   Type*: [Radio] Binary | Quantitative
   
   [If Quantitative:]
   Unit*: [Dropdown] liters, hours, km, count, custom
   Target value: [Number] e.g. 2.5 liters
   
   Category: [Dropdown] Health | Productivity | Mindfulness | Social | Custom
   Color: [Color picker] Default #3B82F6
   Icon: [Icon selector] 50+ icons
   ```

3. **Validation:**
   - Name: required, 1–100 chars
   - Type: required
   - Unit: required якщо Quantitative
   - Target value: optional, але має сенс для Quantitative
   - Color: valid hex (#RRGGBB)

4. **Save:**
   - INSERT into habits
   - Trigger створює streak record
   - Habit з'являється в Today view (starting tomorrow або today)

**Business rules:**
- Нова звичка активна за замовчуванням (is_active = TRUE)
- sort_order = MAX(sort_order) + 1 (додається в кінець списку)
- Habit доступна для logging одразу після створення

**Edge cases:**
- Duplicate name: дозволено (user може мати 2 звички з однаковою назвою)
- Empty category: default = NULL, UI показує "Uncategorized"
- Custom unit: user може ввести свою одиницю (e.g. "pages", "reps")

---

### 6.1.3 Habit Logging (Binary)

**User flow:**

1. **Today view:**
   - Список активних binary habits
   - Кожна звичка = card з checkbox або toggle

2. **Log action:**
   ```
   [X] Meditation  <-- tap to toggle
   [ ] Workout
   [X] Reading
   ```

3. **States:**
   - **Not logged (NULL):** Grey, empty checkbox
   - **Completed (TRUE):** Green, filled checkbox ✓
   - **Skipped (FALSE):** Red, X mark

4. **Toggle logic:**
   - NULL → TRUE (tap 1)
   - TRUE → FALSE (tap 2)
   - FALSE → NULL (tap 3, циклічно)

5. **Database:**
   ```sql
   INSERT INTO habit_logs (user_id, habit_id, day_id, date, completed)
   VALUES ($user_id, $habit_id, $day_id, CURRENT_DATE, TRUE)
   ON CONFLICT (habit_id, day_id) 
   DO UPDATE SET completed = EXCLUDED.completed, updated_at = NOW();
   ```

6. **Side effects:**
   - Trigger оновлює streak
   - Metrics event logged
   - Days.updated_at оновлюється

**Business rules:**
- Можна логувати тільки для today або past days
- Future days: недоступні для logging
- Multiple logs per day: неможливо (UNIQUE constraint на habit_id, day_id)

**UX optimization:**
- **Haptic feedback** при toggle (mobile)
- **Optimistic update** — UI оновлюється миттєво, DB async
- **Batch undo** — можливість undo останніх 5 дій (через metrics_events)

---

### 6.1.4 Habit Logging (Quantitative)

**User flow:**

1. **Today view:**
   - Quantitative habit з number input

2. **Input:**
   ```
   Water: [2.5] liters  <-- tap to edit
   Sleep: [7.5] hours
   Steps: [8420] count
   ```

3. **Interaction:**
   - Tap → відкривається number picker (mobile) або input field (desktop)
   - User вводить значення
   - Save → запис у DB

4. **Increment buttons (optional):**
   ```
   Water: [2.5] liters  [-0.5] [+0.5]
   ```
   - Quick increment/decrement
   - Step size: 0.5 для liters, 1 для count, 0.5 для hours

5. **Database:**
   ```sql
   INSERT INTO habit_logs (user_id, habit_id, day_id, date, value)
   VALUES ($user_id, $habit_id, $day_id, CURRENT_DATE, 2.5)
   ON CONFLICT (habit_id, day_id) 
   DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
   ```

**Business rules:**
- Value може бути 0 (валідне значення)
- Value не може бути negative (CHECK constraint на DB або app level)
- Target value — для display, не для validation

**Visual indicators:**
- **Below target:** Orange badge "2.0 / 2.5 L"
- **Met target:** Green badge "2.5 / 2.5 L ✓"
- **Exceeded:** Blue badge "3.0 / 2.5 L"

**Edge cases:**
- Decimal precision: 2 знаки після коми (0.01)
- Large numbers: підтримка до 99999.99 (DECIMAL(10,2))
- Backfill: можна змінити value для past days

---

### 6.1.5 Habit Categories

**Predefined categories:**
- **Health:** 🏃 Workout, meditation, sleep, water
- **Productivity:** 💼 Deep work, inbox zero, daily planning
- **Mindfulness:** 🧘 Meditation, journaling, gratitude
- **Social:** 👥 Call friend, family time
- **Learning:** 📚 Reading, courses, practice
- **Custom:** User-defined

**Category management:**
- User може створити custom category при створенні habit
- Category name: max 50 chars
- Немає окремої таблиці categories (просто VARCHAR)

**UI:**
- Category filter в Habits list: "Show only Health"
- Today view: можна grouping by category (optional)

---

### 6.1.6 Habit Editing

**User flow:**

1. **Entry point:**
   - Habits list → tap habit → Edit button
   - Або: long press на habit card (mobile)

2. **Editable fields:**
   - Name, Description, Category, Color, Icon
   - Target value (для Quantitative)
   - **NOT editable:** Type (binary ↔ quantitative) — requires new habit

3. **Save:**
   - UPDATE habits
   - Historical habit_logs залишаються unchanged

**Business rules:**
- Зміна target_value не впливає на past logs
- Зміна name оновлюється скрізь (через foreign key)

**Edge cases:**
- Якщо habit має 100+ logs, зміна name швидка (не треба оновлювати logs)

---

### 6.1.7 Habit Archiving

**User flow:**

1. **Archive action:**
   - Habits list → tap habit → Archive button
   - Confirmation: "Archive this habit? Historical data will be preserved."

2. **Database:**
   ```sql
   UPDATE habits
   SET is_active = FALSE, archived_at = NOW()
   WHERE id = $habit_id;
   ```

3. **Effects:**
   - Habit зникає з Today view
   - Habit залишається в Habits list з badge "Archived"
   - Historical logs та streak зберігаються
   - Analytics все ще доступна

**Reactivate:**
- Habits list → Archived tab → Reactivate button
- `is_active = TRUE`, `archived_at = NULL`

**Business rules:**
- Архівування ≠ видалення
- User не може permanently delete habit (data integrity)
- Архівовані звички не рахуються в Today completion rate

---

### 6.1.8 Habit Reordering

**User flow:**

1. **Drag-and-drop (mobile/desktop):**
   - Habits list → long press → drag
   - Drop у нову позицію

2. **Database:**
   ```sql
   -- Update sort_order для всіх habits користувача
   UPDATE habits SET sort_order = 1 WHERE id = $id1;
   UPDATE habits SET sort_order = 2 WHERE id = $id2;
   -- ...
   ```

3. **Alternative (mobile):**
   - Move up/down buttons (accessibility)

**Business rules:**
- sort_order = global для користувача (не per category)
- При створенні нової habit → додається в кінець

---

### 6.1.9 Habit Streaks

**Calculation logic:**

**Current streak:**
1. Знайти останній день з completed = TRUE
2. Йти назад, рахуючи consecutive days
3. Зупинитися при completed = FALSE або NULL

**Longest streak:**
1. Знайти всі "groups" consecutive days
2. Вибрати найдовшу групу

**Example:**
```
Days:  1  2  3  4  5  6  7  8  9  10
Logs:  ✓  ✓  ✗  ✓  ✓  ✓  ✓  -  ✓  ✓

Current streak: 2 (days 9-10)
Longest streak: 4 (days 4-7)
```

**Display:**
- Today view: "🔥 5 day streak"
- Habit detail: Graph з streak history
- Streak broken: "Streak reset. Previous: 5 days"

**Business rules:**
- Streak рахується тільки для binary habits (completed = TRUE)
- Quantitative habits: streak якщо value >= target_value (optional feature)
- Пропуск дня (not logged) = streak continues (до midnight)
- Після midnight: якщо not logged → streak = 0

**Edge case:**
- Timezone: streak рахується в user timezone
- Backfill: якщо user додає log для past day → streak recalculates

---

### 6.1.10 Habit Statistics (Preview)

**Quick stats (Today view або Habit detail):**

1. **Completion rate:**
   ```
   Last 7 days: 5/7 (71%)
   Last 30 days: 23/30 (77%)
   All time: 156/200 (78%)
   ```

2. **Streak info:**
   ```
   Current: 5 days 🔥
   Longest: 14 days
   ```

3. **Quantitative stats:**
   ```
   Average: 2.3 L/day
   Total this month: 68.5 L
   Best day: 3.5 L (Jan 15)
   ```

**Detailed analytics → Section 6.6**

---

### 6.1.11 Edge Cases & Validations

**Validation rules:**

| Field | Rule | Error message |
|-------|------|---------------|
| name | 1–100 chars | "Name must be 1-100 characters" |
| type | binary or quantitative | "Invalid type" |
| unit | required if quantitative | "Unit required for quantitative habits" |
| value | >= 0 | "Value cannot be negative" |
| target_value | >= 0 if set | "Target must be positive" |
| color | valid hex | "Invalid color format" |

**Edge cases:**

1. **Logging для past days:**
   - Дозволено до 1 року назад
   - Після 1 року → warning "Are you sure? This is very old data"

2. **Bulk edit:**
   - User вибирає 7 днів → "Mark all as completed"
   - Корисно для backfill

3. **Habit з однаковою назвою:**
   - Дозволено, але UI warning: "You already have habit 'Meditation'"

4. **Archived habit reactivation:**
   - Prompt: "Continue from where you left off or reset streak?"

5. **Delete vs Archive:**
   - MVP: немає delete, тільки archive
   - Future: hard delete через admin panel (з confirmation)

---

## 6.2 Tasks System

### 6.2.1 Overview

**Призначення:** Управління задачами з фокусом на daily execution.

**Philosophy:**
- Task-oriented, не project-oriented
- 80% задач виконуються в день створення або +1 день
- Простота > функціональність
- Немає складних dependencies

**Types:**
- **Scheduled tasks:** Заплановані на конкретний день
- **Backlog tasks:** Не заплановані (scheduled_date = NULL)

---

### 6.2.2 Task Creation

**User flow:**

1. **Entry points:**
   - Today view → "Add task" button → Opens modal
   - Quick add: Floating action button (mobile)
   - Voice input (future): "Add task: Buy groceries"

2. **Form (Quick add):**
   ```
   Title*: [Text input]
   [Add] button
   ```
   - Default: scheduled_date = TODAY, priority = NULL, difficulty = NULL

3. **Form (Full):**
   ```
   Title*: [Text input, max 255 chars]
   Description: [Textarea, Markdown support]
   
   Scheduled date: [Date picker] Today | Tomorrow | Pick date | No date (Backlog)
   Priority: [Buttons] 🔴 High | 🟡 Medium | 🔵 Low | None
   Difficulty: [Slider 1-5] ⭐⭐⭐ (3/5)
   
   Estimated time: [Input] ___ minutes (optional)
   Tags: [Multi-select] #work #urgent #personal
   ```

4. **Save:**
   ```sql
   INSERT INTO tasks (user_id, title, description, scheduled_date, priority, difficulty, tags)
   VALUES ($user_id, $title, $description, $date, $priority, $difficulty, $tags);
   ```

**Business rules:**
- Title: required, 1–255 chars
- scheduled_date: може бути NULL (backlog)
- Priority/Difficulty: optional
- Default status: 'pending'

**UX optimization:**
- **Smart suggestions:** Аналіз past tasks → suggest similar tasks
- **Template tasks:** "Weekly review", "Gym" (recurring patterns)

---

### 6.2.3 Task Scheduling

**Scheduling options:**

1. **Today:** scheduled_date = CURRENT_DATE
2. **Tomorrow:** scheduled_date = CURRENT_DATE + 1
3. **Pick date:** Date picker (до +90 днів)
4. **Backlog:** scheduled_date = NULL

**Reschedule:**
- Drag task до іншого дня (calendar view)
- Або: Edit task → Change date
- Status: 'pending' → 'rescheduled' → Creates new task copy? **НІ** (просто UPDATE scheduled_date)

**Overdue tasks:**
- scheduled_date < CURRENT_DATE AND status = 'pending'
- UI: Red badge "Overdue"
- Auto-prompt: "3 overdue tasks. Reschedule or mark failed?"

**Business rules:**
- Rescheduling не створює new task (UPDATE existing)
- Overdue tasks залишаються в Today view (top of list)

---

### 6.2.4 Task Completion

**User flow:**

1. **Today view:**
   - Task list з checkboxes
   - Tap checkbox → Task completed

2. **Database:**
   ```sql
   -- Update task
   UPDATE tasks
   SET status = 'completed', completed_at = NOW()
   WHERE id = $task_id;
   
   -- Trigger створює task_completion
   INSERT INTO task_completions (user_id, task_id, day_id, completed_at)
   VALUES ($user_id, $task_id, $day_id, NOW());
   ```

3. **Visual feedback:**
   - Checkbox animation (checkmark + confetti optional)
   - Task strikethrough
   - Move до "Completed" section (collapsible)

**Uncomplete:**
- Tap completed task → Confirmation "Mark as incomplete?"
- DELETE from task_completions
- UPDATE tasks status = 'pending'

**Business rules:**
- Task може бути completed тільки один раз (UNIQUE constraint на task_id, day_id)
- Completed_at = NOW() (в user timezone)
- Metrics event: 'task_completed'

---

### 6.2.5 Task Failure

**Use case:** User вирішив не робити задачу.

**User flow:**

1. **Action:**
   - Long press на task (mobile) → Context menu
   - "Mark as failed" або "Won't do"

2. **Database:**
   ```sql
   UPDATE tasks
   SET status = 'failed'
   WHERE id = $task_id;
   ```

3. **UI:**
   - Task зникає з Today view
   - Доступна в History з badge "Failed"

**Difference: Completed vs Failed:**
- **Completed:** Виконано, рахується в productivity stats
- **Failed:** Не виконано, не рахується
- **Rescheduled:** Перенесено (перехідний стан, deprecated у користь простого UPDATE date)

**Business rules:**
- Failed task не створює task_completion
- Failed task не показується в Today view
- Analytics: Failed tasks враховуються для "planned vs done" ratio

---

### 6.2.6 Task Priority & Difficulty

**Priority (1–3):**
- **1 = High (🔴):** Urgent, important
- **2 = Medium (🟡):** Important, not urgent
- **3 = Low (🔵):** Nice to have
- **NULL:** No priority

**Use in UI:**
- Sorting: High priority tasks on top
- Color coding: Border або badge
- Filtering: "Show only high priority"

**Difficulty (1–5):**
- **1:** Trivial (5 min)
- **2:** Easy (15 min)
- **3:** Medium (30–60 min)
- **4:** Hard (2–3 hours)
- **5:** Very hard (half day+)

**Use cases:**
- **Analytics:** Складні задачі completed → higher satisfaction?
- **Planning:** Sum difficulty → day capacity estimate
- **Motivation:** Start with easy tasks (momentum)

**Business rules:**
- Priority/Difficulty: optional (можна не вказувати)
- Difficulty ≠ estimated_duration (difficulty — perceived complexity, duration — actual time)

---

### 6.2.7 Task Tags

**Purpose:** Гнучка категоризація.

**Implementation:**
- PostgreSQL array: `tags TEXT[]`
- Predefined tags: #work, #personal, #urgent, #health, #learning
- Custom tags: User може додати будь-які

**UI:**
- Multi-select dropdown
- Tag pills з кольорами
- Auto-suggest based on past tags

**Use cases:**
- **Filtering:** "Show only #work tasks"
- **Analytics:** "How many #work tasks completed this month?"
- **Context switching:** Group tasks by tag

**Business rules:**
- Tag format: lowercase, no spaces (or auto-convert)
- Max 10 tags per task
- Tags case-insensitive

---

### 6.2.8 Task List Views

**Today view (default):**
```
📅 Today — January 21

⚠️ OVERDUE (2)
- [ ] Buy groceries (Jan 20) 🔴

📌 PENDING (5)
- [ ] Write report 🔴 #work
- [ ] Call dentist 🟡
- [ ] Review PR
- [ ] Plan weekend
- [ ] Read chapter 5 🔵 #learning

✅ COMPLETED (3)
- [x] Morning meditation
- [x] Email inbox
- [x] Team standup
```

**Backlog view:**
```
📥 Backlog (12 tasks)

Sort by: Priority | Created date | Difficulty

- [ ] Research vacation spots 🟡
- [ ] Fix bike
- [ ] Organize photos
- [ ] ...
```

**Calendar view (future):**
```
Mon | Tue | Wed | ...
3   | 5   | 2   | ... (number of tasks)
```

**Completed history:**
```
This week: 24 tasks
Last week: 19 tasks
This month: 98 tasks
```

---

### 6.2.9 Task Details Modal

**UI layout:**

```
┌─────────────────────────────────────┐
│ [X] Write quarterly report       🔴 │
│                                     │
│ Description (Markdown):             │
│ ┌─────────────────────────────────┐ │
│ │ - Collect Q4 metrics            │ │
│ │ - Draft executive summary       │ │
│ │ - Review with team              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Scheduled: Tomorrow (Jan 22)        │
│ Priority: High 🔴                   │
│ Difficulty: ⭐⭐⭐⭐ (4/5)            │
│ Tags: #work #quarterly              │
│                                     │
│ Created: Jan 21, 10:30 AM           │
│ Completed: —                        │
│                                     │
│ [Edit] [Reschedule] [Delete]        │
└─────────────────────────────────────┘
```

**Actions:**
- Edit: Modal → Edit form
- Reschedule: Date picker
- Delete: Soft delete (status = 'deleted') або hard delete з confirmation

---

### 6.2.10 Edge Cases

**Edge case 1: Task scheduled for future, completed early**
- User вирішив зробити раніше
- Allow: completed_at може бути before scheduled_date
- Task completion рахується на день completed_at (не scheduled_date)

**Edge case 2: Bulk operations**
- Select multiple tasks → Bulk actions:
  - Mark completed
  - Reschedule to tomorrow
  - Change priority
  - Add tag

**Edge case 3: Recurring tasks**
- MVP: Немає native recurring
- Workaround: User manually creates task кожного разу
- Future: "Repeat: Daily / Weekly / Monthly"

**Edge case 4: Task з дуже довгим title**
- Truncate у списку: "Write quarterly report for exe..."
- Full text у detail view

**Edge case 5: Порожній backlog**
- Empty state: "No tasks in backlog. Create one?"

---

## 6.3 Mood & State Tracking

### 6.3.1 Overview

**Призначення:** Швидкий logging настрою та фізичного стану.

**Metrics:**
1. **Mood (primary):** 1–5 scale
2. **Energy level (optional):** 1–5 scale
3. **Stress level (optional):** 1–5 scale
4. **Context tags:** What influenced mood

**Philosophy:**
- Швидкий input (< 10 секунд)
- Можливість multiple entries per day
- Контекст > абсолютне значення

---

### 6.3.2 Mood Logging

**User flow:**

1. **Entry point:**
   - Today view → Mood section
   - Quick action widget (mobile home screen)
   - Notification prompt: "How are you feeling?" (optional)

2. **Quick log (default):**
   ```
   How are you feeling?
   
   😢 😟 😐 🙂 😄
   1   2   3  4  5
   
   [Log mood]
   ```

3. **Detailed log (optional expand):**
   ```
   Mood: 😐 3/5
   Energy: ⚡⚡⚡ 3/5
   Stress: 📈📈 2/5
   
   Context (optional):
   [x] Work
   [ ] Social
   [x] Tired
   [ ] Excited
   
   [Log]
   ```

4. **Database:**
   ```sql
   INSERT INTO mood_entries (
       user_id, day_id, date, 
       mood_value, mood_type, 
       energy_level, stress_level, tags
   )
   VALUES (
       $user_id, $day_id, CURRENT_DATE,
       3, 'adhoc',
       3, 2, ARRAY['work', 'tired']
   );
   ```

**Business rules:**
- mood_value: required (1–5)
- energy_level, stress_level: optional
- Tags: optional, max 10
- Multiple entries per day: дозволено

---

### 6.3.3 Mood Types

**mood_type field:**
- **morning:** Ранковий mood (після wake up)
- **evening:** Вечірній mood (перед сном)
- **adhoc:** Спонтанний logging протягом дня

**Use cases:**
1. **Morning check-in:**
   - Prompt: "Good morning! How did you wake up?"
   - Логує з mood_type = 'morning'

2. **Evening reflection:**
   - Prompt: "How was your day overall?"
   - Логує з mood_type = 'evening'
   - Використовується для days.overall_mood

3. **Ad-hoc:**
   - User сам вирішує залогувати
   - Контекстний (після події)

**Overall mood calculation:**
1. Якщо є evening mood → use it
2. Інакше: average всіх mood entries за день
3. Якщо тільки один entry → use it

---

### 6.3.4 Energy & Stress Levels

**Energy level (1–5):**
- **1:** Exhausted, can't focus
- **2:** Low energy, tired
- **3:** Normal, okay
- **4:** Good energy, productive
- **5:** High energy, peak performance

**Stress level (1–5):**
- **1:** Very calm, relaxed
- **2:** Slightly stressed
- **3:** Moderate stress
- **4:** High stress, anxious
- **5:** Extremely stressed, overwhelmed

**UI:**
- Sliders або emoji pickers
- Optional fields (can be skipped)
- Visual correlation: High stress + Low energy → suggest break

**Use in analytics:**
- Correlation: Energy level vs Productivity
- Correlation: Stress level vs Mood
- Patterns: When is energy lowest? (time of day)

---

### 6.3.5 Context Tags

**Purpose:** Пояснити, чому такий mood.

**Predefined tags:**
- **Positive:** #excited, #grateful, #accomplished, #relaxed, #motivated
- **Negative:** #tired, #anxious, #frustrated, #bored, #overwhelmed
- **Neutral:** #work, #social, #exercise, #weather, #sleep

**Custom tags:**
- User може додати свої

**UI:**
- Multi-select pills
- Grouped by sentiment (positive/negative/neutral)
- Quick select: Top 5 most used tags

**Use cases:**
- **Pattern recognition:** "#work often correlates with low mood"
- **Journaling prompt:** "You logged #anxious. Want to write about it?"
- **Analytics:** Tag frequency over time

---

### 6.3.6 Mood Timeline

**Display:**

**Today view:**
```
Mood today: 
😐 3/5 (10:30 AM) — #work #tired
🙂 4/5 (3:45 PM) — #coffee_break
```

**Weekly view:**
```
Mon: 😢 2/5
Tue: 😐 3/5
Wed: 🙂 4/5
Thu: 🙂 4/5
Fri: 😄 5/5
Sat: 😄 5/5
Sun: 🙂 4/5

Average: 3.9/5
```

**Graph:**
- Line graph з mood over time
- Можна zoom in/out (day, week, month)
- Annotations: Hover → see tags

---

### 6.3.7 Mood Prompts (Optional)

**Scheduled prompts:**
- Morning: 8:00 AM → "Good morning! How are you feeling?"
- Evening: 9:00 PM → "How was your day?"

**Context-aware prompts:**
- After completing difficult task → "How do you feel now?"
- After workout → "Mood check?"

**Settings:**
- User може enable/disable prompts
- Customize times
- Frequency: Daily, 3x/week, etc.

**Implementation:**
- Push notifications (PWA)
- Або: in-app prompts

---

### 6.3.8 Edge Cases

**Edge case 1: Multiple moods, різні значення**
- Morning: 2/5
- Afternoon: 5/5
- Evening: 3/5
- **Overall:** Use evening (3/5) або average (3.3 → 3)

**Edge case 2: Logging mood для past days**
- Дозволено (backfill)
- Prompt: "This is for yesterday. Are you sure?"

**Edge case 3: Забув залогувати кілька днів**
- Gap у даних
- Analytics: Interpolate або skip gap (не вигадувати дані)

**Edge case 4: Mood = 1 кілька днів підряд**
- Trigger: "Your mood has been low. Consider talking to someone."
- Sensitive → optional feature

---

## 6.4 Daily Journal

### 6.4.1 Overview

**Призначення:** Текстові нотатки про день, рефлексії, thoughts.

**Formats:**
- Free-form text (Markdown)
- Templates (daily reflection, gratitude, etc.)
- Tags для організації

**Philosophy:**
- Швидкий capture
- Не обов'язково писати кожного дня
- Full-text search

---

### 6.4.2 Journal Entry Creation

**User flow:**

1. **Entry point:**
   - Today view → "Journal" section → "Add entry"
   - Floating action button

2. **Editor:**
   ```
   ┌─────────────────────────────────────┐
   │ Journal — January 21                │
   │                                     │
   │ [Template ▼] Blank | Daily | ...   │
   │                                     │
   │ ┌─────────────────────────────────┐ │
   │ │ [Markdown editor]               │ │
   │ │                                 │ │
   │ │ Today was productive. Finished  │ │
   │ │ the report, went to gym.        │ │
   │ │                                 │ │
   │ │ Feeling tired but accomplished. │ │
   │ └─────────────────────────────────┘ │
   │                                     │
   │ Tags: [#productive #gym]            │
   │                                     │
   │ [Save] [Cancel]                     │
   └─────────────────────────────────────┘
   ```

3. **Database:**
   ```sql
   INSERT INTO journal_entries (
       user_id, day_id, date, 
       content, template_used, tags
   )
   VALUES (
       $user_id, $day_id, CURRENT_DATE,
       $content, NULL, ARRAY['productive', 'gym']
   );
   ```

**Business rules:**
- content: required (min 1 char, no max)
- Multiple entries per day: дозволено
- Markdown підтримка: headings, lists, bold, italic, links

---

### 6.4.3 Journal Templates

**Predefined templates:**

**1. Daily Reflection:**
```markdown
## Daily Reflection — {date}

### What went well?
- 

### What could be better?
- 

### What did I learn?
- 

### Tomorrow's focus:
- 
```

**2. Gratitude:**
```markdown
## Gratitude — {date}

Today I'm grateful for:
1. 
2. 
3. 
```

**3. Weekly Review:**
```markdown
## Weekly Review — Week {number}

### Achievements:
- 

### Challenges:
- 

### Next week goals:
- 
```

**4. Blank:**
- Порожній editor

**Custom templates:**
- User може створити власні (future feature)
- Зберігаються в user.preferences

**Usage:**
- Select template → Editor prefilled
- User може змінити/видалити sections

---

### 6.4.4 Markdown Support

**Supported syntax:**

```markdown
# Heading 1
## Heading 2

**Bold** *Italic* ~~Strikethrough~~

- Bullet list
1. Numbered list

> Blockquote

[Link](https://example.com)

`Code inline`

---
```

**Not supported (MVP):**
- Images/media uploads
- Tables (складно на mobile)
- Code blocks з syntax highlighting

**Rendering:**
- Preview mode: Rendered Markdown
- Edit mode: Raw Markdown з syntax highlighting

---

### 6.4.5 Journal Entry List

**UI:**

```
📝 Journal Entries

🔍 [Search...] 🏷️ [Filter by tag]

─────────────────────────────
Jan 21, 2026 — 9:45 PM

Today was productive. Finished the report...
#productive #gym

[Edit] [Delete]
─────────────────────────────
Jan 20, 2026 — 10:15 PM

Had a difficult day. Missed workout...
#tired #work_stress

[Edit] [Delete]
─────────────────────────────
```

**Features:**
- **Search:** Full-text search через PostgreSQL tsvector
- **Filter by tag:** Show only entries з певним тегом
- **Date range:** Last 7 days, Last month, All time
- **Infinite scroll** (pagination)

---

### 6.4.6 Full-Text Search

**Implementation:**

**Index:**
```sql
CREATE INDEX idx_journal_entries_content_fts 
ON journal_entries 
USING GIN(to_tsvector('english', content));
```

**Query:**
```sql
SELECT *
FROM journal_entries
WHERE user_id = $user_id
  AND to_tsvector('english', content) @@ plainto_tsquery('english', $search_query)
ORDER BY date DESC
LIMIT 20;
```

**UI:**
- Search bar з autocomplete (based on past queries)
- Highlight matched text у results
- Search також по tags

**Search examples:**
- "gym" → Finds entries mentioning gym
- "productive day" → Finds entries з обома словами
- "#work" → Filter by tag

---

### 6.4.7 Journal Analytics (Preview)

**Metrics:**

1. **Writing frequency:**
   - Entries this week: 5
   - Entries this month: 18
   - Longest streak: 12 days

2. **Word count:**
   - Average: 127 words/entry
   - Total this month: 2,286 words
   - Longest entry: 487 words

3. **Common themes (tags):**
   - #productive: 23 entries
   - #work: 18 entries
   - #gym: 15 entries

4. **Sentiment analysis (future):**
   - Positive entries: 60%
   - Neutral: 30%
   - Negative: 10%

---

### 6.4.8 Edge Cases

**Edge case 1: Дуже довгий entry (10,000+ words)**
- UI: Pagination або "Read more" collapse
- Performance: OK (TEXT field підтримує)

**Edge case 2: Entry без тегів**
- Allowed
- Default: No tags

**Edge case 3: Multiple entries за один день**
- Allowed
- Use case: Morning reflection + Evening summary

**Edge case 4: Редагування старого entry**
- Allowed
- updated_at timestamp оновлюється
- No version history (MVP)

---

# 6.5 Daily View (UI Integration)

## 6.5.1 Overview

**Призначення:** Центральний екран застосунку. Єдина точка входу для всього щоденного logging.

**Philosophy:**
- Single screen для всіх дій
- Minimal scrolling
- Quick actions < 5 секунд
- Information density without clutter

**Layout priority:**
1. Date header
2. Mood quick log
3. Habits checklist
4. Tasks list
5. Journal entry
6. Quick stats

---

## 6.5.2 Layout Structure

### Mobile Layout (Primary)

```
┌─────────────────────────────────────┐
│ ☰  Life OS        Today      ⚙️ 👤  │ ← Header
├─────────────────────────────────────┤
│ Wednesday, January 21, 2026         │ ← Date
│ Week 3 of 2026                      │
├─────────────────────────────────────┤
│ 😊 How are you feeling?             │ ← Mood (always visible)
│ 😢 😟 😐 🙂 😄                      │
│     1  2  3  4  5                   │
├─────────────────────────────────────┤
│ ✅ Habits (3/5 completed)           │ ← Habits section
│ [✓] Meditation           🔥 5 days  │
│ [ ] Workout                         │
│ [✓] Reading                         │
│ Water: [2.5] L / 3.0 L              │
│ [ ] No alcohol                      │
│                                     │
│ [+ Add habit]                       │
├─────────────────────────────────────┤
│ 📋 Tasks (2/5 completed)            │ ← Tasks section
│                                     │
│ ⚠️ OVERDUE                          │
│ [ ] Buy groceries 🔴                │
│                                     │
│ 📌 PENDING                          │
│ [ ] Write report 🔴 #work           │
│ [ ] Call dentist 🟡                 │
│ [ ] Review PR                       │
│                                     │
│ ✓ COMPLETED (collapsed)             │
│   [Show 2 completed]                │
│                                     │
│ [+ Add task]                        │
├─────────────────────────────────────┤
│ 📝 Journal                          │ ← Journal section
│ No entries yet today.               │
│ [+ Write something]                 │
├─────────────────────────────────────┤
│ 📊 Quick Stats                      │ ← Stats (collapsible)
│ Habits: 60% this week               │
│ Tasks: 23 completed this week       │
│ Avg mood: 4.2                       │
├─────────────────────────────────────┤
│ 🔥 [Today] 📅 [Calendar] 📊         │ ← Bottom nav
└─────────────────────────────────────┘
```

### Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Life OS          Today  Calendar  Analytics  Settings  👤   │
├────────────────────────────┬────────────────────────────────┤
│                            │                                │
│ Wednesday, Jan 21, 2026    │  📊 INSIGHTS                   │
│ Week 3                     │                                │
│                            │  🔥 5-day streak!              │
│ ──────────────────────     │  Keep it up!                   │
│                            │                                │
│ 😊 Mood Check              │  📈 This week:                 │
│ 😢 😟 😐 🙂 😄             │  • Habits: 21/35 (60%)         │
│                            │  • Tasks: 23 completed         │
│ ──────────────────────     │  • Mood avg: 4.2               │
│                            │                                │
│ ✅ Habits (3/5)            │  🎯 Streaks:                   │
│ [✓] Meditation   🔥 5      │  • Meditation: 5 days          │
│ [ ] Workout                │  • Reading: 3 days             │
│ [✓] Reading      🔥 3      │                                │
│ [ ] No alcohol             │  [View detailed analytics →]   │
│ Water: 2.5/3.0 L           │                                │
│                            │                                │
│ ──────────────────────     │ ───────────────────────────    │
│                            │                                │
│ 📋 Tasks (2/5)             │  📅 UPCOMING                   │
│                            │                                │
│ [ ] Write report 🔴        │  Tomorrow:                     │
│ [ ] Call dentist 🟡        │  • Team meeting                │
│ [ ] Review PR              │  • Dentist appointment         │
│                            │                                │
│ ✓ Completed (2) [show]     │  This week:                    │
│                            │  • 8 pending tasks             │
│ ──────────────────────     │                                │
│                            │                                │
│ 📝 Journal                 │                                │
│ [Write something...]       │                                │
│                            │                                │
└────────────────────────────┴────────────────────────────────┘
```

---

## 6.5.3 Section Interactions

### Mood Section

**Default state:**
```
😊 How are you feeling?
😢 😟 😐 🙂 😄
```

**After log:**
```
Your mood: 😊 4/5
Logged at 10:30 AM

[Change] [Add note]
```

**Expanded (optional):**
```
Mood: 😊 4/5
Energy: ⚡⚡⚡⚡ 4/5
Stress: 📈 1/5

Tags: [x] Productive [ ] Tired

[Save]
```

---

### Habits Section

**Layout:**

```
✅ Habits (3/5 completed)

[✓] Meditation                    🔥 5 days
    Daily • 5/7 this week

[ ] Workout                       ⚠️ Missed yesterday
    Daily • 2/7 this week

[✓] Reading                       🔥 3 days
    Daily • 6/7 this week

Water: [2.5] L        [-] [+]     Target: 3.0 L
       ▓▓▓▓▓▓▓▓▓░░░░  83%

[ ] No alcohol
    Daily • 7/7 this week ✓

[+ Add habit]
```

**Interaction patterns:**

1. **Binary habit:**
   - Single tap → Toggle (NULL → TRUE → FALSE → NULL)
   - Long press → Habit detail view

2. **Quantitative habit:**
   - Tap number → Open numeric keypad
   - Tap +/- buttons → Increment/decrement
   - Long press → Habit detail

3. **Progress indicators:**
   - Green: Completed today
   - Grey: Not logged
   - Red: Skipped today
   - Streak badge: 🔥 N days

**Smart features:**
- **Reorder:** Long press + drag
- **Swipe actions:** Swipe left → Quick complete
- **Bulk actions:** Long press → Select multiple → Mark all as done

---

### Tasks Section

**Layout:**

```
📋 Tasks (2/5 completed)

⚠️ OVERDUE (1)
[ ] Buy groceries 🔴
    Scheduled: Yesterday

📌 TODAY (3)
[ ] Write report 🔴 #work
    Est: 2h • Difficulty: ⭐⭐⭐⭐

[ ] Call dentist 🟡
    Est: 15m

[ ] Review PR
    #work

✅ COMPLETED (2) [Expand ▼]

[+ Add task]
```

**Interaction patterns:**

1. **Complete task:**
   - Tap checkbox → Strikethrough animation → Move to Completed

2. **Quick actions:**
   - Swipe right → Complete
   - Swipe left → Reschedule, Delete

3. **Detail view:**
   - Tap task card → Full detail modal

**Sort options:**
- Priority (default)
- Difficulty (easy first)
- Created date
- Estimated time

**Filters:**
- All tasks
- Only high priority
- Only tagged #work
- Hide completed

---

### Journal Section

**Empty state:**
```
📝 Journal
No entries yet today.

[+ Write something] [📋 Use template]
```

**With entry:**
```
📝 Journal (1 entry)

─────────────────────────────
10:30 AM

Today was productive. Finished the report,
went to gym. Feeling accomplished.

#productive #gym

[Edit] [Add another entry]
─────────────────────────────
```

**Quick add:**
- Tap "+ Write something" → Opens modal editor
- Template selection: Blank, Daily, Gratitude, Custom

---

### Quick Stats Section

**Collapsible summary:**

```
📊 Quick Stats [Expand ▼]

This week:
• Habits: 21/35 (60%)
• Tasks: 23 completed
• Avg mood: 4.2
• Journal: 5 entries

[View detailed analytics →]
```

**Expanded:**
```
📊 Stats

TODAY
• Habits: 3/5
• Tasks: 2/5
• Mood: 4/5
• Journal: 1 entry

THIS WEEK
• Habit completion: 60%
• Tasks completed: 23
• Mood average: 4.2/5
• Most productive day: Wednesday

THIS MONTH
• Total habit logs: 127
• Total tasks: 98
• Best streak: 14 days (Meditation)

[Full analytics →]
```

---

## 6.5.4 Navigation & Actions

### Header Actions

```
┌─────────────────────────────────────┐
│ ☰  Life OS        Today      ⚙️ 👤  │
└─────────────────────────────────────┘
```

**☰ Menu:**
- Today (current)
- Calendar
- Analytics
- Habits
- Tasks
- Journal
- Settings

**Today:** Badge якщо є incomplete items

**⚙️ Settings:**
- Account
- Preferences
- Data export
- Help

**👤 Profile:**
- User info
- Logout

### Bottom Navigation (Mobile)

```
┌─────────────────────────────────────┐
│ 🔥 Today  📅 Calendar  📊 Analytics │
└─────────────────────────────────────┘
```

**Active state:** Bold + colored indicator

---

### Floating Action Button (FAB)

**Position:** Bottom right corner (mobile)

**Actions (context menu on long press):**
- Quick log habit
- Add task
- Log mood
- Write journal

**Default action (single tap):**
- Depends on context
- Today view: Add task (most common)
- Habits view: Add habit
- Journal view: New entry

---

## 6.5.5 Progressive Disclosure

**Principle:** Show essential info, hide details until needed.

**Examples:**

1. **Completed tasks:**
   - Default: Collapsed "✅ Completed (5) [Show]"
   - Expand: Shows list
   - Auto-collapse after 1 hour

2. **Habit details:**
   - Default: Name + checkbox/value + streak
   - Tap: Shows weekly stats + graph

3. **Quick stats:**
   - Default: Collapsed
   - Expand: Detailed breakdown

**Benefits:**
- Reduces visual clutter
- Faster load time
- Mobile-friendly scrolling

---

## 6.5.6 Empty States

**First-time user (onboarding):**

```
👋 Welcome to Life OS!

Let's set up your first habit.

[Create habit]

Or explore:
• [Add a task]
• [Log your mood]
• [Write in journal]
```

**No habits:**
```
✅ Habits

You haven't created any habits yet.

[+ Create your first habit]

Popular habits:
• Meditation
• Workout
• Reading
• Drink water
```

**No tasks:**
```
📋 Tasks

All clear! No tasks for today.

[+ Add a task]
```

**No mood logged:**
```
😊 Mood

Haven't checked in today. How are you?

😢 😟 😐 🙂 😄
```

---

## 6.5.7 Loading & Performance

**Initial load:**
1. Show skeleton screens
2. Load critical data first (today's habits, tasks)
3. Progressive enhancement (stats, streaks)

**Optimistic updates:**
- Habit toggle → Update UI immediately, sync DB in background
- Task complete → Strikethrough immediately
- Mood log → Show confirmation instantly

**Offline support (PWA):**
- Queue actions when offline
- Sync when connection restored
- Show offline indicator

**Performance targets:**
- Initial load: < 1 second
- Habit toggle: < 100ms perceived
- Task add: < 200ms
- Page transition: < 300ms

---

## 6.5.8 Responsive Breakpoints

**Mobile (< 768px):**
- Single column
- Full-width sections
- Bottom navigation
- Collapsible stats

**Tablet (768px – 1024px):**
- Two columns: Main + Sidebar
- Sidebar: Insights, upcoming
- Side navigation

**Desktop (> 1024px):**
- Three columns: Sidebar + Main + Insights
- Persistent navigation
- More information density
- Keyboard shortcuts

---

## 6.5.9 Accessibility

**Keyboard navigation:**
- Tab: Navigate between sections
- Enter: Toggle habit / Complete task
- Space: Open modal
- Esc: Close modal

**Screen reader support:**
- Semantic HTML
- ARIA labels
- Announce state changes ("Task completed")

**Color contrast:**
- WCAG AA compliance
- High contrast mode option

**Touch targets:**
- Minimum 44×44px (Apple HIG)
- Adequate spacing between elements

---

## 6.5.10 Animations & Feedback

**Micro-interactions:**

1. **Habit toggle:**
   - Checkmark animation (SVG)
   - Haptic feedback (mobile)
   - Color transition (grey → green)

2. **Task complete:**
   - Checkbox fill animation
   - Strikethrough text
   - Optional confetti (user preference)
   - Move to completed section

3. **Mood select:**
   - Emoji bounce
   - Ripple effect
   - Success toast

4. **Streak milestone:**
   - Fire emoji pulse animation
   - Toast: "🔥 5-day streak!"
   - Optional sound effect

**Performance:**
- Use CSS transitions (GPU accelerated)
- Avoid layout thrashing
- 60 FPS target

---

Тепер переходимо до найважливішого розділу: **6.6 Analytics & Statistics**.

---

# 6.6 Analytics & Statistics

## 6.6.1 Overview

**Philosophy:**
> "Analytics not as afterthought, but as the core reason product exists."

**Principles:**
1. **Actionable insights** > Pretty charts
2. **Patterns** > Isolated data points
3. **Long-term trends** > Daily fluctuations
4. **Correlations** > Single metrics
5. **Context** > Numbers

**Analytics layers:**
- **Descriptive:** What happened?
- **Diagnostic:** Why did it happen?
- **Predictive:** What will happen? (future)
- **Prescriptive:** What should I do? (future)

**MVP focus:** Descriptive + Diagnostic

---

## 6.6.2 Analytics Architecture

### Data Aggregation Strategy

**Real-time vs Pre-computed:**

| Metric | Strategy | Reason |
|--------|----------|--------|
| Today's stats | Real-time | Small dataset, fast query |
| Last 7 days | Real-time | Manageable, queries < 100ms |
| Last 30 days | Real-time | Queries < 500ms acceptable |
| Last 3+ months | Pre-computed (optional) | Heavy queries, cache results |
| Correlations | Pre-computed | Complex computations |

**Caching strategy:**
- Use PostgreSQL materialized views (не MVP)
- Cache у Redis з TTL (майбутнє)
- Client-side cache (React Query, 5 min TTL)

---

## 6.6.3 Habit Analytics

### 6.6.3.1 Completion Rate

**Query (Last 30 days):**

```sql
-- Completion rate per habit
SELECT 
    h.id,
    h.name,
    COUNT(*) FILTER (WHERE hl.completed = TRUE) as completed_count,
    COUNT(*) FILTER (WHERE hl.completed = FALSE) as skipped_count,
    COUNT(*) FILTER (WHERE hl.completed IS NULL) as not_logged_count,
    COUNT(*) as total_days,
    ROUND(
        COUNT(*) FILTER (WHERE hl.completed = TRUE) * 100.0 / COUNT(*),
        1
    ) as completion_rate
FROM habits h
LEFT JOIN habit_logs hl ON h.id = hl.habit_id 
    AND hl.date >= CURRENT_DATE - INTERVAL '30 days'
    AND hl.date <= CURRENT_DATE
WHERE h.user_id = $user_id
    AND h.is_active = TRUE
GROUP BY h.id, h.name
ORDER BY completion_rate DESC;
```

**Visualization:**

```
Meditation     ▓▓▓▓▓▓▓▓▓░  92% (28/30)
Reading        ▓▓▓▓▓▓▓░░░  77% (23/30)
Workout        ▓▓▓▓▓░░░░░  60% (18/30)
Water 2.5L     ▓▓▓▓░░░░░░  50% (15/30)
```

**Insights:**
- "Your best habit: Meditation (92%)"
- "Workout needs attention (60%)"

---

### 6.6.3.2 Heatmap (Calendar View)

**Query (Last 90 days):**

```sql
-- Daily habit completion heatmap
SELECT 
    date,
    COUNT(*) FILTER (WHERE completed = TRUE) as completed,
    COUNT(*) as total,
    ROUND(
        COUNT(*) FILTER (WHERE completed = TRUE) * 100.0 / NULLIF(COUNT(*), 0),
        0
    ) as completion_percentage
FROM habit_logs
WHERE user_id = $user_id
    AND date >= CURRENT_DATE - INTERVAL '90 days'
    AND date <= CURRENT_DATE
GROUP BY date
ORDER BY date;
```

**Visualization:**

```
        Mon Tue Wed Thu Fri Sat Sun
Week 1  ███ ██░ ███ ░░░ ███ ███ ██░
Week 2  ███ ███ ███ ██░ ░░░ ███ ███
Week 3  ███ ░░░ ███ ███ ███ ██░ ███

Color scale:
███ 80-100% (green)
██░ 50-79% (yellow)
░░░ 0-49% (red)
```

**Insights:**
- "Thursdays are your weakest day (45% avg)"
- "Weekends are strong (85% avg)"

---

### 6.6.3.3 Streak Analysis

**Query (Streak history):**

```sql
-- Calculate all streaks for a habit
WITH streak_groups AS (
    SELECT 
        date,
        completed,
        date - (ROW_NUMBER() OVER (ORDER BY date))::INTEGER AS streak_group
    FROM habit_logs
    WHERE habit_id = $habit_id
        AND completed = TRUE
    ORDER BY date
)
SELECT 
    MIN(date) as streak_start,
    MAX(date) as streak_end,
    COUNT(*) as streak_length
FROM streak_groups
GROUP BY streak_group
ORDER BY streak_length DESC
LIMIT 10;
```

**Visualization:**

```
🔥 Streaks for Meditation

Current: 5 days (Jan 17 - Jan 21)

All-time streaks:
1. 14 days  ████████████████  Dec 1 - Dec 14
2. 9 days   ███████████       Nov 10 - Nov 18
3. 7 days   ██████████        Oct 5 - Oct 11
4. 5 days   ████████          Jan 17 - Jan 21 (current)
5. 4 days   ███████           Sep 20 - Sep 23
```

**Insights:**
- "Your longest streak: 14 days"
- "You're 9 days away from a new record!"

---

### 6.6.3.4 Time-of-Day Analysis

**Query:**

```sql
-- When do you log habits most?
SELECT 
    EXTRACT(HOUR FROM logged_at) as hour,
    COUNT(*) as log_count
FROM habit_logs
WHERE user_id = $user_id
    AND date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY hour
ORDER BY hour;
```

**Visualization:**

```
Hour of day distribution:

6 AM  ██
7 AM  ████
8 AM  ███████  ← Peak morning logging
9 AM  ████
10 AM ██
...
8 PM  ████
9 PM  ██████  ← Peak evening logging
10 PM ███
```

**Insights:**
- "You're most active at 8 AM and 9 PM"
- "Consider scheduling reminders at these times"

---

### 6.6.3.5 Quantitative Habit Trends

**Query (Water intake example):**

```sql
-- Daily values + rolling average
SELECT 
    date,
    value,
    AVG(value) OVER (
        ORDER BY date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as rolling_7day_avg
FROM habit_logs
WHERE habit_id = $habit_id
    AND date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date;
```

**Visualization:**

```
Water Intake (Liters)

4.0 ┤
3.5 ┤         ●
3.0 ┤    ●  ●   ●    ●  Target ─────────
2.5 ┤  ●        ● ●  
2.0 ┤●            
1.5 ┤
    └────────────────────────────────
     Jan 1        Jan 15        Jan 30

● Daily value
─ 7-day rolling average
```

**Stats:**
```
Average: 2.4 L/day
Target: 3.0 L/day
Days met target: 12/30 (40%)
Highest: 3.5 L (Jan 12)
Lowest: 1.5 L (Jan 3)
Trend: ↗ Improving (+0.3 L/week)
```

---

## 6.6.4 Task Analytics

### 6.6.4.1 Productivity Metrics

**Query:**

```sql
-- Daily task completion
SELECT 
    t.scheduled_date as date,
    COUNT(*) as total_tasks,
    COUNT(*) FILTER (WHERE t.status = 'completed') as completed,
    COUNT(*) FILTER (WHERE t.status = 'failed') as failed,
    COUNT(*) FILTER (WHERE t.status = 'pending') as pending,
    ROUND(
        COUNT(*) FILTER (WHERE t.status = 'completed') * 100.0 / COUNT(*),
        1
    ) as completion_rate
FROM tasks t
WHERE t.user_id = $user_id
    AND t.scheduled_date >= CURRENT_DATE - INTERVAL '30 days'
    AND t.scheduled_date <= CURRENT_DATE
GROUP BY t.scheduled_date
ORDER BY t.scheduled_date;
```

**Visualization:**

```
Tasks Completed (Last 30 days)

10 ┤    ●
 9 ┤      ●
 8 ┤  ●    
 7 ┤          ●  ●
 6 ┤●        ●    ●
 5 ┤              
 4 ┤  
 3 ┤
 2 ┤
 1 ┤
   └────────────────────────────────
    Jan 1        Jan 15        Jan 30

Average: 6.2 tasks/day
Peak day: Jan 15 (9 tasks)
Completion rate: 78%
```

---

### 6.6.4.2 Priority Distribution

**Query:**

```sql
-- Task breakdown by priority
SELECT 
    COALESCE(priority::TEXT, 'none') as priority_label,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE status = 'completed') as completed,
    ROUND(
        COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*),
        1
    ) as completion_rate
FROM tasks
WHERE user_id = $user_id
    AND scheduled_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY priority
ORDER BY priority NULLS LAST;
```

**Visualization:**

```
Completion by Priority

High 🔴    ▓▓▓▓▓▓▓▓░░  85% (23/27)
Medium 🟡  ▓▓▓▓▓▓▓░░░  75% (42/56)
Low 🔵     ▓▓▓▓▓░░░░░  60% (18/30)
No priority ▓▓▓▓▓▓░░░  70% (14/20)
```

**Insights:**
- "You complete high-priority tasks most reliably"
- "Low-priority tasks often get skipped (40%)"

---

### 6.6.4.3 Difficulty vs Completion

**Query:**

```sql
-- Completion rate by difficulty
SELECT 
    difficulty,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE status = 'completed') as completed,
    ROUND(AVG(EXTRACT(EPOCH FROM (completed_at - created_at)) / 3600), 1) as avg_hours_to_complete
FROM tasks
WHERE user_id = $user_id
    AND scheduled_date >= CURRENT_DATE - INTERVAL '30 days'
    AND difficulty IS NOT NULL
GROUP BY difficulty
ORDER BY difficulty;
```

**Visualization:**

```
Difficulty  Count  Done   Rate   Avg time
1 ⭐        23     21     91%    0.5h
2 ⭐⭐      31     25     81%    1.2h
3 ⭐⭐⭐    28     20     71%    2.8h
4 ⭐⭐⭐⭐  15     9      60%    4.5h
5 ⭐⭐⭐⭐⭐ 8      3      38%    6.2h
```

**Insights:**
- "Easy tasks (1-2 stars) have 86% completion"
- "Hard tasks (4-5 stars) often get postponed"
- "Consider breaking down 5-star tasks"

---

### 6.6.4.4 Weekly Patterns

**Query:**

```sql
-- Tasks by day of week
SELECT 
    EXTRACT(DOW FROM scheduled_date) as day_of_week,
    TO_CHAR(scheduled_date, 'Day') as day_name,
    COUNT(*) as total_tasks,
    COUNT(*) FILTER (WHERE status = 'completed') as completed,
    ROUND(
        COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*),
        1
    ) as completion_rate
FROM tasks
WHERE user_id = $user_id
    AND scheduled_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY day_of_week, day_name
ORDER BY day_of_week;
```

**Visualization:**

```
Productivity by Day of Week

Mon  ████████░  7.2 tasks  85%
Tue  █████████  7.8 tasks  88%
Wed  ██████████ 8.1 tasks  92%  ← Peak
Thu  ████████░  7.5 tasks  83%
Fri  ██████░░░  6.3 tasks  71%
Sat  ████░░░░░  4.8 tasks  62%
Sun  ███░░░░░░  3.5 tasks  55%
```

**Insights:**
- "Wednesdays are your most productive day"
- "Weekend productivity drops 40%"

---

## 6.6.5 Mood Analytics

### 6.6.5.1 Mood Timeline

**Query:**

```sql
-- Daily mood + rolling average
SELECT 
    date,
    overall_mood,
    AVG(overall_mood) OVER (
        ORDER BY date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as rolling_7day_avg
FROM days
WHERE user_id = $user_id
    AND date >= CURRENT_DATE - INTERVAL '90 days'
    AND overall_mood IS NOT NULL
ORDER BY date;
```

**Visualization:**

```
Mood Over Time (1-5 scale)

5.0 ┤    ●     ●         ●
4.5 ┤      ●     ●   ●  
4.0 ┤  ●       ●   ●     ● ─── 7-day avg
3.5 ┤●                    
3.0 ┤        ●          
2.5 ┤
2.0 ┤
1.5 ┤
    └────────────────────────────────
     Nov 1        Dec 1        Jan 1

Average mood: 3.9
Best week: Dec 15-21 (4.3)
Worst week: Nov 8-14 (3.2)
```

---

### 6.6.5.2 Mood Distribution

**Query:**

```sql
-- Mood frequency distribution
SELECT 
    overall_mood,
    COUNT(*) as days_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM days
WHERE user_id = $user_id
    AND date >= CURRENT_DATE - INTERVAL '90 days'
    AND overall_mood IS NOT NULL
GROUP BY overall_mood
ORDER BY overall_mood DESC;
```

**Visualization:**

```
Mood Distribution (Last 90 days)

😄 5  ████████████  28%  (25 days)
🙂 4  ██████████████████  42%  (38 days)
😐 3  ████████  18%  (16 days)
😟 2  ████  9%  (8 days)
😢 1  ██  3%  (3 days)

Mode: 4 (most common)
Median: 4
Average: 3.9
```

**Insights:**
- "You feel good (4-5) 70% of the time"
- "Low mood (1-2) is rare (12% of days)"

---

### 6.6.5.3 Energy vs Stress

**Query:**

```sql
-- Correlation between energy and stress
SELECT 
    energy_level,
    stress_level,
    COUNT(*) as count,
    AVG(mood_value) as avg_mood
FROM mood_entries
WHERE user_id = $user_id
    AND date >= CURRENT_DATE - INTERVAL '30 days'
    AND energy_level IS NOT NULL
    AND stress_level IS NOT NULL
GROUP BY energy_level, stress_level
ORDER BY energy_level DESC, stress_level;
```

**Visualization (Heatmap):**

```
Energy vs Stress (darker = more common)

Energy↓  Stress→ 1   2   3   4   5
   5            ██  ░░  ░░  
   4            ███ ██  ░░  ░░
   3            ██  ███ ██  ░░
   2            ░░  ██  ███ ██
   1                ░░  ██  ███

Patterns:
• High energy + Low stress = 4.8 avg mood
• Low energy + High stress = 2.1 avg mood
```

---

## 6.6.6 Correlation Analysis (CRITICAL FEATURE)

### 6.6.6.1 Habits ↔ Mood

**Query:**

```sql
-- Mood on days with habit vs without
SELECT 
    h.name as habit_name,
    AVG(d.overall_mood) FILTER (WHERE hl.completed = TRUE) as mood_with_habit,
    AVG(d.overall_mood) FILTER (WHERE hl.completed = FALSE OR hl.completed IS NULL) as mood_without_habit,
    AVG(d.overall_mood) FILTER (WHERE hl.completed = TRUE) - 
    AVG(d.overall_mood) FILTER (WHERE hl.completed = FALSE OR hl.completed IS NULL) as mood_difference,
    COUNT(*) FILTER (WHERE hl.completed = TRUE) as days_with_habit,
    COUNT(*) FILTER (WHERE hl.completed = FALSE OR hl.completed IS NULL) as days_without_habit
FROM days d
LEFT JOIN habit_logs hl ON d.id = hl.day_id
LEFT JOIN habits h ON hl.habit_id = h.id
WHERE d.user_id = $user_id
    AND d.date >= CURRENT_DATE - INTERVAL '90 days'
    AND d.overall_mood IS NOT NULL
    AND h.is_active = TRUE
GROUP BY h.id, h.name
HAVING COUNT(*) FILTER (WHERE hl.completed = TRUE) >= 10  -- мінімум 10 днів з habit
ORDER BY mood_difference DESC;
```

**Results:**

```
Habit Correlation with Mood (Last 90 days)

Workout
  With:    4.3 avg mood  (45 days)
  Without: 3.1 avg mood  (45 days)
  Impact:  +1.2 ↑↑↑  STRONG POSITIVE

Meditation
  With:    4.2 avg mood  (68 days)
  Without: 3.4 avg mood  (22 days)
  Impact:  +0.8 ↑↑  POSITIVE

Sleep 7+ hours
  With:    4.1 avg mood  (52 days)
  Without: 3.3 avg mood  (38 days)
  Impact:  +0.8 ↑↑  POSITIVE

Reading
  With:    3.9 avg mood  (60 days)
  Without: 3.8 avg mood  (30 days)
  Impact:  +0.1 ↑  WEAK POSITIVE
```

**Visualization:**

```
              Mood Impact
Workout       ████████████ +1.2
Meditation    ████████ +0.8
Sleep 7+h     ████████ +0.8
Reading       █ +0.1
No alcohol    ██ +0.2
```

**Insights:**
- "🏋️ Workout has the strongest impact on your mood (+1.2 points)"
- "Days with meditation: 4.2 avg, without: 3.4 avg"
- "Consider prioritizing Workout when mood is low"

---

### 6.6.6.2 Tasks ↔ Mood

**Query:**

```sql
-- Mood correlation with task completion
SELECT 
    CASE 
        WHEN task_count = 0 THEN '0 tasks'
        WHEN task_count BETWEEN 1 AND 3 THEN '1-3 tasks'
        WHEN task_count BETWEEN 4 AND 6 THEN '4-6 tasks'
        WHEN task_count BETWEEN 7 AND 10 THEN '7-10 tasks'
        ELSE '10+ tasks'
    END as task_bucket,
    AVG(mood) as avg_mood,
    COUNT(*) as days_count
FROM (
    SELECT 
        d.date,
        d.overall_mood as mood,
        COUNT(tc.id) as task_count
    FROM days d
    LEFT JOIN task_completions tc ON d.id = tc.day_id
    WHERE d.user_id = $user_id
        AND d.date >= CURRENT_DATE - INTERVAL '90 days'
        AND d.overall_mood IS NOT NULL
    GROUP BY d.date, d.overall_mood
) sub
GROUP BY task_bucket
ORDER BY 
    CASE task_bucket
        WHEN '0 tasks' THEN 1
        WHEN '1-3 tasks' THEN 2
        WHEN '4-6 tasks' THEN 3
        WHEN '7-10 tasks' THEN 4
        ELSE 5
    END;
```

**Results:**

```
Productivity vs Mood

0 tasks     😐 3.2  (12 days)
1-3 tasks   🙂 3.8  (28 days)
4-6 tasks   😊 4.2  (35 days) ← Sweet spot
7-10 tasks  🙂 4.0  (20 days)
10+ tasks   😟 3.5  (5 days)  ← Overwhelm

Insight: Peak mood at 4-6 tasks/day
```

**Interpretation:**
- Moderate productivity (4-6 tasks) = highest mood
- Zero tasks = lower mood (lack of accomplishment?)
- Too many tasks (10+) = stress, lower mood

---

### 6.6.6.3 Combined Effects (Multi-variable)

**Query:**

```sql
-- Mood with multiple habits combined
WITH daily_habits AS (
    SELECT 
        d.date,
        d.overall_mood,
        BOOL_OR(hl.habit_id = $workout_habit_id AND hl.completed = TRUE) as did_workout,
        BOOL_OR(hl.habit_id = $meditation_habit_id AND hl.completed = TRUE) as did_meditation,
        BOOL_OR(hl.habit_id = $sleep_habit_id AND hl.value >= 7) as good_sleep
    FROM days d
    LEFT JOIN habit_logs hl ON d.id = hl.day_id
    WHERE d.user_id = $user_id
        AND d.date >= CURRENT_DATE - INTERVAL '90 days'
        AND d.overall_mood IS NOT NULL
    GROUP BY d.date, d.overall_mood
)
SELECT 
    did_workout,
    did_meditation,
    good_sleep,
    AVG(overall_mood) as avg_mood,
    COUNT(*) as days_count
FROM daily_habits
GROUP BY did_workout, did_meditation, good_sleep
HAVING COUNT(*) >= 3  -- мінімум 3 дні для валідності
ORDER BY avg_mood DESC;
```

**Results:**

```
Combined Habit Effects on Mood

Workout + Meditation + Sleep 7+h
  ✓       ✓            ✓        😄 4.8  (8 days)

Workout + Meditation
  ✓       ✓            ✗        😊 4.5  (12 days)

Workout + Sleep 7+h
  ✓       ✗            ✓        😊 4.3  (15 days)

Meditation + Sleep 7+h
  ✗       ✓            ✓        🙂 4.1  (18 days)

Workout only
  ✓       ✗            ✗        🙂 4.0  (10 days)

None
  ✗       ✗            ✗        😐 3.2  (15 days)
```

**Insights:**
- "🌟 Triple combo (Workout + Meditation + Sleep) = 4.8 mood"
- "Each habit adds ~0.3-0.4 mood points"
- "Synergistic effect: 3 habits together > sum of individual"

---

### 6.6.6.4 Correlation Matrix (Advanced)

**Visualization:**

```
Correlation Matrix (Last 90 days)

              Mood  Workout  Meditation  Sleep  Tasks
Mood          1.00   0.65      0.52     0.48   0.35
Workout       0.65   1.00      0.23     0.31   0.18
Meditation    0.52   0.23      1.00     0.41   0.12
Sleep         0.48   0.31      0.41     1.00   0.22
Tasks         0.35   0.18      0.12     0.22   1.00

Legend:
0.7-1.0   Strong correlation
0.4-0.69  Moderate correlation
0.2-0.39  Weak correlation
0.0-0.19  Very weak correlation
```

**Statistical significance (future):**
- p-values для кожної кореляції
- Confidence intervals
- Sample size considerations

---

## 6.6.7 Long-Term Trends

### 6.6.7.1 Month-over-Month Comparison

**Query:**

```sql
-- Monthly aggregates
WITH monthly_stats AS (
    SELECT 
        DATE_TRUNC('month', d.date) as month,
        AVG(d.overall_mood) as avg_mood,
        COUNT(DISTINCT d.date) as days_logged,
        COUNT(hl.id) FILTER (WHERE hl.completed = TRUE) as habits_completed,
        COUNT(tc.id) as tasks_completed
    FROM days d
    LEFT JOIN habit_logs hl ON d.id = hl.day_id
    LEFT JOIN task_completions tc ON d.id = tc.day_id
    WHERE d.user_id = $user_id
        AND d.date >= CURRENT_DATE - INTERVAL '6 months'
    GROUP BY DATE_TRUNC('month', d.date)
)
SELECT 
    TO_CHAR(month, 'Month YYYY') as month_label,
    ROUND(avg_mood, 2) as avg_mood,
    habits_completed,
    tasks_completed,
    -- Month-over-month change
    ROUND(avg_mood - LAG(avg_mood) OVER (ORDER BY month), 2) as mood_change
FROM monthly_stats
ORDER BY month;
```

**Results:**

```
Month-over-Month Trends

        Mood    Habits  Tasks   Change
Aug 2025  3.7    89      72     —
Sep 2025  3.9    102     85     +0.2 ↑
Oct 2025  4.1    127     98     +0.2 ↑
Nov 2025  3.8    115     89     -0.3 ↓
Dec 2025  4.0    134     102    +0.2 ↑
Jan 2026  4.2    142     108    +0.2 ↑

6-month trend: ↗ Improving
Average increase: +0.1 mood/month
```

---

### 6.6.7.2 Year-over-Year Comparison

**Query (requires 12+ months data):**

```sql
-- Compare same month, different years
SELECT 
    EXTRACT(MONTH FROM date) as month_num,
    TO_CHAR(date, 'Month') as month_name,
    EXTRACT(YEAR FROM date) as year,
    AVG(overall_mood) as avg_mood,
    COUNT(*) as days_count
FROM days
WHERE user_id = $user_id
    AND overall_mood IS NOT NULL
GROUP BY EXTRACT(MONTH FROM date), TO_CHAR(date, 'Month'), EXTRACT(YEAR FROM date)
ORDER BY month_num, year;
```

**Results:**

```
January Comparison

2025: 3.8 avg mood
2026: 4.2 avg mood
Change: +0.4 (11% improvement)

Seasonal patterns detected:
• Winter (Dec-Feb): 3.9 avg
• Spring (Mar-May): 4.2 avg ← Best season
• Summer (Jun-Aug): 4.0 avg
• Fall (Sep-Nov): 3.8 avg
```

---

## 6.6.8 Predictive Insights (Future Feature)

**Examples (MVP не включає, але архітектура готова):**

1. **Mood prediction:**
   - "Based on your patterns, skipping workout today may lower mood to 3.2"

2. **Habit recommendations:**
   - "You're most likely to complete Workout on Wednesdays (92% rate)"

3. **Risk alerts:**
   - "3 consecutive days of mood < 3. Consider: workout, talk to friend"

4. **Optimal scheduling:**
   - "Schedule difficult tasks for Tuesday mornings (highest productivity)"

---

## 6.6.9 Analytics UI/UX

### Navigation Structure

```
📊 Analytics

Tabs:
• Overview
• Habits
• Tasks
• Mood
• Correlations
```

### Overview Tab

```
┌─────────────────────────────────────┐
│ 📊 Analytics Overview               │
├─────────────────────────────────────┤
│                                     │
│ 🎯 KEY METRICS (Last 30 days)      │
│                                     │
│ Habit completion    77% ↑ +5%      │
│ Tasks completed     98              │
│ Average mood        4.2 ↑ +0.3     │
│ Journal entries     18              │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 🔥 STREAKS                          │
│ Meditation    5 days  (Best: 14)   │
│ Reading       3 days  (Best: 9)    │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 💡 INSIGHTS                         │
│ • Workout strongly improves mood    │
│   (+1.2 points)                     │
│ • Wednesdays are most productive    │
│ • Consider meditation on low days   │
│                                     │
│ [View detailed analytics →]         │
└─────────────────────────────────────┘
```

---

### Time Range Selector

```
[Last 7 days] [Last 30 days] [Last 3 months] [Last year] [All time] [Custom]
```

**Behavior:**
- Default: Last 30 days
- Persist choice (localStorage)
- Some metrics disabled для short ranges (correlations need 30+ days)

---

### Export Options

```
📥 Export Data

Format: [JSON ▼] [CSV] [PDF Report]
Range:  [Last 30 days ▼]

☐ Include habits
☐ Include tasks
☐ Include mood entries
☐ Include journal
☐ Include analytics summary

[Download]
```

---

# 7. SITEMAP & UX STRUCTURE

## 7.1 Information Architecture

### 7.1.1 Site Structure Overview

```
Life OS
│
├── Public (Unauthenticated)
│   ├── Landing page (/)
│   ├── Features (/features)
│   ├── Pricing (/pricing)
│   ├── About (/about)
│   ├── Login (/login)
│   └── Signup (/signup)
│
└── App (Authenticated)
    ├── Today (/app)                    [Default landing]
    ├── Calendar (/app/calendar)
    ├── Habits (/app/habits)
    │   ├── List
    │   ├── Detail (/app/habits/[id])
    │   └── Create/Edit
    ├── Tasks (/app/tasks)
    │   ├── Today
    │   ├── Backlog
    │   ├── Completed
    │   └── Detail (/app/tasks/[id])
    ├── Journal (/app/journal)
    │   ├── List
    │   ├── Entry (/app/journal/[id])
    │   └── Search
    ├── Analytics (/app/analytics)
    │   ├── Overview
    │   ├── Habits
    │   ├── Tasks
    │   ├── Mood
    │   └── Correlations
    ├── Settings (/app/settings)
    │   ├── Account
    │   ├── Preferences
    │   ├── Data & Privacy
    │   └── Help
    └── Profile (/app/profile)
```

---

## 7.2 Page Specifications

### 7.2.1 Public Pages

#### Landing Page (/)

**Goal:** Конвертувати відвідувачів у користувачів.

**Sections:**
1. **Hero:**
   ```
   Understand Your Life Through Data
   
   Track habits, mood, and productivity.
   Discover what actually moves the needle.
   
   [Start Free] [See Demo]
   ```

2. **Key Features (3 columns):**
   - 📊 Deep Analytics
   - 🎯 Habit Tracking
   - 📝 Daily Journal

3. **How It Works (timeline):**
   - Log daily (5 min)
   - Review weekly (15 min)
   - Discover patterns (life-changing)

4. **Social Proof:**
   - Testimonials
   - Stats (if available)

5. **CTA:**
   ```
   [Start Your Journey]
   No credit card required. Free forever.
   ```

**Navigation:**
```
[Logo] Life OS          Features  Pricing  About  [Login] [Sign Up]
```

---

#### Login Page (/login)

**Layout:**

```
┌─────────────────────────────────────┐
│          Life OS                    │
│                                     │
│    Welcome Back                     │
│                                     │
│    Email:    [____________]         │
│    Password: [____________]         │
│                                     │
│    [ ] Remember me                  │
│                                     │
│    [Log In]                         │
│                                     │
│    [Forgot password?]               │
│                                     │
│    ──────── or ────────             │
│                                     │
│    [Continue with Google]           │
│                                     │
│    Don't have account? [Sign up]   │
└─────────────────────────────────────┘
```

**Features:**
- Email/password auth (Supabase)
- Google OAuth
- Password reset link
- Redirect to /app після login

---

#### Signup Page (/signup)

**Form:**
```
Create Your Account

Email:     [____________]
Password:  [____________]  (min 8 chars)
Timezone:  [Auto-detected: Europe/Kiev] [Change]

[ ] I agree to Terms & Privacy Policy

[Create Account]

Already have account? [Log in]
```

**Post-signup flow:**
1. Email verification (optional для MVP)
2. Onboarding wizard
3. Redirect to /app

---

### 7.2.2 App Pages

#### Today View (/app)

**Goal:** Daily logging hub. Усе на одному екрані.

**Sections (вже описані в 6.5):**
1. Date header + quick stats
2. Mood quick log
3. Habits checklist
4. Tasks list (overdue, today, completed)
5. Journal entry
6. Quick analytics summary

**Primary Actions:**
- Toggle habit
- Complete task
- Log mood
- Write journal
- [+ FAB] Quick add

**URL:** `/app` (default authenticated route)

**State management:**
- Real-time sync (optimistic updates)
- Автосейв
- Offline queue

---

#### Calendar View (/app/calendar)

**Goal:** Огляд днів на дистанції. Navigation між днями.

**Layout:**

```
┌─────────────────────────────────────┐
│ Calendar                            │
│                                     │
│ [< December 2025] [Today] [January 2026 >] │
│                                     │
│ Sun Mon Tue Wed Thu Fri Sat         │
│  29  30  31   1   2   3   4         │
│   5   6   7   8   9  10  11         │
│  12  13  14  15  16  17  18         │
│  19  20  21  22  23  24  25         │
│  26  27  28  29  30  31   1         │
│                                     │
│ Legend:                             │
│ ██ High completion (80-100%)        │
│ ▒▒ Medium (50-79%)                  │
│ ░░ Low (0-49%)                      │
│ ⬜ No data                          │
│                                     │
│ ───────────────────────────────     │
│                                     │
│ Selected: January 21, 2026          │
│                                     │
│ Habits: 3/5 completed               │
│ Tasks:  2/5 completed               │
│ Mood:   😊 4/5                      │
│ Journal: 1 entry                    │
│                                     │
│ [View Full Day →]                   │
└─────────────────────────────────────┘
```

**Interactions:**
- Click day → Show summary (sidebar або modal)
- Double-click → Navigate to that day's Today view
- Color coding за completion rate
- Heatmap visualization

**Features:**
- Month navigation
- Jump to date (date picker)
- View mode: Month | Week | Year
- Filters: Show only days with journal, show only high-mood days, etc.

---

#### Habits Page (/app/habits)

**Goal:** Управління всіма звичками. Детальна аналітика.

**Layout:**

```
┌─────────────────────────────────────┐
│ 🎯 Habits                           │
│                                     │
│ [Active] [Archived] [+ Add Habit]  │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 🧘 Meditation                 🔥 5  │
│ Daily • Health                      │
│ This week: 5/7 (71%)                │
│ [View Analytics →]                  │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 🏃 Workout                    🔥 0  │
│ Daily • Health                      │
│ This week: 3/7 (43%)                │
│ [View Analytics →]                  │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 📚 Reading                    🔥 3  │
│ Daily • Learning                    │
│ This week: 6/7 (86%)                │
│ [View Analytics →]                  │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 💧 Water                            │
│ 2.5 L daily • Health                │
│ This week: avg 2.3 L                │
│ [View Analytics →]                  │
└─────────────────────────────────────┘
```

**Features:**
- Drag-and-drop reorder
- Sort: By name, category, completion rate, streak
- Filter: By category
- Bulk actions: Archive, change category
- Quick stats per habit

**Actions:**
- Tap habit → Habit detail page
- Swipe → Quick actions (edit, archive)
- Long press → Drag to reorder

---

#### Habit Detail Page (/app/habits/[id])

**Goal:** Глибока аналітика конкретної звички.

**Layout:**

```
┌─────────────────────────────────────┐
│ [←] Meditation                      │
│                                     │
│ Daily • Health • 🧘                │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 🔥 CURRENT STREAK                   │
│ 5 days                              │
│ Longest: 14 days (Dec 1-14)        │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 📊 COMPLETION RATE                  │
│                                     │
│ Last 7 days:  5/7   (71%)          │
│ Last 30 days: 23/30 (77%)          │
│ All time:     156/200 (78%)        │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 📅 CALENDAR (Last 30 days)         │
│                                     │
│ [Heatmap visualization]             │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 📈 TREND                            │
│                                     │
│ [Line chart: completion over time]  │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ 💡 INSIGHTS                         │
│                                     │
│ • Mood with meditation: 4.2 avg    │
│ • Mood without: 3.4 avg            │
│ • Impact: +0.8 🎯                  │
│                                     │
│ • Best day: Monday (85% rate)      │
│ • Weakest: Friday (55% rate)       │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ [Edit Habit] [Archive]             │
└─────────────────────────────────────┘
```

**Tabs (alternative layout):**
- Overview
- Calendar
- Statistics
- Correlations
- History (log by log)

---

#### Tasks Page (/app/tasks)

**Goal:** Управління задачами за межами Today view.

**Tabs:**
```
[Today] [Backlog] [Completed] [All]
```

**Today Tab (similar to Today view section):**
- Overdue
- Scheduled for today
- Completed

**Backlog Tab:**
```
📥 Backlog (23 tasks)

Sort by: [Priority ▼] Created | Difficulty

Filter: [All ▼] #work | #personal

─────────────────────────────────
[ ] Research vacation spots 🟡
    Created: Jan 15

[ ] Fix bike
    Created: Jan 10

[ ] Organize photos 🔵
    Created: Jan 8

...

[Load more]
```

**Completed Tab:**
```
✅ Completed Tasks

This week: 24 tasks
Last week: 19 tasks

─────────────────────────────────
[✓] Write report 🔴
    Completed: Jan 21, 3:45 PM
    Took: 2h 15m

[✓] Call dentist
    Completed: Jan 21, 10:30 AM

...
```

**Features:**
- Infinite scroll
- Search
- Bulk select → Reschedule, Change priority
- Export to CSV

---

#### Journal Page (/app/journal)

**Goal:** Перегляд та пошук записів.

**Layout:**

```
┌─────────────────────────────────────┐
│ 📝 Journal                          │
│                                     │
│ 🔍 [Search entries...]              │
│ 🏷️  [All tags ▼] [Date range ▼]   │
│                                     │
│ [+ New Entry]                       │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ January 21, 2026 • 9:45 PM         │
│                                     │
│ Today was productive. Finished      │
│ the report, went to gym. Feeling    │
│ accomplished but tired.             │
│                                     │
│ #productive #gym #tired             │
│                                     │
│ [Edit] [Delete]                     │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ January 20, 2026 • 10:15 PM        │
│                                     │
│ Had a difficult day. Missed         │
│ workout, felt low energy...         │
│                                     │
│ #work_stress #low_energy            │
│                                     │
│ [Edit] [Delete]                     │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ [Load more entries...]              │
└─────────────────────────────────────┘
```

**Features:**
- Full-text search
- Filter by tags
- Filter by date range
- Sort: Newest | Oldest | Most relevant (search)
- Markdown preview/edit toggle

**Search examples:**
- "gym" → All entries mentioning gym
- "#work" → Filter by tag
- "date:2026-01" → All January entries

---

#### Analytics Page (/app/analytics)

**Goal:** Детальна аналітика (вже описана в 6.6).

**Tabs:**
```
[Overview] [Habits] [Tasks] [Mood] [Correlations]
```

**Navigation:**
- Time range selector (top right)
- Export button
- Share insights (future)

**Overview Tab (summary dashboard):**
- Key metrics cards
- Top streaks
- Recent insights
- Quick charts

**Habits Tab:**
- Completion rates
- Heatmaps
- Streak analysis
- Time-of-day patterns

**Tasks Tab:**
- Productivity metrics
- Priority distribution
- Difficulty vs completion
- Weekly patterns

**Mood Tab:**
- Mood timeline
- Distribution
- Energy vs Stress

**Correlations Tab:**
- Habits ↔ Mood
- Tasks ↔ Mood
- Combined effects
- Correlation matrix

---

#### Settings Page (/app/settings)

**Sections:**

**Account:**
```
📧 Email: user@example.com
🔑 Password: [Change Password]
🌍 Timezone: Europe/Kiev [Change]
```

**Preferences:**
```
🎨 Theme:
   ( ) Light
   (•) Dark
   ( ) Auto

🔔 Notifications:
   [✓] Daily reminders
   [✓] Mood prompts (8 AM, 9 PM)
   [ ] Weekly summary
   [✓] Streak milestones

📊 Default view:
   (•) Today
   ( ) Calendar
   ( ) Analytics

📱 Quick actions:
   [✓] Show FAB
   [✓] Swipe gestures
   [ ] Haptic feedback
```

**Data & Privacy:**
```
📥 Export Data:
   [Download JSON] [Download CSV]

🗑️ Delete Account:
   [Delete My Account]
   Warning: This action is permanent.
```

**Help:**
```
📖 Documentation
💬 Contact Support
🐛 Report Bug
⭐ Rate App
📄 Terms & Privacy
```

---

## 7.3 Modals & Overlays

### 7.3.1 Modal Types

**Types:**
1. **Full-screen modal** (mobile) / Dialog (desktop)
2. **Bottom sheet** (mobile only)
3. **Drawer** (side panel)
4. **Popover** (small context menu)
5. **Toast** (notification)

---

### 7.3.2 Modal Catalog

#### Add/Edit Habit Modal

**Trigger:** "Add habit" button, Edit habit

**Layout:**
```
┌─────────────────────────────────────┐
│ Add Habit                      [X]  │
├─────────────────────────────────────┤
│                                     │
│ Name*                               │
│ [Meditation_____________]           │
│                                     │
│ Description (optional)              │
│ [10 min daily practice___]         │
│                                     │
│ Type*                               │
│ (•) Binary (Yes/No)                │
│ ( ) Quantitative (Number)           │
│                                     │
│ Category                            │
│ [Health ▼]                         │
│                                     │
│ Color                               │
│ [🔵][🟢][🟡][🔴][🟣]              │
│                                     │
│ Icon                                │
│ [🧘][🏃][📚][💧][🍎]...            │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ [Cancel]              [Save]        │
└─────────────────────────────────────┘
```

**Behavior:**
- Save → Close modal → Refresh habits list
- Cancel → Confirm if changes made
- Validation errors inline

---

#### Add/Edit Task Modal

**Layout:**
```
┌─────────────────────────────────────┐
│ Add Task                       [X]  │
├─────────────────────────────────────┤
│                                     │
│ Title*                              │
│ [Write quarterly report____]       │
│                                     │
│ Description (Markdown)              │
│ [________________________________]  │
│ [________________________________]  │
│                                     │
│ [Show more options ▼]              │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ [Cancel]              [Save]        │
└─────────────────────────────────────┘
```

**Expanded (Show more options):**
```
│ Scheduled date                      │
│ [Today ▼] Tomorrow | Pick date      │
│                                     │
│ Priority                            │
│ [🔴][🟡][🔵][  None  ]             │
│                                     │
│ Difficulty                          │
│ [⭐][⭐⭐][⭐⭐⭐][⭐⭐⭐⭐][⭐⭐⭐⭐⭐]  │
│                                     │
│ Estimated time                      │
│ [2___] hours                        │
│                                     │
│ Tags                                │
│ [#work] [#urgent] [+ Add tag]      │
```

---

#### Journal Entry Modal

**Layout:**
```
┌─────────────────────────────────────┐
│ New Journal Entry              [X]  │
├─────────────────────────────────────┤
│                                     │
│ Template: [Blank ▼]                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Markdown editor]               │ │
│ │                                 │ │
│ │ Today was productive...         │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Tags: [#productive] [#gym] [+]     │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ [Preview] [Cancel]       [Save]    │
└─────────────────────────────────────┘
```

**Features:**
- Markdown toolbar (bold, italic, list, link)
- Preview toggle
- Template selector
- Auto-save draft (localStorage)

---

#### Habit Detail Bottom Sheet (Mobile)

**Trigger:** Tap habit in Today view (mobile)

**Layout:**
```
┌─────────────────────────────────────┐
│          ━━━━━                      │ ← Handle
│                                     │
│ 🧘 Meditation                       │
│                                     │
│ 🔥 Current streak: 5 days           │
│ This week: 5/7 (71%)                │
│                                     │
│ ─────────────────────────────────   │
│                                     │
│ [View Full Analytics]               │
│ [Edit Habit]                        │
│ [Archive]                           │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- Swipe down to dismiss
- Snap to half/full height
- Backdrop overlay (darken background)

---

#### Confirmation Dialog

**Example: Delete task**

```
┌─────────────────────────────────────┐
│ Delete Task?                        │
│                                     │
│ This action cannot be undone.       │
│                                     │
│ [Cancel]  [Delete]                  │
└─────────────────────────────────────┘
```

**Variants:**
- Delete habit
- Archive habit
- Delete account
- Clear all data

---

#### Date Picker Modal

**Trigger:** Select date for task scheduling

```
┌─────────────────────────────────────┐
│ Select Date                         │
│                                     │
│ Quick:                              │
│ [Today] [Tomorrow] [Next Week]     │
│                                     │
│ Or pick:                            │
│                                     │
│  January 2026                       │
│  Sun Mon Tue Wed Thu Fri Sat        │
│   28  29  30  31   1   2   3        │
│    4   5   6   7   8   9  10        │
│   11  12  13  14  15  16  17        │
│   18  19  20 [21] 22  23  24        │
│                                     │
│ [Cancel]                  [Select]  │
└─────────────────────────────────────┘
```

---

### 7.3.3 Toast Notifications

**Types:**

**Success:**
```
┌─────────────────────────────────────┐
│ ✓ Habit logged successfully         │
└─────────────────────────────────────┘
```

**Error:**
```
┌─────────────────────────────────────┐
│ ✗ Failed to save. Please try again. │
└─────────────────────────────────────┘
```

**Info:**
```
┌─────────────────────────────────────┐
│ ℹ️ Syncing data...                   │
└─────────────────────────────────────┘
```

**Undo action:**
```
┌─────────────────────────────────────┐
│ ✓ Task completed         [Undo]     │
└─────────────────────────────────────┘
```

**Position:** Bottom center (mobile), Top right (desktop)

**Duration:** 3 seconds (auto-dismiss), persistent for undo actions

---

## 7.4 Navigation Patterns

### 7.4.1 Mobile Navigation

**Bottom Tab Bar (primary):**
```
┌─────────────────────────────────────┐
│ 🔥 Today  📅 Calendar  📊 Analytics │
└─────────────────────────────────────┘
```

**Hamburger Menu (secondary):**
```
☰
├── Today
├── Calendar
├── Habits
├── Tasks
├── Journal
├── Analytics
├── ─────────
├── Settings
└── Logout
```

**Back navigation:**
- Physical back button (Android)
- Gesture (iOS swipe from left)
- [←] button (header)

---

### 7.4.2 Desktop Navigation

**Sidebar (persistent):**
```
┌──────────────┐
│ Life OS      │
│              │
│ 🔥 Today     │
│ 📅 Calendar  │
│ 🎯 Habits    │
│ 📋 Tasks     │
│ 📝 Journal   │
│ 📊 Analytics │
│              │
│ ─────────    │
│              │
│ ⚙️  Settings  │
│ 👤 Profile   │
└──────────────┘
```

**Breadcrumbs (for deep pages):**
```
Habits > Meditation > Analytics
```

---

### 7.4.3 Gestures (Mobile)

**Swipe actions:**
- **Habit row:** Swipe left → Complete | Swipe right → Skip
- **Task row:** Swipe left → Delete | Swipe right → Complete
- **Journal entry:** Swipe left → Delete

**Pull to refresh:**
- Today view → Pull down → Refresh data

**Long press:**
- Habit → Context menu (Edit, Archive, View Analytics)
- Task → Context menu

---

## 7.5 Empty States & Error States

### 7.5.1 Empty States

**No habits:**
```
┌─────────────────────────────────────┐
│           🎯                        │
│                                     │
│      No habits yet                  │
│                                     │
│   Start tracking your first habit   │
│                                     │
│      [+ Create Habit]               │
│                                     │
│   Popular habits:                   │
│   • Meditation                      │
│   • Workout                         │
│   • Reading                         │
└─────────────────────────────────────┘
```

**No tasks:**
```
┌─────────────────────────────────────┐
│           ✅                        │
│                                     │
│    All clear for today!             │
│                                     │
│      [+ Add Task]                   │
└─────────────────────────────────────┘
```

**No journal entries:**
```
┌─────────────────────────────────────┐
│           📝                        │
│                                     │
│   Your journal is empty             │
│                                     │
│   Start writing your thoughts       │
│                                     │
│   [+ Write First Entry]             │
└─────────────────────────────────────┘
```

**No analytics data:**
```
┌─────────────────────────────────────┐
│           📊                        │
│                                     │
│   Not enough data yet               │
│                                     │
│   Keep logging for 7+ days to see   │
│   meaningful insights               │
│                                     │
│   Days logged: 3/7                  │
└─────────────────────────────────────┘
```

---

### 7.5.2 Error States

**Network error:**
```
┌─────────────────────────────────────┐
│           ⚠️                        │
│                                     │
│   Connection lost                   │
│                                     │
│   Check your internet and try again │
│                                     │
│      [Retry]                        │
└─────────────────────────────────────┘
```

**Data load error:**
```
┌─────────────────────────────────────┐
│           ⚠️                        │
│                                     │
│   Failed to load data               │
│                                     │
│      [Try Again]                    │
└─────────────────────────────────────┘
```

**Form validation error:**
```
┌─────────────────────────────────────┐
│ Name*                               │
│ [________________]                  │
│ ⚠️ Name is required                 │
│                                     │
│ Target value                        │
│ [-5__]                              │
│ ⚠️ Value must be positive           │
└─────────────────────────────────────┘
```

---

### 7.5.3 Loading States

**Skeleton screens:**
```
┌─────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓                         │
│ ░░░░░░░░░░░░░░░░                    │
│                                     │
│ ▓▓▓▓▓▓▓ ░░░░░░░                     │
│ ▓▓▓▓▓▓▓ ░░░░░░░                     │
│ ▓▓▓▓▓▓▓ ░░░░░░░                     │
└─────────────────────────────────────┘
```

**Progress indicators:**
- Spinner (global loading)
- Progress bar (file upload, data export)
- Skeleton screens (initial page load)

**Optimistic updates:**
- UI updates immediately
- Sync indicator (subtle)
- Rollback on error

---

## 7.6 Onboarding Flow

### 7.6.1 First-Time User Experience

**Step 1: Welcome**
```
┌─────────────────────────────────────┐
│           Welcome to                │
│           Life OS                   │
│                                     │
│   Track. Analyze. Improve.          │
│                                     │
│           [Get Started]             │
└─────────────────────────────────────┘
```

**Step 2: Create First Habit**
```
┌─────────────────────────────────────┐
│   Let's create your first habit     │
│                                     │
│   Popular habits:                   │
│   [ ] 🧘 Meditation                 │
│   [ ] 🏃 Workout                    │
│   [ ] 📚 Reading                    │
│   [ ] 💧 Drink water                │
│                                     │
│   [Skip for now]        [Next]      │
└─────────────────────────────────────┘
```

**Step 3: Set Preferences**
```
┌─────────────────────────────────────┐
│   Personalize your experience       │
│                                     │
│   Theme: (•) Dark  ( ) Light        │
│                                     │
│   Reminders:                        │
│   [✓] Morning check-in (8 AM)       │
│   [✓] Evening reflection (9 PM)     │
│                                     │
│   [Back]                [Finish]    │
└─────────────────────────────────────┘
```

**Step 4: Tour (optional)**
- Highlight key features
- Interactive tooltips
- Skip button always visible

---

## 7.7 Responsive Behavior

### 7.7.1 Breakpoints

```
Mobile:     < 768px   (single column)
Tablet:     768-1024px (two columns)
Desktop:    > 1024px  (three columns + sidebar)
```

### 7.7.2 Layout Adaptations

**Today View:**

**Mobile:**
- Single column
- Sections stack vertically
- Collapsible sections
- Bottom nav

**Tablet:**
- Two columns: Main + Sidebar
- Sidebar: Quick stats, upcoming
- Side nav (drawer)

**Desktop:**
- Three columns: Sidebar + Main + Insights
- Persistent nav
- More dense information

**Analytics:**

**Mobile:**
- Charts full-width
- Tabs for different metrics
- Vertical scrolling

**Desktop:**
- Dashboard grid (2×2, 3×2)
- All metrics visible
- Interactive filters sidebar

---

## 7.8 URL Structure & Routing

### 7.8.1 URL Patterns

```
Public:
  /                        → Landing
  /features                → Features page
  /pricing                 → Pricing
  /login                   → Login
  /signup                  → Signup

App (requires auth):
  /app                     → Today view (default)
  /app/calendar            → Calendar
  /app/calendar/:date      → Specific date view
  /app/habits              → Habits list
  /app/habits/:id          → Habit detail
  /app/habits/new          → Create habit
  /app/habits/:id/edit     → Edit habit
  /app/tasks               → Tasks
  /app/tasks/:id           → Task detail
  /app/journal             → Journal list
  /app/journal/:id         → Journal entry
  /app/journal/new         → New entry
  /app/analytics           → Analytics overview
  /app/analytics/habits    → Habit analytics
  /app/analytics/tasks     → Task analytics
  /app/analytics/mood      → Mood analytics
  /app/analytics/correlations → Correlations
  /app/settings            → Settings
  /app/settings/account    → Account settings
  /app/settings/preferences → Preferences
  /app/settings/data       → Data & privacy
  /app/profile             → User profile
```

### 7.8.2 Query Parameters

**Filters:**
```
/app/tasks?status=pending
/app/tasks?tag=work
/app/journal?tag=productive&date=2026-01
/app/analytics?range=30d
```

**Search:**
```
/app/journal?q=gym
/app/tasks?q=report
```

**Date navigation:**
```
/app?date=2026-01-15
/app/calendar?month=2026-01
```

---

# 8. UI/UX PRINCIPLES

## 8.1 Design Philosophy

### 8.1.1 Core Principles

**1. Data-First, Not Decoration-First**
> "Every pixel should serve the data, not distract from it."

- Інформація > Прикраси
- Функціональність > Естетика (але естетика важлива)
- Clarity > Creativity
- Actionable > Beautiful (але можна обидва)

**2. Respect User's Time**
> "User витрачає 5–15 хвилин на день. Кожна секунда важлива."

- Logging за < 10 секунд
- Нема зайвих кліків
- Optimistic updates
- Мінімум прокрутки

**3. Progressive Disclosure**
> "Show what's needed, hide what's not."

- Default view: essential info
- Details on demand
- Collapsible sections
- Smart defaults

**4. Consistency > Creativity**
> "Users learn patterns, not individual screens."

- Одні й ті ж patterns скрізь
- Predictable interactions
- No surprises у navigation
- Consistent terminology

**5. Mobile-First, Desktop-Enhanced**
> "80% interaction на телефоні, 20% глибокого аналізу на desktop."

- Touch-friendly targets (44×44px min)
- Thumb-zone optimization
- Desktop: більше information density
- Адаптивні графіки

---

## 8.2 Information Architecture Principles

### 8.2.1 Dashboard Philosophy

**Не є традиційний dashboard з widgets.**

**Замість:**
- Unified daily view (Today)
- Контекст > Ізольовані metrics
- Temporal structure (день як одиниця)
- Actionable data

**Приклад антипатерну (типовий dashboard):**
```
❌ BAD:
┌────────────┬────────────┬────────────┐
│ Widget 1   │ Widget 2   │ Widget 3   │
│ Random     │ Random     │ Random     │
│ Metric     │ Metric     │ Metric     │
└────────────┴────────────┴────────────┘
```

**Life OS approach:**
```
✅ GOOD:
┌─────────────────────────────────────┐
│ Wednesday, January 21, 2026         │ ← Temporal anchor
│                                     │
│ 😊 Mood → Habits → Tasks → Journal │ ← Logical flow
│                                     │
│ [All data for THIS DAY]             │
└─────────────────────────────────────┘
```

**Principle:**
- День = контейнер для всіх даних
- Chronological structure природний
- User думає "what did I do today", не "show me habit widget"

---

### 8.2.2 Information Density

**Balance:**
- **Too sparse:** Wasted space, багато scrolling
- **Too dense:** Overwhelming, cognitive overload
- **Just right:** Information visible without clutter

**Guidelines:**

**Mobile (< 768px):**
- 3–5 items per section visible
- Collapsible sections
- Generous spacing (16–24px)
- One primary action per screen

**Desktop (> 1024px):**
- 7–10 items per section visible
- Multi-column layouts
- Tighter spacing (8–16px)
- Multiple actions available

**Example (Habits section):**

**Mobile:**
```
✅ Habits (3/5)

[✓] Meditation      🔥 5
[Show 2 more...]
```

**Desktop:**
```
✅ Habits (3/5 completed)

[✓] Meditation    🔥 5 days  This week: 5/7 (71%)
[ ] Workout       🔥 0       This week: 3/7 (43%)
[✓] Reading       🔥 3 days  This week: 6/7 (86%)
💧 Water: 2.5/3.0 L          This week: avg 2.3 L
[ ] No alcohol               This week: 7/7 ✓
```

---

### 8.2.3 Visual Hierarchy

**Priority levels:**

**Level 1 (Primary):** Найважливіша інформація
- Date/Day
- Current mood
- Uncompleted habits/tasks
- Primary actions

**Level 2 (Secondary):** Контекст
- Completed items
- Streaks
- Quick stats
- Secondary actions

**Level 3 (Tertiary):** Додаткова інформація
- Historical data
- Detailed stats
- Settings
- Help

**Visual encoding:**

| Priority | Font Size | Weight | Color | Spacing |
|----------|-----------|--------|-------|---------|
| Primary | 18–24px | Bold | High contrast | 24–32px |
| Secondary | 14–16px | Medium | Medium contrast | 16–24px |
| Tertiary | 12–14px | Regular | Low contrast | 8–16px |

---

## 8.3 Design System

### 8.3.1 Color Palette

**Base Colors:**

```
Background (Light mode):
  - Primary:   #FFFFFF
  - Secondary: #F9FAFB (subtle grey)
  - Tertiary:  #F3F4F6

Background (Dark mode):
  - Primary:   #111827 (very dark grey, not black)
  - Secondary: #1F2937
  - Tertiary:  #374151

Text (Light mode):
  - Primary:   #111827 (almost black)
  - Secondary: #6B7280 (medium grey)
  - Tertiary:  #9CA3AF (light grey)

Text (Dark mode):
  - Primary:   #F9FAFB (almost white)
  - Secondary: #D1D5DB
  - Tertiary:  #9CA3AF
```

**Accent Colors:**

```
Primary (Brand):
  - Blue:  #3B82F6 (default accent)
  - Hover: #2563EB
  - Light: #DBEAFE

Success:
  - Green: #10B981
  - Light: #D1FAE5

Warning:
  - Yellow: #F59E0B
  - Light: #FEF3C7

Error:
  - Red: #EF4444
  - Light: #FEE2E2

Info:
  - Blue: #3B82F6
  - Light: #DBEAFE
```

**Semantic Colors:**

```
Habit completion:
  - Completed: #10B981 (green)
  - Skipped:   #EF4444 (red)
  - Pending:   #9CA3AF (grey)

Mood scale:
  - 5 (great):  #10B981 (green)
  - 4 (good):   #3B82F6 (blue)
  - 3 (okay):   #F59E0B (yellow)
  - 2 (bad):    #F97316 (orange)
  - 1 (awful):  #EF4444 (red)

Priority:
  - High:   #EF4444 (red)
  - Medium: #F59E0B (yellow)
  - Low:    #3B82F6 (blue)

Streaks:
  - Fire: #F97316 (orange)
```

**Chart Colors (for analytics):**

```
Sequential (for single metric over time):
  - #3B82F6 → #60A5FA → #93C5FD → #DBEAFE

Categorical (for multiple metrics):
  - Habit 1: #3B82F6 (blue)
  - Habit 2: #10B981 (green)
  - Habit 3: #F59E0B (yellow)
  - Habit 4: #8B5CF6 (purple)
  - Habit 5: #EC4899 (pink)

Diverging (for correlations):
  - Negative: #EF4444 → #FEE2E2 → #FFFFFF → #DBEAFE → #3B82F6 :Positive
```

**Accessibility:**
- Всі color pairs: min 4.5:1 contrast (WCAG AA)
- Important info не тільки через колір (+ icons, text)
- Colorblind-safe palette (tested з Coblis)

---

### 8.3.2 Typography

**Font Stack:**

```css
/* Primary (UI) */
font-family: 
  'Inter', 
  -apple-system, 
  BlinkMacSystemFont, 
  'Segoe UI', 
  'Roboto', 
  sans-serif;

/* Monospace (numbers, data) */
font-family: 
  'SF Mono', 
  'Monaco', 
  'Cascadia Code', 
  'Courier New', 
  monospace;

/* Serif (journal, long-form) - optional */
font-family:
  'Georgia',
  'Times New Roman',
  serif;
```

**Type Scale:**

```
Heading 1 (Page titles):
  - Size: 28px / 1.75rem
  - Weight: 700 (bold)
  - Line height: 1.2
  - Letter spacing: -0.02em

Heading 2 (Section titles):
  - Size: 24px / 1.5rem
  - Weight: 600 (semibold)
  - Line height: 1.3
  - Letter spacing: -0.01em

Heading 3 (Subsections):
  - Size: 20px / 1.25rem
  - Weight: 600
  - Line height: 1.4
  - Letter spacing: 0

Body Large:
  - Size: 16px / 1rem
  - Weight: 400 (regular)
  - Line height: 1.5

Body (default):
  - Size: 14px / 0.875rem
  - Weight: 400
  - Line height: 1.5

Body Small:
  - Size: 12px / 0.75rem
  - Weight: 400
  - Line height: 1.4

Caption:
  - Size: 11px / 0.6875rem
  - Weight: 400
  - Line height: 1.3
  - Color: Secondary text

Button/Label:
  - Size: 14px / 0.875rem
  - Weight: 500 (medium)
  - Letter spacing: 0.01em
  - Transform: none (no uppercase)
```

**Responsive Typography:**

```css
/* Mobile (< 768px) */
h1 { font-size: 24px; }
h2 { font-size: 20px; }
body { font-size: 14px; }

/* Desktop (> 1024px) */
h1 { font-size: 32px; }
h2 { font-size: 24px; }
body { font-size: 16px; }
```

---

### 8.3.3 Spacing System

**8px base unit:**

```
Space scale:
  - 0:  0px
  - 1:  4px   (0.25rem)
  - 2:  8px   (0.5rem)  ← base unit
  - 3:  12px  (0.75rem)
  - 4:  16px  (1rem)
  - 5:  24px  (1.5rem)
  - 6:  32px  (2rem)
  - 7:  48px  (3rem)
  - 8:  64px  (4rem)
  - 9:  96px  (6rem)
  - 10: 128px (8rem)
```

**Usage:**

```
Component padding:
  - Tight:    8px (space-2)
  - Normal:   16px (space-4)
  - Loose:    24px (space-5)

Section margins:
  - Between items:    16px (space-4)
  - Between sections: 32px (space-6)
  - Between pages:    48px (space-7)

Button padding:
  - Small:  8px 16px
  - Medium: 12px 24px
  - Large:  16px 32px

Card padding:
  - Mobile:  16px
  - Desktop: 24px
```

---

### 8.3.4 Border Radius

```
Radius scale:
  - None:  0px
  - Small: 4px  (subtle rounding)
  - Base:  8px  (default)
  - Large: 12px (cards, modals)
  - XL:    16px (major containers)
  - Full:  9999px (pills, badges)

Usage:
  - Buttons: 8px
  - Inputs: 8px
  - Cards: 12px
  - Modals: 12px
  - Badges: 9999px (full)
  - Avatars: 9999px (full)
```

---

### 8.3.5 Shadows

**Elevation system:**

```css
/* None */
box-shadow: none;

/* Subtle (cards at rest) */
box-shadow: 
  0 1px 3px 0 rgba(0, 0, 0, 0.1),
  0 1px 2px 0 rgba(0, 0, 0, 0.06);

/* Base (interactive cards) */
box-shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Medium (dropdowns, popovers) */
box-shadow:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Large (modals) */
box-shadow:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* XL (sheets, drawers) */
box-shadow:
  0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**Dark mode adjustments:**
```css
/* Shadows у dark mode: stronger, less transparent */
box-shadow: 
  0 4px 6px -1px rgba(0, 0, 0, 0.5),
  0 2px 4px -1px rgba(0, 0, 0, 0.3);
```

---

### 8.3.6 Icons

**Icon System:**
- **Library:** Lucide Icons (або Heroicons)
- **Size:** 16px (small), 20px (medium), 24px (large)
- **Stroke width:** 2px (consistent)
- **Style:** Outline (not filled) для більшості

**Usage:**

```
Navigation: 24px
Buttons: 20px
Inline text: 16px
Status indicators: 16px
```

**Icon + Text spacing:**
```
[Icon] 8px [Text]
```

**Semantic icons:**
```
✓ Checkmark: Completed
✗ X mark: Failed, close
🔥 Fire: Streak
📊 Chart: Analytics
⚙️ Gear: Settings
👤 Person: Profile
➕ Plus: Add
✏️ Pencil: Edit
🗑️ Trash: Delete
📅 Calendar: Date
🏷️ Tag: Labels
🔍 Search: Search
```

---

## 8.4 Component Library

### 8.4.1 Buttons

**Variants:**

**Primary:**
```
┌──────────────┐
│   Save       │  ← Blue background, white text
└──────────────┘
```

**Secondary:**
```
┌──────────────┐
│   Cancel     │  ← White bg (light) / Dark bg (dark), border
└──────────────┘
```

**Ghost:**
```
┌──────────────┐
│   Learn More │  ← No background, text only
└──────────────┘
```

**Destructive:**
```
┌──────────────┐
│   Delete     │  ← Red background, white text
└──────────────┘
```

**Sizes:**

```
Small:  32px height, 12px 20px padding
Medium: 40px height, 16px 24px padding
Large:  48px height, 20px 32px padding
```

**States:**

```
Default:   Opacity 100%
Hover:     Opacity 90%, slight scale (1.02)
Active:    Opacity 80%, scale (0.98)
Disabled:  Opacity 50%, cursor not-allowed
Loading:   Spinner icon, disabled
```

**Code example:**
```tsx
<button className="
  px-6 py-3 
  bg-blue-600 hover:bg-blue-700 
  text-white font-medium 
  rounded-lg 
  transition-all duration-200
  disabled:opacity-50
">
  Save
</button>
```

---

### 8.4.2 Inputs

**Text Input:**

```
┌────────────────────────────────┐
│ Label*                         │
│ ┌────────────────────────────┐ │
│ │ Placeholder text           │ │
│ └────────────────────────────┘ │
│ Helper text                    │
└────────────────────────────────┘
```

**States:**

```
Default:  Grey border, white background
Focus:    Blue border, ring (shadow)
Error:    Red border, error icon, error message
Disabled: Grey background, grey text
```

**Textarea:**
```
┌────────────────────────────────┐
│ Description                    │
│ ┌────────────────────────────┐ │
│ │ Multi-line text            │ │
│ │ ...                        │ │
│ │                            │ │
│ └────────────────────────────┘ │
│ 0/500 characters               │
└────────────────────────────────┘
```

**Select / Dropdown:**
```
┌────────────────────────────────┐
│ Category                       │
│ ┌────────────────────────────┐ │
│ │ Health               ▼     │ │ ← Chevron indicates dropdown
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

**Checkbox:**
```
[ ] Unchecked
[✓] Checked
[–] Indeterminate (partial)
```

**Radio:**
```
( ) Unselected
(•) Selected
```

**Toggle / Switch:**
```
Unchecked: ○━━━━   (grey)
Checked:   ━━━━●   (blue)
```

---

### 8.4.3 Cards

**Default Card:**

```
┌────────────────────────────────┐
│ Card Title             [Action]│
│                                │
│ Card content goes here.        │
│ Can include text, images,      │
│ buttons, etc.                  │
│                                │
│ [Button]                       │
└────────────────────────────────┘
```

**Specs:**
- Background: White (light) / #1F2937 (dark)
- Border: None або 1px solid #E5E7EB
- Border radius: 12px
- Padding: 16px (mobile) / 24px (desktop)
- Shadow: Subtle

**Habit Card (example):**

```
┌────────────────────────────────┐
│ [✓] Meditation          🔥 5   │
│ Daily • Health                 │
│ This week: 5/7 (71%)           │
└────────────────────────────────┘
```

**Interactive states:**
- Hover: Slight shadow increase, border highlight
- Active: Subtle scale down (0.98)

---

### 8.4.4 Badges

**Purpose:** Status indicators, counts, labels.

**Styles:**

```
Default:  [Label]        Grey background
Primary:  [Label]        Blue background
Success:  [Label]        Green background
Warning:  [Label]        Yellow background
Error:    [Label]        Red background
```

**Sizes:**
```
Small:  px-2 py-0.5 text-xs
Medium: px-2.5 py-0.5 text-sm
Large:  px-3 py-1 text-base
```

**Examples:**

```
Streak badge:    [🔥 5 days]      Orange
Completion rate: [77%]             Blue
Status:          [Completed]       Green
Priority:        [High Priority]   Red
Count:           [3]               Grey circle
```

---

### 8.4.5 Progress Indicators

**Linear Progress:**

```
▓▓▓▓▓▓▓▓░░░░  77%

Structure:
[████████────] 77%
```

**Circular Progress (for compact spaces):**

```
   77%
  ┌─●─┐
  │   │
  └───┘
```

**Specs:**
- Height: 8px (linear)
- Border radius: 9999px (full pill)
- Background: Light grey
- Fill: Blue (default), Green (success), etc.
- Animation: Smooth transition (300ms)

**Streak visualization:**

```
Days: M  T  W  T  F  S  S
      ●  ●  ●  ○  ●  ●  ●

● = Completed (green)
○ = Missed (red)
```

---

### 8.4.6 Charts (Analytics)

**Chart Types:**

1. **Line Chart:** Trends over time
2. **Bar Chart:** Comparisons
3. **Heatmap:** Calendar view
4. **Pie/Donut:** Distribution
5. **Scatter Plot:** Correlations

**Library:** Recharts (React) або ECharts

**Style Guidelines:**

```
Axes:
  - Color: #9CA3AF (light grey)
  - Font: 12px
  - Stroke width: 1px

Grid:
  - Color: #F3F4F6 (very light grey)
  - Stroke: Dashed (optional)

Data lines/bars:
  - Stroke width: 2px (lines)
  - Border radius: 4px (bars)
  - Colors: From palette

Tooltips:
  - Background: White (+ shadow)
  - Border: 1px solid #E5E7EB
  - Font: 14px
  - Padding: 8px 12px

Legend:
  - Position: Top right або bottom
  - Font: 12px
  - Interactive: Click to toggle series
```

**Responsive:**
- Mobile: Simplified charts, fewer data points
- Desktop: Full detail, interactive tooltips

---

### 8.4.7 Modals & Dialogs

**Structure:**

```
┌─────────────────────────────────────┐
│ Modal Title                    [X]  │ ← Header
├─────────────────────────────────────┤
│                                     │
│ Modal content...                    │ ← Body
│                                     │
│                                     │
├─────────────────────────────────────┤
│              [Cancel]  [Confirm]    │ ← Footer
└─────────────────────────────────────┘

Backdrop: rgba(0, 0, 0, 0.5)
```

**Sizes:**

```
Small:  400px max-width  (confirmations)
Medium: 600px max-width  (forms)
Large:  800px max-width  (complex forms)
Full:   90vw max-width   (analytics)
```

**Behavior:**
- Click backdrop → Close (optional, can disable)
- ESC key → Close
- Focus trap (keyboard nav stays in modal)
- Scroll: Body scroll disabled, modal content scrollable

**Animation:**
- Enter: Fade in + scale from 0.95 to 1.0 (200ms)
- Exit: Fade out + scale to 0.95 (150ms)

---

### 8.4.8 Toast Notifications

**Position:**
- Mobile: Bottom center
- Desktop: Top right

**Structure:**

```
┌────────────────────────────────┐
│ [Icon] Message text      [X]   │
└────────────────────────────────┘
```

**Variants:**

```
Success:  ✓ Green icon, green border
Error:    ✗ Red icon, red border
Warning:  ⚠ Yellow icon, yellow border
Info:     ℹ️ Blue icon, blue border
```

**Duration:**
- Success/Info: 3 seconds
- Warning: 5 seconds
- Error: 7 seconds (або manual dismiss)
- Undo actions: Persistent until dismissed

**Stacking:**
- Max 3 visible at once
- Older toasts auto-dismiss
- Newest appears at top (desktop) або bottom (mobile)

---

## 8.5 Interaction Patterns

### 8.5.1 Touch Targets (Mobile)

**Minimum size:** 44×44px (Apple HIG standard)

**Examples:**

```
Checkbox:
  Visual size: 20×20px
  Touch target: 44×44px (padding around)

Icon button:
  Icon size: 20×20px
  Touch target: 44×44px

List item:
  Min height: 56px
  Full-width tappable
```

**Thumb zones (mobile):**

```
┌─────────────────────────────────────┐
│         ⚠️ Hard to reach            │
│                                     │
│                                     │
│       ✅ Easy (thumb zone)          │
│                                     │
│                                     │
│  [Primary actions here]             │
│                                     │
│         ⚠️ Awkward                  │
└─────────────────────────────────────┘
```

**Guideline:**
- Primary actions (save, confirm): Bottom 1/3 of screen
- Secondary actions (cancel): Top або edges
- Destructive actions (delete): Require confirmation

---

### 8.5.2 Gestures (Mobile)

**Supported gestures:**

1. **Tap:** Primary action
2. **Long press:** Context menu / secondary action
3. **Swipe left/right:** Quick actions (complete, delete)
4. **Pull to refresh:** Reload data
5. **Pinch:** Zoom charts (optional)

**Swipe actions example:**

```
Habit row:

Swipe right →  [✓ Complete] [Habit name]
Swipe left ←   [Habit name] [✗ Skip]
```

**Guidelines:**
- Swipe threshold: 30% of width
- Undo available for destructive actions
- Visual feedback (card translation, reveal background)

---

### 8.5.3 Loading States

**Strategy:** Skeleton screens > Spinners

**Why:**
- Perceived performance faster
- Layout shift minimal
- Less jarring

**Examples:**

**Skeleton (Today view):**
```
┌─────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓                       │
│ ░░░░░░░░░░░░░░░░░                   │
│                                     │
│ ▓▓▓▓▓ ░░░░░░░                       │
│ ▓▓▓▓▓ ░░░░░░░                       │
│ ▓▓▓▓▓ ░░░░░░░                       │
└─────────────────────────────────────┘
```

**Spinner (button):**
```
[⟳ Saving...]  ← Spinner + text
```

**Progressive loading:**
1. Show layout immediately (skeleton)
2. Load critical data (habits, tasks for today)
3. Load secondary data (stats, history)
4. Hydrate interactive elements

---

### 8.5.4 Error Handling

**Principles:**
1. **Prevent errors** (validation)
2. **Communicate clearly** (what went wrong)
3. **Suggest solutions** (how to fix)
4. **Allow recovery** (retry, undo)

**Example (form validation):**

```
❌ BAD:
"Invalid input"

✅ GOOD:
"Name must be 1-100 characters"
```

**Example (network error):**

```
❌ BAD:
"Error 500"

✅ GOOD:
"Connection lost. Check your internet and try again."
[Retry]
```

**Inline validation:**
- Validate on blur (not on every keystroke)
- Show errors below field
- Icon + color + text (не тільки колір)

---

### 8.5.5 Micro-interactions

**Purpose:** Feedback, delight, affordance.

**Examples:**

**1. Checkbox animation:**
```
[ ] → [✓]  (checkmark draws in, 200ms)
```

**2. Button press:**
```
Scale: 1.0 → 0.98 → 1.0  (100ms)
```

**3. Confetti (optional, on milestone):**
```
🎉 5-day streak!  (particles animation)
```

**4. Ripple effect (Material Design style):**
```
Tap → Circular ripple from touch point
```

**5. Habit completion:**
```
Grey → Green transition (300ms)
Badge appears: 🔥 5
```

**Guidelines:**
- Duration: 150–300ms
- Easing: ease-out (natural feel)
- Subtle (не відволікає)
- Можна disable (accessibility settings)

---

## 8.6 Accessibility (a11y)

### 8.6.1 WCAG Compliance

**Target:** WCAG 2.1 Level AA

**Key requirements:**

**1. Color Contrast:**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**2. Keyboard Navigation:**
- All interactive elements focusable
- Logical tab order
- Focus indicators visible
- Skip links (skip to main content)

**3. Screen Reader Support:**
- Semantic HTML (headings, lists, landmarks)
- Alt text для images
- ARIA labels де потрібно
- Live regions для dynamic content

**4. No Seizures:**
- No flashing > 3 times per second
- Animation can be disabled

---

### 8.6.2 Keyboard Navigation

**Key bindings:**

```
Tab:          Next focusable element
Shift+Tab:    Previous focusable element
Enter:        Activate button/link
Space:        Toggle checkbox, activate button
Esc:          Close modal/dropdown
Arrow keys:   Navigate lists, select options
/:            Focus search (optional)
```

**Focus management:**

**Modal opens:**
- Focus → First interactive element in modal
- Tab → Cycles within modal (focus trap)
- Esc → Close modal, return focus to trigger

**Dropdown:**
- Arrow down → Open, focus first option
- Arrow up/down → Navigate options
- Enter → Select option
- Esc → Close, return to trigger

**Focus indicators:**
```css
:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
```

---

### 8.6.3 Screen Reader Support

**Semantic HTML:**

```html
<!-- Good -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/app">Today</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Today</h1>
  <section aria-labelledby="habits-heading">
    <h2 id="habits-heading">Habits</h2>
    <!-- Habit list -->
  </section>
</main>

<!-- Bad -->
<div class="header">
  <div class="nav">
    <div class="link">Today</div>
  </div>
</div>
```

**ARIA labels:**

```html
<!-- Icon button без тексту -->
<button aria-label="Close modal">
  <XIcon />
</button>

<!-- Status indicator -->
<div role="status" aria-live="polite">
  Task completed
</div>

<!-- Progress -->
<div role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100">
  77%
</div>
```

**Live regions:**

```html
<!-- Toast notifications -->
<div role="alert" aria-live="assertive">
  Error: Failed to save
</div>

<!-- Non-critical updates -->
<div aria-live="polite">
  Habit logged successfully
</div>
```

---

### 8.6.4 Reduced Motion

**Respect user preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Alternative to animations:**
- Instant state changes
- No confetti, sparkles
- Crossfade замість slide

---

### 8.6.5 Text Sizing

**User can resize text до 200% без втрати функціональності.**

**Implementation:**
- Use relative units (rem, em) not px
- Avoid fixed heights
- Test з browser zoom 200%

**Example:**

```css
/* Bad */
.button {
  font-size: 14px;
  height: 40px;
}

/* Good */
.button {
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem; /* Height adapts */
}
```

---

## 8.7 Dark Mode

### 8.7.1 Implementation Strategy

**Approach:** CSS variables + system preference detection

**Detection:**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --text-primary: #F9FAFB;
    /* ... */
  }
}
```

**Manual toggle:**
- Settings → Theme → Light / Dark / Auto
- Persist choice (localStorage)
- Override system preference

---

### 8.7.2 Dark Mode Adjustments

**Не просто інвертувати кольори.**

**Adjustments:**

**1. Reduce contrast (less eye strain):**
```
Light mode: #000000 text on #FFFFFF
Dark mode:  #F9FAFB text on #111827  (not pure white/black)
```

**2. Deemphasize borders:**
```
Light mode: 1px solid #E5E7EB
Dark mode:  1px solid #374151  (lighter grey)
```

**3. Stronger shadows:**
```
Light mode: rgba(0, 0, 0, 0.1)
Dark mode:  rgba(0, 0, 0, 0.5)  (more opaque)
```

**4. Adjust color saturation:**
```
Light mode: #3B82F6 (blue, full saturation)
Dark mode:  #60A5FA (lighter blue, slightly desaturated)
```

**5. Images/Charts:**
- Charts: Use dark-mode-friendly colors
- Images: Optional overlay (darken slightly)

---

### 8.7.3 Testing Dark Mode

**Checklist:**
- [ ] All text readable (4.5:1 contrast)
- [ ] Focus indicators visible
- [ ] Charts legible
- [ ] No pure white/black (except intentional)
- [ ] Images don't look out of place
- [ ] Smooth transition when toggling

---

## 8.8 Performance Considerations

### 8.8.1 Visual Performance

**60 FPS target:**
- Use CSS transforms (GPU-accelerated)
- Avoid layout thrashing
- Debounce expensive operations

**Example (smooth animation):**

```css
/* Good - GPU accelerated */
.card {
  transform: translateY(0);
  transition: transform 200ms ease-out;
}
.card:hover {
  transform: translateY(-4px);
}

/* Bad - triggers layout */
.card {
  margin-top: 0;
  transition: margin-top 200ms;
}
.card:hover {
  margin-top: -4px;
}
```

---

### 8.8.2 Perceived Performance

**Techniques:**

1. **Optimistic UI:**
   - Update UI immediately
   - Sync DB in background
   - Rollback on error

2. **Skeleton screens:**
   - Show layout instantly
   - Load data progressively

3. **Lazy loading:**
   - Images: lazy load
   - Heavy components: code split
   - Analytics charts: load on scroll

4. **Prefetching:**
   - Prefetch next likely page (calendar view from today)
   - Preload critical data

---

## 8.9 Mobile-First Approach

### 8.9.1 Design Mobile First

**Process:**
1. Design mobile version first
2. Enhance for tablet
3. Enhance for desktop

**Why:**
- Forces prioritization (limited space)
- 80% of usage на mobile
- Easier to expand than reduce

---

### 8.9.2 Mobile Optimizations

**1. Touch-friendly:**
- 44×44px minimum targets
- Adequate spacing (16px+)
- No hover-dependent interactions

**2. Reduce visual complexity:**
- Hide non-essential info (collapsible)
- Single-column layouts
- Progressive disclosure

**3. Optimize images:**
- Responsive images (srcset)
- WebP format
- Lazy loading

**4. Fast interactions:**
- Instant feedback (optimistic updates)
- Minimize network requests
- Offline support (PWA)

---

### 8.9.3 Desktop Enhancements

**More information density:**
- Multi-column layouts
- Sidebar navigation (persistent)
- More data visible (less scrolling)

**Richer interactions:**
- Hover states
- Keyboard shortcuts
- Drag-and-drop
- Multi-select

**Larger charts:**
- More data points
- Interactive tooltips
- Zoom/pan

---

# 9. TECHNICAL ARCHITECTURE

## 9.1 Technology Stack Summary

### 9.1.1 Core Technologies

```
Frontend Framework:
  - Next.js 14+ (App Router)
  - React 18+
  - TypeScript 5+

Styling:
  - TailwindCSS 3+
  - shadcn/ui components
  - CSS Modules (where needed)

Backend:
  - Supabase (PostgreSQL + Auth + Storage)
  - Next.js Server Actions
  - Next.js API Routes (minimal)

State Management:
  - React Server Components (primary)
  - Zustand (client state, if needed)
  - React Query / SWR (data fetching, caching)

Charts:
  - Recharts (primary)
  - Alternative: ECharts для складних viz

Build & Deploy:
  - Vercel (recommended)
  - Alternative: Docker + любий host

Development:
  - ESLint + Prettier
  - Husky (git hooks)
  - TypeScript strict mode
```

---

## 9.2 Project Structure

### 9.2.1 Folder Organization

```
life-os/
│
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (no auth)
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── features/
│   │   │   └── page.tsx          # /features
│   │   ├── pricing/
│   │   │   └── page.tsx          # /pricing
│   │   ├── login/
│   │   │   └── page.tsx          # /login
│   │   └── signup/
│   │       └── page.tsx          # /signup
│   │
│   ├── (app)/                    # App routes (auth required)
│   │   ├── layout.tsx            # App shell (sidebar, nav)
│   │   ├── page.tsx              # Today view (/app)
│   │   ├── calendar/
│   │   │   ├── page.tsx          # Calendar view
│   │   │   └── [date]/
│   │   │       └── page.tsx      # Specific date
│   │   ├── habits/
│   │   │   ├── page.tsx          # Habits list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Habit detail
│   │   │   └── new/
│   │   │       └── page.tsx      # Create habit
│   │   ├── tasks/
│   │   │   ├── page.tsx          # Tasks list
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Task detail
│   │   ├── journal/
│   │   │   ├── page.tsx          # Journal list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Journal entry
│   │   │   └── new/
│   │   │       └── page.tsx      # New entry
│   │   ├── analytics/
│   │   │   ├── page.tsx          # Analytics overview
│   │   │   ├── habits/
│   │   │   │   └── page.tsx      # Habit analytics
│   │   │   ├── tasks/
│   │   │   │   └── page.tsx      # Task analytics
│   │   │   ├── mood/
│   │   │   │   └── page.tsx      # Mood analytics
│   │   │   └── correlations/
│   │   │       └── page.tsx      # Correlations
│   │   └── settings/
│   │       ├── page.tsx          # Settings overview
│   │       ├── account/
│   │       ├── preferences/
│   │       └── data/
│   │
│   ├── api/                      # API routes (minimal)
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts      # OAuth callback
│   │   ├── export/
│   │   │   └── route.ts          # Data export
│   │   └── webhooks/
│   │       └── route.ts          # Future webhooks
│   │
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── bottom-nav.tsx
│   │   └── app-shell.tsx
│   │
│   ├── features/                 # Feature-specific components
│   │   ├── habits/
│   │   │   ├── habit-card.tsx
│   │   │   ├── habit-log-button.tsx
│   │   │   ├── habit-form.tsx
│   │   │   └── habit-stats.tsx
│   │   ├── tasks/
│   │   │   ├── task-card.tsx
│   │   │   ├── task-form.tsx
│   │   │   └── task-list.tsx
│   │   ├── mood/
│   │   │   ├── mood-selector.tsx
│   │   │   ├── mood-chart.tsx
│   │   │   └── mood-entry-form.tsx
│   │   ├── journal/
│   │   │   ├── journal-editor.tsx
│   │   │   ├── journal-entry-card.tsx
│   │   │   └── journal-search.tsx
│   │   └── analytics/
│   │       ├── completion-chart.tsx
│   │       ├── heatmap.tsx
│   │       ├── correlation-matrix.tsx
│   │       └── streak-chart.tsx
│   │
│   └── shared/                   # Shared/common components
│       ├── empty-state.tsx
│       ├── error-boundary.tsx
│       ├── loading-skeleton.tsx
│       └── date-picker.tsx
│
├── lib/                          # Utilities & config
│   ├── supabase/
│   │   ├── client.ts             # Supabase client (browser)
│   │   ├── server.ts             # Supabase server client
│   │   └── middleware.ts         # Auth middleware
│   │
│   ├── actions/                  # Server Actions
│   │   ├── habits.ts             # Habit CRUD actions
│   │   ├── tasks.ts              # Task CRUD actions
│   │   ├── mood.ts               # Mood CRUD actions
│   │   ├── journal.ts            # Journal CRUD actions
│   │   └── analytics.ts          # Analytics queries
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-habits.ts
│   │   ├── use-tasks.ts
│   │   ├── use-analytics.ts
│   │   └── use-user.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── date.ts               # Date helpers
│   │   ├── format.ts             # Formatting helpers
│   │   ├── validation.ts         # Zod schemas
│   │   └── constants.ts          # Constants
│   │
│   └── types/                    # TypeScript types
│       ├── database.ts           # Generated from Supabase
│       ├── models.ts             # App models
│       └── api.ts                # API types
│
├── public/                       # Static assets
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── supabase/                     # Supabase config
│   ├── migrations/               # SQL migrations
│   │   ├── 20260101_initial.sql
│   │   └── ...
│   ├── functions/                # Edge functions (future)
│   └── seed.sql                  # Seed data (dev)
│
├── tests/                        # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                    # Environment variables (local)
├── .env.example                  # Example env file
├── next.config.js                # Next.js config
├── tailwind.config.js            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json
└── README.md
```

---

## 9.3 Next.js App Router Architecture

### 9.3.1 Route Groups

**Purpose:** Організація routes без впливу на URL.

**Example:**

```
app/
├── (public)/          # No auth required
│   ├── layout.tsx     # Public layout (header, footer)
│   └── page.tsx       # Landing page (/)
│
└── (app)/             # Auth required
    ├── layout.tsx     # App layout (sidebar, nav)
    └── page.tsx       # Today view (/app)
```

**Benefits:**
- Shared layouts per group
- Middleware can target groups
- Clean separation of concerns

---

### 9.3.2 Server Components vs Client Components

**Default:** Server Components (RSC)

**Server Components (default):**
```tsx
// app/(app)/page.tsx
// Server Component (no 'use client')

import { getTodayData } from '@/lib/actions/today'

export default async function TodayPage() {
  const data = await getTodayData() // Fetch на сервері
  
  return (
    <div>
      <h1>Today</h1>
      {/* Render data */}
    </div>
  )
}
```

**Benefits:**
- Zero JS до клієнта (smaller bundle)
- Direct DB access (через Server Actions)
- SEO-friendly
- Security (sensitive logic на сервері)

**Client Components ('use client'):**
```tsx
// components/features/habits/habit-log-button.tsx
'use client'

import { useState } from 'react'
import { logHabit } from '@/lib/actions/habits'

export function HabitLogButton({ habitId }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = async () => {
    setIsLoading(true)
    await logHabit(habitId, true) // Server Action
    setIsLoading(false)
  }
  
  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Saving...' : 'Complete'}
    </button>
  )
}
```

**Use Client Components for:**
- State (useState, useReducer)
- Effects (useEffect)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Custom hooks (useHooks)

**Strategy:**
- Keep Client Components small і leaf nodes
- Compose Server Components as much as possible
- Pass data from Server → Client through props

---

### 9.3.3 Layouts & Templates

**Root Layout:**
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Life OS',
  description: 'Track. Analyze. Improve.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**App Layout (authenticated):**
```tsx
// app/(app)/layout.tsx
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { AppShell } from '@/components/layout/app-shell'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <AppShell user={user}>{children}</AppShell>
}
```

**Template (for animations between routes):**
```tsx
// app/(app)/template.tsx
'use client'

import { motion } from 'framer-motion'

export default function AppTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
```

---

### 9.3.4 Loading & Error States

**Loading UI (automatic):**
```tsx
// app/(app)/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}
```

**Error UI:**
```tsx
// app/(app)/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

**Not Found:**
```tsx
// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-muted-foreground mb-4">Page not found</p>
      <Button asChild>
        <Link href="/app">Go to Today</Link>
      </Button>
    </div>
  )
}
```

---

## 9.4 Server Actions

### 9.4.1 Overview

**Purpose:** Server-side mutations (CRUD) without API routes.

**Benefits:**
- Type-safe (TypeScript end-to-end)
- No API boilerplate
- Automatic revalidation
- Progressive enhancement

**Structure:**
```
lib/
└── actions/
    ├── habits.ts      # Habit-related actions
    ├── tasks.ts       # Task-related actions
    ├── mood.ts        # Mood-related actions
    └── journal.ts     # Journal-related actions
```

---

### 9.4.2 Example: Habit Actions

```tsx
// lib/actions/habits.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Validation schema
const createHabitSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['binary', 'quantitative']),
  unit: z.string().optional(),
  target_value: z.number().optional(),
  category: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
})

// CREATE habit
export async function createHabit(formData: FormData) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  // Parse and validate
  const rawData = {
    name: formData.get('name'),
    type: formData.get('type'),
    unit: formData.get('unit'),
    target_value: formData.get('target_value') 
      ? Number(formData.get('target_value')) 
      : undefined,
    category: formData.get('category'),
    color: formData.get('color'),
  }
  
  const validatedData = createHabitSchema.parse(rawData)
  
  // Insert to DB
  const { data, error } = await supabase
    .from('habits')
    .insert({
      user_id: user.id,
      ...validatedData,
    })
    .select()
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  // Revalidate (refresh cache)
  revalidatePath('/app')
  revalidatePath('/app/habits')
  
  return { success: true, data }
}

// LOG habit
export async function logHabit(
  habitId: string,
  completed: boolean,
  date?: string
) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const logDate = date || new Date().toISOString().split('T')[0]
  
  // Ensure day exists
  const { data: day } = await supabase
    .rpc('ensure_day_exists', {
      p_user_id: user.id,
      p_date: logDate,
    })
  
  // Upsert habit log
  const { data, error } = await supabase
    .from('habit_logs')
    .upsert({
      user_id: user.id,
      habit_id: habitId,
      day_id: day.id,
      date: logDate,
      completed,
    }, {
      onConflict: 'habit_id,day_id',
    })
    .select()
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  // Revalidate today view
  revalidatePath('/app')
  
  return { success: true, data }
}

// GET habits for user
export async function getHabits() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const { data, error } = await supabase
    .from('habits')
    .select('*, streaks(*)')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('sort_order')
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

// UPDATE habit
export async function updateHabit(
  habitId: string,
  updates: Partial<z.infer<typeof createHabitSchema>>
) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const { data, error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', habitId)
    .eq('user_id', user.id)
    .select()
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  revalidatePath('/app')
  revalidatePath('/app/habits')
  revalidatePath(`/app/habits/${habitId}`)
  
  return { success: true, data }
}

// ARCHIVE habit
export async function archiveHabit(habitId: string) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const { data, error } = await supabase
    .from('habits')
    .update({
      is_active: false,
      archived_at: new Date().toISOString(),
    })
    .eq('id', habitId)
    .eq('user_id', user.id)
    .select()
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  revalidatePath('/app')
  revalidatePath('/app/habits')
  
  return { success: true, data }
}
```

---

### 9.4.3 Using Server Actions in Components

**From Server Component:**
```tsx
// app/(app)/page.tsx
import { getHabits } from '@/lib/actions/habits'
import { HabitCard } from '@/components/features/habits/habit-card'

export default async function TodayPage() {
  const habits = await getHabits()
  
  return (
    <div>
      <h2>Habits</h2>
      {habits.map(habit => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}
```

**From Client Component (with form):**
```tsx
// components/features/habits/habit-form.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createHabit } from '@/lib/actions/habits'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Habit'}
    </Button>
  )
}

export function HabitForm() {
  const [state, formAction] = useFormState(createHabit, null)
  
  return (
    <form action={formAction} className="space-y-4">
      <Input
        name="name"
        placeholder="Habit name"
        required
      />
      
      <select name="type" required>
        <option value="binary">Binary (Yes/No)</option>
        <option value="quantitative">Quantitative (Number)</option>
      </select>
      
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      
      <SubmitButton />
    </form>
  )
}
```

**From Client Component (with async call):**
```tsx
// components/features/habits/habit-log-button.tsx
'use client'

import { useState, useTransition } from 'react'
import { logHabit } from '@/lib/actions/habits'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function HabitLogButton({ 
  habitId, 
  initialCompleted 
}: { 
  habitId: string
  initialCompleted: boolean | null
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [completed, setCompleted] = useState(initialCompleted)
  
  const handleToggle = async () => {
    const newValue = completed === true ? false : true
    
    // Optimistic update
    setCompleted(newValue)
    
    startTransition(async () => {
      try {
        await logHabit(habitId, newValue)
        router.refresh() // Refresh server data
      } catch (error) {
        // Rollback on error
        setCompleted(completed)
        console.error(error)
      }
    })
  }
  
  return (
    <Button 
      onClick={handleToggle}
      disabled={isPending}
      variant={completed ? 'success' : 'outline'}
    >
      {completed ? '✓ Done' : 'Complete'}
    </Button>
  )
}
```

---

### 9.4.4 Error Handling in Server Actions

**Strategy:**

```tsx
// lib/actions/habits.ts
'use server'

import { ActionResult } from '@/lib/types/api'

export async function createHabit(
  formData: FormData
): Promise<ActionResult> {
  try {
    // Validation
    const validatedData = createHabitSchema.parse(rawData)
    
    // DB operation
    const { data, error } = await supabase
      .from('habits')
      .insert(validatedData)
    
    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }
    
    revalidatePath('/app')
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
```

**Type:**
```tsx
// lib/types/api.ts
export type ActionResult<T = any> = 
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
```

---

## 9.5 Data Fetching & Caching

### 9.5.1 Fetch Caching (Next.js)

**Default behavior:** `fetch()` requests cached automatically.

```tsx
// Cached by default (static)
const data = await fetch('https://api.example.com/data')

// Revalidate every 60 seconds
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})

// Never cache (always fresh)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})
```

---

### 9.5.2 Supabase Query Caching

**Problem:** Supabase queries не кешуються автоматично (не через fetch).

**Solution:** Use React Cache або wrapper.

**Example (React Cache):**
```tsx
// lib/data/habits.ts
import { cache } from 'react'
import { createServerClient } from '@/lib/supabase/server'

export const getHabits = cache(async () => {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []
  
  const { data } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
  
  return data || []
})
```

**Benefits:**
- Deduplicated requests у одному render
- Automatic memoization

---

### 9.5.3 Revalidation Strategies

**1. On-demand (Server Actions):**
```tsx
import { revalidatePath, revalidateTag } from 'next/cache'

// Revalidate specific path
revalidatePath('/app')
revalidatePath('/app/habits')

// Revalidate by tag
revalidateTag('habits')
```

**2. Time-based:**
```tsx
// Page/route config
export const revalidate = 60 // seconds
```

**3. Manual (Client-side):**
```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()
router.refresh() // Re-fetch server data
```

---

### 9.5.4 Client-Side Caching (SWR / React Query)

**Use case:** Client components з frequent updates.

**Example (SWR):**
```tsx
'use client'

import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export function HabitStats({ habitId }: { habitId: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/habits/${habitId}/stats`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every 60s
      revalidateOnFocus: true,
    }
  )
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  
  return (
    <div>
      <p>Completion rate: {data.completionRate}%</p>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  )
}
```

**Alternative: React Query (TanStack Query):**
```tsx
'use client'

import { useQuery } from '@tanstack/react-query'

export function HabitStats({ habitId }: { habitId: string }) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['habit', habitId, 'stats'],
    queryFn: async () => {
      const res = await fetch(`/api/habits/${habitId}/stats`)
      return res.json()
    },
    staleTime: 60000, // 60s
    cacheTime: 300000, // 5min
  })
  
  // Similar render logic
}
```

**Decision:**
- **SWR:** Lighter, simpler
- **React Query:** More features (pagination, infinite scroll, mutations)

**For Life OS:** SWR sufficient для MVP.

---

## 9.6 Authentication Flow

### 9.6.1 Supabase Auth Setup

**Initialize Supabase client:**

```tsx
// lib/supabase/client.ts (browser)
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```tsx
// lib/supabase/server.ts (server)
import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerClient() {
  const cookieStore = cookies()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

---

### 9.6.2 Middleware (Route Protection)

```tsx
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users from /app/* to /login
  if (!user && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users from /login, /signup to /app
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/app/:path*',
    '/login',
    '/signup',
  ],
}
```

---

### 9.6.3 Login/Signup Pages

**Login:**
```tsx
// app/(public)/login/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push('/app')
      router.refresh()
    }
  }
  
  const handleGoogleLogin = async () => {
    const supabase = createClient()
    
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
```

**OAuth Callback:**
```tsx
// app/auth/callback/route.ts
import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/app', request.url))
}
```

---

### 9.6.4 User Context (Client)

**Optional:** Global user state для client components.

```tsx
// lib/hooks/use-user.ts
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

const UserContext = createContext<{ user: User | null }>({ user: null })

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  
  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [supabase])
  
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
```

**Usage:**
```tsx
// app/layout.tsx
import { UserProvider } from '@/lib/hooks/use-user'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}

// components/header.tsx
'use client'

import { useUser } from '@/lib/hooks/use-user'

export function Header() {
  const { user } = useUser()
  
  return (
    <header>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <a href="/login">Log In</a>
      )}
    </header>
  )
}
```

---

## 9.7 API Routes (Minimal)

**Use case:** Endpoints що не можуть бути Server Actions.

**Examples:**
- OAuth callbacks
- Webhooks
- File downloads
- External API proxies

**Example: Data Export:**
```tsx
// app/api/export/route.ts
import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Fetch all user data
  const [habits, tasks, moodEntries, journalEntries] = await Promise.all([
    supabase.from('habits').select('*').eq('user_id', user.id),
    supabase.from('tasks').select('*').eq('user_id', user.id),
    supabase.from('mood_entries').select('*').eq('user_id', user.id),
    supabase.from('journal_entries').select('*').eq('user_id', user.id),
  ])
  
  const exportData = {
    exported_at: new Date().toISOString(),
    user: {
      id: user.id,
      email: user.email,
    },
    habits: habits.data,
    tasks: tasks.data,
    mood_entries: moodEntries.data,
    journal_entries: journalEntries.data,
  }
  
  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="life-os-export-${Date.now()}.json"`,
    },
  })
}
```

---

## 9.8 Background Jobs & Scheduled Tasks

### 9.8.1 Requirements

**Use cases:**
- Daily streak calculations (midnight cron)
- Weekly summary emails (future)
- Data cleanup (soft delete → hard delete після 14 днів)
- Analytics pre-computation (heavy queries)

**Options:**
1. **Vercel Cron Jobs** (built-in, recommended)
2. **Supabase Edge Functions + pg_cron** (PostgreSQL cron)
3. **External service** (Inngest, Trigger.dev)

---

### 9.8.2 Vercel Cron Jobs (Recommended для MVP)

**Setup:**

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/midnight",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/weekly-summary",
      "schedule": "0 9 * * 0"
    }
  ]
}
```

**Midnight Job (Streak calculation, Day creation):**

```tsx
// app/api/cron/midnight/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role key для admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-side only
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function GET(request: Request) {
  // Verify cron secret (security)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    // 1. Check for broken streaks (habits not logged yesterday)
    await checkBrokenStreaks()
    
    // 2. Create "today" day record for all active users
    await createTodayRecords()
    
    // 3. Cleanup old soft-deleted records
    await cleanupOldData()
    
    return NextResponse.json({ 
      success: true, 
      timestamp: new Date().toISOString() 
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}

async function checkBrokenStreaks() {
  // Get all active habits
  const { data: habits } = await supabase
    .from('habits')
    .select('id, user_id')
    .eq('is_active', true)
  
  if (!habits) return
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  
  // Check each habit
  for (const habit of habits) {
    // Check if logged yesterday
    const { data: log } = await supabase
      .from('habit_logs')
      .select('completed')
      .eq('habit_id', habit.id)
      .eq('date', yesterdayStr)
      .single()
    
    // If not logged or explicitly skipped → reset streak
    if (!log || log.completed === false) {
      // Trigger streak recalculation
      await supabase.rpc('recalculate_streak', { 
        p_habit_id: habit.id 
      })
    }
  }
}

async function createTodayRecords() {
  // Get all users
  const { data: users } = await supabase
    .from('users')
    .select('id, timezone')
  
  if (!users) return
  
  // For each user, create today's day record if not exists
  for (const user of users) {
    const today = new Date().toLocaleDateString('en-CA', { 
      timeZone: user.timezone || 'UTC' 
    })
    
    await supabase
      .from('days')
      .upsert({
        user_id: user.id,
        date: today,
      }, {
        onConflict: 'user_id,date',
        ignoreDuplicates: true,
      })
  }
}

async function cleanupOldData() {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 14)
  
  // Hard delete soft-deleted records older than 14 days
  // (Future implementation - currently soft delete only)
}
```

**Weekly Summary (Future):**

```tsx
// app/api/cron/weekly-summary/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Get users who opted in for weekly summaries
  const { data: users } = await supabase
    .from('users')
    .select('id, email, preferences')
    .contains('preferences', { weekly_summary: true })
  
  if (!users) return NextResponse.json({ success: true })
  
  for (const user of users) {
    // Calculate weekly stats
    const stats = await calculateWeeklyStats(user.id)
    
    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Your Weekly Life OS Summary',
      template: 'weekly-summary',
      data: stats,
    })
  }
  
  return NextResponse.json({ success: true })
}

async function calculateWeeklyStats(userId: string) {
  // Implementation...
}
```

---

### 9.8.3 PostgreSQL pg_cron (Alternative)

**Enable pg_cron extension:**

```sql
-- In Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily streak check (midnight UTC)
SELECT cron.schedule(
  'check-streaks',
  '0 0 * * *',
  $$
  SELECT recalculate_all_streaks();
  $$
);

-- Function to recalculate all streaks
CREATE OR REPLACE FUNCTION recalculate_all_streaks()
RETURNS VOID AS $$
DECLARE
  habit_record RECORD;
BEGIN
  FOR habit_record IN 
    SELECT id FROM habits WHERE is_active = TRUE
  LOOP
    PERFORM recalculate_streak(habit_record.id);
  END LOOP;
END;
$$ LANGUAGE plpgsql;
```

**Pros:**
- Runs inside database (no external dependencies)
- Reliable
- Free (included в Supabase)

**Cons:**
- Limited to SQL operations
- Can't send emails, call external APIs
- Harder to debug

**Recommendation:** Use Vercel Cron для MVP, pg_cron для DB-only tasks.

---

### 9.8.4 Background Task Queue (Future)

**Use case:** Heavy analytics pre-computation.

**Example with Inngest:**

```tsx
// inngest/functions.ts
import { inngest } from './client'
import { supabase } from '@/lib/supabase/server'

export const precomputeAnalytics = inngest.createFunction(
  { id: 'precompute-analytics' },
  { cron: '0 2 * * *' }, // 2 AM daily
  async ({ event, step }) => {
    // Get all users
    const { data: users } = await step.run('fetch-users', async () => {
      return supabase.from('users').select('id')
    })
    
    if (!users) return
    
    // Process each user (parallelized)
    await step.run('compute-stats', async () => {
      await Promise.all(
        users.map(user => computeUserAnalytics(user.id))
      )
    })
    
    return { success: true, usersProcessed: users.length }
  }
)

async function computeUserAnalytics(userId: string) {
  // Heavy computation
  const correlations = await calculateAllCorrelations(userId)
  
  // Cache results
  await supabase
    .from('analytics_cache')
    .upsert({
      user_id: userId,
      correlations,
      computed_at: new Date().toISOString(),
    })
}
```

**MVP Decision:** Skip heavy pre-computation. Compute on-demand для MVP.

---

## 9.9 Real-time Features (Optional)

### 9.9.1 Use Cases

**Potential real-time features:**
1. Multi-device sync (log habit на phone → instant update на desktop)
2. Collaborative features (future: family/team dashboards)
3. Live notifications (future)

**MVP Decision:** NOT required. Polling/refresh sufficient.

---

### 9.9.2 Supabase Realtime (If Needed)

**Setup:**

```tsx
// lib/hooks/use-realtime-habits.ts
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Habit } from '@/lib/types/models'

export function useRealtimeHabits(userId: string) {
  const [habits, setHabits] = useState<Habit[]>([])
  const supabase = createClient()
  
  useEffect(() => {
    // Initial fetch
    fetchHabits()
    
    // Subscribe to changes
    const channel = supabase
      .channel('habits-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'habits',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('Change received:', payload)
          
          if (payload.eventType === 'INSERT') {
            setHabits(prev => [...prev, payload.new as Habit])
          } else if (payload.eventType === 'UPDATE') {
            setHabits(prev => 
              prev.map(h => h.id === payload.new.id ? payload.new as Habit : h)
            )
          } else if (payload.eventType === 'DELETE') {
            setHabits(prev => prev.filter(h => h.id !== payload.old.id))
          }
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])
  
  async function fetchHabits() {
    const { data } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
    
    setHabits(data || [])
  }
  
  return habits
}
```

**Usage:**

```tsx
'use client'

import { useRealtimeHabits } from '@/lib/hooks/use-realtime-habits'
import { useUser } from '@/lib/hooks/use-user'

export function HabitsList() {
  const { user } = useUser()
  const habits = useRealtimeHabits(user?.id!)
  
  return (
    <div>
      {habits.map(habit => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}
```

**Trade-offs:**
- **Pros:** Instant updates, better UX
- **Cons:** More complexity, WebSocket connections, costs

**MVP:** Skip realtime. Use `router.refresh()` або polling.

---

## 9.10 Build & Deployment

### 9.10.1 Environment Variables

**Structure:**

```bash
# .env.local (development)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # Server-only, DO NOT expose

NEXT_PUBLIC_APP_URL=http://localhost:3000

CRON_SECRET=random-secret-for-cron-auth
```

```bash
# .env.production (Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

NEXT_PUBLIC_APP_URL=https://lifeos.app

CRON_SECRET=production-cron-secret
```

**Security:**
- **NEVER** commit .env files
- Use Vercel Environment Variables UI
- Separate keys для staging/production

---

### 9.10.2 Build Configuration

**next.config.js:**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['xxx.supabase.co'], // Supabase Storage domain
    formats: ['image/avif', 'image/webp'],
  },
  
  // Experimental features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  
  // Output standalone для Docker (optional)
  // output: 'standalone',
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'sb-access-token', // Supabase auth cookie
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

---

### 9.10.3 Vercel Deployment

**Setup:**

1. **Connect GitHub repo:**
   - Vercel Dashboard → New Project → Import Git Repository

2. **Environment Variables:**
   - Add all env vars в Vercel UI

3. **Build settings:**
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deployment triggers:**
   - Push to `main` → Production
   - Push to `dev` → Preview
   - Pull requests → Preview deployments

**Production checklist:**
- [ ] Environment variables set
- [ ] Supabase production instance configured
- [ ] Custom domain configured
- [ ] SSL certificate (automatic через Vercel)
- [ ] Analytics enabled (Vercel Analytics)
- [ ] Cron jobs configured (vercel.json)

---

### 9.10.4 Alternative: Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set env for build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
    env_file:
      - .env.production
    restart: unless-stopped
```

**Build & Run:**

```bash
# Build image
docker build -t life-os .

# Run container
docker run -p 3000:3000 --env-file .env.production life-os

# Or with docker-compose
docker-compose up -d
```

**Deployment targets:**
- DigitalOcean App Platform
- AWS ECS/Fargate
- Google Cloud Run
- Any VPS з Docker

---

### 9.10.5 CI/CD Pipeline (GitHub Actions)

**.github/workflows/deploy.yml:**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      # Deploy to Vercel (handled automatically if connected)
      # Or manual deploy step
```

---

## 9.11 Performance Optimization

### 9.11.1 Code Splitting

**Automatic (Next.js):**
- Each page = separate chunk
- Dynamic imports

**Manual (for heavy components):**

```tsx
import dynamic from 'next/dynamic'

// Lazy load heavy chart component
const CorrelationMatrix = dynamic(
  () => import('@/components/analytics/correlation-matrix'),
  {
    loading: () => <SkeletonChart />,
    ssr: false, // Client-side only
  }
)

export function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <CorrelationMatrix />
    </div>
  )
}
```

---

### 9.11.2 Image Optimization

**Next.js Image component:**

```tsx
import Image from 'next/image'

<Image
  src="/hero.png"
  alt="Hero image"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Optional blur-up effect
  blurDataURL="data:image/..." // Low-res placeholder
/>
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive sizes
- Blur placeholder

---

### 9.11.3 Font Optimization

**Using next/font:**

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

**Benefits:**
- Self-hosted (Google Fonts downloaded at build time)
- Zero layout shift
- Optimal loading

---

### 9.11.4 Database Query Optimization

**1. Use proper indexes:**
```sql
-- Already covered in Database Architecture (section 5)
CREATE INDEX idx_habit_logs_user_date ON habit_logs(user_id, date DESC);
```

**2. Limit data fetching:**
```tsx
// ❌ Bad: Fetch all data
const { data } = await supabase
  .from('habit_logs')
  .select('*')
  .eq('user_id', userId)

// ✅ Good: Fetch only needed data
const { data } = await supabase
  .from('habit_logs')
  .select('id, habit_id, date, completed')
  .eq('user_id', userId)
  .gte('date', '2026-01-01')
  .lte('date', '2026-01-31')
  .order('date', { ascending: false })
  .limit(100)
```

**3. Use joins efficiently:**
```tsx
// Fetch habits with their logs
const { data } = await supabase
  .from('habits')
  .select(`
    *,
    habit_logs!inner(date, completed)
  `)
  .eq('user_id', userId)
  .gte('habit_logs.date', '2026-01-01')
```

**4. Pagination:**
```tsx
const PAGE_SIZE = 20

const { data, count } = await supabase
  .from('tasks')
  .select('*', { count: 'exact' })
  .eq('user_id', userId)
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
```

---

### 9.11.5 Client-Side Performance

**1. Memoization:**
```tsx
import { useMemo } from 'react'

function AnalyticsChart({ data }) {
  const chartData = useMemo(() => {
    // Expensive computation
    return processChartData(data)
  }, [data])
  
  return <Chart data={chartData} />
}
```

**2. Virtual scrolling (for long lists):**
```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

function TaskList({ tasks }) {
  const parentRef = useRef<HTMLDivElement>(null)
  
  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // Height of each item
  })
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(item => (
          <div
            key={item.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${item.start}px)`,
            }}
          >
            <TaskCard task={tasks[item.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

**3. Debounce search:**
```tsx
import { useDebouncedCallback } from 'use-debounce'

function JournalSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const debouncedSearch = useDebouncedCallback(
    (value) => {
      // Perform search
      searchJournalEntries(value)
    },
    500 // 500ms delay
  )
  
  return (
    <input
      type="text"
      onChange={(e) => {
        setSearchTerm(e.target.value)
        debouncedSearch(e.target.value)
      }}
    />
  )
}
```

---

### 9.11.6 Bundle Size Analysis

**Analyze bundle:**

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Update next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

**Optimization targets:**
- Total bundle < 200KB (gzipped)
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Lighthouse score > 90

---

## 9.12 Error Tracking & Monitoring

### 9.12.1 Error Tracking (Sentry)

**Setup:**

```bash
npm install @sentry/nextjs
```

**sentry.client.config.js:**
```js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

**sentry.server.config.js:**
```js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

**Usage:**
```tsx
try {
  await createHabit(data)
} catch (error) {
  Sentry.captureException(error, {
    tags: { action: 'create_habit' },
    user: { id: user.id },
  })
  throw error
}
```

---

### 9.12.2 Analytics (Vercel Analytics)

**Enable:**
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Metrics tracked:**
- Page views
- Core Web Vitals (LCP, FID, CLS)
- Custom events (optional)

---

### 9.12.3 Logging

**Server-side:**
```tsx
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data)
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
  },
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data)
    }
  },
}

// Usage
import { logger } from '@/lib/logger'

export async function createHabit(data) {
  logger.info('Creating habit', { userId: user.id, habitName: data.name })
  
  try {
    const result = await supabase.from('habits').insert(data)
    logger.info('Habit created', { habitId: result.data.id })
    return result
  } catch (error) {
    logger.error('Failed to create habit', error)
    throw error
  }
}
```

**Production:** Consider structured logging (Datadog, LogRocket).

---

## 9.13 Testing Strategy

### 9.13.1 Testing Pyramid

```
       E2E Tests (10%)
      ↗ Playwright
      
   Integration Tests (30%)
  ↗ React Testing Library
  
Unit Tests (60%)
↗ Vitest / Jest
```

---

### 9.13.2 Unit Tests (Vitest)

**Setup:**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**vitest.config.ts:**
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

**Example test:**

```tsx
// lib/utils/date.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, isToday } from './date'

describe('Date utilities', () => {
  it('formats date correctly', () => {
    const date = new Date('2026-01-21')
    expect(formatDate(date)).toBe('January 21, 2026')
  })
  
  it('detects today correctly', () => {
    const today = new Date()
    expect(isToday(today)).toBe(true)
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(isToday(yesterday)).toBe(false)
  })
})
```

---

### 9.13.3 Component Tests

```tsx
// components/features/habits/habit-card.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HabitCard } from './habit-card'

describe('HabitCard', () => {
  const mockHabit = {
    id: '1',
    name: 'Meditation',
    type: 'binary',
    is_active: true,
  }
  
  it('renders habit name', () => {
    render(<HabitCard habit={mockHabit} />)
    expect(screen.getByText('Meditation')).toBeInTheDocument()
  })
  
  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn()
    render(<HabitCard habit={mockHabit} onToggle={onToggle} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(onToggle).toHaveBeenCalledWith(mockHabit.id, true)
  })
})
```

---

### 9.13.4 E2E Tests (Playwright)

**Setup:**

```bash
npm install -D @playwright/test
npx playwright install
```

**playwright.config.ts:**
```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
})
```

**Example E2E test:**

```ts
// tests/e2e/habits.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Habit Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/app')
  })
  
  test('should create a new habit', async ({ page }) => {
    // Navigate to habits
    await page.click('text=Habits')
    
    // Click add habit
    await page.click('text=Add Habit')
    
    // Fill form
    await page.fill('input[name="name"]', 'Morning Run')
    await page.selectOption('select[name="type"]', 'binary')
    
    // Submit
    await page.click('button[type="submit"]')
    
    // Verify
    await expect(page.locator('text=Morning Run')).toBeVisible()
  })
  
  test('should log a habit', async ({ page }) => {
    // Go to today view
    await page.goto('/app')
    
    // Find meditation habit
    const habitCard = page.locator('[data-habit-id="meditation"]')
    
    // Click checkbox
    await habitCard.locator('input[type="checkbox"]').click()
    
    // Verify checked
    await expect(habitCard.locator('input[type="checkbox"]')).toBeChecked()
  })
})
```

---

### 9.13.5 Testing Strategy for MVP

**Priority:**
1. **Critical paths:** Auth, habit logging, task completion
2. **Server Actions:** Unit tests для validation logic
3. **Components:** Smoke tests (renders without crash)
4. **E2E:** Happy path only

**Coverage target:** 60-70% (not 100% — diminishing returns)

---

# 10. SECURITY & PRIVACY

## 10.1 Security Principles

### 10.1.1 Core Security Principles

**1. Defense in Depth**
- Multiple layers of security
- Server-side validation (навіть якщо є client-side)
- RLS на DB рівні
- Auth middleware

**2. Principle of Least Privilege**
- User бачить тільки свої дані
- Service role key тільки на сервері
- Anon key для client (обмежені права)

**3. Fail Secure**
- Default deny (RLS)
- Explicit access grants
- Graceful error handling (без exposure sensitive info)

**4. Privacy by Design**
- Minimal data collection
- User control над даними
- Transparent data usage

---

## 10.2 Authentication & Authorization

### 10.2.1 Supabase Auth Security

**Password requirements:**
```tsx
// Enforced через Supabase Auth settings
{
  "password_min_length": 8,
  "password_required_characters": {
    "lowercase": true,
    "uppercase": true,
    "numbers": true,
    "special": false // Optional for UX
  }
}
```

**Session management:**
- JWT tokens (short-lived)
- Refresh tokens (longer-lived, HTTP-only cookies)
- Auto-refresh mechanism
- Session timeout: 7 days (configurable)

**OAuth security:**
- State parameter (CSRF protection)
- PKCE для mobile
- Callback URL whitelist

---

### 10.2.2 Row Level Security (RLS)

**Critical:** All tables have RLS enabled.

**Example enforcement:**

```sql
-- Ensure RLS is enabled
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Drop all policies (start fresh)
DROP POLICY IF EXISTS "Users can view own habits" ON habits;

-- Create policies
CREATE POLICY "Users can view own habits"
ON habits FOR SELECT
USING (auth.user_id() = user_id);

-- Test query (should return only user's habits)
SELECT * FROM habits; -- RLS automatically filters
```

**Bypass protection:**
```sql
-- Service role CAN bypass RLS (use with caution)
-- Only use for admin operations, cron jobs

-- Regular user queries CANNOT bypass
```

**Testing RLS:**
```sql
-- Test as specific user
SET request.jwt.claims = '{"sub": "user-uuid-here"}';

-- Verify only their data visible
SELECT * FROM habits; -- Should see only this user's habits

-- Reset
RESET request.jwt.claims;
```

---

### 10.2.3 API Security

**Server Actions security:**

```tsx
// lib/actions/habits.ts
'use server'

import { createServerClient } from '@/lib/supabase/server'

export async function createHabit(data: HabitInput) {
  // 1. ALWAYS verify auth server-side
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized') // Don't expose details
  }
  
  // 2. Validate input (NEVER trust client)
  const validated = habitSchema.parse(data) // Throws if invalid
  
  // 3. Enforce user_id (prevent impersonation)
  const { data: habit, error } = await supabase
    .from('habits')
    .insert({
      ...validated,
      user_id: user.id, // Force correct user_id
    })
  
  if (error) {
    // Log error server-side, generic message to client
    console.error('Habit creation error:', error)
    throw new Error('Failed to create habit')
  }
  
  return habit
}
```

**Input validation (Zod):**

```tsx
// lib/utils/validation.ts
import { z } from 'zod'

export const habitSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .trim(),
  
  type: z.enum(['binary', 'quantitative']),
  
  unit: z.string().max(20).optional(),
  
  target_value: z.number()
    .positive('Target must be positive')
    .max(99999.99)
    .optional(),
  
  category: z.string().max(50).optional(),
  
  color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
    .optional(),
})

// Sanitize HTML input (for journal entries)
export function sanitizeHtml(input: string): string {
  // Use DOMPurify або similar
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href'],
  })
}
```

---

### 10.2.4 CSRF Protection

**Next.js Server Actions:**
- Built-in CSRF protection
- Origin header validation
- No additional setup needed

**API Routes (if used):**

```tsx
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  
  // Verify origin matches host (CSRF protection)
  if (origin && !origin.includes(host)) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  return NextResponse.next()
}
```

---

### 10.2.5 Rate Limiting

**Supabase built-in:**
- Anonymous requests: 1000/hour per IP
- Authenticated: Higher limits

**Custom rate limiting (if needed):**

```tsx
// lib/rate-limit.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

export async function rateLimit(identifier: string, limit = 10, window = 60) {
  const key = `rate_limit:${identifier}`
  
  const current = await redis.incr(key)
  
  if (current === 1) {
    await redis.expire(key, window) // Set expiry on first request
  }
  
  if (current > limit) {
    return { success: false, remaining: 0 }
  }
  
  return { success: true, remaining: limit - current }
}

// Usage in Server Action
export async function createHabit(data: HabitInput) {
  const user = await getUser()
  
  const { success } = await rateLimit(`create_habit:${user.id}`, 10, 60)
  
  if (!success) {
    throw new Error('Rate limit exceeded. Try again later.')
  }
  
  // Continue...
}
```

**MVP:** Rely on Supabase built-in rate limiting.

---

## 10.3 Data Security

### 10.3.1 Encryption

**Data at rest:**
- Supabase: AES-256 encryption (automatic)
- Database backups: Encrypted

**Data in transit:**
- HTTPS only (enforced)
- TLS 1.2+ minimum
- HSTS headers

**Sensitive fields (future):**
```sql
-- If storing sensitive data (not needed for MVP)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt column
ALTER TABLE users ADD COLUMN encrypted_field BYTEA;

-- Insert encrypted
INSERT INTO users (encrypted_field)
VALUES (pgp_sym_encrypt('sensitive data', 'encryption-key'));

-- Decrypt
SELECT pgp_sym_decrypt(encrypted_field, 'encryption-key') FROM users;
```

**MVP:** No sensitive data beyond email. Encryption at rest sufficient.

---

### 10.3.2 SQL Injection Prevention

**Supabase client (safe by default):**

```tsx
// ✅ SAFE: Parameterized queries
const { data } = await supabase
  .from('habits')
  .select('*')
  .eq('name', userInput) // Automatically escaped

// ❌ NEVER DO THIS: Raw SQL with user input
const { data } = await supabase.rpc('raw_sql', {
  query: `SELECT * FROM habits WHERE name = '${userInput}'`
})
```

**RPC functions (use parameters):**

```sql
-- SAFE: Parameterized function
CREATE FUNCTION search_habits(search_term TEXT)
RETURNS TABLE(...) AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM habits
  WHERE name ILIKE '%' || search_term || '%'; -- Safe with parameters
END;
$$ LANGUAGE plpgsql;
```

---

### 10.3.3 XSS Prevention

**React (safe by default):**
```tsx
// ✅ SAFE: React escapes by default
<div>{userInput}</div>

// ❌ DANGEROUS: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SAFE: Sanitize first
import DOMPurify from 'dompurify'

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

**Journal Markdown rendering:**

```tsx
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

export function JournalEntry({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSanitize]} // Sanitize HTML
      components={{
        // Disable potentially dangerous elements
        script: () => null,
        iframe: () => null,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
```

---

### 10.3.4 Content Security Policy (CSP)

**Headers:**

```tsx
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co",
      "frame-ancestors 'none'",
    ].join('; ')
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 10.4 Privacy & Data Protection

### 10.4.1 GDPR Compliance

**Principles:**

1. **Lawfulness, fairness, transparency**
   - Clear privacy policy
   - Explicit consent
   - Transparent data usage

2. **Purpose limitation**
   - Collect only necessary data
   - Use only for stated purposes

3. **Data minimization**
   - Email + usage data (minimal)
   - No unnecessary personal info

4. **Accuracy**
   - User can edit/delete data
   - Data correction mechanisms

5. **Storage limitation**
   - Soft delete → Hard delete after 14 days
   - User can request deletion anytime

6. **Integrity & confidentiality**
   - Encryption, RLS, access controls

7. **Accountability**
   - Audit logs
   - Data processing records

---

### 10.4.2 User Rights

**Right to access:**
```tsx
// app/api/export/route.ts
export async function GET(request: Request) {
  const user = await getUser()
  
  // Export all user data
  const data = await exportUserData(user.id)
  
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="data-export-${user.id}.json"`,
    },
  })
}
```

**Right to rectification:**
- User can edit all their data через UI
- Update endpoints доступні

**Right to erasure:**
```tsx
// lib/actions/user.ts
export async function deleteAccount() {
  const user = await getUser()
  
  // Soft delete (mark for deletion)
  await supabase
    .from('users')
    .update({ 
      deleted_at: new Date().toISOString(),
      email: `deleted-${user.id}@example.com`, // Anonymize
    })
    .eq('id', user.id)
  
  // Hard delete handled by cron (14 days later)
  
  // Log out
  await supabase.auth.signOut()
}
```

**Right to data portability:**
- JSON/CSV export (covered above)

**Right to object:**
- User can opt out of emails (preferences)

---

### 10.4.3 Data Retention Policy

**Active data:**
- Зберігається поки user активний
- No automatic deletion

**Deleted accounts:**
```sql
-- Cron job (daily)
DELETE FROM users
WHERE deleted_at < NOW() - INTERVAL '14 days';

-- Cascade deletes all related data (foreign keys)
```

**Logs/Events:**
```sql
-- metrics_events: Keep for 90 days
DELETE FROM metrics_events
WHERE created_at < NOW() - INTERVAL '90 days';
```

**Backups:**
- Encrypted backups: 30 days retention
- Point-in-time recovery: 7 days (Supabase default)

---

### 10.4.4 Privacy Policy (Required)

**Must include:**

```markdown
# Privacy Policy

## Data We Collect
- Email address (for authentication)
- Habits, tasks, mood, journal entries (user-generated content)
- Usage analytics (anonymous, aggregated)

## How We Use Data
- Provide the service
- Improve features
- Send important notifications (optional)

## Data Storage
- Hosted on Supabase (EU/US servers)
- Encrypted at rest and in transit
- Not shared with third parties

## Your Rights
- Access your data (export anytime)
- Correct your data (edit in app)
- Delete your data (account deletion)

## Contact
privacy@lifeos.app
```

**Location:** /privacy on website

---

### 10.4.5 Cookie Consent (EU)

**Cookies used:**
- Authentication (essential, no consent needed)
- Analytics (optional, requires consent)

**Implementation:**

```tsx
// components/cookie-consent.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CookieConsent() {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    }
  }, [])
  
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
    // Enable analytics
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted'
    })
  }
  
  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }
  
  if (!show) return null
  
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <p className="text-sm mb-4">
        We use cookies to improve your experience. Essential cookies are always active.
      </p>
      <div className="flex gap-2">
        <Button onClick={accept}>Accept All</Button>
        <Button variant="outline" onClick={decline}>Essential Only</Button>
      </div>
    </div>
  )
}
```

---

## 10.5 Vulnerability Management

### 10.5.1 Dependency Security

**Automated scanning:**

```bash
# GitHub Dependabot (automatic)
# Checks dependencies weekly, creates PRs

# Manual audit
npm audit

# Fix vulnerabilities
npm audit fix
```

**package.json settings:**
```json
{
  "scripts": {
    "audit": "npm audit --production",
    "update-deps": "npm update"
  }
}
```

---

### 10.5.2 Security Headers

**Already covered in 10.3.4, but summary:**

```
✅ HSTS (Strict-Transport-Security)
✅ X-Frame-Options: SAMEORIGIN
✅ X-Content-Type-Options: nosniff
✅ X-XSS-Protection
✅ Referrer-Policy
✅ Content-Security-Policy
```

**Test:** Use https://securityheaders.com

---

### 10.5.3 Secrets Management

**Environment variables:**

```bash
# .env.local (NEVER commit)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...  # Public key (safe)
SUPABASE_SERVICE_ROLE_KEY=...      # SECRET (server only)

# Vercel deployment
# Add secrets через UI (encrypted at rest)
```

**Never:**
- Commit secrets to Git
- Expose service role key to client
- Log secrets to console
- Include secrets in error messages

**Rotation:**
- Rotate service role key quarterly
- Rotate JWT secret annually
- Update immediately if compromised

---

### 10.5.4 Security Monitoring

**Supabase dashboard:**
- Auth logs (login attempts, failures)
- API usage (detect abuse)
- Query performance (detect attacks)

**Sentry:**
- Error tracking
- Security events
- Anomaly detection

**Alerts:**
```tsx
// lib/monitoring/alerts.ts
export async function sendSecurityAlert(event: SecurityEvent) {
  if (event.severity === 'high') {
    // Send email/Slack notification
    await notifyAdmins({
      title: `Security Alert: ${event.type}`,
      message: event.description,
      user: event.userId,
    })
  }
}

// Usage
if (failedLoginAttempts > 5) {
  await sendSecurityAlert({
    type: 'brute_force_attempt',
    severity: 'high',
    userId: email,
    description: `5+ failed login attempts from IP ${ip}`,
  })
}
```

---

## 10.6 Incident Response Plan

### 10.6.1 Security Incident Procedure

**Steps:**

1. **Detect & Assess**
   - Monitor logs, alerts
   - Determine severity

2. **Contain**
   - Isolate affected systems
   - Revoke compromised credentials
   - Block malicious IPs

3. **Investigate**
   - Identify root cause
   - Scope of compromise
   - Data affected

4. **Remediate**
   - Patch vulnerability
   - Restore from backups if needed
   - Reset compromised accounts

5. **Communicate**
   - Notify affected users (GDPR requirement)
   - Transparency report
   - Update security measures

6. **Learn**
   - Post-mortem
   - Update procedures
   - Improve monitoring

---

### 10.6.2 Data Breach Response

**GDPR requirements:**
- Report to authorities within 72 hours
- Notify affected users without undue delay

**Communication template:**

```markdown
Subject: Important Security Notice

We recently discovered a security incident affecting your account.

What happened:
[Brief description]

What data was affected:
[Specific data types]

What we've done:
- Secured the vulnerability
- Reset affected credentials
- Enhanced monitoring

What you should do:
- Change your password
- Review account activity
- Enable 2FA (future feature)

Contact: security@lifeos.app
```

---

## 10.7 Security Checklist (Pre-Launch)

**Authentication:**
- [x] Password requirements enforced
- [x] Session management secure
- [x] OAuth properly configured
- [x] 2FA available (future)

**Authorization:**
- [x] RLS enabled on all tables
- [x] Policies tested
- [x] Service role key protected

**Data Protection:**
- [x] HTTPS enforced
- [x] Encryption at rest
- [x] Input validation (Zod schemas)
- [x] XSS protection
- [x] SQL injection prevention

**Privacy:**
- [x] Privacy policy published
- [x] Cookie consent implemented
- [x] Data export available
- [x] Account deletion available
- [x] GDPR compliant

**Infrastructure:**
- [x] Security headers configured
- [x] CSP implemented
- [x] Rate limiting enabled
- [x] Secrets management proper

**Monitoring:**
- [x] Error tracking (Sentry)
- [x] Security logs
- [x] Alerts configured
- [x] Incident response plan

**Compliance:**
- [x] Terms of Service
- [x] Privacy Policy
- [x] GDPR compliance
- [x] Data retention policy

---

# 11. MVP SCOPE

## 11.1 MVP Definition

### 11.1.1 MVP Philosophy

**Goal:** Validate core hypothesis з мінімальним feature set.

**Hypothesis:**
> "Users want objective data about their behavior patterns, not gamification or motivation."

**Success metrics:**
- User logs data > 14 days (retention)
- User views analytics regularly
- User reports insights (qualitative)

**Timeline:** 3–4 місяці development (1 person) або 6–8 тижнів (команда 2-3)

---

## 11.2 MVP Features (Included)

### 11.2.1 Authentication

**Included:**
- ✅ Email/password signup
- ✅ Email/password login
- ✅ Google OAuth
- ✅ Session management
- ✅ Password reset

**Excluded:**
- ❌ 2FA
- ❌ Magic link login
- ❌ Social logins (Twitter, GitHub, etc.)
- ❌ SSO

---

### 11.2.2 Habit Tracking

**Included:**
- ✅ Binary habits (yes/no)
- ✅ Quantitative habits (number + unit)
- ✅ Habit categories (predefined)
- ✅ Daily logging
- ✅ Streak calculation
- ✅ Basic stats (completion rate, current streak, longest streak)
- ✅ Habit reordering (drag-and-drop)
- ✅ Archive habits

**Excluded:**
- ❌ Custom frequencies (weekly, monthly)
- ❌ Habit reminders/notifications
- ❌ Habit templates
- ❌ Habit sharing
- ❌ Sub-habits
- ❌ Habit dependencies

---

### 11.2.3 Task Management

**Included:**
- ✅ Create tasks
- ✅ Schedule tasks (date)
- ✅ Complete/fail tasks
- ✅ Priority (high/medium/low)
- ✅ Difficulty (1-5 stars)
- ✅ Tags
- ✅ Backlog
- ✅ Basic description (text)

**Excluded:**
- ❌ Recurring tasks
- ❌ Sub-tasks
- ❌ Task dependencies
- ❌ Time tracking (actual hours spent)
- ❌ Task attachments
- ❌ Collaboration
- ❌ Kanban board view

---

### 11.2.4 Mood Tracking

**Included:**
- ✅ Mood scale (1-5)
- ✅ Energy level (1-5)
- ✅ Stress level (1-5)
- ✅ Context tags
- ✅ Multiple entries per day
- ✅ Overall mood calculation

**Excluded:**
- ❌ Custom mood scales
- ❌ Mood photos/selfies
- ❌ Voice mood logging
- ❌ Prompts/questions
- ❌ Mood prediction

---

### 11.2.5 Journal

**Included:**
- ✅ Text entries (Markdown)
- ✅ Multiple entries per day
- ✅ Tags
- ✅ Templates (daily reflection, gratitude, blank)
- ✅ Full-text search

**Excluded:**
- ❌ Rich media (photos, videos, audio)
- ❌ Drawing/sketching
- ❌ Custom templates (user-created)
- ❌ Journal sharing
- ❌ Collaborative journaling

---

### 11.2.6 Analytics

**Included:**
- ✅ Habit completion rates (7/30/90 days)
- ✅ Calendar heatmap
- ✅ Streak analysis
- ✅ Mood timeline
- ✅ Mood distribution
- ✅ Task productivity metrics
- ✅ Habit ↔ Mood correlation
- ✅ Tasks ↔ Mood correlation
- ✅ Basic insights (text)

**Excluded:**
- ❌ Machine learning predictions
- ❌ Advanced statistical analysis (regression, p-values)
- ❌ Custom date ranges (only predefined: 7d, 30d, 90d, 1y, all)
- ❌ Export charts as images
- ❌ Scheduled reports (email)

---

### 11.2.7 Data Management

**Included:**
- ✅ Data export (JSON, CSV)
- ✅ Account deletion
- ✅ Edit historical data

**Excluded:**
- ❌ Data import (from other apps)
- ❌ Automatic backups (user-initiated)
- ❌ Version history
- ❌ Data sync across devices (realtime)

---

### 11.2.8 UI/UX

**Included:**
- ✅ Responsive design (mobile + desktop)
- ✅ Dark mode
- ✅ Today view (unified)
- ✅ Calendar view
- ✅ Analytics dashboard
- ✅ Settings page
- ✅ Keyboard shortcuts (basic: Tab, Enter, Esc)

**Excluded:**
- ❌ Customizable dashboard
- ❌ Widgets
- ❌ Themes (beyond light/dark)
- ❌ Custom layouts
- ❌ Advanced keyboard shortcuts

---

## 11.3 MVP Non-Features (Explicitly Excluded)

### 11.3.1 Social Features
- ❌ Friends
- ❌ Followers
- ❌ Public profiles
- ❌ Sharing posts
- ❌ Challenges
- ❌ Leaderboards

### 11.3.2 Gamification
- ❌ Points/XP
- ❌ Levels
- ❌ Badges (beyond basic streaks)
- ❌ Achievements
- ❌ Rewards
- ❌ Avatars/pets

### 11.3.3 Notifications
- ❌ Push notifications
- ❌ Email reminders
- ❌ SMS
- ❌ In-app notifications (future)

### 11.3.4 Integrations
- ❌ Google Calendar sync
- ❌ Apple Health
- ❌ Fitbit/Strava
- ❌ Zapier/IFTTT
- ❌ API для third-party apps

### 11.3.5 AI Features
- ❌ Mood prediction
- ❌ Habit recommendations
- ❌ Auto-tagging
- ❌ Smart insights
- ❌ Chatbot

### 11.3.6 Collaboration
- ❌ Teams
- ❌ Shared habits
- ❌ Family tracking
- ❌ Coach mode
- ❌ Accountability partners

### 11.3.7 Advanced Analytics
- ❌ Custom metrics
- ❌ Custom charts
- ❌ Statistical significance tests
- ❌ Multi-variate analysis
- ❌ Forecasting

### 11.3.8 Monetization
- ❌ Premium tier
- ❌ Subscriptions
- ❌ In-app purchases
- ❌ Ads

**MVP = Free for all users.**

---

## 11.4 MVP Technical Scope

### 11.4.1 Included

**Core:**
- ✅ Next.js 14 (App Router)
- ✅ Supabase (PostgreSQL + Auth)
- ✅ TypeScript
- ✅ TailwindCSS + shadcn/ui
- ✅ Server Actions
- ✅ RLS policies

**Quality:**
- ✅ Responsive design
- ✅ Basic error handling
- ✅ Loading states
- ✅ Form validation
- ✅ Security headers

**Deployment:**
- ✅ Vercel deployment
- ✅ Environment variables
- ✅ SSL/HTTPS
- ✅ Domain setup

### 11.4.2 Excluded

**Advanced:**
- ❌ PWA (offline support, service workers)
- ❌ Realtime sync (WebSockets)
- ❌ Background jobs (cron) — can add post-MVP
- ❌ Redis caching
- ❌ CDN для static assets (Vercel default sufficient)

**Testing:**
- ❌ E2E tests (Playwright)
- ❌ Integration tests
- ✅ Unit tests (critical paths only, optional)

**Monitoring:**
- ❌ Error tracking (Sentry) — add post-MVP
- ❌ Performance monitoring
- ❌ User analytics (beyond Vercel Analytics)

**DevOps:**
- ❌ CI/CD pipelines
- ❌ Staging environment
- ❌ Database migrations automation
- ❌ Automated backups (Supabase default sufficient)

---

## 11.5 MVP Development Phases

### Phase 1: Foundation (Week 1-2)

**Tasks:**
- [ ] Project setup (Next.js, TypeScript, Tailwind)
- [ ] Supabase setup (account, project)
- [ ] Database schema (SQL migrations)
- [ ] RLS policies
- [ ] Authentication (email/password, Google OAuth)
- [ ] Basic layout (header, sidebar, nav)

**Deliverable:** User can sign up, log in, see empty dashboard.

---

### Phase 2: Core Features (Week 3-6)

**Tasks:**
- [ ] Habit CRUD
- [ ] Habit logging (Today view)
- [ ] Task CRUD
- [ ] Task completion
- [ ] Mood logging
- [ ] Journal entries
- [ ] Day creation (auto-generate)

**Deliverable:** User can log all daily data.

---

### Phase 3: Analytics (Week 7-9)

**Tasks:**
- [ ] Habit statistics
- [ ] Calendar heatmap
- [ ] Streak calculation
- [ ] Mood charts
- [ ] Task productivity metrics
- [ ] Correlation analysis (habits ↔ mood)

**Deliverable:** User can see insights.

---

### Phase 4: Polish (Week 10-12)

**Tasks:**
- [ ] UI refinement
- [ ] Dark mode
- [ ] Mobile optimization
- [ ] Error handling
- [ ] Data export
- [ ] Settings page
- [ ] Privacy policy
- [ ] Help/documentation

**Deliverable:** Production-ready MVP.

---

### Phase 5: Testing & Launch (Week 13-14)

**Tasks:**
- [ ] Manual testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Security audit (checklist)
- [ ] Deploy to production
- [ ] Invite beta users

**Deliverable:** Live product, beta users testing.

---

## 11.6 Post-MVP Roadmap (Priority Order)

### Priority 1 (Immediate Post-MVP)

**Background jobs:**
- Streak recalculation (midnight cron)
- Day auto-creation

**Error tracking:**
- Sentry integration

**PWA:**
- Offline support
- Add to home screen

### Priority 2 (1-2 months)

**Notifications:**
- Push notifications (habit reminders)
- Email summaries (weekly)

**Advanced analytics:**
- Custom date ranges
- More correlation types
- Export charts

### Priority 3 (3-6 months)

**Recurring tasks:**
- Daily/weekly/monthly tasks

**Habit reminders:**
- Custom reminder times

**Mobile app:**
- React Native (if web PWA insufficient)

### Priority 4 (6-12 months)

**Collaboration:**
- Teams/families
- Shared habits

**AI features:**
- Insights
- Recommendations

**Monetization:**
- Premium tier

---

## 11.7 MVP Success Criteria

### 11.7.1 Technical Metrics

- ✅ Page load < 2s (desktop)
- ✅ Page load < 3s (mobile)
- ✅ No critical bugs
- ✅ 99% uptime
- ✅ Lighthouse score > 80

### 11.7.2 User Metrics

**Activation:**
- 70% of signups create ≥1 habit
- 50% of signups log data on day 1

**Engagement:**
- 40% of users log data ≥3 days/week
- 20% of users view analytics weekly

**Retention:**
- 30% retention at day 7
- 15% retention at day 30

**Qualitative:**
- 5+ user interviews
- Positive feedback on core value prop
- Users report insights/behavior changes

---

# 12. FUTURE EXTENSIONS

## 12.1 Teams & Collaboration

### 12.1.1 Use Cases

**Family:**
- Shared habits (family workouts)
- Shared tasks (household chores)
- Privacy controls (personal vs shared)

**Couples:**
- Relationship tracking (date nights, quality time)
- Shared goals

**Accountability partners:**
- Visible streaks
- Encouragement
- Challenges

**Teams (work):**
- Team productivity
- Shared OKRs
- Standup data

---

### 12.1.2 Data Model Changes

**New tables:**

```sql
-- Teams
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members
CREATE TABLE team_members (
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'admin', 'member'
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (team_id, user_id)
);

-- Shared habits
CREATE TABLE shared_habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
    visibility VARCHAR(20) DEFAULT 'team', -- 'team', 'public'
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS updates:**

```sql
-- Users can view team members' data if in same team
CREATE POLICY "Team members can view shared habits"
ON habit_logs FOR SELECT
USING (
    auth.user_id() = user_id
    OR EXISTS (
        SELECT 1 FROM team_members tm1
        JOIN team_members tm2 ON tm1.team_id = tm2.team_id
        WHERE tm1.user_id = auth.user_id()
          AND tm2.user_id = habit_logs.user_id
    )
);
```

---

### 12.1.3 UI Changes

**Team dashboard:**
- Combined view (all members' habits)
- Leaderboard (optional)
- Team stats

**Permissions:**
- Admin: Invite, remove members
- Member: View team data

**Privacy settings:**
- User can hide specific habits from team
- Opt-in to sharing

---

## 12.2 AI & Machine Learning

### 12.2.1 Use Cases

**Insights:**
- "You tend to skip workouts on Mondays"
- "Your mood improves when you meditate"
- "Coffee after 3pm correlates with poor sleep"

**Predictions:**
- Mood forecast (based on plans)
- Habit compliance prediction
- Risk alerts (streak about to break)

**Recommendations:**
- "Try meditation before bed (80% chance mood improvement)"
- "Schedule difficult tasks for Tuesday mornings (peak productivity)"

**Auto-tagging:**
- Journal entries auto-tagged by sentiment
- Tasks auto-categorized

---

### 12.2.2 Technical Approach

**Option 1: Rule-based (simpler, MVP+1):**

```tsx
// Simple correlation threshold
if (correlation > 0.7) {
  insights.push({
    type: 'strong_positive',
    message: `${habit.name} strongly improves your mood (+${correlation.toFixed(1)})`,
    action: 'Keep it up!',
  })
}
```

**Option 2: Statistical models:**

```python
# Python (separate service)
import pandas as pd
from sklearn.linear_model import LinearRegression

# Prepare data
df = pd.DataFrame({
    'meditation': [1, 0, 1, 1, 0, ...],
    'workout': [1, 1, 0, 1, 0, ...],
    'sleep_hours': [7.5, 6, 8, 7, 6.5, ...],
    'mood': [4, 3, 5, 4, 3, ...],
})

# Train model
X = df[['meditation', 'workout', 'sleep_hours']]
y = df['mood']

model = LinearRegression()
model.fit(X, y)

# Coefficients show impact
# meditation: +0.8, workout: +1.2, sleep: +0.5

# Predict
predicted_mood = model.predict([[1, 1, 7.5]])  # All habits done, 7.5h sleep
```

**Option 3: LLM-powered insights:**

```tsx
// Call OpenAI API with user data
const insights = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: 'You are a data analyst. Analyze user behavior and provide insights.',
    },
    {
      role: 'user',
      content: `User data: ${JSON.stringify(userData)}. What patterns do you notice?`,
    },
  ],
})
```

**Privacy considerations:**
- User consent required
- Data anonymized before ML
- Models trained per-user (not global)
- Option to opt-out

---

## 12.3 Advanced Analytics

### 12.3.1 Custom Metrics

**User-defined metrics:**
```sql
CREATE TABLE custom_metrics (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(100),
    formula JSONB, -- {type: 'sum', field: 'water', period: 'week'}
    unit VARCHAR(20)
);
```

**Example:** "Weekly water intake" = SUM(water) per week

---

### 12.3.2 Advanced Visualizations

**Sankey diagrams:**
- Time allocation (tasks by category)

**Network graphs:**
- Habit dependencies

**3D surface plots:**
- Mood vs Sleep vs Exercise

**Parallel coordinates:**
- Multi-dimensional correlation

---

### 12.3.3 Statistical Analysis

**Hypothesis testing:**
- "Does workout significantly improve mood?" (t-test)
- p-values, confidence intervals

**Regression analysis:**
- Multi-variate regression (mood ~ sleep + workout + meditation)

**Time series:**
- ARIMA forecasting
- Seasonal decomposition

**Clustering:**
- Identify behavior patterns (e.g., "productive weeks" cluster)

---

## 12.4 Mobile Native App

### 12.4.1 Why Native?

**PWA limitations:**
- Push notifications (limited on iOS)
- Offline storage (limited)
- Background sync (limited)
- Native integrations (Health, Fitbit)

**When to build:**
- If PWA adoption < 50%
- If users request native features
- If monetization requires app store

---

### 12.4.2 Technology

**React Native (recommended):**
- Code reuse з web (React)
- Single codebase (iOS + Android)

**Alternative: Flutter**
- Better performance
- Different language (Dart)

**Native (Swift/Kotlin):**
- Best performance
- Separate codebases
- Higher cost

---

### 12.4.3 Unique Features

**Native integrations:**
- Apple Health sync (steps, sleep, heart rate)
- Google Fit
- Widgets (iOS 14+, Android)

**Background sync:**
- Auto-log habits (geofencing: at gym → log workout)

**Better offline:**
- Full offline mode
- Background sync when online

---

## 12.5 Integrations & API

### 12.5.1 Public API

**Use cases:**
- Third-party apps
- Custom dashboards
- Automation (Zapier, IFTTT)

**Endpoints:**

```
GET    /api/v1/habits
POST   /api/v1/habits
GET    /api/v1/habits/:id
PATCH  /api/v1/habits/:id
DELETE /api/v1/habits/:id

POST   /api/v1/habits/:id/log
GET    /api/v1/habits/:id/stats

GET    /api/v1/tasks
POST   /api/v1/tasks
...

GET    /api/v1/analytics/correlations
```

**Authentication:**
- API keys
- OAuth 2.0

**Rate limiting:**
- 1000 requests/hour

---

### 12.5.2 Integrations

**Google Calendar:**
- Tasks → Google Calendar events
- Sync deadlines

**Apple Health / Google Fit:**
- Import sleep data
- Import steps
- Auto-log "workout" habit

**Strava / Fitbit:**
- Auto-log exercise

**Spotify:**
- Track music listening (mood correlation)

**RescueTime:**
- Screen time data

**Zapier:**
- Trigger actions (habit logged → tweet)

---

## 12.6 Monetization (Post-MVP)

### 12.6.1 Freemium Model

**Free tier:**
- Up to 5 habits
- Up to 20 tasks/month
- Basic analytics (30 days)
- No teams

**Premium tier ($5-10/month):**
- Unlimited habits
- Unlimited tasks
- Advanced analytics (all time)
- Correlations
- Teams (up to 5 members)
- Export data
- Priority support

**Enterprise tier ($50-100/month):**
- Large teams (unlimited)
- Admin controls
- Custom branding
- SSO
- SLA

---

### 12.6.2 Alternative Models

**One-time purchase:**
- $29-49 lifetime access
- Good for privacy-focused users

**Pay-what-you-want:**
- Donationware
- Transparent costs

**Sponsor model:**
- GitHub Sponsors, Patreon
- Supporter badges

---

## 12.7 Platform Expansion

### 12.7.1 Desktop App

**Electron:**
- Wrap web app
- Native notifications
- System tray icon
- Offline mode

**Tauri:**
- Lighter than Electron
- Rust backend

---

### 12.7.2 Browser Extension

**Quick capture:**
- Log habit from any page (popup)
- Right-click → "Add to Life OS tasks"

**Website blocking:**
- Block distracting sites after task quota

---

### 12.7.3 Voice Interface

**Alexa / Google Assistant:**
- "Alexa, log meditation"
- "Hey Google, what's my mood this week?"

**Voice journaling:**
- Speech-to-text for journal entries

---

## 12.8 Advanced Privacy Features

### 12.8.1 End-to-End Encryption

**Implementation:**
- Client-side encryption (before sending to server)
- Server stores encrypted data (can't read)
- User controls encryption key

**Trade-offs:**
- Server-side search не працює
- Correlations важко обчислювати
- User loses key → data lost

**Use case:** For users з extreme privacy needs.

---

### 12.8.2 Self-Hosted Option

**Docker image:**
- User deploys на своєму сервері
- Full control
- No cloud dependency

**Requirements:**
- PostgreSQL
- Node.js server
- Storage

**Monetization:**
- One-time license fee
- Support subscription

---

### 12.8.3 Data Portability

**Import from:**
- Daylio
- Habitica
- Notion (structured exports)
- Apple Health
- Google Fit

**Export to:**
- Standard formats (CSV, JSON)
- Compatible з іншими apps

---

## 12.9 Community Features

### 12.9.1 Public Profiles (Optional)

**Use case:** Inspiration, accountability.

**Features:**
- Public streak badges
- Anonymized stats ("User completed 100-day streak")
- Habits without personal data

**Privacy:**
- Opt-in only
- No journal, no tasks (too personal)
- Pseudonymous usernames

---

### 12.9.2 Templates Marketplace

**User-created habit templates:**
- "Morning Routine" (meditation, exercise, breakfast)
- "Student Productivity" (study, assignments)

**Curation:**
- Community voting
- Featured templates

---

### 12.9.3 Challenges (Gamification-lite)

**30-day challenges:**
- "30 days of meditation"
- Leaderboard (optional)
- Completion badges

**Trade-off:** Conflicts з anti-gamification philosophy.

**Approach:** Make optional, non-intrusive.

---

## 12.10 Research & Science

### 12.10.1 Anonymized Research Data

**With user consent:**
- Aggregate anonymized data
- Research papers on habit formation
- Partner з universities

**Transparency:**
- Public research findings
- Credit to participants

---

### 12.10.2 Evidence-Based Recommendations

**Integrate research:**
- "Studies show meditation reduces stress by 30%"
- Cite sources
- Update as research evolves

---

## 12.11 Accessibility Improvements

### 12.11.1 Enhanced Accessibility

**Screen reader:**
- ARIA labels на всіх elements
- Tested з NVDA, JAWS

**Voice control:**
- Voice commands (experimental)

**Dyslexia mode:**
- OpenDyslexic font
- Increased spacing

**Motor impairments:**
- Large touch targets (48px+)
- Switch control support

---

### 12.11.2 Internationalization (i18n)

**Supported languages:**
- Ukrainian (native)
- English
- Spanish, French, German (post-MVP)

**Implementation:**
- next-intl або react-i18next
- Crowdsourced translations (community)

---

## 12.12 Innovation Ideas

### 12.12.1 AR/VR Visualization

**VR analytics:**
- 3D data visualization
- Immersive "life review" experience

**AR widgets:**
- Habit checklist на AR glasses (future)

---

### 12.12.2 Wearables Integration

**Smartwatch app:**
- Quick habit logging
- Mood check-ins
- Notifications

**Fitness tracker:**
- Auto-log workouts
- Sleep tracking

---

### 12.12.3 Biometric Data

**Heart rate variability:**
- Stress indicator
- Correlate з habits

**Sleep stages:**
- Deep sleep tracking
- Optimize sleep habits

---
