import { describe, it, expect, beforeEach } from "vitest";
import { UniqueEntityID } from "@server/shared/kernel";
import {
  InMemoryGoalRepository,
  CreateGoal,
  ListGoalsTree,
  UpdateGoalProgress,
  ArchiveGoal,
} from "@server/modules/goals";

describe("Goals (use cases)", () => {
  const userId = new UniqueEntityID().toString();

  let repo: InMemoryGoalRepository;
  let createGoal: CreateGoal;
  let listTree: ListGoalsTree;
  let updateProgress: UpdateGoalProgress;
  let archive: ArchiveGoal;

  beforeEach(() => {
    repo = new InMemoryGoalRepository();
    createGoal = new CreateGoal(repo);
    listTree = new ListGoalsTree(repo);
    updateProgress = new UpdateGoalProgress(repo);
    archive = new ArchiveGoal(repo);
  });

  it("створює root і дочірню, listTree повертає дерево", async () => {
    const root = (await createGoal.execute({ userId, level: "life", title: "Life mastery" })).getValue();
    const child = (
      await createGoal.execute({ userId, level: "year", title: "2026 — фокус", parentId: root.goalId })
    ).getValue();

    const tree = (await listTree.execute({ userId })).getValue();
    expect(tree).toHaveLength(1);
    expect(tree[0].goalId).toBe(root.goalId);
    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children[0].goalId).toBe(child.goalId);
  });

  it("updateProgress валідує діапазон 0..1", async () => {
    const { goalId } = (await createGoal.execute({ userId, level: "month", title: "M" })).getValue();

    expect((await updateProgress.execute({ userId, goalId, progress: 0.5 })).isSuccess).toBe(true);
    expect((await updateProgress.execute({ userId, goalId, progress: 1.5 })).isFailure).toBe(true);
    expect((await updateProgress.execute({ userId, goalId, progress: -0.1 })).isFailure).toBe(true);

    const tree = (await listTree.execute({ userId })).getValue();
    expect(tree[0].progress).toBeCloseTo(0.5);
  });

  it("archive ховає з дефолтного лістингу, includeArchived повертає", async () => {
    const { goalId } = (await createGoal.execute({ userId, level: "week", title: "W" })).getValue();
    await archive.execute({ userId, goalId, archived: true });

    expect((await listTree.execute({ userId })).getValue()).toHaveLength(0);
    expect((await listTree.execute({ userId, includeArchived: true })).getValue()).toHaveLength(1);

    await archive.execute({ userId, goalId, archived: false });
    expect((await listTree.execute({ userId })).getValue()).toHaveLength(1);
  });

  it("відхиляє невідомий рівень і порожній заголовок", async () => {
    expect((await createGoal.execute({ userId, level: "decade", title: "x" })).isFailure).toBe(true);
    expect((await createGoal.execute({ userId, level: "year", title: "  " })).isFailure).toBe(true);
  });

  it("фільтрує дерево за level — корені на заданому рівні", async () => {
    const root = (await createGoal.execute({ userId, level: "life", title: "Life" })).getValue();
    await createGoal.execute({ userId, level: "year", title: "Year A", parentId: root.goalId });
    await createGoal.execute({ userId, level: "year", title: "Year B" });

    const yearTree = (await listTree.execute({ userId, level: "year" })).getValue();
    expect(yearTree.map((g) => g.title).sort()).toEqual(["Year A", "Year B"]);
  });
});
