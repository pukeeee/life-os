# Life OS — Productivity & Analytics Platform

## Business Analysis

### Аналіз ринку habit tracking і productivity

#### Існуючі рішення та їхні проблеми

**Habit Trackers (Habitica, Streaks, Loop Habit Tracker)**
- ✅ Що працює: проста візуалізація streak, бінарні звички, нагадування
- ❌ Проблеми:
  - Переважно бінарні звички, кількісний трекінг обмежений
  - Статистика поверхнева (streak + calendar)
  - Немає аналізу кореляцій
  - Гейміфікація стає самоціллю (Habitica)
  - Немає контексту: звичка поза іншими подіями дня

**Mood Trackers (Daylio)**
- ✅ Що працює: швидкий трекінг настрою, візуальна статистика, теги активностей
- ❌ Проблеми:
  - Настрій ізольований від конкретних дій
  - Обмежена кастомізація
  - Статистика не показує причинно-наслідкові звʼязки
  - Журнал примітивний

**Task Managers (TickTick, Todoist)**
- ✅ Що працює: структура задач, дедлайни, пріоритети
- ❌ Проблеми:
  - Фокус на execution, не на аналітиці
  - Немає звʼязку task completion → well-being
  - Не враховують складність задач у статистиці
  - Відсутня рефлексія: скільки планувалось vs зроблено

