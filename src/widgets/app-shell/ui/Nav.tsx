"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CheckCircle,
  ListChecks,
  ChartLineUp,
  NotePencil,
  Target,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ITEMS: { href: string; label: string; icon: Icon }[] = [
  { href: "/today", label: "Сьогодні", icon: House },
  { href: "/tasks", label: "Задачі", icon: CheckCircle },
  { href: "/journal", label: "Журнал", icon: NotePencil },
  { href: "/goals", label: "Цілі", icon: Target },
  { href: "/trackers", label: "Трекери", icon: ListChecks },
  { href: "/insights", label: "Інсайти", icon: ChartLineUp },
];

/** Адаптивна навігація: бокова панель на desktop, нижній бар на мобільному. */
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-10 flex shrink-0 gap-1 border-t border-border bg-background/80 p-2 backdrop-blur md:top-0 md:h-screen md:w-56 md:flex-col md:border-r md:border-t-0 md:p-4">
      <div className="hidden px-2 py-3 font-heading text-lg font-semibold md:block">Life OS</div>
      {ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const ItemIcon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm transition-colors md:flex-none md:justify-start",
              active ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <ItemIcon size={20} weight={active ? "fill" : "regular"} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
