"use client";

import { componentDemos } from "@/components/component-demos/demos";
import { ButtonPlayground } from "@/components/component-demos/playground-button";
import { BadgePlayground } from "@/components/component-demos/playground-badge";

export function DemoRenderer({ slug }: { slug: string }) {
  const Demo =
    slug === "button" ? ButtonPlayground : slug === "badge" ? BadgePlayground : componentDemos[slug];

  if (!Demo) {
    return <p className="text-sm text-muted-foreground">Demo coming soon.</p>;
  }

  return <Demo />;
}
