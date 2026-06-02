import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Goal } from "../../domain/Goal";
import type { IGoalRepository, ListGoalsFilter } from "../../domain/IGoalRepository";

export class InMemoryGoalRepository implements IGoalRepository {
  private readonly store = new Map<string, Goal>();

  public async findById(id: UniqueEntityID): Promise<Goal | null> {
    return this.store.get(id.toString()) ?? null;
  }

  public async listByUser(userId: UniqueEntityID, filter?: ListGoalsFilter): Promise<Goal[]> {
    return [...this.store.values()].filter((g) => {
      if (!g.userId.equals(userId)) return false;
      if (!filter?.includeArchived && g.isArchived) return false;
      if (filter?.level && g.level.value !== filter.level) return false;
      if (filter?.parentId !== undefined) {
        const expected = filter.parentId;
        const actual = g.parentId?.toString() ?? null;
        if (expected !== actual) return false;
      }
      return true;
    });
  }

  public async save(goal: Goal): Promise<void> {
    this.store.set(goal.id.toString(), goal);
  }
}
