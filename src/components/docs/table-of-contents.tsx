"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    // Prose assigns ids to its h2s at render time (server-rendered, so
    // hydration matches) — this just discovers what's already there rather
    // than mutating anything, but the list itself still can't be known
    // before the DOM exists, same external-sync case as theme-toggle's
    // mount flag.
    const nodes = Array.from(main.querySelectorAll<HTMLHeadingElement>("h2[id]"));
    const found = nodes.map((node) => ({ id: node.id, text: node.textContent ?? "" }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(found);

    if (found.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length < 2) return null;

  return (
    <aside className="sticky top-10 hidden h-fit w-44 shrink-0 xl:block">
      <span className="mb-2 block px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </span>
      <nav className="flex flex-col gap-1 text-sm">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={cn(
              "rounded-md px-2 py-1 transition-colors",
              activeId === h.id
                ? "text-foreground font-medium"
                : "text-muted-foreground hover-only:hover:text-foreground"
            )}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