**All-in-One (Notion, Coda)**
- ✅ Що працює: гнучкість, кастомізація
- ❌ Проблеми:
  - Потребує налаштування (бар'єр входу)
  - Немає готових аналітичних інсайтів
  - Manual tracking без automation
  - Важкий на мобільних

#### Реальні потреби користувачів

На основі аналізу r/productivity, r/getdisciplined, Product Hunt reviews:

1. **Обʼєктивність замість мотивації**
   - Користувачі хочуть бачити реальні дані, не віртуальні нагороди
   - "Я думав що продуктивний, але цифри показали інше"

2. **Контекст і кореляції**
   - "Чому сьогодні погано?" → потрібен звʼязок: сон, звички, задачі, настрій
   - Пошук patterns на дистанції місяців

3. **Швидкість занесення даних**
   - Якщо трекінг займає >2 хвилин на день → відмовляються
   - Mobile-first критично важливий

4. **Довгострокова перспектива**
   - Щоденні графіки не дають картини
   - Потрібні rolling averages, trends, heatmaps по місяцях/роках

5. **Один інструмент замість п'яти**
   - Перемикання між застосунками вбиває продуктивність
   - Але не Notion (занадто складний)

#### Формати трекінгу що реально використовують

- **Бінарні звички** (yes/no): 80% use cases
- **Кількісні метрики** (steps, water, hours): 15%
- **Складні шкали** (1-10 mood): рідко заповнюють стабільно
- **Вільний текст**: використовують для рефлексії, але не систематично

**Висновок**: Потрібна спрощена шкала (3-5 варіантів замість 10), але з можливістю додати контекст.

---

### Конкурентні переваги нашого продукту

| Проблема конкурентів | Наше рішення |
|----------------------|--------------|
| Дані в сілосах (звички окремо від настрою) | Unified data model: все про день в одному місці |
| Поверхнева статистика | Advanced analytics: кореляції, тренди, multi-dimensional view |
| Гейміфікація vs реальність | Чиста аналітика без badges/rewards |
| Складність налаштування (Notion) | Zero setup: готові шаблони, швидкий старт |
| Мобільний досвід вторинний | Mobile-first design, але з повноцінним desktop |
| Статичні дашборди | Dynamic insights залежно від періоду (day/week/month/year) |

---

### MVP Scope (на основі аналізу)

**Включити:**
- Бінарні звички (core use case)
- Кількісні метрики (обмежений набір: numeric input)
- Спрощений mood tracking (5-point scale: 😫😕😐🙂😄)
- Задачі без підзадач
- Щоденний journal (text only)
- Базова аналітика:
  - Calendar heatmaps
  - Streak tracking
  - Completion rates
  - 30/90-day trends
  - Habit vs Mood correlation (simple)

**Виключити (post-MVP):**
- Time tracking
- Підзадачі та sub-goals
- Складні категорії та теги
- AI-аналітика та predictions
- Команди / shared spaces
- Gamification elements
- Інтеграції з іншими сервісами
- Custom шкали mood
- Фото в journal

**Чому саме так:**
- 80% користувачів потребують простий трекінг + аналітику
- Складність убиває retention на onboarding
- Аналітика — диференціатор, її треба зробити добре
- Інтеграції можна додати пізніше без ризику для core experience

---

## 1. Product Vision

### Навіщо існує продукт

Life OS створений для людей, які хочуть **розуміти себе через дані**, а не мотивуватись гаслами чи віртуальними нагородами.

Це інструмент для:
- Systematic self-reflection
- Pattern recognition в своїй поведінці
- Data-driven decision making про життєві звички
- Довгострокового розуміння: що реально працює, а що ні

### Яку реальну проблему вирішує

**Проблема 1: Розірваність даних**
Звички в Habitica, настрій в Daylio, задачі в Todoist, журнал в Notion.
Неможливо побачити цілісну картину дня/тижня/місяця.

**Проблема 2: Відсутність інсайтів**
Існуючі трекери показують "що сталось", але не "чому".
Немає інструментів для пошуку кореляцій.

**Проблема 3: Короткостроковість**
Щоденні списки та streak-и не дають довгострокової перспективи.
Через 6 місяців ти не памʼятаєш, що відбувалось.

**Проблема 4: Суб'єктивність**
Людина думає "я продуктивний", але немає обʼєктивних метрик.
Потрібен truth mirror.

### Чим принципово кращий за конкурентів

1. **Unified Timeline**: Весь день на одній сторінці
2. **Analytics-First**: Статистика не afterthought, а core feature
3. **Long-Term View**: Оптимізовано для аналізу на дистанції місяців/років
4. **No Gamification**: Чисті дані без artificial motivation
5. **Context-Rich**: Кожна звичка/задача має контекст дня (mood, journal, інші події)

### Що НЕ є метою продукту

❌ Це не task manager (є кращі для execution)
❌ Це не соціальна мережа (немає публічних профілів в MVP)
❌ Це не гра (без badges, levels, achievements)
❌ Це не AI-coach (немає prescriptive advice в MVP)
❌ Це не calendar replacement

✅ Це **аналітичний інструмент** для самопізнання через structured data.

---

## 2. User Scenarios

### 2.1 Daily Flow (5-10 хвилин на день)

**Ранок (30 сек — 1 хв)**
```
User відкриває застосунок
→ Бачить Today view з:
  - Списком звичок на сьогодні
  - Задачами на день
  - Mood tracker (порожній)
→ Швидко позначає ранкові звички:
  - "Медитація" ✓
  - "Workout" ✓
  - "Reading" (поки що пропускає)
→ Закриває app
```

**Протягом дня (кілька разів по 10-20 сек)**
```
User відкриває app
→ Позначає виконану задачу
→ Або додає нову задачу (quick add)
→ Або оновлює кількісну звичку: "Water: 4 склянки → 5 склянок"
→ Закриває app
```

**Ввечері (2-5 хвилин)**
```
User відкриває app перед сном
→ Завершує день:
  - Позначає вечірні звички
  - Ставить mood: 😊 (4/5)
  - Пише кілька речень в journal: "Продуктивний день, closed 3 big tasks"
  - Дивиться summary дня: 7/9 habits, 5/8 tasks
→ Може швидко глянути streak: "Meditation: 12 days 🔥"
```

### 2.2 Weekly Review (10-15 хвилин)

**Неділя ввечері або понеділок ранок**
```
User відкриває Week view
→ Бачить:
  - Heatmap звичок за тиждень (які дні були strong/weak)
  - Tasks: Completed 28/35 (80% completion)
  - Mood trend: average 3.7/5 (трохи нижче норми)
  - Journal entries: 5/7 days (missed weekend)
→ Insights panel показує:
  - "Your mood was higher on workout days (4.2 vs 3.1)"
  - "Best habit consistency: Meditation (7/7)"
  - "Task completion dropped on Friday-Saturday"
→ User reflection:
  - "Потрібно structured weekend routine"
  - Додає нову звичку: "Morning planning" (weekends only)
→ Плануює задачі на наступний тиждень
```

### 2.3 Monthly Reflection (20-30 хвилин)

**Кінець місяця**
```
User відкриває Month view
→ Бачить:
  - Full month heatmap (30 days, all habits)
  - Mood distribution: Bar chart
  - Habit completion rates: Table view
  - Tasks: Total completed vs created
  - Best/Worst weeks
→ Deep dive в correlation view:
  - Scatter plot: Sleep hours vs Mood
  - "When you slept 7+ hours, mood was 4.1 avg"
  - "When you skipped workout, mood was 3.2 avg"
→ Reads monthly journal entries (tags view):
  - 8 entries tagged "work"
  - 4 entries tagged "relationship"
  - Pattern: work stress → lower mood → skipped habits
→ Decision making:
  - "Треба delegated більше задач на роботі"
  - "Workout non-negotiable, навіть коли tired"
→ Exports data (CSV) для власного аналізу
```

### 2.4 Long-Term Analysis (6-12 місяців)

**Користувач на платформі 6+ місяців**
```
User відкриває Year view
→ Бачить:
  - Timeline: 12 місяців в одному вікні
  - Rolling 30-day averages для key habits
  - Seasonal patterns: "You were more consistent in spring"
  - Life events correlation: Adding journal tags для markers
    - "Started new job" (March) → mood spike, then dip
    - "Vacation" (July) → high mood, low habit tracking
→ Cohort analysis:
  - "Months with 90%+ habit completion: 4/6"
  - "In those months, avg mood was 4.3/5"
  - "In low-habit months, mood was 3.4/5"
→ User insight:
  - "Consistency matters more than intensity"
  - "Need to maintain basics even during chaos"
→ Adjusts habit list: removes habits that never stuck, focuses on core 5
```

---

## 3. Domain Model (Core Entities)

### 3.1 User

**Призначення**: Користувач системи, власник всіх даних.

```typescript
User {
  id: uuid (PK)
  email: string (unique, not null)
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
  
  // Profile (optional, can be null initially)
  display_name: string (nullable)
  timezone: string (not null, default: 'UTC')
  
  // Preferences
  preferences: jsonb (nullable) {
    theme: 'light' | 'dark' | 'system'
    week_start: 0-6 (0 = Sunday)
    mood_scale: 5 (fixed in MVP)
    default_view: 'today' | 'week'
  }
  
  // Soft delete
  deleted_at: timestamp (nullable)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX ON email WHERE deleted_at IS NULL`

**Життєвий цикл:**
1. Created → signup через Supabase Auth
2. Active → normal usage
3. Soft deleted → user requested deletion (14-day grace period)
4. Hard deleted → permanent removal after grace period

---

### 3.2 Day

**Призначення**: Контейнер для всіх подій одного календарного дня користувача.

```typescript
Day {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  date: date (not null) // YYYY-MM-DD in user's timezone
  
  // Aggregated stats (computed)
  habits_total: integer (not null, default: 0)
  habits_completed: integer (not null, default: 0)
  tasks_total: integer (not null, default: 0)
  tasks_completed: integer (not null, default: 0)
  
  // Metadata
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX ON (user_id, date)` ← критично для продуктивності
- `INDEX ON user_id` для швидкого фільтрування
- `INDEX ON date` для range queries

**Constraints:**
- `FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE`
- `CHECK (habits_completed <= habits_total)`
- `CHECK (tasks_completed <= tasks_total)`

**Життєвий цикл:**
1. Auto-created при першому event дня (habit log, task, mood entry)
2. Updated через triggers при зміні дочірніх записів
3. Не видаляється (historical data), але можна архівувати старі дні

---

### 3.3 Habit

**Призначення**: Шаблон звички, яку користувач трекає.

```typescript
Habit {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  
  // Definition
  name: string (not null, max 100 chars)
  description: text (nullable)
  icon: string (nullable) // emoji or icon name
  color: string (nullable) // hex color for UI
  
  // Type
  type: enum ('binary', 'numeric') (not null)
  
  // For numeric habits
  unit: string (nullable) // 'glasses', 'km', 'minutes'
  target_value: decimal (nullable) // daily goal
  
  // Schedule
  frequency: enum ('daily', 'weekly', 'custom') (not null, default: 'daily')
  active_days: integer[] (nullable) // [0,1,2,3,4,5,6] for weekly, null for daily
  
  // Metadata
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
  archived_at: timestamp (nullable) // soft archive
  
  // Ordering
  sort_order: integer (not null, default: 0)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `INDEX ON (user_id, archived_at)` для активних звичок
- `INDEX ON (user_id, sort_order)` для сортування UI

**Constraints:**
- `FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE`
- `CHECK (type = 'numeric' OR (unit IS NULL AND target_value IS NULL))`

**Життєвий цикл:**
1. Created → user adds new habit
2. Active → being tracked
3. Archived → user no longer tracks, but historical data remains
4. Можна un-archive (просто archived_at = null)

---

### 3.4 HabitLog

**Призначення**: Факт виконання звички в конкретний день.

```typescript
HabitLog {
  id: uuid (PK)
  user_id: uuid (FK → User, not null) // denormalized for RLS
  habit_id: uuid (FK → Habit, not null)
  day_id: uuid (FK → Day, not null)
  
  // Value
  completed: boolean (not null, default: false) // for binary
  value: decimal (nullable) // for numeric habits
  
  // Metadata
  logged_at: timestamp (not null) // when user marked it
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX ON (habit_id, day_id)` ← один лог на звичку на день
- `INDEX ON user_id` для RLS
- `INDEX ON day_id` для aggregation
- `INDEX ON habit_id` для streak calculation

**Constraints:**
- `FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE`
- `FOREIGN KEY (habit_id) REFERENCES Habit(id) ON DELETE CASCADE`
- `FOREIGN KEY (day_id) REFERENCES Day(id) ON DELETE CASCADE`

**Життєвий цикл:**
1. Created → user marks habit (або auto-created з completed=false при відкритті дня)
2. Updated → user changes value/completion
3. Triggers → update Day aggregates, recalculate Streak

---

### 3.5 Task

**Призначення**: Задача користувача.

```typescript
Task {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  
  // Content
  title: string (not null, max 200 chars)
  description: text (nullable)
  
  // Scheduling
  due_date: date (nullable) // target day
  completed_at: timestamp (nullable) // when user completed it
  
  // Properties
  priority: enum ('low', 'medium', 'high') (nullable)
  estimated_effort: enum ('small', 'medium', 'large') (nullable) // not MVP
  
  // Metadata
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
  deleted_at: timestamp (nullable) // soft delete
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `INDEX ON (user_id, completed_at)` для фільтрування active/completed
- `INDEX ON (user_id, due_date)` для calendar view
- `INDEX ON deleted_at` для soft delete filter

**Constraints:**
- `FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE`

**Життєвий цикл:**
1. Created → user adds task
2. Active → not completed
3. Completed → completed_at set
4. Soft deleted → deleted_at set (можна відновити)
5. Hard deleted → після grace period (background job)

---

### 3.6 TaskCompletion

**Призначення**: Звʼязок Task → Day (коли задача була виконана).

```typescript
TaskCompletion {
  id: uuid (PK)
  user_id: uuid (FK → User, not null) // denormalized
  task_id: uuid (FK → Task, not null)
  day_id: uuid (FK → Day, not null)
  
  completed_at: timestamp (not null)
  created_at: timestamp (not null)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX ON (task_id)` ← задача може бути completed тільки раз
- `INDEX ON day_id` для aggregation
- `INDEX ON user_id` для RLS

**Чому окрема таблиця:**
- Task.completed_at показує факт completion
- TaskCompletion.day_id показує КОЛИ в контексті Day
- Потрібно для статистики: скільки tasks completed per day

---

### 3.7 MoodEntry

**Призначення**: Запис настрою користувача.

```typescript
MoodEntry {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  day_id: uuid (FK → Day, not null)
  
  // Value
  mood_value: integer (not null) // 1-5 scale
  
  // Optional context
  note: text (nullable, max 500 chars) // short note
  
  // Metadata
  logged_at: timestamp (not null)
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `INDEX ON (user_id, day_id)` для швидкого пошуку
- `INDEX ON day_id` для join з Day

**Constraints:**
- `FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE`
- `FOREIGN KEY (day_id) REFERENCES Day(id) ON DELETE CASCADE`
- `CHECK (mood_value BETWEEN 1 AND 5)`

**Lifecycle:**
- MVP: один mood entry per day (останній перезаписує)
- Post-MVP: може бути кілька entries per day (mood changes)

---

### 3.8 JournalEntry

**Призначення**: Текстовий щоденник дня.

```typescript
JournalEntry {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  day_id: uuid (FK → Day, not null)
  
  // Content
  content: text (not null)
  
  // Metadata
  created_at: timestamp (not null)
  updated_at: timestamp (not null)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX ON (user_id, day_id)` ← один journal per day в MVP
- `INDEX ON day_id`

**Constraints:**
- `FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE`
- `FOREIGN KEY (day_id) REFERENCES Day(id) ON DELETE CASCADE`

**Lifecycle:**
- Created → user writes journal
- Updated → user edits same day
- В MVP: один entry per day
- Post-MVP: можна додати versioning або timestamps entries

---

### 3.9 Streak

**Призначення**: Кешовані дані про streak звички.

```typescript
Streak {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  habit_id: uuid (FK → Habit, not null)
  
  // Current streak
  current_streak: integer (not null, default: 0) // consecutive days
  current_start_date: date (nullable) // when current streak started
  
  // Best streak (all-time)
  longest_streak: integer (not null, default: 0)
  longest_start_date: date (nullable)
  longest_end_date: date (nullable)
  
  // Last activity
  last_completed_date: date (nullable)
  
  // Metadata
  updated_at: timestamp (not null)
}
```

**Індекси:**
- `PRIMARY KEY (id)`
- `UNIQUE INDEX ON (habit_id)` ← one streak record per habit
- `INDEX ON user_id` для RLS

**Чому окрема таблиця:**
- Streak calculation expensive (requires scanning HabitLog history)
- Кешуємо результат, оновлюємо через trigger
- Швидкий read для UI (не треба рахувати on-the-fly)

**Lifecycle:**
- Auto-created при першому HabitLog
- Updated через trigger після кожного HabitLog change
- Recalculated при зміні historical data

---

### 3.10 MetricsEvent (опціонально, не MVP)

**Призначення**: Event log для analytics і debugging.

```typescript
MetricsEvent {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  
  event_type: string (not null) // 'habit_completed', 'task_created', etc
  event_data: jsonb (not null)
  
  created_at: timestamp (not null)
}
```

**Use case:**
- Audit log
- User behavior analytics
- Debugging data issues
- Future: AI training data

**Не в MVP**, але архітектура закладена.

---

### 3.11 Tag / Category (Post-MVP)

**Призначення**: Категоризація habits, tasks, journal entries.

```typescript
Tag {
  id: uuid (PK)
  user_id: uuid (FK → User, not null)
  name: string (not null, max 50 chars)
  color: string (nullable)
  type: enum ('habit', 'task', 'journal') (not null)
  
  created_at: timestamp (not null)
}

HabitTag {
  habit_id: uuid (FK)
  tag_id: uuid (FK)
  PRIMARY KEY (habit_id, tag_id)
}

// Similar for TaskTag, JournalTag
```

**Чому не в MVP:**
- Додає складності в UI
- Більшість користувачів не використовують tags actively
- Можна додати пізніше без breaking changes

---

## 4. Database Architecture

### 4.1 PostgreSQL Schema (DDL)

```sql
-- =============================================
-- USERS
-- =============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Profile
  display_name TEXT,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  
  -- Preferences
  preferences JSONB DEFAULT '{
    "theme": "system",
    "week_start": 1,
    "mood_scale": 5,
    "default_view": "today"
  }'::jsonb,
  
  -- Soft delete
  deleted_at TIMESTAMPTZ,
  
  CONSTRAINT email_not_empty CHECK (email <> ''),
  CONSTRAINT valid_timezone CHECK (timezone <> '')
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NOT NULL;

-- =============================================
-- DAYS
-- =============================================

CREATE TABLE days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Aggregated stats (updated via triggers)
  habits_total INTEGER NOT NULL DEFAULT 0,
  habits_completed INTEGER NOT NULL DEFAULT 0,
  tasks_total INTEGER NOT NULL DEFAULT 0,
  tasks_completed INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT unique_user_date UNIQUE (user_id, date),
  CONSTRAINT habits_completed_lte_total CHECK (habits_completed <= habits_total),
  CONSTRAINT tasks_completed_lte_total CHECK (tasks_completed <= tasks_total)
);

CREATE INDEX idx_days_user_id ON days(user_id);
CREATE INDEX idx_days_date ON days(date);
CREATE INDEX idx_days_user_date ON days(user_id, date);

-- =============================================
-- HABITS
-- =============================================

CREATE TYPE habit_type AS ENUM ('binary', 'numeric');
CREATE TYPE habit_frequency AS ENUM ('daily', 'weekly', 'custom');

CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Definition
  name TEXT NOT NULL CHECK (length(name) <= 100 AND name <> ''),
  description TEXT,
  icon TEXT,
  color TEXT,
  
  -- Type
  type habit_type NOT NULL DEFAULT 'binary',
  
  -- For numeric habits
  unit TEXT CHECK (type = 'numeric' OR unit IS NULL),
  target_value DECIMAL(10, 2) CHECK (type = 'numeric' OR target_value IS NULL),
  
  -- Schedule
  frequency habit_frequency NOT NULL DEFAULT 'daily',
  active_days INTEGER[] CHECK (
    frequency = 'daily' OR 
    (active_days IS NOT NULL AND array_length(active_days, 1) > 0)
  ),
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  
  -- UI ordering
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habits_user_archived ON habits(user_id, archived_at) WHERE archived_at IS NULL;
CREATE INDEX idx_habits_sort_order ON habits(user_id, sort_order);

-- =============================================
-- HABIT LOGS
-- =============================================

CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
  
  -- Value
  completed BOOLEAN NOT NULL DEFAULT false,
  value DECIMAL(10, 2),
    
    -- Metadata
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT unique_habit_day UNIQUE (habit_id, day_id)
  );
  
  CREATE INDEX idx_habit_logs_user_id ON habit_logs(user_id);
  CREATE INDEX idx_habit_logs_habit_id ON habit_logs(habit_id);
  CREATE INDEX idx_habit_logs_day_id ON habit_logs(day_id);
  CREATE INDEX idx_habit_logs_habit_logged_at ON habit_logs(habit_id, logged_at);

-- =============================================
-- TASKS
-- =============================================

CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE tasks (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

-- Content
title TEXT NOT NULL CHECK (length(title) <= 200 AND title <> ''),
description TEXT,

-- Scheduling
due_date DATE,
completed_at TIMESTAMPTZ,

-- Properties
priority task_priority,

-- Metadata
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_user_completed ON tasks(user_id, completed_at);
CREATE INDEX idx_tasks_user_due_date ON tasks(user_id, due_date);
CREATE INDEX idx_tasks_deleted_at ON tasks(deleted_at) WHERE deleted_at IS NOT NULL;

-- =============================================
-- TASK COMPLETIONS
-- =============================================

CREATE TABLE task_completions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,

completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

CONSTRAINT unique_task_completion UNIQUE (task_id)
);

CREATE INDEX idx_task_completions_user_id ON task_completions(user_id);
CREATE INDEX idx_task_completions_day_id ON task_completions(day_id);
CREATE INDEX idx_task_completions_task_id ON task_completions(task_id);

-- =============================================
-- MOOD ENTRIES
-- =============================================

CREATE TABLE mood_entries (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,

-- Value (1-5 scale)
mood_value INTEGER NOT NULL CHECK (mood_value BETWEEN 1 AND 5),

-- Optional context
note TEXT CHECK (length(note) <= 500),

-- Metadata
logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MVP: one mood per day (enforced in app logic, not DB for flexibility)
CREATE INDEX idx_mood_entries_user_day ON mood_entries(user_id, day_id);
CREATE INDEX idx_mood_entries_day_id ON mood_entries(day_id);

-- =============================================
-- JOURNAL ENTRIES
-- =============================================

CREATE TABLE journal_entries (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,

-- Content
content TEXT NOT NULL CHECK (content <> ''),

-- Metadata
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

CONSTRAINT unique_user_day_journal UNIQUE (user_id, day_id)
);

CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_day_id ON journal_entries(day_id);

-- =============================================
-- STREAKS
-- =============================================

CREATE TABLE streaks (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,

-- Current streak
current_streak INTEGER NOT NULL DEFAULT 0,
current_start_date DATE,

-- Best streak
longest_streak INTEGER NOT NULL DEFAULT 0,
longest_start_date DATE,
longest_end_date DATE,

-- Last activity
last_completed_date DATE,

updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

CONSTRAINT unique_habit_streak UNIQUE (habit_id)
);

CREATE INDEX idx_streaks_user_id ON streaks(user_id);
CREATE INDEX idx_streaks_habit_id ON streaks(habit_id);
```

---

### 4.2 Migrations Strategy

**Підхід**: Sequential numbered migrations з rollback support.

**Структура:**
```
/supabase/migrations/
20260101000001_initial_schema.sql
20260101000002_add_streaks_table.sql
20260102000001_add_habit_frequency.sql
...
```

**Migration file format:**
```sql
-- Migration: Add habit frequency feature
-- Created: 2026-01-02
-- Author: Team

-- UP
BEGIN;

ALTER TABLE habits 
ADD COLUMN frequency habit_frequency NOT NULL DEFAULT 'daily',
ADD COLUMN active_days INTEGER[];

COMMIT;

-- DOWN (for rollback)
-- BEGIN;
-- ALTER TABLE habits DROP COLUMN frequency, DROP COLUMN active_days;
-- COMMIT;
```

**Deployment process:**
1. Local development: `supabase db reset` (recreates from scratch)
2. Staging: `supabase db push` (applies new migrations)
3. Production: Manual review → `supabase db push` з backup перед

**Versioning:**
- Timestamp-based naming: `YYYYMMDDHHMMSS_description.sql`
- Git як source of truth
- Supabase tracks applied migrations в `supabase_migrations.schema_migrations`

**Rollback approach:**
- Кожна міграція має DOWN блок (закоментований)
- У разі проблеми: manually apply DOWN, remove migration from tracking table
- Критично: тести перед production push

---

### 4.3 Row Level Security (RLS) Policies

**Принцип**: Кожен користувач бачить тільки свої дані.

```sql
-- =============================================
-- ENABLE RLS
-- =============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE days ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

-- =============================================
-- USERS POLICIES
-- =============================================

-- Users can read their own profile
CREATE POLICY users_select_own 
ON users FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY users_update_own 
ON users FOR UPDATE 
USING (auth.uid() = id);

-- =============================================
-- DAYS POLICIES
-- =============================================

CREATE POLICY days_select_own 
ON days FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY days_insert_own 
ON days FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY days_update_own 
ON days FOR UPDATE 
USING (auth.uid() = user_id);

-- =============================================
-- HABITS POLICIES
-- =============================================

CREATE POLICY habits_select_own 
ON habits FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY habits_insert_own 
ON habits FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY habits_update_own 
ON habits FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY habits_delete_own 
ON habits FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- HABIT LOGS POLICIES
-- =============================================

CREATE POLICY habit_logs_select_own 
ON habit_logs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY habit_logs_insert_own 
ON habit_logs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY habit_logs_update_own 
ON habit_logs FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY habit_logs_delete_own 
ON habit_logs FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- TASKS POLICIES
-- =============================================

CREATE POLICY tasks_select_own 
ON tasks FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY tasks_insert_own 
ON tasks FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY tasks_update_own 
ON tasks FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY tasks_delete_own 
ON tasks FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- TASK COMPLETIONS POLICIES
-- =============================================

CREATE POLICY task_completions_select_own 
ON task_completions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY task_completions_insert_own 
ON task_completions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY task_completions_delete_own 
ON task_completions FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- MOOD ENTRIES POLICIES
-- =============================================

CREATE POLICY mood_entries_select_own 
ON mood_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY mood_entries_insert_own 
ON mood_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY mood_entries_update_own 
ON mood_entries FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY mood_entries_delete_own 
ON mood_entries FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- JOURNAL ENTRIES POLICIES
-- =============================================

CREATE POLICY journal_entries_select_own 
ON journal_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY journal_entries_insert_own 
ON journal_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY journal_entries_update_own 
ON journal_entries FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY journal_entries_delete_own 
ON journal_entries FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================
-- STREAKS POLICIES
-- =============================================

CREATE POLICY streaks_select_own 
ON streaks FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY streaks_insert_own 
ON streaks FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY streaks_update_own 
ON streaks FOR UPDATE 
USING (auth.uid() = user_id);
```

**Future-proofing для shared spaces (post-MVP):**
```sql
-- Приклад для команд
CREATE POLICY habits_select_team 
ON habits FOR SELECT 
USING (
auth.uid() = user_id OR
EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_members.user_id = auth.uid() 
    AND team_members.team_id = habits.team_id
)
);
```

**Testing RLS:**
```sql
-- Test script
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "user-uuid-here"}';

