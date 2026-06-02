import { redirect } from "next/navigation";
import { BirthDateForm, getOnboardingState } from "@features/onboarding-profile";

export async function OnboardingView() {
  const { birthDate } = await getOnboardingState();
  if (birthDate) {
    // Юзер уже завершив онбординг — повертаємо на головну.
    redirect("/today");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-5 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Профіль</h1>
        <p className="text-sm text-muted-foreground">
          Щоб увімкнути сітку тижнів життя й часові цілі, потрібна твоя дата народження.
          Це єдине, що питаємо на старті.
        </p>
      </header>
      <BirthDateForm />
    </main>
  );
}
