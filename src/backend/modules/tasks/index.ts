/** Публічний API bounded context-у Tasks. */

// Domain
export { Task } from "./domain/Task";
export { Priority, PRIORITIES } from "./domain/Priority";
export type { PriorityValue } from "./domain/Priority";
export type { ITaskRepository } from "./domain/ITaskRepository";

// Application
export { CreateTask } from "./application/use-cases/CreateTask";
export type { CreateTaskRequest, CreateTaskResponse } from "./application/use-cases/CreateTask";
export { ListTasks } from "./application/use-cases/ListTasks";
export type { ListTasksRequest } from "./application/use-cases/ListTasks";
export { ListTodayTasks } from "./application/use-cases/ListTodayTasks";
export type { ListTodayTasksRequest } from "./application/use-cases/ListTodayTasks";
export { SetTaskCompletion, TaskNotFoundError } from "./application/use-cases/SetTaskCompletion";
export type { SetTaskCompletionRequest } from "./application/use-cases/SetTaskCompletion";
export type { TaskDTO } from "./application/dto/TaskDTO";

// Infrastructure
export { InMemoryTaskRepository } from "./infrastructure/persistence/InMemoryTaskRepository";
export { DrizzleTaskRepository } from "./infrastructure/persistence/drizzle/DrizzleTaskRepository";
