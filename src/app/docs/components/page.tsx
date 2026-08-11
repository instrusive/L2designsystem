import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { componentCategories, componentRegistry } from "@/lib/component-registry";

export default function ComponentsPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Components</h1>
      <p>
        {componentRegistry.length} components across {componentCategories.length}{" "}
        categories. Click through to <Link href="/explorer">the explorer</Link> for an
        isolated live view, or open the source path directly.
      </p>

      {componentCategories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {componentRegistry
              .filter((c) => c.category === category)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/explorer/${c.slug}`}
                  className="rounded-lg border border-border bg-card p-3 no-underline transition-colors hover-only:hover:border-foreground/30"
                >
                  <div className="text-sm font-medium text-foreground">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.description}</div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </Prose>
  );
}
