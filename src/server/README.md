# `src/server` — Backend (Clean Architecture + DDD)

Увесь серверний код. **Імпортується лише в серверному середовищі** (Server Actions,
Route Handlers, RSC). Ніколи не імпортується у клієнтські компоненти.

## Шари та напрямок залежностей

Залежності спрямовані **всередину** (Dependency Rule): зовнішні шари знають про
внутрішні, але не навпаки.

```
infrastructure  ──►  application  ──►  domain
   (адаптери)         (use cases)      (ядро)
        ▲                                  ▲
        └──────────  container  ───────────┘   (composition root зв'язує все)
```

- **domain/** — сутності, value objects, доменні події, інтерфейси репозиторіїв
  (порти). Чистий TypeScript, **нуль** залежностей від фреймворків, БД, HTTP.
- **application/** — use cases, що оркеструють домен через порти. Знають про
  інтерфейси, не про реалізації.
- **infrastructure/** — адаптери портів: Drizzle-репозиторії, Redis, мапери,
  dev-провайдери. Замінні без впливу на домен.
- **container/** — composition root: вибирає реалізації за `env` (memory|postgres)
  і збирає use cases. Єдине місце, де «склеюються» абстракції та реалізації.

## Bounded contexts (`modules/`)

Модульний моноліт. Кожен контекст автономний і спілкується з іншими лише через
свій публічний `index.ts`.

- `modules/identity` — користувач (наразі без Clerk, через dev-порт).
- `modules/tracking` — універсальний движок метрик (MetricDefinition + Entry + Day).

## Спільне ядро (`shared/kernel`)

Будівельні блоки DDD (Entity, AggregateRoot, ValueObject, Result, Guard,
DomainEvents). Імпорт лише через `@server/shared/kernel`.

## Правила

1. Домен не імпортує нічого з `application`/`infrastructure`.
2. Зовнішній світ викликає систему лише через use cases (не чіпає репозиторії напряму).
3. Помилки моделюються через `Result`, а не винятками (крім несподіваних — `UnexpectedError`).
4. Кожен агрегат зберігається своїм репозиторієм; крос-агрегатна узгодженість — через доменні події.
