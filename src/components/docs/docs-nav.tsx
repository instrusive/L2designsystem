"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { componentCategories, componentRegistry } from "@/lib/component-registry";

export interface DocsNavGroup {
  title: string;
  items: { href: string; label: string }[];
  subgroups?: { title: string; items: { href: string; label: string }[] }[];
}

export const docsNav: DocsNavGroup[] = [
  {
    title: "Getting started",
    items: [
      { href: "/", label: "Overview" },
      { href: "/installation", label: "Installation" },
      { href: "/principles", label: "Principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "/tokens", label: "Colors" },
      { href: "/typography", label: "Typography" },
      { href: "/iconography", label: "Iconography" },
      { href: "/spacing", label: "Spacing & radius" },
      { href: "/elevation", label: "Elevation" },
      { href: "/motion", label: "Motion" },
    ],
  },
  {
    title: "Components",
    items: [{ href: "/components", label: "All components" }],
    subgroups: componentCategories.map((category) => ({
      title: category,
      items: componentRegistry
        .filter((c) => c.category === category)
        .map((c) => ({ href: `/components/${c.slug}`, label: c.name })),
    })),
  },
  {
    title: "Guidelines",
    items: [{ href: "/accessibility", label: "Accessibility" }],
  },
  {
    title: "Reference",
    items: [
      { href: "/ai-usage", label: "Using with AI" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "rounded-r-md border-l-2 border-transparent px-2.5 py-1.5 transition-colors",
        active
          ? "border-l-primary-text font-medium text-foreground"
          : "text-muted-foreground hover-only:hover:bg-surface-hover hover-only:hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function DocsNav() {
  return (
    <div className="flex flex-col gap-6 text-sm">
      {docsNav.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <span className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {group.title}
          </span>
          {group.items.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          {group.subgroups?.map((subgroup) => (
            <div key={subgroup.title} className="mt-2 flex flex-col gap-1">
              <span className="px-2.5 text-xs text-muted-foreground/70">{subgroup.title}</span>
              {subgroup.items.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
