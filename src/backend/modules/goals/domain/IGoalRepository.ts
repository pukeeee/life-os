import type { UniqueEntityID } from "@backend/shared/kernel";
import type { Goal } from "./Goal";
import type { GoalLevelValue } from "./GoalLevel";

export interface ListGoalsFilter {
  level?: GoalLevelValue;
  parentId?: string | null;
  includeArchived?: boolean;
}

/** Порт репозиторію цілей. */
export interface IGoalRepository {
  findById(id: UniqueEntityID): Promise<Goal | null>;
  listByUser(userId: UniqueEntityID, filter?: ListGoalsFilter): Promise<Goal[]>;
  save(goal: Goal): Promise<void>;
}
