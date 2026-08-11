"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { componentCategories, componentRegistry } from "@/lib/component-registry";

export function ExplorerNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-5 text-sm">
      {componentCategories.map((category) => (
        <div key={category} className="flex flex-col gap-1">
          <span className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {category}
          </span>
          {componentRegistry
            .filter((c) => c.category === category)
            .map((c) => {
              const href = `/explorer/${c.slug}`;
              const active = pathname === href;
              return (
                <Link
                  key={c.slug}
                  href={href}
                  className={cn(
                    "rounded-md px-2 py-1 transition-colors",
                    active
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover-only:hover:bg-secondary/50 hover-only:hover:text-foreground"
                  )}
                >
                  {c.name}
                </Link>
              );
            })}
        </div>
      ))}
    </nav>
  );
}
