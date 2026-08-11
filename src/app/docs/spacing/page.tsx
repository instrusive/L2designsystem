import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

function SpaceRow({ token, px }: { token: string; px: string }) {
  const size = Number(token.replace("gap-", ""));
  return (
    <div className="flex items-center gap-4 border-b border-border py-2.5 first:pt-0 last:border-b-0">
      <div className="w-16 shrink-0">
        <div className="h-3 bg-primary" style={{ width: `calc(var(--spacing) * ${size})` }} />
      </div>
      <code className="w-16 shrink-0 text-xs text-muted-foreground">{token}</code>
      <span className="text-xs text-muted-foreground">{px}</span>
    </div>
  );
}

function RadiusSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("size-16 border-2 border-primary bg-secondary", className)} />
      <code className="text-xs text-muted-foreground">{name}</code>
    </div>
  );
}

export default function SpacingPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Spacing &amp; radius</h1>
      <p>
        Spacing uses Tailwind&apos;s default scale unmodified — no custom{" "}
        <code>--spacing</code> override in <code>globals.css</code>. The values below are
        the ones actually in use across the component library, not the full scale.
      </p>

      <h2>Spacing in practice</h2>
      <div className="flex flex-col">
        <SpaceRow token="gap-1" px="4px — icon-to-label inside a control" />
        <SpaceRow token="gap-1.5" px="6px — tight clusters (badge + icon)" />
        <SpaceRow token="gap-2" px="8px — default control internal spacing" />
        <SpaceRow token="gap-3" px="12px — related field groups" />
        <SpaceRow token="gap-4" px="16px — default grid/flex spacing" />
        <SpaceRow token="gap-6" px="24px — section-level spacing" />
        <SpaceRow token="gap-8" px="32px — page-level layout blocks" />
      </div>
      <p>
        Padding follows the same steps: <code>p-3</code> for compact surfaces (menu
        items, table cells), <code>p-4</code>–<code>p-6</code> for cards and dialogs,{" "}
        <code>px-6 py-4</code> for the docs/explorer header. Reach for these before
        picking an arbitrary value.
      </p>

      <h2>Radius</h2>
      <p>
        Base <code>--radius</code> is 0.25rem — deliberately subtle, near-sharp corners
        rather than the rounder scale most shadcn projects ship with. Everything from{" "}
        <code>rounded-sm</code> through <code>rounded-2xl</code> is derived from this one
        token in <code>globals.css</code>. True pill shapes (Badge, Switch, Avatar,
        Stepper) don&apos;t come from this scale at all — they use{" "}
        <code>rounded-full</code> directly, so changing the base radius won&apos;t affect
        them.
      </p>
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
        <RadiusSwatch name="sm" className="rounded-sm" />
        <RadiusSwatch name="md" className="rounded-md" />
        <RadiusSwatch name="lg" className="rounded-lg" />
        <RadiusSwatch name="xl" className="rounded-xl" />
        <RadiusSwatch name="2xl" className="rounded-2xl" />
        <RadiusSwatch name="full" className="rounded-full" />
      </div>

      <h2>Using these tokens</h2>
      <CodeBlock label="tsx">
        {`// Good — steps on the shared scale
<div className="flex flex-col gap-4 rounded-lg p-4" />

// Bad — arbitrary values that don't line up with anything else on the page
<div className="flex flex-col gap-[13px] rounded-[7px] p-[18px]" />`}
      </CodeBlock>
    </Prose>
  );
}
