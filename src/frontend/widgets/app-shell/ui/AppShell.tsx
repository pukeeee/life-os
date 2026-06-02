import type { ReactNode } from "react";
import { Nav } from "./Nav";

/**
 * Каркас застосунку: навігація + контент. На мобільному навігація знизу
 * (flex-col-reverse), на desktop — бокова панель ліворуч.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col-reverse md:flex-row">
      <Nav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
