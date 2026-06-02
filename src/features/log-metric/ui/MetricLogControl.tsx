"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Check, Minus, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { MetricVM } from "@entities/metric/model/types";
import { logMetricAction, type LogMetricInput } from "../api/actions";

/**
 * Універсальний контрол логування: рендерить відповідний інпут залежно від типу
 * метрики. Це фронтенд-дзеркало доменної універсальності — одна метрика, багато форм.
 * Уся валідація лишається на бекенді (домен), тут — лише захоплення введення.
 */
export function MetricLogControl({ metric }: { metric: MetricVM }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function submit(payload: Omit<LogMetricInput, "metricId">) {
    setError(null);
    startTransition(async () => {
      const res = await logMetricAction({ metricId: metric.metricId, ...payload });
      if (!res.ok) setError(res.error ?? "Помилка");
    });
  }

  return (
    <div className="flex flex-col gap-1.5" aria-busy={isPending}>
      <KindControl metric={metric} disabled={isPending} onSubmit={submit} />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

interface ControlProps {
  metric: MetricVM;
  disabled: boolean;
  onSubmit: (payload: Omit<LogMetricInput, "metricId">) => void;
}

function KindControl({ metric, disabled, onSubmit }: ControlProps) {
  switch (metric.kind) {
    case "boolean":
      return <BooleanControl metric={metric} disabled={disabled} onSubmit={onSubmit} />;
    case "count":
      return <CountControl metric={metric} disabled={disabled} onSubmit={onSubmit} />;
    case "scale":
    case "rating":
      return <ScaleControl metric={metric} disabled={disabled} onSubmit={onSubmit} />;
    case "choice":
      return <ChoiceControl metric={metric} disabled={disabled} onSubmit={onSubmit} />;
    case "text":
      return <TextControl metric={metric} disabled={disabled} onSubmit={onSubmit} />;
    case "number":
    case "duration":
    default:
      return <NumberControl metric={metric} disabled={disabled} onSubmit={onSubmit} />;
  }
}

function BooleanControl({ metric, disabled, onSubmit }: ControlProps) {
  const done = metric.value?.numeric === 1;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSubmit({ boolean: !done })}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-50",
        done ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card",
      )}
      aria-pressed={done}
      aria-label={done ? "Виконано" : "Позначити виконаним"}
    >
      <Check size={18} weight={done ? "bold" : "regular"} />
    </button>
  );
}

function CountControl({ metric, disabled, onSubmit }: ControlProps) {
  const current = metric.value?.numeric ?? 0;
  return (
    <div className="inline-flex items-center gap-3">
      <IconButton disabled={disabled || current <= 0} onClick={() => onSubmit({ number: current - 1 })} label="Зменшити">
        <Minus size={16} />
      </IconButton>
      <span className="min-w-10 text-center font-mono text-base tabular-nums">
        {current}
        {metric.unit ? <span className="ml-1 text-xs text-muted-foreground">{metric.unit}</span> : null}
      </span>
      <IconButton disabled={disabled} onClick={() => onSubmit({ number: current + 1 })} label="Збільшити">
        <Plus size={16} />
      </IconButton>
    </div>
  );
}

function ScaleControl({ metric, disabled, onSubmit }: ControlProps) {
  const min = metric.scaleMin ?? 1;
  const max = metric.scaleMax ?? 5;
  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const current = metric.value?.numeric ?? null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          disabled={disabled}
          onClick={() => onSubmit({ number: v })}
          className={cn(
            "h-8 w-8 rounded-md border text-sm font-medium transition-colors disabled:opacity-50",
            current === v
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-border bg-card hover:bg-accent",
          )}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

function ChoiceControl({ metric, disabled, onSubmit }: ControlProps) {
  const current = metric.value?.text ?? null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {(metric.choiceOptions ?? []).map((opt) => (
        <button
          key={opt}
          type="button"
          disabled={disabled}
          onClick={() => onSubmit({ text: opt })}
          className={cn(
            "rounded-full border px-3 py-1 text-sm transition-colors disabled:opacity-50",
            current === opt
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-border bg-card hover:bg-accent",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function NumberControl({ metric, disabled, onSubmit }: ControlProps) {
  const [value, setValue] = useState<string>(metric.value?.numeric?.toString() ?? "");
  return (
    <form
      className="inline-flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const n = Number(value);
        if (!Number.isFinite(n)) return;
        onSubmit({ number: n });
      }}
    >
      <input
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        className="h-9 w-24 rounded-md border border-border bg-card px-2 font-mono text-sm tabular-nums outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        placeholder="0"
      />
      {metric.unit ? <span className="text-xs text-muted-foreground">{metric.unit}</span> : null}
      <SaveButton disabled={disabled} />
    </form>
  );
}

function TextControl({ metric, disabled, onSubmit }: ControlProps) {
  const [value, setValue] = useState<string>(metric.value?.text ?? "");
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim().length === 0) return;
        onSubmit({ text: value });
      }}
    >
      <textarea
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        className="min-h-16 w-full rounded-md border border-border bg-card p-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        placeholder="Запис…"
      />
      <SaveButton disabled={disabled} />
    </form>
  );
}

function IconButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SaveButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      Зберегти
    </button>
  );
}