-- Should return only user's data
SELECT * FROM habits;

-- Should fail
INSERT INTO habits (user_id, name) VALUES ('other-user-uuid', 'Test');
```

---

### 4.4 SQL Functions & Triggers

#### 4.4.1 Auto-create Day

**Use case**: Коли користувач логує звичку/task/mood, автоматично створити Day якщо не існує.

```sql
CREATE OR REPLACE FUNCTION ensure_day_exists(
p_user_id UUID,
p_date DATE
) RETURNS UUID AS $$
DECLARE
v_day_id UUID;
BEGIN
-- Try to get existing day
SELECT id INTO v_day_id
FROM days
WHERE user_id = p_user_id AND date = p_date;

-- If not exists, create
IF v_day_id IS NULL THEN
    INSERT INTO days (user_id, date)
    VALUES (p_user_id, p_date)
    RETURNING id INTO v_day_id;
END IF;

RETURN v_day_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage example in app:
-- SELECT ensure_day_exists(auth.uid(), CURRENT_DATE);
```

---

#### 4.4.2 Update Day Aggregates (Habits)

**Trigger**: При зміні habit_logs → update days.habits_total / habits_completed

```sql
CREATE OR REPLACE FUNCTION update_day_habit_stats()
RETURNS TRIGGER AS $$
BEGIN
-- Recalculate stats for the affected day
UPDATE days
SET 
    habits_total = (
    SELECT COUNT(*) 
    FROM habit_logs 
    WHERE day_id = COALESCE(NEW.day_id, OLD.day_id)
    ),
    habits_completed = (
    SELECT COUNT(*) 
    FROM habit_logs 
    WHERE day_id = COALESCE(NEW.day_id, OLD.day_id)
    AND completed = true
    ),
    updated_at = NOW()
WHERE id = COALESCE(NEW.day_id, OLD.day_id);

RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_day_habit_stats
AFTER INSERT OR UPDATE OR DELETE ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION update_day_habit_stats();
```

---

#### 4.4.3 Update Day Aggregates (Tasks)

```sql
CREATE OR REPLACE FUNCTION update_day_task_stats()
RETURNS TRIGGER AS $$
BEGIN
-- Recalculate for affected day
UPDATE days
SET
    tasks_completed = (
    SELECT COUNT(*)
    FROM task_completions
    WHERE day_id = COALESCE(NEW.day_id, OLD.day_id)
    ),
    updated_at = NOW()
WHERE id = COALESCE(NEW.day_id, OLD.day_id);

RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_day_task_stats
AFTER INSERT OR UPDATE OR DELETE ON task_completions
FOR EACH ROW
EXECUTE FUNCTION update_day_task_stats();

-- Also update tasks_total when tasks are created/deleted/updated with due_date
CREATE OR REPLACE FUNCTION update_day_task_total()
RETURNS TRIGGER AS $$
DECLARE
  v_day_id UUID;
