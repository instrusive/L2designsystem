import { Prose } from "@/components/docs/prose";

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
