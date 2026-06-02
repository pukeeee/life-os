import type { TaskVM } from "@entities/task";
import { TaskItem } from "@entities/task";
import { TaskCheckbox } from "@features/manage-tasks";

/**
 * Віджет списку задач: відкриті та виконані секціями. Композує сутність TaskItem
 * з фічею TaskCheckbox (через слот).
 */
export function TaskList({ tasks }: { tasks: TaskVM[] }) {
  const open = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  if (tasks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Немає задач. Додай першу вище.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Section title={`Активні · ${open.length}`} tasks={open} />
      {completed.length > 0 && <Section title={`Виконані · ${completed.length}`} tasks={completed} dim />}
    </div>
  );
}

function Section({ title, tasks, dim }: { title: string; tasks: TaskVM[]; dim?: boolean }) {
  if (tasks.length === 0) {
    return (
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">Порожньо.</p>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      <div className={dim ? "flex flex-col gap-2 opacity-60" : "flex flex-col gap-2"}>
        {tasks.map((task) => (
          <TaskItem
            key={task.taskId}
            task={task}
            checkbox={<TaskCheckbox taskId={task.taskId} completed={task.completed} />}
          />
        ))}
      </div>
    </section>
  );
}
