import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { Button } from "@/components/ui/button";

export default function DocsOverviewPage() {
  return (
    <Prose>
      <h1>L2 Design System</h1>
      <p>
        A component design system on Next.js 16, Tailwind CSS v4, and the ReUI registry
        (Base UI primitives) — themed to match a real portfolio site rather than shipped
        with the stock shadcn/ReUI neutral palette. Warm off-white paper background, a
        red-orange accent, JetBrains Mono as the base UI font with Instrument Serif as an
        italic accent, and a subtle fixed paper-grain texture.
      </p>
      <p>
        It&rsquo;s built to be dropped into a real project, not admired as a token file: every
        color pairing is verified against WCAG AA contrast, the data table has search,
        filtering, row selection, column visibility, and virtualization, and every
        component in this system has a working demo — not a static screenshot.
      </p>

      <h2>Where to go next</h2>
      <ul>
        <li>
          <Link href="/docs/installation">Installation</Link> — what to copy into your
          own project and what depends on what.
        </li>
        <li>
          <Link href="/docs/principles">Principles</Link> — the handful of rules every
          decision in this system traces back to.
        </li>
        <li>
          Foundations —{" "}
          <Link href="/docs/tokens">colors</Link>,{" "}
          <Link href="/docs/typography">typography</Link>,{" "}
          <Link href="/docs/iconography">iconography</Link>,{" "}
          <Link href="/docs/spacing">spacing &amp; radius</Link>,{" "}
          <Link href="/docs/elevation">elevation</Link>, and{" "}
          <Link href="/docs/motion">motion</Link>, all with live examples.
        </li>
        <li>
          <Link href="/docs/accessibility">Accessibility</Link> — what&rsquo;s solid, what&rsquo;s
          a deliberate practice, and what&rsquo;s an honest gap.
        </li>
        <li>
          <Link href="/docs/components">Components</Link> — every installed component,
          what it&rsquo;s for, and where to see it.
        </li>
        <li>
          <Link href="/docs/ai-usage">Using with AI</Link> — how to point an AI coding
          agent at this repo and get changes that don&apos;t break the theming.
        </li>
        <li>
          <Link href="/explorer">Explorer</Link> — every component in isolation, several
          with live prop controls.
        </li>
        <li>
          <Link href="/docs/changelog">Changelog</Link> — what&rsquo;s changed, grouped by
          theme.
        </li>
      </ul>

      <h2>Why this exists</h2>
      <p>
        Most design system starters look like a design system — evenly-spaced neutral
        grays, a default blue accent, the same shadow-xs on every card. This one is meant
        to look like a specific person&apos;s site, because it was built to become the actual
        foundation for a portfolio and prototypes, not a generic template. See{" "}
        <Link href="/docs/principles">Principles</Link> for the rest of the reasoning.
      </p>

      <div className="mt-6 flex gap-3">
        <Button render={<Link href="/docs/installation" />} nativeButton={false}>
          Get started
        </Button>
        <Button variant="outline" render={<Link href="/explorer" />} nativeButton={false}>
          Browse components
        </Button>
      </div>
    </Prose>
  );
}
