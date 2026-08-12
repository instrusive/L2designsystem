"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const globalLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/explorer", label: "Explorer" },
  { href: "/", label: "Showcase" },
];

function navLinkClass(active: boolean) {
  return cn(
    "rounded-r-md border-l-2 border-transparent px-2.5 py-1.5 transition-colors",
    active
      ? "border-l-primary-text font-medium text-foreground"
      : "text-muted-foreground hover-only:hover:bg-surface-hover hover-only:hover:text-foreground"
  );
}

// The one sidebar every page shares — Docs/Explorer/Showcase/GitHub always on
// top, with `children` for whatever section-specific sub-navigation belongs
// underneath (DocsNav's page groups, ExplorerNav's component groups, or the
// showcase's in-page section anchors).
export function SiteNav({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 text-sm">
      <div className="flex flex-col gap-1">
        {globalLinks.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={navLinkClass(active)}>
              {item.label}
            </Link>
          );
        })}
        <a
          href="https://github.com/instrusive/L2designsystem"
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClass(false)}
        >
          GitHub
        </a>
      </div>
      {children && (
        <>
          <div className="h-px bg-border" />
          {children}
        </>
      )}
    </nav>
  );
}
