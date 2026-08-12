"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DocsNavGroup {
  title: string;
  items: { href: string; label: string }[];
}

export const docsNav: DocsNavGroup[] = [
  {
    title: "Getting started",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/principles", label: "Principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "/docs/tokens", label: "Colors" },
      { href: "/docs/typography", label: "Typography" },
      { href: "/docs/iconography", label: "Iconography" },
      { href: "/docs/spacing", label: "Spacing & radius" },
      { href: "/docs/elevation", label: "Elevation" },
      { href: "/docs/motion", label: "Motion" },
    ],
  },
  {
    title: "Guidelines",
    items: [{ href: "/docs/accessibility", label: "Accessibility" }],
  },
  {
    title: "Reference",
    items: [
      { href: "/docs/components", label: "Components" },
      { href: "/docs/ai-usage", label: "Using with AI" },
      { href: "/docs/changelog", label: "Changelog" },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 text-sm">
      {docsNav.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <span className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {group.title}
          </span>
          {group.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-r-md border-l-2 border-transparent px-2.5 py-1.5 transition-colors",
                  active
                    ? "border-l-primary-text font-medium text-foreground"
                    : "text-muted-foreground hover-only:hover:bg-surface-hover hover-only:hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
