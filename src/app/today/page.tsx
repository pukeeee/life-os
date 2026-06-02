import { TodayView } from "@views/today";

// Тонка точка входу маршруту: уся логіка/композиція — у FSD-шарі `views`.
export default function TodayPage() {
  return <TodayView />;
}
