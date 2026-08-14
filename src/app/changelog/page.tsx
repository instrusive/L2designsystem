import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's changed in this design system, grouped by theme.",
};

function Entry({ children }: { children: React.ReactNode }) {
  return <li className="mb-1.5">{children}</li>;
}

export default function ChangelogPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Changelog</h1>
      <p>
        A human-readable summary, grouped by theme rather than raw commit history. See{" "}
        <code>git log</code> for the exact commits.
      </p>

      <h2>Unreleased</h2>
      <ul>
        <Entry>
          Lightened <code>--background</code> and <code>--card</code> (light mode
          only, +0.02 OKLCH lightness) for an airier paper feel. Verified first: light
          mode gains contrast headroom across the board (text, borders, links, status
          colors), but dark mode&apos;s <code>--card</code> was already at its ceiling
          against <code>--border</code> — it can move at most 0.004 before that pairing
          drops under the 3:1 floor — so dark mode is untouched this round. See{" "}
          <Link href="/tokens">Colors</Link> for current values.
        </Entry>
        <Entry>
          Added Alert, Progress, Select, and Tabs to the Figma plugin&apos;s curated
          component set (11 &rarr; 15 components) — Select&apos;s trigger gained a
          trailing-icon slot the same way Button&apos;s leading one works. Along the way,
          fixed two real bugs found rebuilding against these: Checkbox/Card/Input/Textarea
          radii didn&apos;t match their real Tailwind classes (guessed instead of verified
          against source), and both individual components <em>and</em> the component set{" "}
          <code>combineAsVariants()</code> produces had <code>clipsContent</code> defaulting
          true, clipping borders.
        </Entry>
        <Entry>
          Reworked the Figma plugin&apos;s canvas layout — components now lay out left to
          right, one column per component type, each wrapped in a dashed purple rectangle
          so the boundary between types is obvious at a glance (previously stacked top to
          bottom with no visual grouping).
        </Entry>
        <Entry>
          Wired up the Figma plugin&apos;s Button component with a working{" "}
          <code>Icon</code> variant (<code>none</code> / <code>leading</code>) — places a
          real instance of the Icon component set inside the button, resized per{" "}
          <code>Size</code> and recolored to match each variant&apos;s text color.
        </Entry>
        <Entry>
          Added an <Link href="/architecture">Architecture</Link> page — a diagram of how
          the doc site, MCP server, and Figma plugin all read from the same source-of-truth
          files in <code>src/lib/</code>, plus the separate (dashed) diagnostic path used to
          debug a live Figma file over its REST API.
        </Entry>
        <Entry>
          Added a <Link href="/figma">Figma plugin</Link> (<code>figma-plugin/</code>) —
          code → Figma, turning this system&apos;s real tokens (colors, radius, spacing,
          typography) into Figma Variables and Text Styles with Light/Dark modes, a
          curated <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">Lucide</a>{" "}
          icon set built as real Figma vector nodes (same library <code>lucide-react</code>{" "}
          already provides to the real components), and a curated set of components
          (Button, Badge, Card, Avatar, Input, Textarea, Checkbox, Switch, Label,
          Separator, Kbd) as Figma component sets. Re-runnable: tokens stay in sync,
          existing icons/components are left untouched.
        </Entry>
        <Entry>
          Added a remote <Link href="/mcp">MCP server</Link> (<code>/api/mcp</code>) —
          components, design tokens, and curated guidance rules, queryable by an AI
          agent directly instead of reading through repo files.
        </Entry>
      </ul>

      <h2>2026-08-12</h2>
      <ul>
        <Entry>
          Removed the Showcase and Explorer sections entirely — this site is now
          documentation-only. Every docs page moved up a level (
          <code>/docs/typography</code> → <code>/typography</code>, and so on), the root
          URL is now the docs overview, and the sidebar is pinned to the true left edge
          of the page instead of sitting inside a centered container.
        </Entry>
        <Entry>
          Restored all 37 individual component pages Explorer used to own, now living at{" "}
          <code>/components/[slug]</code> under a new &quot;Components&quot; sidebar
          section (grouped by category) alongside Getting started/Foundations/Guidelines/
          Reference — recovered from git history rather than rewritten, so every live
          demo (Kanban drag-and-drop, the Button/Badge playgrounds, everything) still
          works exactly as before.
        </Entry>
        <Entry>
          Fixed category headings on <code>/components</code> (Primitives, Forms, etc.)
          rendering with zero spacing or heading weight — they were nested one level too
          deep to match <code>Prose</code>&apos;s <code>[&amp;&gt;h2]</code> selector.
        </Entry>
        <Entry>
          Added a <code>⌘K</code> search palette across every docs page, a mobile nav
          drawer, per-page SEO metadata, a copy button on code blocks, a branded 404
          page, an auto-generated table of contents, and loading skeletons.
        </Entry>
        <Entry>
          Unified navigation: one shared sidebar (Docs/Explorer/Showcase/GitHub) applied
          consistently everywhere, including Showcase — which previously had no way back
          to the rest of the site at all.
        </Entry>
      </ul>

      <h2>2026-08-11</h2>
      <ul>
        <Entry>
          Added six documentation pages under Foundations/Guidelines/Reference:{" "}
          <code>Typography</code>, <code>Iconography</code>, <code>Spacing &amp; radius</code>,{" "}
          <code>Elevation</code>, <code>Motion</code>, <code>Accessibility</code>,{" "}
          <code>Principles</code>, and this changelog — split out of the original single
          &quot;Design tokens&quot; page.
        </Entry>
        <Entry>
          <code>Button</code> gained an explicit leading/trailing icon convention (
          <code>data-icon=&quot;inline-start&quot;</code>/
          <code>&quot;inline-end&quot;</code>) with a live toggle in its Explorer
          playground — the CSS support existed already but nothing used it.
        </Entry>
        <Entry>
          Added <code>text-body-sm</code> (13px) as an opt-in compact body-copy size,
          alongside the existing 14px default.
        </Entry>
        <Entry>
          Fixed a site-wide WCAG contrast sweep: muted text, badge tint colors, and
          input/card borders were all measured against real rendered pixels (not
          eyeballed) and corrected where they fell short of 4.5:1/3:1.
        </Entry>
      </ul>

      <h2>2026-08-10</h2>
      <ul>
        <Entry>
          Added an <code>/explorer</code> gallery — every component gets an isolated demo
          page, several with live prop-control playgrounds.
        </Entry>
        <Entry>
          Added open-source basics (LICENSE, README, CONTRIBUTING) and the original{" "}
          <code>/docs</code> site.
        </Entry>
        <Entry>
          Expanded the component catalog: Tree, Kanban, Rating, Number Field, Phone
          Input, Sortable.
        </Entry>
        <Entry>
          Reskinned design tokens, fonts, and texture to match the madebylianna portfolio
          aesthetic (warm paper background, red-orange accent, JetBrains Mono + Instrument
          Serif, dot-grain texture), then matched component-level styling (Badge, Button,
          Card) to the same flat, outline-heavy language.
        </Entry>
        <Entry>
          Fixed WCAG contrast failures on status and accent colors — took several passes:
          an initial fix, then further desaturation and saturation-matching to the primary
          accent, then a final pass on remaining status-color text contrast plus a new{" "}
          <code>--primary-text</code> token.
        </Entry>
        <Entry>
          Tuned the radius scale down twice — first dialed back from too rounded, then
          reduced further to the current near-sharp default.
        </Entry>
        <Entry>
          Added ReUI filters/stepper/empty/toast; expanded the data table with more
          TanStack Table features.
        </Entry>
        <Entry>Initial ReUI design system setup on Next.js 16 + Tailwind CSS v4.</Entry>
      </ul>

      <h2>2026-08-05</h2>
      <ul>
        <Entry>Initial commit from Create Next App.</Entry>
      </ul>
    </Prose>
  );
}
