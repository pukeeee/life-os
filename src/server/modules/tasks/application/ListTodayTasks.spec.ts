import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@server/shared/kernel";
import {
  InMemoryTaskRepository,
  CreateTask,
  ListTodayTasks,
  SetTaskCompletion,
} from "@server/modules/tasks";

describe("ListTodayTasks", () => {
  const userId = new UniqueEntityID().toString();
  const today = "2026-06-02";
  const yesterday = "2026-06-01";
  const tomorrow = "2026-06-03";

  let repo: InMemoryTaskRepository;
  let createTask: CreateTask;
  let listToday: ListTodayTasks;
  let setCompletion: SetTaskCompletion;

  beforeEach(() => {
    repo = new InMemoryTaskRepository();
    createTask = new CreateTask(repo);
    listToday = new ListTodayTasks(repo);
    setCompletion = new SetTaskCompletion(repo);
  });

  it("включає прострочені, сьогоднішні; виключає майбутні, без дедлайну і виконані", async () => {
    const overdue = await createTask.execute({ userId, title: "Overdue", dueDate: yesterday });
    const todayTask = await createTask.execute({ userId, title: "Today", dueDate: today });
    await createTask.execute({ userId, title: "Tomorrow", dueDate: tomorrow });
    await createTask.execute({ userId, title: "No due" });
    const done = await createTask.execute({ userId, title: "Done", dueDate: today });
    await setCompletion.execute({ userId, taskId: done.getValue().taskId, completed: true });

    const list = (await listToday.execute({ userId, today })).getValue();

    expect(list.map((t) => t.title)).toEqual(["Overdue", "Today"]);
    expect(list[0].taskId).toBe(overdue.getValue().taskId);
    expect(list[1].taskId).toBe(todayTask.getValue().taskId);
  });

  it("прострочені перед сьогоднішніми, серед сьогоднішніх — за пріоритетом", async () => {
    await createTask.execute({ userId, title: "T-low", dueDate: today, priority: "low" });
    await createTask.execute({ userId, title: "T-high", dueDate: today, priority: "high" });
    await createTask.execute({ userId, title: "Overdue", dueDate: yesterday });

    const list = (await listToday.execute({ userId, today })).getValue();

    expect(list.map((t) => t.title)).toEqual(["Overdue", "T-high", "T-low"]);
  });

  it("повертає порожній список, коли немає підходящих задач", async () => {
    await createTask.execute({ userId, title: "Future", dueDate: tomorrow });
    await createTask.execute({ userId, title: "Backlog" });

    const list = (await listToday.execute({ userId, today })).getValue();
    expect(list).toEqual([]);
  });
});
