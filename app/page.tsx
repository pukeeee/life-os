import { redirect } from "next/navigation";

// Коренева сторінка поки веде на Today (єдиний реалізований екран).
export default function Home() {
  redirect("/today");
}