BEGIN
  -- On INSERT, increment the counter for the new due_date
  IF TG_OP = 'INSERT' AND NEW.due_date IS NOT NULL THEN
    v_day_id := ensure_day_exists(NEW.user_id, NEW.due_date);
    UPDATE days
    SET tasks_total = tasks_total + 1, updated_at = NOW()
    WHERE id = v_day_id;
  
  -- On DELETE, decrement the counter for the old due_date
  ELSIF TG_OP = 'DELETE' AND OLD.due_date IS NOT NULL THEN
    SELECT id INTO v_day_id FROM days 
    WHERE user_id = OLD.user_id AND date = OLD.due_date;
    
    IF v_day_id IS NOT NULL THEN
      UPDATE days
      SET tasks_total = GREATEST(tasks_total - 1, 0), updated_at = NOW()
      WHERE id = v_day_id;
    END IF;

  -- On UPDATE, handle the change if due_date was modified
  ELSIF TG_OP = 'UPDATE' AND NEW.due_date IS DISTINCT FROM OLD.due_date THEN
    -- Decrement the counter for the old date, if it existed
    IF OLD.due_date IS NOT NULL THEN
      SELECT id INTO v_day_id FROM days
      WHERE user_id = OLD.user_id AND date = OLD.due_date;

      IF v_day_id IS NOT NULL THEN
        UPDATE days
        SET tasks_total = GREATEST(tasks_total - 1, 0), updated_at = NOW()
        WHERE id = v_day_id;
      END IF;
    END IF;

    -- Increment the counter for the new date, if it exists
    IF NEW.due_date IS NOT NULL THEN
      v_day_id := ensure_day_exists(NEW.user_id, NEW.due_date);
      UPDATE days
      SET tasks_total = tasks_total + 1, updated_at = NOW()
      WHERE id = v_day_id;
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_day_task_total
AFTER INSERT OR UPDATE OR DELETE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_day_task_total();
```

---

#### 4.4.4 Update Streaks

**Складна логіка**: При зміні habit_log → перерахувати current_streak, longest_streak

```sql
CREATE OR REPLACE FUNCTION calculate_habit_streak(
p_habit_id UUID
) RETURNS VOID AS $$
DECLARE
v_user_id UUID;
v_current_streak INTEGER := 0;
v_current_start DATE;
v_longest_streak INTEGER := 0;
v_longest_start DATE;
v_longest_end DATE;
v_last_completed DATE;
v_temp_streak INTEGER := 0;
v_temp_start DATE;
v_prev_date DATE;
rec RECORD;
BEGIN
-- Get habit user
SELECT user_id INTO v_user_id FROM habits WHERE id = p_habit_id;

-- Get all completed logs ordered by date
FOR rec IN (
    SELECT d.date
    FROM habit_logs hl
    JOIN days d ON d.id = hl.day_id
    WHERE hl.habit_id = p_habit_id
    AND hl.completed = true
    ORDER BY d.date ASC
) LOOP
    -- First record
    IF v_prev_date IS NULL THEN
    v_temp_streak := 1;
    v_temp_start := rec.date;
    v_last_completed := rec.date;
    -- Consecutive day
    ELSIF rec.date = v_prev_date + INTERVAL '1 day' THEN
    v_temp_streak := v_temp_streak + 1;
    v_last_completed := rec.date;
    -- Break in streak
    ELSE
    -- Save if longest
    IF v_temp_streak > v_longest_streak THEN
        v_longest_streak := v_temp_streak;
        v_longest_start := v_temp_start;
        v_longest_end := v_prev_date;
    END IF;
    
    -- Reset temp
    v_temp_streak := 1;
    v_temp_start := rec.date;
    v_last_completed := rec.date;
    END IF;
    
    v_prev_date := rec.date;
END LOOP;

-- Check if last streak is longest
IF v_temp_streak > v_longest_streak THEN
    v_longest_streak := v_temp_streak;
    v_longest_start := v_temp_start;
    v_longest_end := v_prev_date;
END IF;

-- Current streak is valid only if last completed was yesterday or today
IF v_last_completed >= CURRENT_DATE - INTERVAL '1 day' THEN
    v_current_streak := v_temp_streak;
    v_current_start := v_temp_start;
ELSE
    v_current_streak := 0;
    v_current_start := NULL;
END IF;

-- Upsert streak record
INSERT INTO streaks (
    user_id,
    habit_id,
    current_streak,
    current_start_date,
    longest_streak,
    longest_start_date,
    longest_end_date,
    last_completed_date,
    updated_at
) VALUES (
    v_user_id,
    p_habit_id,
    v_current_streak,
    v_current_start,
    v_longest_streak,
    v_longest_start,
    v_longest_end,
    v_last_completed,
    NOW()
)
ON CONFLICT (habit_id) DO UPDATE SET
    current_streak = EXCLUDED.current_streak,
    current_start_date = EXCLUDED.current_start_date,
    longest_streak = EXCLUDED.longest_streak,
    longest_start_date = EXCLUDED.longest_start_date,
    longest_end_date = EXCLUDED.longest_end_date,
    last_completed_date = EXCLUDED.last_completed_date,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE OR REPLACE FUNCTION trigger_recalculate_streak()
RETURNS TRIGGER AS $$
BEGIN
PERFORM calculate_habit_streak(COALESCE(NEW.habit_id, OLD.habit_id));
RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_habit_log_streak
AFTER INSERT OR UPDATE OR DELETE ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION trigger_recalculate_streak();
```

---

#### 4.4.5 Updated_at Trigger (Generic)

**Use case**: Auto-update `updated_at` timestamp.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_days_updated_at
BEFORE UPDATE ON days
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_habits_updated_at
BEFORE UPDATE ON habits
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_habit_logs_updated_at
BEFORE UPDATE ON habit_logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_mood_entries_updated_at
BEFORE UPDATE ON mood_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_journal_entries_updated_at
BEFORE UPDATE ON journal_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

## 5. Functional Requirements

### 5.1 Habit System

#### 5.1.1 Створення звички

**User story**: Як користувач, я хочу створити нову звичку для трекінгу.

**Requirements:**
- Поля:
- Назва (обов'язково, max 100 символів)
- Опис (опціонально, текст)
- Іконка (emoji picker, опціонально)
- Колір (color picker для візуального групування, опціонально)
- Тип: бінарна (yes/no) або кількісна (numeric)
- Якщо кількісна:
    - Одиниці виміру (glasses, km, minutes, pages, etc.)
    - Цільове значення на день (опціонально)
- Частота: daily (за замовчуванням), weekly (specific days), custom (post-MVP)

**UI Flow:**
```
User: натискає "Add Habit" на Today/Habits page
→ Modal/Sheet відкривається
→ Quick templates (optional): "Workout", "Meditation", "Reading" (prefilled)
→ Or custom: заповнює форму
→ Saves
→ Habit зʼявляється в списку на Today view
```

**Validation:**
- Name not empty
- If numeric: unit required
- Active days valid (0-6)

**Post-MVP enhancements:**
- Templates library
- Habit categories / tags
- Reminder times (push notifications)

---

#### 5.1.2 Логування звички

**User story**: Як користувач, я хочу швидко позначити виконання звички.

**Requirements:**

**Для бінарних звичок:**
- Checkbox UI: unchecked → checked
- Один клік = completed
- Можна uncheck (undo)

**Для кількісних звичок:**
- Показати поточне значення (default 0)
- Кнопки +/- для швидкого додавання
- Або інпут для manual entry
- Показати progress до цілі: "5/8 glasses" + progress bar

**Behavior:**
- Логування автоматично створює/оновлює HabitLog для today
- Якщо Day не існує → auto-create через ensure_day_exists()
- Real-time update aggregates (habits_completed)
- Streak відображається одразу (cached в Streak table)

**UI Examples:**
```
Binary habit:
[✓] Meditation     🔥 12 days

Numeric habit:
💧 Water: [5/8 glasses]  [-] [+]  [━━━━━━━░░] 
```

---

#### 5.1.3 Редагування історії

**User story**: Я забув позначити звичку вчора, хочу додати retroactively.

**Requirements:**
- Можливість логувати звички для минулих днів
- Calendar view: клік на день → відкриває day detail
- Там можна edit habit logs
- При зміні historical data → trigger recalculates streaks

**Constraints:**
- Не можна логувати майбутнє
- Max edit range: 90 днів назад (запобігає зловживанню)

---

#### 5.1.4 Архівування звички

**User story**: Звичка більше не актуальна, але хочу зберегти історію.

**Requirements:**
- Soft archive: archived_at timestamp
- Архівована звичка:
- Не показується в Today view
- Залишається в Analytics (historical data збережено)
- Можна unarchive
- Hard delete (optional): повністю видаляє habit + всі logs (з підтвердженням)

---

#### 5.1.5 Статистика звичок

**Requirements:**
- **Streak visualization**: 
- Current streak prominently displayed
- Calendar heatmap (green squares як GitHub)
- Longest streak ever
- **Completion rate**:
- За вибраний період (week/month/year)
- % днів completed
- Total times completed
- **Trends**:
- Line chart для кількісних звичок (rolling 7/30-day average)
- Bar chart для бінарних (completions per week)
- **Day-of-week analysis**:
- "You complete this habit most on Mondays"
- Weekday vs weekend patterns

---

### 5.2 Tasks

#### 5.2.1 Створення задачі

**User story**: Я хочу додати задачу на день.

**Requirements:**
- Поля:
- Title (обовʼязково, max 200 chars)
- Description (опціонально, markdown post-MVP)
- Due date (опціонально)
- Priority: low/medium/high (опціонально, color-coded)
- Quick add: text input з auto-parse
- "Buy milk tomorrow" → title="Buy milk", due_date=tomorrow
- "Call dentist !high" → priority=high

**UI:**
```
Today view:
[+] Add task → інпут зʼявляється inline
Type → Enter → saved
Or full form modal for complex tasks
```

---

#### 5.2.2 Виконання задачі

**User story**: Позначити задачу як виконану.

**Requirements:**
- Checkbox → completed_at = NOW()
- Автоматично створює TaskCompletion record з day_id
- Якщо due_date != completion_date → показує в обох днях:
- Due date: "Overdue, completed late"
- Completion date: "Completed today"
- Можна uncomplete (якщо помилково completed)

**Stats impact:**
- Day.tasks_completed increment
- Completion rate calculation

---

#### 5.2.3 Task list views

**Requirements:**

**Today:**
- Overdue tasks (due < today, not completed) — червоний
- Due today — звичайний
- No due date — в кінці списку

**Week:**
- Group by due date
- Show completion status
- Drag-and-drop to reschedule (post-MVP)

**All tasks:**
- Filter: active/completed/all
- Sort: due date / priority / created
- Search by title

---

#### 5.2.4 Task analytics

**Requirements:**
- **Completion rate**: % tasks completed on time
- **Overdue analysis**: average delay, patterns
- **Velocity**: tasks completed per day/week
- **Priority distribution**: do you actually complete high-priority first?

**Correlations (analytics tab):**
- "Days with 5+ completed tasks had higher mood (4.2 vs 3.5)"

---

### 5.3 Mood & State Tracking

#### 5.3.1 Mood scale design

**На основі аналізу:**
- 10-point scales занадто granular (користувачі не бачать різниці між 6 і 7)
- 3-point занадто прості (не вистачає нюансів)
- **Оптимально: 5-point scale з емоджі**

**Scale:**
```
1 😫 Awful
2 😕 Bad
3 😐 Okay
4 🙂 Good
5 😄 Great
```

**Чому емоджі:**
- Швидше за текст
- Універсальні (не потребують перекладу)
- Емоційно зрозумілі

---

#### 5.3.2 Логування настрою

**User story**: Швидко зафіксувати як почуваюсь.

**Requirements:**
- One-tap logging: 5 кнопок з емоджі
- Опціонально: short note (max 500 chars)
- "Had a great meeting with the team"
- Auto-suggestions based on historical notes (post-MVP)
- Можна логувати кілька разів на день (post-MVP)
- MVP: тільки one mood per day (останній overrides)

**UI:**
```
Today view має секцію:
┌─────────────────────────────┐
│ How are you feeling?        │
│ 😫  😕  😐  🙂  😄          │
└─────────────────────────────┘

