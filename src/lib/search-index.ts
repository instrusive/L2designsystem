import { docsNav } from "@/components/docs/docs-nav";

export interface SearchEntry {
  title: string;
  subtitle: string;
  href: string;
  group: string;
}

export function getSearchIndex(): SearchEntry[] {
  return docsNav.flatMap((group) => {
    const topLevel: SearchEntry[] = group.items.map((item) => ({
      title: item.label,
      subtitle: group.title,
      href: item.href,
      group: group.title === "Components" ? "Components" : "Docs",
    }));
    const nested: SearchEntry[] = (group.subgroups ?? []).flatMap((subgroup) =>
      subgroup.items.map((item) => ({
        title: item.label,
        subtitle: subgroup.title,
        href: item.href,
        group: "Components",
      }))
    );
    return [...topLevel, ...nested];
  });
}
