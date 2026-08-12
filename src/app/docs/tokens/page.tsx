import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Colors",
  description: "Every color, defined once in OKLCH, verified against WCAG AA contrast.",
};

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

export default function TokensPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Colors</h1>
      <p>
        Every color is defined once in OKLCH in <code>src/app/globals.css</code>, with a
        light and dark value, and consumed everywhere through a semantic Tailwind class
        (<code>bg-primary</code>, never a literal hex). Swatches below reflect the
        current theme — toggle light/dark in the header and they&apos;ll update. For
        radius and font tokens, see <Link href="/docs/spacing">Spacing &amp; radius</Link>{" "}
        and <Link href="/docs/typography">Typography</Link>.
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
        The portfolio&apos;s actual brand color — used for primary buttons, focus rings, and
        the &quot;Default&quot; badge. <code>--primary-text</code> is the same hue at a lightness
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
        <code>-foreground</code> form (that hue&apos;s text-safe lightness, for use directly
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

      <h2>Texture</h2>
      <p>
        A fixed, theme-aware dot-grain overlay (<code>body::before</code> in{" "}
        <code>globals.css</code>) gives the background a subtle paper feel. It&apos;s
        intentionally faint — don&apos;t expect it to be obvious in a screenshot.
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
