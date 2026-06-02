# `src/` — два чітко розділені світи

Щоб поєднати **Clean Architecture (бекенд)** і **Feature-Sliced Design (фронтенд)**
без плутанини, `src/` поділено за призначенням:

```
src/
  app/             ← Next.js App Router (тонкі route-файли, лише імпортують views)
  components/      ← shadcn-комплекти UI (button тощо)
  lib/             ← shadcn-утиліти (cn)
  backend/         ← Clean Architecture + DDD
  frontend/        ← Feature-Sliced Design
```

## 1. `src/backend/**` — бекенд (Clean Architecture + DDD)

Серверне ядро: bounded contexts, use cases, домен, інфраструктура, composition root.
**Імпортується лише в серверному коді** (use cases викликаються Server Actions
з `frontend/features/*/api`). Деталі — у `src/backend/README.md`.

Alias: `@backend/*`.

## 2. `src/frontend/**` — фронтенд (Feature-Sliced Design)

Залежності спрямовані лише **вниз** по шарах:

```
views  →  widgets  →  features  →  entities  →  shared
```

- **`shared/`** — переробне без бізнес-контексту (`ui/`, `server/session.ts` — місток
  до контейнера для Server Actions).
- **`entities/`** — бізнес-сутності для UI (картка метрики, її view-модель).
- **`features/`** — інтерактивні дії користувача (залогувати метрику) + їхні
  **Server Actions** (`api/`), що викликають use cases з `@backend/*`.
- **`widgets/`** — самодостатні композитні блоки (огляд доби).
- **`views/`** — складання сторінок зі шарів (FSD «pages», перейменовано, щоб не
  конфліктувати з роутингом Next).

Aliases: `@entities/*`, `@features/*`, `@widgets/*`, `@views/*`, `@shared/*`.

### `src/app/**` — маршрутизація Next.js

Тонкі route-файли, що імпортують відповідний `view`. Тут же глобальні
`layout.tsx`, `page.tsx`, `globals.css`.

### Межа фронтенд ↔ бекенд
Єдиний канал — **Server Actions** у `frontend/features/*/api`. Вони викликають
`getContainer()` з `@backend/container` і повертають **прості серіалізовні DTO**.
Клієнтські компоненти ніколи не імпортують доменні класи (лише type-only
view-моделі з `entities`).
