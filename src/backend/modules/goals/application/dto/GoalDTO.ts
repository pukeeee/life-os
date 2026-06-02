import type { GoalLevelValue } from "../../domain/GoalLevel";

export interface GoalDTO {
  goalId: string;
  parentId: string | null;
  level: GoalLevelValue;
  title: string;
  targetDate: string | null;
  progress: number;
  archived: boolean;
  createdAt: string;
}

export interface GoalTreeDTO extends GoalDTO {
  children: GoalTreeDTO[];
}
