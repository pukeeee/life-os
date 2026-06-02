import { getGoalsTree, CreateGoalForm } from "@features/manage-goals";
import { getOnboardingState } from "@features/onboarding-profile";
import { GoalsTree } from "@widgets/goals-tree";
import { GridOfLife } from "@widgets/grid-of-life";
import { LevelSegment } from "@widgets/level-segment";
import type { GoalLevelVM } from "@entities/goal";
import { GOAL_LEVELS_VM } from "@entities/goal";

const LEVELS: readonly GoalLevelVM[] = GOAL_LEVELS_VM;

function parseLevel(raw: string | undefined): GoalLevelVM | undefined {
  if (raw && (LEVELS as readonly string[]).includes(raw)) return raw as GoalLevelVM;
  return undefined;
}

export async function GoalsView({ level }: { level?: string }) {
  const filterLevel = parseLevel(level);
  const [{ birthDate }, tree] = await Promise.all([
    getOnboardingState(),
    getGoalsTree(filterLevel),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-10">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Цілі</h1>
          <p className="text-sm text-muted-foreground">Ієрархія: життя → рік → квартал → місяць → тиждень.</p>
        </div>
        <LevelSegment />
      </header>

      <GridOfLife birthDate={birthDate} />

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          {filterLevel ? `Рівень: ${filterLevel}` : "Усі рівні"}
        </h2>
        <GoalsTree tree={tree} />
        <CreateGoalForm defaultLevel={filterLevel ?? "year"} />
      </section>
    </main>
  );
}
