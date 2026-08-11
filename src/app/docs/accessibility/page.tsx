import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export default function AccessibilityPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Accessibility</h1>
      <p>
        Some of this is a solid foundation inherited from Base UI. Some of it is a
        deliberate practice specific to this system. And some of it is an honest gap —
        listed here rather than left for someone to discover the hard way.
      </p>

      <h2>Color contrast</h2>
      <p>
        Every color pairing in <Link href="/docs/tokens">Colors</Link> is checked against
        a real computed WCAG ratio before it ships — solid status colors verified ≥4.5:1
        with white text, <code>-foreground</code> variants verified as text directly on
        the page/card background. This isn&rsquo;t a one-time audit: status and accent
        colors have failed contrast checks and been corrected more than once as the
        palette evolved, which is why it&rsquo;s treated as an ongoing practice rather than
        a box checked at launch.
      </p>

      <h2>Focus states</h2>
      <p>
        Interactive elements share one focus-visible recipe:{" "}
        <code>focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50</code>
        . It&rsquo;s applied consistently across Button, Input, Checkbox, Switch,
        Accordion, and Textarea — with one known exception: Badge still carries an older
        ring-plus-offset recipe from before this convention was established, and hasn&rsquo;t
        been migrated yet.
      </p>

      <h2>Keyboard &amp; screen reader behavior</h2>
      <p>
        Dialog, Select, Combobox, DropdownMenu, Accordion, and Tabs are all built on{" "}
        <code>@base-ui/react</code> primitives, not hand-rolled — focus trapping,
        Escape-to-close, roving tabindex, and ARIA roles/states come from Base UI itself
        rather than being reimplemented per component. That&rsquo;s a deliberate reason for
        building on Base UI instead of raw HTML: correctness here isn&rsquo;t something this
        project maintains by hand.
      </p>

      <h2>Icon-only controls</h2>
      <p>
        <code>Button</code> with <code>size=&quot;icon&quot;</code> renders no visible
        text — the icon alone isn&rsquo;t announced meaningfully to a screen reader unless
        the consumer adds an accessible name. This isn&rsquo;t enforced by the component;
        it&rsquo;s on whoever uses it.
      </p>
      <CodeBlock label="tsx">
        {`// Bad — a screen reader announces this as an unlabeled button
<Button size="icon"><PlusIcon /></Button>

// Good
<Button size="icon" aria-label="Add item"><PlusIcon /></Button>`}
      </CodeBlock>

      <h2>Known gaps</h2>
      <ul>
        <li>
          <code>prefers-reduced-motion</code> isn&rsquo;t respected anywhere — see{" "}
          <Link href="/docs/motion">Motion</Link>.
        </li>
        <li>
          Contrast verification is a manual practice, not an automated CI check — nothing
          currently blocks a new color from shipping under 4.5:1.
        </li>
        <li>
          No accessibility audit (axe, Lighthouse, or manual screen-reader pass) has been
          run against the live site end to end — the guarantees above are true at the
          component level, not verified holistically yet.
        </li>
      </ul>
    </Prose>
  );
}
