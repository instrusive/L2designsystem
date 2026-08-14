import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Principles",
  description: "The handful of rules every decision in this design system traces back to.",
};

export default function PrinciplesPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Principles</h1>
      <p>
        These aren&rsquo;t aspirational. Each one traces back to an actual decision made
        (and in a few cases, redone) while building this system. If a new component or
        page contradicts one of these, that&rsquo;s worth a second look before shipping it.
      </p>

      <h2>Built for one person, not a neutral template</h2>
      <p>
        Most design system starters aim for maximum genericness: neutral grays, a
        default blue, corners rounded just enough to feel friendly to anyone. This one
        reskins to match a specific portfolio (warm paper background, red-orange accent,
        JetBrains Mono, an italic serif used the way its owner italicizes her own name)
        because it exists to become that person&rsquo;s actual site, not a template someone
        else customizes later.
      </p>

      <h2>Verify, don&rsquo;t eyeball</h2>
      <p>
        Every color pairing in <Link href="/tokens">Colors</Link> has a computed WCAG
        contrast ratio, not a squint-and-ship judgment call. This one took multiple
        passes to get right (status and accent colors failed contrast checks more than
        once before landing at their current values), which is exactly why it&rsquo;s a
        principle and not a one-time fix.
      </p>

      <h2>Flat by default, shadow only for floating things</h2>
      <p>
        Shadow means exactly one thing here: this element is above the page and can be
        dismissed. Cards, tables, and inputs stay flat; dialogs, menus, and tooltips
        carry real shadow. See <Link href="/elevation">Elevation</Link> for the full rule
        and the reasoning behind it.
      </p>

      <h2>Real components, not mockups</h2>
      <p>
        Every entry in <Link href="/components">Components</Link> links straight to the
        actual source file installed in this repo, not a description of an API that
        doesn&rsquo;t exist, and not a screenshot standing in for real code. If it&rsquo;s
        documented here, it&rsquo;s something you can open and copy.
      </p>

      <h2>Restraint over decoration</h2>
      <p>
        Near-sharp corners instead of a rounder default scale. Two font weights, not
        four. A serif accent used sparingly enough that reaching for it on a button label
        or a data value is a sign of overuse, not an option. See{" "}
        <Link href="/typography">Typography</Link>. When in doubt, the plainer choice is
        usually the right one.
      </p>
    </Prose>
  );
}
