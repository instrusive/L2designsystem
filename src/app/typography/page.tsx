import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Typography",
  description: "Font pairing, type scale, and weight rules — JetBrains Mono with a sparing serif accent.",
};

function ScaleRow({
  label,
  sample,
  className,
  tokens,
}: {
  label: string;
  sample: string;
  className: string;
  tokens: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-border py-4 first:pt-0 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <span className={className}>{sample}</span>
      <div className="flex shrink-0 items-baseline gap-3 text-xs text-muted-foreground">
        <span>{label}</span>
        <code>{tokens}</code>
      </div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Typography</h1>
      <p>
        Two fonts, used deliberately unevenly. JetBrains Mono carries essentially
        everything — headings, body copy, labels, code. Instrument Serif appears only as
        an italic accent, the way the source portfolio italicizes its owner&apos;s name. If
        you find yourself reaching for the serif for anything load-bearing (a button
        label, a data value), that&apos;s a sign it&apos;s being overused.
      </p>

      <h2>Typeface pairing</h2>
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-sans text-lg">
            JetBrains Mono — the base UI font, used for everything except italic accents.
          </p>
          <code className="text-xs text-muted-foreground">--font-sans / --font-mono</code>
        </div>
        <div>
          <p className="font-serif text-lg italic">
            Instrument Serif — used sparingly, the way a portfolio italicizes its owner&apos;s
            name.
          </p>
          <code className="text-xs text-muted-foreground">--font-serif</code>
        </div>
      </div>

      <h2>Type scale</h2>
      <p>
        These are the sizes actually in use across docs and the product, not a
        theoretical full scale. <code>Prose</code> (this page&apos;s wrapper) hardcodes the
        first three as its <code>h1</code>/<code>h2</code>/<code>h3</code> styles. Body
        text defaults to <code>text-sm</code> (14px) everywhere — <code>text-body-sm</code>{" "}
        (13px) is an opt-in step down for denser copy blocks (table cells, sidebars),
        not a replacement.
      </p>
      <div className="flex flex-col">
        <ScaleRow
          label="Page title"
          sample="Aa Typography"
          className="text-3xl font-semibold"
          tokens="text-3xl font-semibold"
        />
        <ScaleRow
          label="Section heading"
          sample="Aa Type scale"
          className="text-xl font-semibold"
          tokens="text-xl font-semibold"
        />
        <ScaleRow
          label="Subsection heading"
          sample="Aa Typeface pairing"
          className="text-base font-semibold"
          tokens="text-base font-semibold"
        />
        <ScaleRow
          label="Body"
          sample="Aa The quick brown fox"
          className="text-sm"
          tokens="text-sm"
        />
        <ScaleRow
          label="Body — compact"
          sample="Aa The quick brown fox"
          className="text-body-sm"
          tokens="text-body-sm"
        />
        <ScaleRow
          label="Small / caption"
          sample="Aa The quick brown fox"
          className="text-xs text-muted-foreground"
          tokens="text-xs"
        />
        <ScaleRow
          label="Accent (serif, italic)"
          sample="Aa Made with intention"
          className="font-serif text-lg italic"
          tokens="font-serif italic"
        />
      </div>

      <h2>Weight</h2>
      <p>
        Mostly two weights: regular for body copy, <code>font-semibold</code> for
        headings and emphasis. There is no medium-weight step in active use — reach for
        semibold rather than inventing an in-between.
      </p>

      <h2>Usage</h2>
      <CodeBlock label="tsx">
        {`// Heading — mono, semibold, sized by level
<h2 className="text-xl font-semibold">Section heading</h2>

// Body copy — mono, muted for secondary text
<p className="text-sm text-muted-foreground">Supporting copy.</p>

// Serif accent — italic, used sparingly, never for UI labels
<em className="font-serif text-[1.15em] italic">Design System</em>`}
      </CodeBlock>
    </Prose>
  );
}
