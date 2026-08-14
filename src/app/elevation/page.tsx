import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Elevation",
  description: "Shadow means one thing: floating above the page. The flat-vs-floating rule, explained.",
};

export default function ElevationPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Elevation</h1>
      <p>
        This system uses shadow for exactly one purpose: telling you something is
        floating above the page, not sitting flat on it. That&apos;s a narrower rule than
        most shadcn projects follow, which shadow everything (cards, inputs, buttons) by
        default.
      </p>

      <h2>Flat, always</h2>
      <p>
        Static content surfaces never carry a shadow: Card, Table, Input, Tabs. They sit
        directly on the page background with a <code>border-border</code> hairline at
        most.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 text-sm text-card-foreground">
          Card: border only, no shadow
        </div>
        <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
          Input surface: border only, no shadow
        </div>
      </div>

      <h2>Floating, deliberately</h2>
      <p>
        Anything that appears <em>above</em> the page and can be dismissed (Dialog,
        Select, DropdownMenu, Combobox, Tooltip, Popover) keeps a real shadow. That
        mirrors the source portfolio, which reserves shadow for its chat composer bar
        rather than static content.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <div className="rounded-xl border border-border bg-card p-4 text-sm shadow-md">
          Dialog-style surface: shadow-md
        </div>
        <div className="rounded-lg border border-border bg-popover p-3 text-sm shadow-lg">
          Popover-style surface: shadow-lg
        </div>
      </div>

      <h2>Checking your own component</h2>
      <p>
        Before adding a shadow class, ask: can this thing be dismissed by clicking
        outside it, or does it render inline with the rest of the page? Inline → no
        shadow. Dismissible overlay → shadow is correct.
      </p>
      <CodeBlock label="tsx">
        {`// Static surface: flat
<div className="rounded-xl border border-border bg-card p-4" />

// Floating overlay (Dialog/Select/DropdownMenu/Tooltip/Popover): shadow is correct here
<div className="rounded-xl border border-border bg-card p-4 shadow-md" />`}
      </CodeBlock>
    </Prose>
  );
}