After tap:
┌─────────────────────────────┐
│ Mood: 😄 Great              │
│ [Optional note...]          │
└─────────────────────────────┘
```

---

#### 5.3.3 Mood analytics

**Requirements:**

**Basic stats:**
- Average mood для періоду
- Distribution chart (bar chart з емоджі)
- Trend line (7/30-day rolling average)

**Day-of-week patterns:**
- "You're happiest on Saturdays (avg 4.5)"
- "Mondays are tough (avg 3.1)"

**Correlations (core feature):**
- Mood vs Habits completed:
  - Scatter plot: X=habits completed, Y=mood
  - "When you complete 7+ habits, mood is 4.2 avg"
- Mood vs Specific habits:
  - "Workout days: mood 4.3 vs non-workout: 3.2"
  - "Meditation days: mood 4.1 vs non-meditation: 3.4"
- Mood vs Tasks:
  - "Days with 5+ completed tasks: mood 4.0"
  - "Overdue tasks correlation: mood -0.6"

---

### 5.4 Daily Journal

#### 5.4.1 Journal entry

**User story**: Написати про день для пам'яті та рефлексії.

**Requirements:**
- Free-form text (markdown post-MVP)
- One entry per day в MVP
- Auto-save draft (localStorage в браузері)
- Character count (unlimited, але UI suggests brevity)

**UI:**
```
Today view → Journal section
┌──────────────────────────────────┐
│ 📝 Today's Journal              │
│                                  │
│ [Text area]                      │
│                                  │
│ Quick prompts (optional):        │
│ • What went well today?          │
│ • What could be better?          │
│ • What did I learn?              │
└──────────────────────────────────┘
```

**Templates (post-MVP):**
- "Daily reflection"
- "Gratitude journal"
- "Work log"
- User-created templates

---

#### 5.4.2 Journal history

**Requirements:**
- Calendar view з indicators (які дні мають entries)
- Timeline view: хронологічний список
- Search by text (full-text search)
- Filter by date range

---

#### 5.4.3 Journal insights (post-MVP)

**Майбутні features:**
- Word cloud з частих слів
- Sentiment analysis (AI)
- Tags auto-extracted з тексту
- "You mentioned 'stress' 8 times this month"

---

## 6. Analytics & Statistics

### 6.1 Core Analytics Principles

**Філософія:**
- **Обʼєктивність**: показувати reality, не приховувати негативні тренди
- **Actionability**: кожен insight має вести до decision
- **Context**: цифри без контексту безглузді
- **Long-term focus**: оптимізація на місяці/роки, не дні

**Типи аналітики:**
1. **Descriptive**: що сталось (heatmaps, completion rates)
2. **Diagnostic**: чому сталось (correlations)
3. **Predictive**: що може статись (trends, post-MVP)
4. **Prescriptive**: що робити (recommendations, AI, post-MVP)

**MVP scope**: Descriptive + Diagnostic

---

### 6.2 Habit Analytics

#### 6.2.1 Calendar Heatmap

**Візуалізація:** GitHub-style contribution graph

```
       M  T  W  T  F  S  S
Week 1 ██ ██ ░░ ██ ██ ██ ░░
Week 2 ██ ░░ ██ ██ ██ ░░ ░░
Week 3 ██ ██ ██ ██ ░░ ██ ██
Week 4 ██ ██ ██ ░░ ██ ██ ██

Legend: ██ Completed  ░░ Missed
```

**Implementation:**
```sql
-- Get habit completion for date range
SELECT 
  d.date,
  COALESCE(hl.completed, false) as completed
FROM generate_series(
  :start_date::date, 
  :end_date::date, 
  '1 day'::interval
) d(date)
LEFT JOIN days dy ON dy.user_id = :user_id AND dy.date = d.date
LEFT JOIN habit_logs hl ON hl.day_id = dy.id AND hl.habit_id = :habit_id
ORDER BY d.date;
```

**UI Features:**
- Hover → tooltip з деталями дня
- Click → navigate to day detail
- Color intensity для numeric habits (gradient based on % of target)

---

#### 6.2.2 Streak Analysis

**Metrics:**
- Current streak (днів підряд)
- Longest streak ever
- Total completions (all-time)

**Visualization:**
```
Current Streak:  🔥 14 days
Longest Streak:  🏆 42 days (March 2025)
Total:           156 times
```

**SQL:**
```sql
-- Current streak visualization
SELECT 
  current_streak,
  current_start_date,
  longest_streak,
  longest_start_date,
  longest_end_date
FROM streaks
WHERE habit_id = :habit_id;
```

---

#### 6.2.3 Completion Rate

**Formula:** `(completed_days / total_days) * 100`

**Breakdowns:**
- Overall (all-time)
- Last 30 days
- Last 90 days
- Custom range

**SQL:**
```sql
SELECT 
  COUNT(*) FILTER (WHERE hl.completed) as completed_count,
  COUNT(*) as total_days,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE hl.completed) / NULLIF(COUNT(*), 0),
    1
  ) as completion_rate
FROM generate_series(
  :start_date::date,
  :end_date::date,
  '1 day'::interval
) d(date)
LEFT JOIN days dy ON dy.user_id = :user_id AND dy.date = d.date
LEFT JOIN habit_logs hl ON hl.day_id = dy.id AND hl.habit_id = :habit_id
WHERE 
  d.date <= CURRENT_DATE  -- don't count future
  AND (
    -- For daily habits: all days
    (SELECT frequency FROM habits WHERE id = :habit_id) = 'daily'
    OR
    -- For weekly habits: only active days
    EXTRACT(DOW FROM d.date) = ANY(
      SELECT unnest(active_days) FROM habits WHERE id = :habit_id
    )
  );
```

---

#### 6.2.4 Trends (Numeric Habits)

**Visualization:** Line chart з rolling averages

**Metrics:**
- Daily values (raw)
- 7-day rolling average (smooth short-term noise)
- 30-day rolling average (long-term trend)

**Example: Water intake**
```
Liters
  8 ┤                              ╭─
  7 ┤                    ╭────────╯
  6 ┤              ╭────╯
  5 ┤      ╭──────╯
  4 ┤──────╯
    └─────────────────────────────────
    Jan  Feb  Mar  Apr  May  Jun  Jul

Daily values: light blue
7-day avg: dark blue
Target: red dashed line
```

**SQL:**
```sql
SELECT 
  d.date,
  COALESCE(hl.value, 0) as value,
  AVG(COALESCE(hl.value, 0)) OVER (
    ORDER BY d.date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as rolling_7day_avg,
  AVG(COALESCE(hl.value, 0)) OVER (
    ORDER BY d.date 
    ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
  ) as rolling_30day_avg
FROM generate_series(
  :start_date::date,
  :end_date::date,
  '1 day'::interval
) d(date)
LEFT JOIN days dy ON dy.user_id = :user_id AND dy.date = d.date
LEFT JOIN habit_logs hl ON hl.day_id = dy.id AND hl.habit_id = :habit_id
ORDER BY d.date;
```

---

#### 6.2.5 Day-of-Week Analysis

**Question:** "Коли я найбільш/найменш consistent?"

**SQL:**
```sql
SELECT 
  EXTRACT(DOW FROM d.date) as day_of_week,
  TO_CHAR(d.date, 'Day') as day_name,
  COUNT(*) FILTER (WHERE hl.completed) as completed_count,
  COUNT(*) as total_count,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE hl.completed) / NULLIF(COUNT(*), 0),
    1
  ) as completion_rate
FROM days d
LEFT JOIN habit_logs hl ON hl.day_id = d.id AND hl.habit_id = :habit_id
WHERE 
  d.user_id = :user_id
  AND d.date BETWEEN :start_date AND :end_date
GROUP BY 1, 2
ORDER BY 1;
```

**Visualization:**
```
Monday    ███████████████░░ 89%
Tuesday   ████████████████░ 92%
Wednesday ██████████░░░░░░░ 67%
Thursday  ███████████████░░ 88%
Friday    █████████░░░░░░░░ 61%
Saturday  ████████████░░░░░ 75%
Sunday    ███████░░░░░░░░░░ 58%
```

**Insight example:**
> "Your completion rate drops 30% on weekends. Consider a different weekend routine or adjusting expectations for Fri-Sun."

---

### 6.3 Task Analytics

#### 6.3.1 Completion Statistics

**Metrics:**
- Total created
- Total completed
- Completion rate
- Average completion time (days from created to completed)
- Overdue rate

**SQL:**
```sql
SELECT 
  COUNT(*) as total_created,
  COUNT(*) FILTER (WHERE completed_at IS NOT NULL) as total_completed,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE completed_at IS NOT NULL) / NULLIF(COUNT(*), 0),
    1
  ) as completion_rate,
  COUNT(*) FILTER (
    WHERE completed_at IS NOT NULL 
    AND due_date IS NOT NULL 
    AND completed_at::date > due_date
  ) as completed_late,
  ROUND(
    AVG(EXTRACT(EPOCH FROM (completed_at - created_at)) / 86400.0) 
    FILTER (WHERE completed_at IS NOT NULL),
    1
  ) as avg_completion_days
FROM tasks
WHERE 
  user_id = :user_id
  AND created_at BETWEEN :start_date AND :end_date
  AND deleted_at IS NULL;
```

---

#### 6.3.2 Task Velocity

**Question:** "Скільки задач я реально виконую per day/week?"

**SQL:**
```sql
SELECT 
  DATE_TRUNC('week', d.date) as week_start,
  COUNT(tc.id) as tasks_completed
FROM days d
LEFT JOIN task_completions tc ON tc.day_id = d.id
WHERE 
  d.user_id = :user_id
  AND d.date BETWEEN :start_date AND :end_date
GROUP BY 1
ORDER BY 1;
```

**Visualization:** Bar chart per week

```
Tasks/Week
 20 ┤     ██
 15 ┤  ██ ██    ██
 10 ┤  ██ ██ ██ ██ ██
  5 ┤  ██ ██ ██ ██ ██ ██
    └──────────────────────
    W1 W2 W3 W4 W5 W6
```

**Insight:**
> "Your average velocity is 12 tasks/week. You tend to overcommit by planning 18 tasks/week."

---

### 6.4 Mood Analytics

#### 6.4.1 Mood Distribution

**Visualization:** Bar chart

```sql
SELECT 
  mood_value,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) as percentage
