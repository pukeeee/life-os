"use client";

import { useState, useTransition } from "react";
import { Plus } from "@phosphor-icons/react";
import { createTaskAction } from "../api/actions";

const inputCls =
  "h-9 rounded-md border border-border bg-card px-2 text-sm outline-none focus:ring-2 focus:ring-ring";

/** Компактний рядок швидкого додавання задачі (назва + дедлайн + пріоритет). */
export function CreateTaskForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  function submit() {
    if (title.trim().length === 0) return;
    setError(null);
    startTransition(async () => {
      const res = await createTaskAction({
        title: title.trim(),
        dueDate: dueDate || null,
        priority: priority || null,
      });
      if (res.ok) {
        setTitle("");
        setDueDate("");
        setPriority("");
      } else {
        setError(res.error ?? "Помилка");
      }
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Нова задача…"
          className={`${inputCls} min-w-48 flex-1`}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={inputCls}
          aria-label="Дедлайн"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputCls} aria-label="Пріоритет">
          <option value="">Пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        <button
          type="submit"
          disabled={isPending || title.trim().length === 0}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Plus size={16} weight="bold" /> Додати
        </button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}
