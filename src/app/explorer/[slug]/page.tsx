import { notFound } from "next/navigation";
import { componentRegistry } from "@/lib/component-registry";
import { DemoRenderer } from "@/components/explorer/demo-renderer";

export function generateStaticParams() {
  return componentRegistry.map((c) => ({ slug: c.slug }));
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
        <code className="mt-2 block text-xs text-muted-foreground">{entry.source}</code>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <DemoRenderer slug={slug} />
      </div>
    </div>
  );
}
