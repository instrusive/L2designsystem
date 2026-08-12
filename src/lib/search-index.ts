import { docsNav } from "@/components/docs/docs-nav";
import { componentRegistry } from "@/lib/component-registry";

export interface SearchEntry {
  title: string;
  subtitle: string;
  href: string;
  group: string;
}

export function getSearchIndex(): SearchEntry[] {
  const docsEntries: SearchEntry[] = docsNav.flatMap((group) =>
    group.items.map((item) => ({
      title: item.label,
      subtitle: group.title,
      href: item.href,
      group: "Docs",
    }))
  );

  const componentEntries: SearchEntry[] = componentRegistry.map((entry) => ({
    title: entry.name,
    subtitle: entry.category,
    href: `/explorer/${entry.slug}`,
    group: "Components",
  }));

  return [...docsEntries, ...componentEntries];
}
