"use client";

import { explorerDemos } from "@/components/explorer/demos";
import { ButtonPlayground } from "@/components/explorer/playground-button";
import { BadgePlayground } from "@/components/explorer/playground-badge";

export function DemoRenderer({ slug }: { slug: string }) {
  const Demo =
    slug === "button" ? ButtonPlayground : slug === "badge" ? BadgePlayground : explorerDemos[slug];

  if (!Demo) {
    return <p className="text-sm text-muted-foreground">Demo coming soon.</p>;
  }

  return <Demo />;
}
