"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { JournalMarkdown } from "@entities/journal";
import { upsertJournalAction } from "../api/actions";

const AUTOSAVE_DELAY_MS = 1500;

type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Редактор Markdown-щоденника з debounced autosave та превʼю.
 * Дата фіксується ззовні (зазвичай — `today` з resolveSession), тож редактор
 * не залежить від таймзони — це турбота сервера.
 */
export function JournalEditor({ date, initialContent }: { date: string; initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef(initialContent);

  useEffect(() => {
    if (content === lastSaved.current) return;
    setState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      startTransition(async () => {
        const res = await upsertJournalAction({ date, content });
        if (res.ok) {
          lastSaved.current = content;
          setState("saved");
          setError(null);
        } else {
          setState("error");
          setError(res.error ?? "Помилка збереження");
        }
      });
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [content, date]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex rounded-md border border-border bg-card p-0.5 text-xs">
          <ModeButton active={mode === "edit"} onClick={() => setMode("edit")} label="Редагувати" />
          <ModeButton active={mode === "preview"} onClick={() => setMode("preview")} label="Перегляд" />
        </div>
        <StatusBadge state={state} error={error} />
      </div>

      {mode === "edit" ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Що сьогодні було важливо?"
          className="min-h-48 w-full rounded-md border border-border bg-card p-3 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring"
        />
      ) : (
        <div className="min-h-48 rounded-md border border-border bg-card p-4">
          <JournalMarkdown content={content} />
        </div>
      )}
    </div>
  );
}

function ModeButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-sm bg-primary px-2 py-1 text-primary-foreground"
          : "rounded-sm px-2 py-1 text-muted-foreground hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}

function StatusBadge({ state, error }: { state: SaveState; error: string | null }) {
  if (state === "saving") return <span className="text-xs text-muted-foreground">Збереження…</span>;
  if (state === "saved") return <span className="text-xs text-muted-foreground">Збережено</span>;
  if (state === "error") return <span className="text-xs text-destructive">{error}</span>;
  return null;
}
