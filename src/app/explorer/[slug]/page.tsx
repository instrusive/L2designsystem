import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { componentRegistry } from "@/lib/component-registry";
import { DemoRenderer } from "@/components/explorer/demo-renderer";
import { CodeBlock } from "@/components/docs/code-block";

export function generateStaticParams() {
  return componentRegistry.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/explorer/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = componentRegistry.find((c) => c.slug === slug);
  if (!entry) return {};
  return { title: entry.name, description: entry.description };
}

function sourceToImportPath(source: string) {
  return "@/" + source.replace(/^src\//, "").replace(/\.tsx?$/, "");
}

export default async function ExplorerComponentPage(props: PageProps<"/explorer/[slug]">) {
  const { slug } = await props.params;
  const entry = componentRegistry.find((c) => c.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-xs text-muted-foreground">{entry.category}</div>
        <h1 className="text-2xl font-semibold">{entry.name}</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{entry.description}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <DemoRenderer slug={slug} />
      </div>

      <CodeBlock label="Import from">{sourceToImportPath(entry.source)}</CodeBlock>
    </div>
  );
}
