import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
} from "@backend/shared/kernel";
import type { IGoalRepository } from "../../domain/IGoalRepository";
import type { Goal } from "../../domain/Goal";
import type { GoalLevelValue } from "../../domain/GoalLevel";
import type { GoalTreeDTO } from "../dto/GoalDTO";

export interface ListGoalsTreeRequest {
  userId: string;
  level?: GoalLevelValue;
  includeArchived?: boolean;
}

type Response = Result<GoalTreeDTO[], UseCaseError>;

/**
 * Повертає цілі користувача у вигляді дерева (за parentId). Якщо вказаний `level`,
 * то коренями стають цілі з саме цим рівнем (з будь-яким parentId), а діти —
 * усі їхні нащадки.
 */
export class ListGoalsTree implements UseCase<ListGoalsTreeRequest, Response> {
  constructor(private readonly goals: IGoalRepository) {}

  public async execute(request: ListGoalsTreeRequest): Promise<Response> {
    try {
      const all = await this.goals.listByUser(new UniqueEntityID(request.userId), {
        includeArchived: request.includeArchived,
      });

      const byParent = new Map<string | null, Goal[]>();
      for (const goal of all) {
        const key = goal.parentId?.toString() ?? null;
        const list = byParent.get(key) ?? [];
        list.push(goal);
        byParent.set(key, list);
      }

      const roots = request.level
        ? all.filter((g) => g.level.value === request.level)
        : (byParent.get(null) ?? []);

      const tree = roots.map((root) => build(root, byParent));
      return Result.ok(tree);
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}

function build(goal: Goal, byParent: Map<string | null, Goal[]>): GoalTreeDTO {
  const children = byParent.get(goal.id.toString()) ?? [];
  return {
    goalId: goal.id.toString(),
    parentId: goal.parentId?.toString() ?? null,
    level: goal.level.value,
    title: goal.title,
    targetDate: goal.targetDate,
    progress: goal.progress,
    archived: goal.isArchived,
    createdAt: goal.createdAt.toISOString(),
    children: children.map((c) => build(c, byParent)),
  };
}
