"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveBirthDateAction } from "../api/actions";

/** Форма онбордингу: дата народження → редирект на /today. */
export function BirthDateForm({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setError("Введіть дату у форматі YYYY-MM-DD.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await saveBirthDateAction(value);
      if (res.ok) router.push("/today");
      else setError(res.error ?? "Помилка");
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-muted-foreground">Дата народження</span>
        <input
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="h-10 rounded-md border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      {error && <span className="text-sm text-destructive">{error}</span>}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        Зберегти і продовжити
      </button>
    </form>
  );
}
