import type { Metadata } from "next";
import Link from "next/link";
import { componentRegistry } from "@/lib/component-registry";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Every component in this system, in isolation, several with live prop controls.",
};

export default function ExplorerIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Explorer</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Every component in this system, in isolation. Pick one from the sidebar, or
          start with Button and Badge — both have live prop controls.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/explorer/button"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium no-underline transition-colors hover-only:hover:border-foreground/30"
        >
          Button playground →
        </Link>
        <Link
          href="/explorer/badge"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium no-underline transition-colors hover-only:hover:border-foreground/30"
        >
          Badge playground →
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">
        {componentRegistry.length} components total — see the full list in the sidebar or{" "}
        <Link href="/docs/components" className="text-primary-text underline underline-offset-4">
          the docs reference
        </Link>
        .
      </p>
    </div>
  );
}
