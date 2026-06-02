import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@server/shared/kernel";
import {
  InMemoryTaskRepository,
  CreateTask,
  ListTasks,
  SetTaskCompletion,
} from "@server/modules/tasks";

describe("Tasks (use cases)", () => {
  const userId = new UniqueEntityID().toString();

  let repo: InMemoryTaskRepository;
  let createTask: CreateTask;
  let listTasks: ListTasks;
  let setCompletion: SetTaskCompletion;

  beforeEach(() => {
    repo = new InMemoryTaskRepository();
    createTask = new CreateTask(repo);
    listTasks = new ListTasks(repo);
    setCompletion = new SetTaskCompletion(repo);
  });

  it("створює задачу й повертає її у списку", async () => {
    const res = await createTask.execute({ userId, title: "Подзвонити лікарю", priority: "high" });
    expect(res.isSuccess).toBe(true);

    const list = (await listTasks.execute({ userId })).getValue();
    expect(list).toHaveLength(1);
    expect(list[0].title).toBe("Подзвонити лікарю");
    expect(list[0].priority).toBe("high");
    expect(list[0].completed).toBe(false);
  });

  it("завершення переміщує задачу в кінець (після відкритих)", async () => {
    const aId = (await createTask.execute({ userId, title: "A" })).getValue().taskId;
    await createTask.execute({ userId, title: "B" });

    await setCompletion.execute({ userId, taskId: aId, completed: true });

    const list = (await listTasks.execute({ userId })).getValue();
    expect(list[0].title).toBe("B"); // відкрита — перша
    expect(list[1].title).toBe("A"); // завершена — в кінці
    expect(list[1].completed).toBe(true);
  });

  it("відхиляє відмітку чужої задачі", async () => {
    const id = (await createTask.execute({ userId, title: "A" })).getValue().taskId;
    const res = await setCompletion.execute({
      userId: new UniqueEntityID().toString(),
      taskId: id,
      completed: true,
    });
    expect(res.isFailure).toBe(true);
  });

  it("відхиляє порожній заголовок", async () => {
    expect((await createTask.execute({ userId, title: "  " })).isFailure).toBe(true);
  });
});
