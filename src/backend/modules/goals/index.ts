/** Публічний API bounded context-у Goals. */

// Domain
export { Goal } from "./domain/Goal";
export { GoalLevel, GOAL_LEVELS } from "./domain/GoalLevel";
export type { GoalLevelValue } from "./domain/GoalLevel";
export type { IGoalRepository, ListGoalsFilter } from "./domain/IGoalRepository";

// Application
export { CreateGoal } from "./application/use-cases/CreateGoal";
export type { CreateGoalRequest, CreateGoalResponse } from "./application/use-cases/CreateGoal";
export { ListGoalsTree } from "./application/use-cases/ListGoalsTree";
export type { ListGoalsTreeRequest } from "./application/use-cases/ListGoalsTree";
export { UpdateGoalProgress, GoalNotFoundError } from "./application/use-cases/UpdateGoalProgress";
export type { UpdateGoalProgressRequest } from "./application/use-cases/UpdateGoalProgress";
export { ArchiveGoal } from "./application/use-cases/ArchiveGoal";
export type { ArchiveGoalRequest } from "./application/use-cases/ArchiveGoal";
export type { GoalDTO, GoalTreeDTO } from "./application/dto/GoalDTO";

// Infrastructure
export { InMemoryGoalRepository } from "./infrastructure/persistence/InMemoryGoalRepository";
export { DrizzleGoalRepository } from "./infrastructure/persistence/drizzle/DrizzleGoalRepository";
