import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Figma Plugin",
  description: "A Figma plugin that turns this design system's real tokens and a curated component set into a Figma library.",
};

export default function FigmaPage() {
  return (
    <Prose className="max-w-3xl">
      <h1>Figma Plugin</h1>
      <p>
        This repo ships a Figma plugin that turns its real, current tokens and a curated
        set of components into a Figma library: <strong>code → Figma</strong>, not the
        reverse. It reads directly from{" "}
        <code>src/lib/design-tokens.ts</code> and <code>src/lib/component-registry.ts</code>{" "}
        (the same files the <Link href="/mcp">MCP server</Link> reads from), so there&rsquo;s
        one source of truth, not a separate Figma-specific copy that drifts.
      </p>

      <h2>Why a plugin, not the Figma API</h2>
      <p>
        Figma&rsquo;s REST API is read-heavy: it can create or update Variables, but it
        cannot create frames, auto-layout, or components. There&rsquo;s no &ldquo;create a
        node&rdquo; REST endpoint, and no way to create a brand-new file from nothing. Only
        the Figma <strong>Plugin API</strong> (code that runs inside Figma itself) can
        build real component structures. That also means no Figma API token or OAuth setup
        is needed, just Figma Desktop and this plugin.
      </p>

      <h2>Build &amp; run</h2>
      <CodeBlock label="Build">
        {`cd figma-plugin
npm install
npm run build`}
      </CodeBlock>
      <p>
        Then in Figma Desktop: <strong>Plugins → Development → Import plugin from
        manifest…</strong>, select <code>figma-plugin/manifest.json</code>, run it, and
        click <strong>Sync design system</strong>.
      </p>

      <h2>What it syncs</h2>
      <ul>
        <li>
          <strong>Colors, radius, spacing, typography</strong>: always kept in sync. A
          Figma Variable Collection with <strong>Light</strong> and <strong>Dark</strong>{" "}
          modes (mirroring <code>:root</code>/<code>.dark</code>), plus Text Styles for the
          type scale. Re-running updates existing Variables/Styles in place instead of
          duplicating them. This is meant to be re-run after token changes, not used once.
        </li>
        <li>
          <strong>Icons</strong>: a single &ldquo;Icon&rdquo; component set built from{" "}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">Lucide</a>,
          the same library <code>lucide-react</code> already provides to the real components
          in this codebase, so Figma and code render the same shapes. The curated list
          (<code>figma-plugin/icons.json</code>) is the <Link href="/iconography">Iconography</Link>{" "}
          page&rsquo;s showcase plus every icon a real component actually imports, resolved
          against raw SVGs and rebuilt as genuine Figma vector nodes with their stroke bound
          to the <code>foreground</code> color Variable.
        </li>
        <li>
          <strong>Components</strong>. A curated set of purely-visual primitives: Button,
          Badge, Card, Avatar, Input, Textarea, Checkbox, Switch, Label, Separator, Kbd,
          Alert, Progress, Select, Tabs, each built as a Figma component set with variant
          properties matching their real props, laid out left to right on the canvas: one
          column per component type, each wrapped in a dashed purple rectangle so the
          boundary between types is obvious at a glance. Only created once. If a component
          set already exists, re-running leaves it alone, since it may have been
          hand-tweaked in Figma. Compositions and heavily interactive components (Data
          Table, Kanban, Tree, Dialog, ...) aren&rsquo;t included; assemble those from the
          primitives, or extend <code>figma-plugin/src/component-specs.ts</code>. Some of
          the newer ones are deliberately partial: Select is only its trigger&rsquo;s
          closed state, Tabs is only its trigger&rsquo;s active/inactive states, not the
          full <code>TabsList</code>. See <code>figma-plugin/README.md</code> for the
          complete list of what&rsquo;s simplified and why.
        </li>
        <li>
          <strong>Icon instances inside components</strong>: Button has a working{" "}
          <code>Icon</code> variant (<code>none</code> / <code>leading</code>) matching the
          documented <code>PlusIcon</code> with <code>data-icon=&quot;inline-start&quot;</code>{" "}
          example, and Select places a trailing chevron the same way. Both resize the icon
          per size and recolor it to match that variant&rsquo;s text color, the same way
          the real components&rsquo; <code>currentColor</code> inheritance works. Other
          components don&rsquo;t have icon slots wired up yet.
        </li>
      </ul>

      <h2>Source of truth</h2>
      <p>
        <code>figma-plugin/src/code.ts</code> imports directly from{" "}
        <code>src/lib/design-tokens.ts</code> and <code>src/lib/component-registry.ts</code>{" "}
        at build time. <code>figma-plugin/src/component-specs.ts</code> is the one
        genuinely hand-curated file: Tailwind classes don&rsquo;t auto-translate into
        Figma auto-layout, so each component&rsquo;s variant axes and Figma structure are
        authored once by hand, the same way <code>design-tokens.ts</code> mirrors{" "}
        <code>globals.css</code> instead of parsing it. Full details in{" "}
        <code>figma-plugin/README.md</code>.
      </p>
    </Prose>
  );
}
