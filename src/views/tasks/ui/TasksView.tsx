import { getTasks, CreateTaskForm } from "@features/manage-tasks";
import { TaskList } from "@widgets/task-list";

/** Екран Tasks: швидке додавання + список задач секціями. */
export async function TasksView() {
  const tasks = await getTasks();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Задачі</h1>
        <p className="text-sm text-muted-foreground">Плануй і відмічай виконане.</p>
      </header>

      <div className="mb-6">
        <CreateTaskForm />
      </div>

      <TaskList tasks={tasks} />
    </main>
  );
}