FROM mood_entries
WHERE 
  user_id = :user_id
  AND logged_at BETWEEN :start_date AND :end_date
GROUP BY mood_value
ORDER BY mood_value;
```

**Output:**
```
😫 (1) ██░░░░░░░░  8%
😕 (2) ████░░░░░░ 18%
😐 (3) ████████░░ 35%
🙂 (4) ██████░░░░ 27%
😄 (5) ███░░░░░░░ 12%

Average: 3.2 / 5
```

---

#### 6.4.2 Mood Trends

**Visualization:** Line chart з 7/30-day rolling average

```sql
SELECT 
  d.date,
  me.mood_value,
  AVG(me.mood_value) OVER (
    ORDER BY d.date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as rolling_7day_avg
FROM days d
LEFT JOIN mood_entries me ON me.day_id = d.id
WHERE 
  d.user_id = :user_id
  AND d.date BETWEEN :start_date AND :end_date
ORDER BY d.date;
```

**Insight detection:**
- Upward trend: "Your mood improved by 0.8 points this month"
- Downward trend: "Your mood declined by 0.5 points — worth investigating"
- Plateau: "Your mood has been stable around 3.5"

---

### 6.5 Correlations (Core Feature)

#### 6.5.1 Mood vs Habits Completed

**Question:** "Чи краще я почуваюсь коли виконую більше звичок?"

**SQL:**
```sql
SELECT 
  d.date,
  d.habits_completed,
  me.mood_value
FROM days d
JOIN mood_entries me ON me.day_id = d.id
WHERE 
  d.user_id = :user_id
  AND d.date BETWEEN :start_date AND :end_date
  AND me.mood_value IS NOT NULL
ORDER BY d.date;
```

**Analysis:**
- Scatter plot: X=habits_completed, Y=mood_value
- Pearson correlation coefficient
- Group comparison:
  - Days with 0-3 habits: avg mood
  - Days with 4-6 habits: avg mood
  - Days with 7+ habits: avg mood

**Insight example:**
```
When you complete 7+ habits: avg mood 4.2
When you complete 4-6 habits: avg mood 3.7
When you complete 0-3 habits: avg mood 3.1

Correlation: +0.68 (strong positive)
→ Your mood significantly improves with habit consistency
```

---

#### 6.5.2 Mood vs Specific Habit

**Question:** "Чи впливає workout на мій настрій?"

**SQL:**
```sql
WITH habit_days AS (
  SELECT 
    d.date,
    d.id as day_id,
    CASE WHEN hl.completed THEN 'completed' ELSE 'not_completed' END as habit_status
  FROM days d
  LEFT JOIN habit_logs hl ON hl.day_id = d.id AND hl.habit_id = :habit_id
  WHERE d.user_id = :user_id
)
SELECT 
  hd.habit_status,
  AVG(me.mood_value) as avg_mood,
  COUNT(*) as day_count
FROM habit_days hd
JOIN mood_entries me ON me.day_id = hd.day_id
GROUP BY hd.habit_status;
```

**Output:**
```
Workout completed:     avg mood 4.3 (23 days)
Workout not completed: avg mood 3.2 (15 days)

Difference: +1.1 points
→ Strong evidence that workout improves your mood
```

---

#### 6.5.3 Mood vs Tasks Completed

**SQL:**
```sql
SELECT 
  CASE 
    WHEN d.tasks_completed = 0 THEN '0 tasks'
    WHEN d.tasks_completed BETWEEN 1 AND 3 THEN '1-3 tasks'
    WHEN d.tasks_completed BETWEEN 4 AND 6 THEN '4-6 tasks'
    ELSE '7+ tasks'
  END as task_bucket,
  AVG(me.mood_value) as avg_mood,
  COUNT(*) as day_count
FROM days d
JOIN mood_entries me ON me.day_id = d.id
WHERE d.user_id = :user_id
GROUP BY 1
ORDER BY 
  CASE task_bucket
    WHEN '0 tasks' THEN 1
    WHEN '1-3 tasks' THEN 2
    WHEN '4-6 tasks' THEN 3
    ELSE 4
  END;
```

**Insight:**
```
0 tasks:    mood 3.1
1-3 tasks:  mood 3.5
4-6 tasks:  mood 4.0
7+ tasks:   mood 4.2

→ Productivity correlates with well-being
```

---

### 6.6 Aggregate Views

#### 6.6.1 Weekly Summary

**Components:**
- Habits: completion rate, streaks status
- Tasks: completed/total, velocity
- Mood: average, trend
- Journal: entries count
- Top performers: best habits
- Areas to improve: worst habits

**SQL (example):**
```sql
WITH week_stats AS (
  SELECT 
    user_id,
    SUM(habits_completed) as total_habits_completed,
    SUM(habits_total) as total_habits_expected,
    SUM(tasks_completed) as total_tasks_completed,
    AVG(habits_completed::float / NULLIF(habits_total, 0)) as avg_daily_completion
  FROM days
  WHERE 
    user_id = :user_id
    AND date BETWEEN :week_start AND :week_end
  GROUP BY user_id
),
mood_stats AS (
  SELECT 
    AVG(me.mood_value) as avg_mood,
    COUNT(*) as mood_entries_count
  FROM mood_entries me
  JOIN days d ON d.id = me.day_id
  WHERE 
    d.user_id = :user_id
    AND d.date BETWEEN :week_start AND :week_end
)
SELECT * FROM week_stats, mood_stats;
```

---

#### 6.6.2 Monthly Summary

**Additional metrics:**
- Month-over-month changes
- Best/worst weeks
- Habit consistency ranking
- Mood patterns (day-of-week, week-of-month)

---

### 6.7 Data Export

**Requirements:**
- CSV export для всіх даних
- Date range filter
- Include:
  - Habits logs (date, habit, value, completed)
  - Tasks (created, completed, due_date, title)
  - Mood entries (date, value, note)
  - Journal entries (date, content)

**Use case:**
- Custom analysis у Excel/Python
- Backup
- Migration to іншого інструменту

**SQL:**
```sql
-- Export habits
SELECT 
  d.date,
  h.name as habit_name,
  hl.completed,
  hl.value,
  h.unit
FROM habit_logs hl
JOIN days d ON d.id = hl.day_id
JOIN habits h ON h.id = hl.habit_id
WHERE hl.user_id = :user_id
AND d.date BETWEEN :start_date AND :end_date
ORDER BY d.date, h.name;
```

---

## 7. Sitemap & UX Structure

### 7.1 Sitemap

```
Public
├── / (landing)
├── /about
├── /pricing (post-MVP)
└── /login

Auth
├── /signup
├── /login
└── /reset-password

App (authenticated)
├── /app
│   ├── /today (default, main view)
│   ├── /week
│   ├── /month
│   ├── /habits
│   │   ├── / (list)
│   │   └── /:id (detail + analytics)
│   ├── /tasks
│   │   ├── / (list)
│   │   └── /:id (detail)
│   ├── /analytics
│   │   ├── /overview
│   │   ├── /habits
│   │   ├── /mood
│   │   └── /correlations
│   ├── /calendar (historical view)
│   ├── /journal
│   │   ├── / (timeline)
│   │   └── /:date (specific day)
│   └── /settings
│       ├── /profile
│       ├── /preferences
│       └── /data
└── /logout
```

---

### 7.2 Page Specifications

#### 7.2.1 Today View (`/app/today`)

**Ціль:** Швидкий трекінг поточного дня.

**Layout:**
```
┌─────────────────────────────────────┐
│ Header: Today - Wednesday, Jan 21   │
│ [Date picker] [Settings]            │
├─────────────────────────────────────┤
│                                      │
│ 📊 Quick Stats                      │
│ Habits: 5/8  Tasks: 3/6  Mood: 😊   │
│                                      │
├─────────────────────────────────────┤
│ 💪 Habits                           │
│ [✓] Meditation         🔥 12 days   │
│ [✓] Workout           🔥 5 days    │
│ [ ] Reading           ⚠️ Missed     │
│ 💧 Water: 5/8 glasses  [-] [+]      │
│ [+ Add habit]                        │
├─────────────────────────────────────┤
│ ✅ Tasks                            │
│ [ ] Finish report      ! High       │
│ [✓] Call dentist                    │
│ [ ] Buy groceries                    │
│ [+ Add task]                         │
├─────────────────────────────────────┤
│ 😊 Mood                             │
│ How are you feeling?                │
│ 😫  😕  😐  [🙂]  😄                │
│ [Optional note...]                   │
├─────────────────────────────────────┤
│ 📝 Journal                          │
│ [Write about your day...]           │
│                                      │
└─────────────────────────────────────┘
```

**Primary Actions:**
- Toggle habit completion (1 tap)
- Toggle task completion (1 tap)
- Add new habit/task (quick input)
- Log mood (1 tap)
- Write journal (text area)

**Behavior:**
- Auto-save all changes
- Real-time streak updates
- Show progress indicators
- Collapsible sections (mobile)

---

#### 7.2.2 Week View (`/app/week`)

**Ціль:** Огляд тижня, weekly planning.

**Layout:**
```
┌─────────────────────────────────────┐
│ Week of Jan 15 - Jan 21, 2026       │
│ [< Prev] [Today] [Next >]           │
├─────────────────────────────────────┤
│                                      │
│ 📈 Weekly Summary                   │
│ Habits: 35/50 (70%)                 │
│ Tasks: 18/25 (72%)                  │
│ Avg Mood: 😊 3.8/5                  │
│ Journal: 5/7 days                    │
│                                      │
├─────────────────────────────────────┤
│ 📅 Habit Heatmap                    │
│         M  T  W  T  F  S  S         │
│ Medit.  ✓  ✓  ✓  ✓  ✓  ✓  -        │
│ Workout ✓  -  ✓  ✓  ✓  -  -        │
│ Reading ✓  ✓  -  ✓  -  ✓  ✓        │
│ Water   6  7  5  8  7  4  3        │
│                                      │
├─────────────────────────────────────┤
│ ✅ Tasks by Day                     │
│ Mon (3/4)  Tue (4/5)  Wed (2/3) ... │
│ [Expandable list per day]           │
│                                      │
├─────────────────────────────────────┤
│ 💡 Insights                         │
│ • Best day: Tuesday (8/9 habits)    │
│ • Mood was higher on workout days   │
│ • You completed 90% of high-pri tasks│
└─────────────────────────────────────┘
```

**Primary Actions:**
- Navigate weeks
- Click day → open Today view for that day
- Click habit → open Habit detail
- View insights

---

#### 7.2.3 Month View (`/app/month`)

**Ціль:** Огляд місяця, patterns.

**Layout:**
```
┌─────────────────────────────────────┐
│ January 2026                         │
│ [< Prev] [Today] [Next >]           │
├─────────────────────────────────────┤
│                                      │
│ 📊 Monthly Summary                  │
│ Habits: 180/240 (75%)               │
│ Tasks: 68/90 (76%)                  │
│ Avg Mood: 😊 3.7/5                  │
│ Best week: Week 3 (85% habits)      │
│                                      │
├─────────────────────────────────────┤
│ 📅 Calendar View                    │
│ (GitHub-style heatmap for all habits)│
│ [Full month calendar with intensity] │
│ Click day → day detail               │
│                                      │
├─────────────────────────────────────┤
│ 📈 Charts                           │
│ [Mood trend line]                    │
│ [Habit completion by week]           │
│ [Task velocity]                      │
│                                      │
└─────────────────────────────────────┘
```

---

#### 7.2.4 Habit Detail (`/app/habits/:id`)

**Ціль:** Глибока аналітика окремої звички.

**Layout:**
```
┌─────────────────────────────────────┐
│ 🏃 Workout                          │
│ [Edit] [Archive] [Delete]           │
├─────────────────────────────────────┤
│ 🔥 Current Streak: 12 days          │
│ 🏆 Longest: 42 days (March 2025)    │
│ ✅ Total: 156 completions           │
│                                      │
├─────────────────────────────────────┤
│ 📅 Heatmap (Last 90 days)           │
│ [GitHub-style calendar]              │
│                                      │
├─────────────────────────────────────┤
│ 📊 Statistics                       │
│ Last 30 days:  23/30 (77%)          │
│ Last 90 days:  68/90 (76%)          │
│ All-time:      156/200 (78%)        │
│                                      │
├─────────────────────────────────────┤
│ 📈 Trends                           │
│ [Line chart: completion over time]   │
│                                      │
├─────────────────────────────────────┤
│ 🌟 Day-of-Week Breakdown            │
│ Monday:    ████████████ 89%         │
│ Tuesday:   █████████████ 92%        │
│ ...                                  │
│                                      │
├─────────────────────────────────────┤
│ 💡 Insights                         │
│ • You're most consistent on Tue/Thu │
│ • Weekend completion drops 25%      │
│ • When completed, mood is 1.1 higher│
└─────────────────────────────────────┘
```

---

#### 7.2.5 Analytics Overview (`/app/analytics`)

**Ціль:** Cross-entity insights, correlations.

**Sections:**
1. **Overall Stats**
   - Habit completion rate
   - Task velocity
   - Mood average
   - Journal consistency

2. **Correlations** (key feature)
   - Mood vs Habits completed (scatter)
   - Mood vs specific habits (comparison)
   - Mood vs Tasks completed
   - Day-of-week patterns

3. **Trends**
   - Mood trend (3/6/12 months)
   - Habit consistency trend
   - Productivity trend

4. **Insights Panel**
   - Auto-generated insights:
     - "Your mood improved 15% this quarter"
     - "Meditation has strongest correlation with good mood (+1.2)"
     - "You complete 40% more tasks on days you workout"

**Filters:**
- Date range (last week/month/quarter/year/all-time)
- Specific habits
- Mood range

---

#### 7.2.6 Settings (`/app/settings`)

**Sections:**

**Profile:**
- Display name
- Email (read-only, через Supabase Auth)
- Timezone
- Avatar (post-MVP)

**Preferences:**
- Theme: light/dark/system
- Week start: Sunday/Monday
- Default view: today/week/month
- Date format
- Time format

**Data:**
- Export data (CSV)
- Delete account (з підтвердженням)
- Data usage stats (storage info)

---

### 7.3 Modals vs Sheets

**Принцип:**
- **Desktop:** Modals (centered overlay)
- **Mobile:** Bottom sheets (slide up from bottom)

**Modal use cases:**
- Create habit (form з кількома полями)
- Create task (якщо не quick add)
- Edit habit/task
- Confirmations (delete, archive)

**Inline use cases (без modal):**
- Quick add task (inline input)
- Toggle habit completion
- Log mood (на Today view)

**Sheet use cases (mobile):**
- Date picker (calendar)
- Habit detail (full screen)
- Settings panels

---

### 7.4 Navigation

#### Desktop:
```
┌────────────────────────────────────┐
│ Logo  Today Week Month Analytics  │ (Top nav)
│                         Settings ⚙️ │
├────────────────────────────────────┤
│                                     │
│         [Main content]              │
│                                     │
└────────────────────────────────────┘
```

#### Mobile:
```
┌────────────────────┐
│ [Main content]     │
│                    │
│                    │
└────────────────────┘
│ Today  Analytics  │ (Bottom nav)
│ Week   Settings   │
└────────────────────┘
```

**Bottom nav items (mobile):**
- Today (home icon)
- Week (calendar icon)
- Analytics (chart icon)
- Settings (gear icon)

---

## 8. UI/UX Principles

### 8.1 Design Philosophy

**Core principles:**

1. **Clarity over Decoration**
  - Кожен елемент має призначення
  - Немає декоративних ілюстрацій
  - Типографія і spacing створюють hierarchy

2. **Information Density**
  - Desktop: high density (показати більше без scroll)
  - Mobile: lower density (touch targets, readability)
  - Balance: не overwhelming, але й не порожньо

3. **Speed**
  - Швидке завантаження
  - Instant feedback на actions
  - Оптимістичні оновлення (update UI before server confirms)

4. **Minimalism**
  - No gamification badges/rewards
  - Clean, professional interface
  - Neutral colors з акцентами для important actions

5. **Data-Centric**
  - Charts і візуалізації — primary content
  - Numbers prominent
  - Insights clear і actionable

---

### 8.2 Visual Design

**Color Palette:**
```
Primary:   #2563EB (blue) — для actions
Success:   #10B981 (green) — completed states
Warning:   #F59E0B (amber) — warnings, overdue
Error:     #EF4444 (red) — errors, critical
Neutral:   #6B7280 (gray) — text, borders

Mood colors:
1 (😫):    #EF4444 (red)
2 (😕):    #F59E0B (orange)
3 (😐):    #6B7280 (gray)
4 (🙂):    #10B981 (green)
5 (😄):    #10B981 (bright green)
```

**Typography:**
- Primary: Inter (system fallback: -apple-system, sans-serif)
- Headers: 600 weight
- Body: 400 weight
- Mono: JetBrains Mono (для stats, numbers)

**Spacing:**
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Consistent padding/margin

**Components:**
- shadcn/ui (Tailwind-based)
- Customized tokens для brand
- Accessibility: WCAG AA compliant

---

### 8.3 Responsive Strategy

**Breakpoints:**
```
sm:  640px  (large phone)
md:  768px  (tablet)
lg:  1024px (laptop)
xl:  1280px (desktop)
2xl: 1536px (large desktop)
```

**Layout adaptations:**

**Mobile (< 768px):**
- Single column
- Bottom navigation
- Collapsible sections
- Full-width cards
- Bottom sheets for actions

**Tablet (768-1024px):**
- Two columns where appropriate
- Side navigation
- Modals for actions
- Grid layouts для charts

**Desktop (> 1024px):**
- Multi-column layouts
- Sidebar navigation
- Dense information display
- Hover states prominent
- Keyboard shortcuts

---

### 8.4 Interaction Patterns

**Habit Completion:**
- Tap checkbox → instant visual feedback
- Checkmark animation
- Streak counter updates
- Optional confetti на milestone (post-MVP)

**Task Completion:**
- Strikethrough animation
- Move to completed section
- Completion sound (optional, user pref)

**Mood Logging:**
- Emoji scale з hover states (desktop)
- Pressed state (mobile)
- Optional haptic feedback (mobile)

**Data Entry:**
- Auto-save (no explicit "Save" button)
- Inline editing where possible
- Undo toast для accidental changes

---

## 9. Technical Architecture

### 9.1 Next.js Structure

**Folder structure:**
```
/app
  /(public)
    /layout.tsx
    /page.tsx (landing)
    /about/page.tsx
  /(auth)
    /login/page.tsx
    /signup/page.tsx
  /(app)
    /layout.tsx (app shell з auth check)
    /today/page.tsx
    /week/page.tsx
    /habits
      /page.tsx (list)
      /[id]/page.tsx (detail)
    /analytics
      /page.tsx
      /habits/page.tsx
      /correlations/page.tsx
    /settings/page.tsx

/components
  /ui (shadcn components)
  /habits
    /habit-card.tsx
    /habit-list.tsx
    /habit-form.tsx
  /tasks
    /task-item.tsx
    /task-list.tsx
  /charts
    /heatmap.tsx
    /line-chart.tsx
    /correlation-scatter.tsx
  /layout
    /nav.tsx
    /header.tsx

/lib
  /supabase
    /client.ts (browser client)
    /server.ts (server client)
  /queries
    /habits.ts
    /tasks.ts
    /analytics.ts
  /actions (Server Actions)
    /habits.ts
    /tasks.ts
    /mood.ts
  /utils
    /date.ts
    /stats.ts
    /format.ts

/types
  /database.ts (generated from Supabase)
  /app.ts (app-specific types)
```

---

### 9.2 Server Actions

**Philosophy:** Використовуємо Server Actions замість API routes для mutations.

**Example: Log habit**
```typescript
// /lib/actions/habits.ts
'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logHabit({
  habitId,
  date,
  completed,
  value
}: {
  habitId: string
  date: string
  completed?: boolean
  value?: number
}) {
  const supabase = createServerClient()
  
  // Get user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  
  // Ensure day exists
  const { data: day } = await supabase.rpc('ensure_day_exists', {
    p_user_id: user.id,
    p_date: date
  })
  
  // Upsert habit log
  const { error } = await supabase
    .from('habit_logs')
    .upsert({
      user_id: user.id,
      habit_id: habitId,
      day_id: day,
      completed: completed ?? true,
      value,
      logged_at: new Date().toISOString()
    }, {
      onConflict: 'habit_id,day_id'
    })
  
  if (error) throw error
  
  // Revalidate pages
  revalidatePath('/app/today')
  revalidatePath(`/app/habits/${habitId}`)
  
  return { success: true }
}
```

**Переваги:**
- Type-safe
- Automatic serialization
- Built-in revalidation
- Simplified error handling

---

### 9.3 Data Fetching

**Server Components (default):**
```typescript
// /app/(app)/today/page.tsx
import { createServerClient } from '@/lib/supabase/server'
import { getTodayData } from '@/lib/queries/today'

