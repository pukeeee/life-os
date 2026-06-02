/**
 * View-моделі сутності «ціль» для фронтенду. Свідомо НЕ імпортуємо доменні
 * типи із `src/server` — клієнт лишається відокремленим. Форма збігається з DTO,
 * що повертають Server Actions (структурна сумісність).
 */
export const GOAL_LEVELS_VM = ["life", "year", "quarter", "month", "week"] as const;
export type GoalLevelVM = (typeof GOAL_LEVELS_VM)[number];

export interface GoalVM {
  goalId: string;
  parentId: string | null;
  level: GoalLevelVM;
  title: string;
  targetDate: string | null;
  progress: number;
  archived: boolean;
  createdAt: string;
}

export interface GoalTreeVM extends GoalVM {
  children: GoalTreeVM[];
}
