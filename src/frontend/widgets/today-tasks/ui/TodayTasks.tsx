import type { TaskVM } from "@entities/task";
import { TaskItem } from "@entities/task";
import { TaskCheckbox } from "@features/manage-tasks";

/**
 * Задачі для екрана Today: прострочені + сьогоднішні в одному списку.
 * Прострочені помічені пігулкою.
 */
export function TodayTasks({ tasks, today }: { tasks: TaskVM[]; today: string }) {
  if (tasks.length === 0) {
    return (
      <section className="flex flex-col gap-3">
        <Header count={0} />
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          На сьогодні задач немає.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <Header count={tasks.length} />
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div key={task.taskId} className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <TaskItem
                task={task}
                checkbox={<TaskCheckbox taskId={task.taskId} completed={task.completed} />}
              />
            </div>
            {task.dueDate && task.dueDate < today && <OverdueBadge />}
          </div>
        ))}
      </div>
    </section>
  );
}

function Header({ count }: { count: number }) {
  return (
    <header className="flex items-end justify-between">
      <h2 className="font-heading text-lg font-semibold tracking-tight">Задачі</h2>
      {count > 0 && (
        <span className="font-mono text-sm tabular-nums text-muted-foreground">{count}</span>
      )}
    </header>
  );
}

function OverdueBadge() {
  return (
    <span className="shrink-0 rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-medium text-destructive">
      Прострочено
    </span>
  );
}
