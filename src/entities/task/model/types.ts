export type TaskPriorityVM = "low" | "medium" | "high";

export interface TaskVM {
  taskId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: TaskPriorityVM | null;
  completed: boolean;
  createdAt: string;
}
