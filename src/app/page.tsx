import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { Button } from "@/components/ui/button";

// No title here — root layout.tsx's title.template never applies to a page
// in the same route segment (root page + root layout), so this would render
// as the literal string "Overview" with no brand suffix. Falls back to the
// layout's title.default ("L2 Design System") instead, which reads better
// for the site's own root URL anyway.
export const metadata: Metadata = {
  description:
    "A component design system on Next.js, Tailwind CSS v4, and ReUI, themed to match a real portfolio site.",
};

export default function DocsOverviewPage() {
  return (
    <Prose>
      <h1>L2 Design System</h1>
      <p>
        A component design system on Next.js 16, Tailwind CSS v4, and the ReUI registry
        (Base UI primitives), themed to match a real portfolio site rather than shipped
        with the stock shadcn/ReUI neutral palette. Warm off-white paper background, a
        red-orange accent, JetBrains Mono as the base UI font with Instrument Serif as an
        italic accent, and a subtle fixed paper-grain texture.
      </p>
      <p>
        It&rsquo;s built to be dropped into a real project, not admired as a token file:
        every color pairing is verified against WCAG AA contrast, and every page here
        links straight to the actual component source in the repo, not a description of
        one.
      </p>

      <h2>Where to go next</h2>
      <ul>
        <li>
          <Link href="/installation">Installation</Link>: what to copy into your own
          project and what depends on what.
        </li>
        <li>
          <Link href="/principles">Principles</Link>: the handful of rules every decision
          in this system traces back to.
        </li>
        <li>
          Foundations:{" "}
          <Link href="/tokens">colors</Link>, <Link href="/typography">typography</Link>,{" "}
          <Link href="/iconography">iconography</Link>,{" "}
          <Link href="/spacing">spacing &amp; radius</Link>,{" "}
          <Link href="/elevation">elevation</Link>, and{" "}
          <Link href="/motion">motion</Link>, all with live examples.
        </li>
        <li>
          <Link href="/accessibility">Accessibility</Link>: what&rsquo;s solid, what&rsquo;s
          a deliberate practice, and what&rsquo;s an honest gap.
        </li>
        <li>
          <Link href="/components">Components</Link>: every installed component, what
          it&rsquo;s for, and where to find its source.
        </li>
        <li>
          <Link href="/ai-usage">Using with AI</Link>: how to point an AI coding agent at
          this repo and get changes that don&apos;t break the theming.
        </li>
        <li>
          <Link href="/changelog">Changelog</Link>: what&rsquo;s changed, grouped by
          theme.
        </li>
      </ul>

      <h2>Why this exists</h2>
      <p>
        Most design system starters look like a design system: evenly-spaced neutral
        grays, a default blue accent, the same shadow-xs on every card. This one is meant
        to look like a specific person&apos;s site, because it was built to become the actual
        foundation for a portfolio and prototypes, not a generic template. See{" "}
        <Link href="/principles">Principles</Link> for the rest of the reasoning.
      </p>

      <div className="mt-6 flex gap-3">
        <Button render={<Link href="/installation" />} nativeButton={false}>
          Get started
        </Button>
        <Button variant="outline" render={<Link href="/components" />} nativeButton={false}>
          Browse components
        </Button>
      </div>
    </Prose>
  );
}
