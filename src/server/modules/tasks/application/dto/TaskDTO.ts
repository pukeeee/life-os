import type { PriorityValue } from "../../domain/Priority";

export interface TaskDTO {
  taskId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: PriorityValue | null;
  completed: boolean;
  createdAt: string;
}