export default async function TodayPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const todayData = await getTodayData(supabase, user.id)
  
  return <TodayView data={todayData} />
}
```

**Client Components (для interactivity):**
```typescript
'use client'

import { useOptimistic } from 'react'
import { logHabit } from '@/lib/actions/habits'

export function HabitCheckbox({ habit, initialCompleted }) {
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    initialCompleted,
    (state, newState) => newState
  )
  
  async function handleToggle() {
    setOptimisticCompleted(!optimisticCompleted)
    await logHabit({
      habitId: habit.id,
      date: new Date().toISOString().split('T')[0],
      completed: !optimisticCompleted
    })
  }
  
  return (
    <input
      type="checkbox"
      checked={optimisticCompleted}
      onChange={handleToggle}
    />
  )
}
```

---

### 9.4 Caching Strategy

**Next.js caching layers:**

1. **Full Route Cache** (Server Components)
  - Automatically cached
  - Revalidated через `revalidatePath()`

2. **Data Cache** (fetch)
  - Not used (Supabase client doesn't use fetch)

3. **Router Cache** (Client-side)
  - Automatic, 30s default

**Supabase-specific:**
- RLS ensures data isolation
- No additional caching layer needed
- Database indexes для performance

**Cache invalidation:**
```typescript
// After mutation
revalidatePath('/app/today')
revalidatePath('/app/habits/[id]', 'page')
```

---

### 9.5 Real-time (Post-MVP)

**Use case:** Multi-device sync

```typescript
// Setup realtime subscription
const channel = supabase
  .channel('habit_logs_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'habit_logs',
      filter: `user_id=eq.${user.id}`
    },
    (payload) => {
      // Update UI
      router.refresh()
    }
  )
  .subscribe()
