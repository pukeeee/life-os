import type { GoalTreeVM } from "@entities/goal";
import { GoalCard } from "@entities/goal";
import { GoalActions } from "@features/manage-goals";

/**
 * Рекурсивний рендер дерева цілей. Дочірні цілі візуально зміщені вправо
 * через ліву рамку — мінімалістично і без зайвих залежностей.
 */
export function GoalsTree({ tree }: { tree: GoalTreeVM[] }) {
  if (tree.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Поки немає цілей. Додай першу нижче.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {tree.map((node) => (
        <Node key={node.goalId} node={node} depth={0} />
      ))}
    </div>
  );
}

function Node({ node, depth }: { node: GoalTreeVM; depth: number }) {
  return (
    <div className="flex flex-col gap-2" style={{ marginLeft: depth === 0 ? 0 : 16 }}>
      <GoalCard
        goal={node}
        actions={
          <GoalActions goalId={node.goalId} progress={node.progress} archived={node.archived} />
        }
      />
      {node.children.length > 0 && (
        <div className="flex flex-col gap-2 border-l border-border pl-3">
          {node.children.map((c) => (
            <Node key={c.goalId} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
