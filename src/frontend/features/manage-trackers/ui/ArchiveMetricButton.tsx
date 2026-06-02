"use client";

import { useState, useTransition } from "react";
import { Archive, ArrowCounterClockwise } from "@phosphor-icons/react";
import { archiveMetricAction } from "../api/actions";

/** Кнопка архівування/розархівування метрики (історія не втрачається). */
export function ArchiveMetricButton({
  metricId,
  archived,
}: {
  metricId: string;
  archived: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function toggle() {
    setError(null);
    startTransition(async () => {
      const res = await archiveMetricAction(metricId, !archived);
      if (!res.ok) setError(res.error ?? "Помилка");
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      title={archived ? "Розархівувати" : "Архівувати"}
      aria-label={archived ? "Розархівувати" : "Архівувати"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
    >
      {archived ? <ArrowCounterClockwise size={16} /> : <Archive size={16} />}
      {error && <span className="sr-only">{error}</span>}
    </button>
  );
}