```

**Не в MVP** (complexity vs value на старті низька).

---

### 9.6 Background Jobs

**Use cases:**
- Soft delete cleanup (users, tasks після 14 днів)
- Daily reminders (push notifications, post-MVP)
- Analytics pre-computation (materialized views)

**Implementation:**
- Supabase Edge Functions (Deno)
- Cron triggers через pg_cron

**Example: Cleanup soft deleted users**
```sql
-- Supabase cron job
SELECT cron.schedule(
  'cleanup-soft-deleted-users',
  '0 2 * * *', -- 2 AM daily
  $$
  DELETE FROM users
  WHERE deleted_at < NOW() - INTERVAL '14 days';
  $$
);
```

---

## 10. Security & Privacy

### 10.1 Authentication

**Supabase Auth:**
- Email + password
- Magic links (post-MVP)
- OAuth (Google, Apple, post-MVP)

**Session management:**
- HTTP-only cookies
- Automatic token refresh
- Server-side session validation

**Password requirements:**
- Min 8 characters
- No complexity requirements (research shows they don't help)

---

### 10.2 Data Isolation

**RLS policies:**
- Кожен користувач бачить ТІЛЬКИ свої дані
- `auth.uid() = user_id` на всіх таблицях
- Foreign keys забезпечують consistency

**Testing:**
```sql
-- As user A
SELECT * FROM habits; -- Returns only user A's habits

-- Try to insert for user B (fails)
INSERT INTO habits (user_id, name) 
VALUES ('user-b-uuid', 'Hack'); -- RLS blocks this
```

---

### 10.3 Data Deletion

**Soft delete:**
- `deleted_at` timestamp
- Data залишається 14 днів (grace period)
- Можна відновити
- Background job видаляє after grace period

**Hard delete:**
- Cascade delete через foreign keys
- Users → Days → HabitLogs, MoodEntries, etc.
- No orphaned data

**GDPR compliance:**
- Export data (CSV)
- Delete account (right to be forgotten)
- Data portability

---

### 10.4 Privacy

**Principles:**
- Всі дані користувача приватні за замовчуванням
- Немає публічних профілів в MVP
- Немає tracking cookies (окрім auth session)
- Немає third-party analytics (Plausible post-MVP, privacy-first)

---

## 11. MVP Scope

### 11.1 Що ВХОДИТЬ в MVP

**Core Features:**
✅ Habit tracking (binary + numeric)
✅ Task management (basic)
✅ Mood logging (5-point scale)
✅ Daily journal (text only)
✅ Today/Week/Month views
✅ Habit analytics:
  - Streaks
  - Completion rates
  - Calendar heatmaps
  - Day-of-week analysis
✅ Mood analytics:
  - Trends
  - Distribution
✅ Correlations:
  - Mood vs habits completed
  - Mood vs specific habit
  - Mood vs tasks completed
✅ Data export (CSV)
✅ Responsive design (mobile + desktop)
✅ Auth (email/password)
✅ Settings (basic)

---

### 11.2 Що ВИКЛЮЧЕНО з MVP

**Виключено, але заплановано:**
❌ Time tracking для tasks
❌ Підзадачі
❌ Tags/categories
❌ Custom mood scales
❌ Multiple mood entries per day
❌ Journal templates
❌ Photos в journal
❌ Reminders/notifications
❌ PWA / offline mode
❌ Realtime sync
❌ Teams/shared spaces
❌ Public profiles
❌ OAuth providers
❌ AI analytics
❌ Predictive insights
❌ Custom habits templates library
❌ Integrations (Google Calendar, Strava, etc.)
❌ Mobile apps (native)
❌ Dark mode (в MVP тільки light, dark легко додати через Tailwind)

---

### 11.3 Чому саме такий scope

**Включили:**
- **Habit tracking**: core value proposition
- **Mood + correlations**: диференціатор від конкурентів
- **Analytics**: те що користувачі хочуть, але нігде немає добре
- **Multi-view (day/week/month)**: різні use cases потребують різних perspectives

**Виключили:**
- **Time tracking**: додає complexity, мало хто використовує стабільно
- **Tags**: nice-to-have, але не критично для MVP
- **Notifications**: потребують infrastructure (push server), можна later
- **PWA**: додаткова complexity, web app достатньо для валідації
- **Teams**: B2C спочатку, B2B може бути pivot пізніше
- **AI**: дорого, потребує багато даних, краще після product-market fit

**Стратегія:**
1. Зробити Core Loop ідеально (track → analyze → insight)
2. Validate product-market fit
3. Iterate на основі feedback
4. Додавати features які користувачі реально просять

---

## 12. Future Extensions

### 12.1 Short-term (Post-MVP, 3-6 місяців)

**Priorities:**
1. **Notifications & Reminders**
  - Push notifications (PWA)
  - Email reminders
  - Custom reminder times per habit

2. **Enhanced Analytics**
  - Custom date ranges
  - Export charts as images
  - More correlation types

3. **Templates**
  - Habit templates library
  - Journal templates
  - Quick setup flows

4. **Tags & Categories**
  - Organize habits/tasks
  - Filter by tag
  - Tag-based analytics

5. **Dark Mode**
  - Заплановано в Tailwind, легко увімкнути

---

### 12.2 Medium-term (6-12 місяців)

**If product-market fit validated:**

1. **Mobile Apps (Native)**
  - React Native або Flutter
  - Better mobile experience
  - Offline-first
  - Native notifications

2. **Time Tracking**
  - Pomodoro timer
  - Time per task
  - Time analytics

3. **Advanced Task Management**
  - Підзадачі
  - Dependencies
  - Recurring tasks automation
  - Projects/areas

4. **Social Features (Optional)**
  - Public profiles (opt-in)
  - Share habits/streaks
  - Accountability partners
  - Leaderboards (optional, non-gamified)

5. **AI Features**
  - Pattern detection: "You skip workout when stressed"
  - Predictive insights: "Based on your data, you'll likely skip tomorrow"
  - Recommendations: "Try meditation before sleep"
  - NLP для journal: auto-extract tags, sentiment

---

### 12.3 Long-term (12+ місяців)

**Strategic directions:**

1. **Teams & Collaboration**
  - Team habits (workout group)
  - Shared goals
  - Team analytics
  - B2B pivot (corporate wellness)

2. **Integrations**
  - Google Calendar sync
  - Fitness apps (Strava, Apple Health)
  - Task managers import (Todoist, Things)
  - Zapier/Make for automation

3. **Advanced Analytics Platform**
  - Custom dashboards
  - SQL query builder для power users
  - API access
  - Data science tools integration

4. **Health & Wellness Focus**
  - Sleep tracking integration
  - Nutrition logging
  - Mental health metrics
  - Therapy/coaching integrations

5. **Marketplace**
  - Habit template marketplace
  - Custom analytics packages
  - Third-party plugins

---

## 13. Development Roadmap

### Phase 1: Foundation (Weeks 1-2)

**Week 1:**
- Database schema setup
- Supabase project configuration
- RLS policies
- SQL functions/triggers
- Auth flows (signup/login)

**Week 2:**
- Next.js project setup
- UI component library (shadcn/ui)
- Basic layouts
- Navigation
- Settings page

---

### Phase 2: Core Features (Weeks 3-6)

**Week 3:**
- Habit CRUD
- Habit logging (today view)
- Day auto-creation logic

**Week 4:**
- Task CRUD
- Task completion
- Task list views

**Week 5:**
- Mood logging
- Journal entries
- Week view

**Week 6:**
- Month view
- Basic statistics
- Testing & bug fixes

---

### Phase 3: Analytics (Weeks 7-9)

**Week 7:**
- Habit analytics (streaks, heatmaps)
- SQL optimization для analytics queries

**Week 8:**
- Mood analytics (trends, distribution)
- Correlation engine

**Week 9:**
- Analytics dashboards
- Data export
- Performance optimization

---

### Phase 4: Polish (Weeks 10-12)

**Week 10:**
- Mobile responsive refinement
- UX improvements
- Loading states, error handling

**Week 11:**
- User onboarding flow
- Empty states
- Help documentation

**Week 12:**
- Beta testing
- Bug fixes
- Performance testing
- Launch preparation

---

## 14. Success Metrics

### Product Metrics

**Engagement:**
- DAU/MAU ratio (target: >40%)
- Days tracked per week (target: >5)
- Retention (D7: >40%, D30: >20%)

**Usage:**
- Avg habits per user (target: 5-8)
- Avg tasks per day (target: 3-6)
- Mood logging rate (target: >70% of days)
- Journal entries (target: >40% of days)

**Quality:**
- Correlation insights viewed (target: >60% users/month)
- Analytics page visits (target: >3/week active user)
- Data export usage (target: >10% users ever)

---

### Technical Metrics

**Performance:**
- Page load time < 1s (p95)
- Time to interactive < 2s
- Core Web Vitals: all green

**Reliability:**
- Uptime > 99.9%
- Error rate < 0.1%
- Data loss: 0

---

## 15. Висновки

### Ключові рішення

1. **Supabase як backend**: прискорює розробку, надійний, scalable
2. **Next.js App Router**: modern, Server Components = менше JS на клієнті
3. **Analytics-first**: диференціатор, core value
4. **Mobile-first**: більшість tracking з телефону
5. **No gamification**: focus на реальні insights, не artificial motivation
6. **Correlations engine**: унікальна фіча що дає actionable insights

### Ризики та Mitigation

**Ризик 1: Користувачі не будуть трекати стабільно**
- Mitigation: Зробити трекінг максимально швидким (<30 sec/day)
- Reminders (post-MVP)
- Show value early (insights після тижня)

**Ризик 2: Analytics занадто складна**
- Mitigation: Progressive disclosure (simple view по-дефолту, advanced optional)
- Clear explanations
- Use cases driven UI

**Ризик 3: Performance з великими датасетами**
- Mitigation: Proper indexing
- Pagination
- Aggregated views
- Archive old data (soft)

### Next Steps

1. ✅ Документація готова
2. → Database migrations (Phase 1)
3. → Core UI components
4. → Habit tracking MVP
5. → Analytics engine
6. → Beta launch

---

**Документ готовий для імплементації.**
**Всі технічні рішення обґрунтовані.**
**Scope чіткий та realistic для MVP.**
