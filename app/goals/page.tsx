import { GoalsView } from "@views/goals";

export default async function GoalsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  return <GoalsView level={level} />;
}
