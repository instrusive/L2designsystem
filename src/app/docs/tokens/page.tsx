import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

function Swatch({
  name,
  className,
  textClassName = "text-white",
}: {
  name: string;
  className: string;
  textClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex h-16 items-end rounded-lg border border-border p-2 text-xs",
          className,
          textClassName
        )}
      >
        Aa
      </div>
      <code className="text-xs text-muted-foreground">{name}</code>
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

export default function TokensPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Design tokens</h1>
      <p>
        Every color is defined once in OKLCH in <code>src/app/globals.css</code>, with a
        light and dark value, and consumed everywhere through a semantic Tailwind class
        (<code>bg-primary</code>, never a literal hex). Swatches below reflect the
        current theme — toggle light/dark in the header and they'll update.
      </p>

      <h2>Core surfaces</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Swatch name="background" className="bg-background" textClassName="text-foreground" />
        <Swatch name="card" className="bg-card" textClassName="text-card-foreground" />
        <Swatch name="secondary" className="bg-secondary" textClassName="text-secondary-foreground" />
        <Swatch name="muted" className="bg-muted" textClassName="text-muted-foreground" />
      </div>

      <h2>Accent</h2>
      <p>
        The portfolio's actual brand color — used for primary buttons, focus rings, and
        the "Default" badge. <code>--primary-text</code> is the same hue at a lightness
        safe to use directly as link/icon text (the solid-fill value fails contrast as
        text in dark mode).
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Swatch name="primary" className="bg-primary" />
        <Swatch
          name="primary-text (on card)"
          className="bg-card"
          textClassName="text-primary-text"
        />
      </div>

      <h2>Status colors</h2>
      <p>
        Each has a solid form (paired with white text, verified ≥4.5:1) and a{" "}
        <code>-foreground</code> form (that hue's text-safe lightness, for use directly
        on the page/card background — outline badges, alert icons, error text).
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Swatch name="success" className="bg-success" />
        <Swatch name="warning" className="bg-warning" />
        <Swatch name="info" className="bg-info" />
        <Swatch name="destructive" className="bg-destructive" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Swatch name="success-foreground" className="bg-card" textClassName="text-success-foreground" />
        <Swatch name="warning-foreground" className="bg-card" textClassName="text-warning-foreground" />
        <Swatch name="info-foreground" className="bg-card" textClassName="text-info-foreground" />
        <Swatch
          name="destructive-foreground"
          className="bg-card"
          textClassName="text-destructive-foreground"
        />
      </div>

      <h2>Radius</h2>
      <p>
        Base <code>--radius</code> is 0.25rem — deliberately subtle, near-sharp corners
        rather than the rounder scale most shadcn projects ship with.
      </p>
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
        <RadiusSwatch name="sm" className="rounded-sm" />
        <RadiusSwatch name="md" className="rounded-md" />
        <RadiusSwatch name="lg" className="rounded-lg" />
        <RadiusSwatch name="xl" className="rounded-xl" />
        <RadiusSwatch name="2xl" className="rounded-2xl" />
        <RadiusSwatch name="full (badges)" className="rounded-full" />
      </div>

      <h2>Fonts</h2>
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-sans text-lg">
            JetBrains Mono — the base UI font, used for everything except italic accents.
          </p>
          <code className="text-xs text-muted-foreground">--font-sans / --font-mono</code>
        </div>
        <div>
          <p className="font-serif text-lg italic">
            Instrument Serif — used sparingly, the way a portfolio italicizes its owner's
            name.
          </p>
          <code className="text-xs text-muted-foreground">--font-serif</code>
        </div>
      </div>

      <h2>Texture</h2>
      <p>
        A fixed, theme-aware dot-grain overlay (<code>body::before</code> in{" "}
        <code>globals.css</code>) gives the background a subtle paper feel. It's
        intentionally faint — don't expect it to be obvious in a screenshot.
      </p>

      <h2>Using tokens in your own components</h2>
      <CodeBlock label="tsx">
        {`// Good — resolves through the token, themes automatically
<div className="bg-card text-card-foreground border border-border" />

// Bad — breaks dark mode, bypasses the contrast verification above
<div style={{ background: "#f2efe8", color: "#0f0f0f" }} />`}
      </CodeBlock>
    </Prose>
  );
}
