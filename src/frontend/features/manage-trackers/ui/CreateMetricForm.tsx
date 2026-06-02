"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { CategoryVM, MetricKindValue } from "@entities/metric";
import { createMetricAction, type CreateMetricInput } from "../api/actions";

const KIND_OPTIONS: { value: MetricKindValue; label: string }[] = [
  { value: "boolean", label: "Звичка (так/ні)" },
  { value: "count", label: "Лічильник" },
  { value: "number", label: "Число" },
  { value: "scale", label: "Шкала" },
  { value: "duration", label: "Тривалість (хв)" },
  { value: "rating", label: "Оцінка" },
  { value: "choice", label: "Вибір" },
  { value: "text", label: "Нотатка" },
];

const NUMERIC_KINDS: MetricKindValue[] = ["count", "number", "duration", "scale", "rating"];
const WEEKDAYS = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

/**
 * Форма створення метрики будь-якого типу. Поля зʼявляються залежно від `kind`
 * (шкала → межі, вибір → опції, числові → одиниця/ціль). Уся валідація — на
 * бекенді (домен); тут лише збір даних і базове приведення типів.
 */
export function CreateMetricForm({ categories }: { categories: CategoryVM[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [kind, setKind] = useState<MetricKindValue>("boolean");
  const [categoryId, setCategoryId] = useState<string>("");
  const [icon, setIcon] = useState("");
  const [unit, setUnit] = useState("");
  const [scaleMin, setScaleMin] = useState("1");
  const [scaleMax, setScaleMax] = useState("5");
  const [choiceOptions, setChoiceOptions] = useState("");
  const [goalType, setGoalType] = useState("none");
  const [targetValue, setTargetValue] = useState("");
  const [cadenceType, setCadenceType] = useState("daily");
  const [activeDays, setActiveDays] = useState<number[]>([]);

  const isNumeric = NUMERIC_KINDS.includes(kind);
  const isScale = kind === "scale" || kind === "rating";

  function reset() {
    setName("");
    setKind("boolean");
    setCategoryId("");
    setIcon("");
    setUnit("");
    setScaleMin("1");
    setScaleMax("5");
    setChoiceOptions("");
    setGoalType("none");
    setTargetValue("");
    setCadenceType("daily");
    setActiveDays([]);
  }

  function toggleDay(d: number) {
    setActiveDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  function submit() {
    setError(null);
    const input: CreateMetricInput = {
      name: name.trim(),
      kind,
      categoryId: categoryId || null,
      icon: icon.trim() || null,
      unit: isNumeric && unit.trim() ? unit.trim() : null,
      scaleMin: isScale ? Number(scaleMin) : null,
      scaleMax: isScale ? Number(scaleMax) : null,
      choiceOptions:
        kind === "choice"
          ? choiceOptions
              .split(/[\n,]/)
              .map((s) => s.trim())
              .filter(Boolean)
          : null,
      goalType: isNumeric ? goalType : "none",
      targetValue: isNumeric && goalType !== "none" && targetValue !== "" ? Number(targetValue) : null,
      cadenceType,
      activeDays: cadenceType === "weekly" ? activeDays : null,
    };

    startTransition(async () => {
      const res = await createMetricAction(input);
      if (res.ok) {
        reset();
        setOpen(false);
      } else {
        setError(res.error ?? "Помилка");
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Plus size={16} weight="bold" /> Нова метрика
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Назва">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            className={inputCls}
            placeholder="Напр. Сон"
          />
        </Field>
        <Field label="Тип">
          <select value={kind} onChange={(e) => setKind(e.target.value as MetricKindValue)} className={inputCls}>
            {KIND_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        {isScale && (
          <>
            <Field label="Мінімум шкали">
              <input type="number" value={scaleMin} onChange={(e) => setScaleMin(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Максимум шкали">
              <input type="number" value={scaleMax} onChange={(e) => setScaleMax(e.target.value)} className={inputCls} />
            </Field>
          </>
        )}

        {kind === "choice" && (
          <Field label="Опції (через кому)" full>
            <input
              value={choiceOptions}
              onChange={(e) => setChoiceOptions(e.target.value)}
              className={inputCls}
              placeholder="низький, середній, високий"
            />
          </Field>
        )}

        {isNumeric && (
          <>
            <Field label="Одиниця">
              <input value={unit} onChange={(e) => setUnit(e.target.value)} className={inputCls} placeholder="км, склянок…" />
            </Field>
            <Field label="Ціль">
              <div className="flex gap-2">
                <select value={goalType} onChange={(e) => setGoalType(e.target.value)} className={cn(inputCls, "flex-1")}>
                  <option value="none">Без цілі</option>
                  <option value="at_least">Не менше</option>
                  <option value="at_most">Не більше</option>
                  <option value="exactly">Рівно</option>
                </select>
                {goalType !== "none" && (
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className={cn(inputCls, "w-24")}
                    placeholder="0"
                  />
                )}
              </div>
            </Field>
          </>
        )}

        <Field label="Іконка (emoji)">
          <input value={icon} onChange={(e) => setIcon(e.target.value)} className={inputCls} placeholder="🌙" />
        </Field>
        <Field label="Категорія">
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputCls}>
            <option value="">Без категорії</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Періодичність">
          <select value={cadenceType} onChange={(e) => setCadenceType(e.target.value)} className={inputCls}>
            <option value="daily">Щодня</option>
            <option value="weekly">Певні дні тижня</option>
          </select>
        </Field>
        {cadenceType === "weekly" && (
          <Field label="Дні" full>
            <div className="flex flex-wrap gap-1.5">
              {WEEKDAYS.map((label, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleDay(i)}
                  className={cn(
                    "h-8 w-10 rounded-md border text-xs transition-colors",
                    activeDays.includes(i)
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-accent",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending || name.trim().length === 0}
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Створити
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            setOpen(false);
          }}
          className="inline-flex h-9 items-center rounded-md px-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "h-9 w-full rounded-md border border-border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <label className={cn("flex flex-col gap-1.5", full && "sm:col-span-2")}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
