import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export default function AiUsagePage() {
  return (
    <Prose className="max-w-3xl">
      <h1>Using this with AI</h1>
      <p>
        This entire design system — the reskin, the data table features, the WCAG fixes,
        this docs site — was built with an AI coding agent (Claude Code). It&apos;s set up to
        be extended the same way. This page is the guide for doing that well, based on
        mistakes that actually happened while building it.
      </p>

      <h2>Start with AGENTS.md</h2>
      <p>
        <a
          href="https://github.com/instrusive/L2designsystem/blob/master/AGENTS.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          AGENTS.md
        </a>{" "}
        at the repo root is the single source of truth for repo-specific conventions —
        how ReUI components get installed, why the data table is pinned to TanStack Table
        v8, the exact CSS gotcha to check after every <code>shadcn add</code>. Claude Code
        and most modern coding agents read this file automatically at session start. If
        you&apos;re using a tool that doesn&apos;t, paste its contents into your first message.
      </p>

      <h2>A prompt that works</h2>
      <p>
        Vague requests (&quot;add a date picker&quot;) produce plausible-looking but
        token-inconsistent output. Specific requests that reference this system&apos;s actual
        conventions produce output that fits:
      </p>
      <CodeBlock label="prompt">
        {`Add a date range picker to this design system, matching the existing patterns:
- Check if ReUI already has one (npx shadcn search @reui --query date) before
  hand-rolling anything
- Use existing semantic tokens (bg-card, text-warning-foreground, etc.) — no
  raw colors
- If it needs a new status color, verify WCAG contrast with real math (see
  CONTRIBUTING.md), don't eyeball it
- Add a working demo to /explorer, not a static screenshot
- Check both light and dark mode in the browser before calling it done`}
      </CodeBlock>

      <h2>Pitfalls this repo already hit</h2>
      <p>
        Real bugs an agent introduced or found while building this system — worth
        knowing before you extend it further:
      </p>

      <h3>Duplicate token blocks in globals.css</h3>
      <p>
        The <code>shadcn</code> CLI has, in practice, appended a second{" "}
        <code>:root</code>/<code>.dark</code> block instead of merging into the existing
        one after an install. If an old token block is still present, some variables end
        up defined twice — the second wins by cascade order, silently. Run{" "}
        <code>grep -n &quot;^:root\\|^\\.dark&quot; src/app/globals.css</code> after every
        component install; there should be exactly one of each.
      </p>

      <h3>The wrong color token for text vs. fill</h3>
      <p>
        <code>--warning</code> (and the other status colors) is tuned for use as a solid
        background with white text. <code>--warning-foreground</code> is that same hue at
        a lightness safe to use <em>as text</em> directly on the page background. Using{" "}
        <code>--warning</code> for text works fine in whichever theme you happened to
        test and silently fails contrast in the other — this happened in at least five
        places (Alert icons, a Button variant, form error text, a dropdown item) before
        being caught in one sweep.
      </p>

      <h3>dnd-kit + SSR hydration</h3>
      <p>
        Any component built on dnd-kit&apos;s <code>DndContext</code> (Kanban, Sortable
        here) generates its accessibility description ID from a module-level counter
        that isn&apos;t stable between server and client render — if two instances mount
        on one page, React throws a hydration mismatch. Neither component exposes a way
        to pass a stable ID through. The fix used throughout this codebase: defer
        rendering until after client mount (
        <code>useState(false)</code> flipped in a <code>useEffect</code>), same pattern
        as the theme toggle uses for its own SSR problem.
      </p>

      <h3>Base UI menus need an explicit Group</h3>
      <p>
        <code>DropdownMenuLabel</code> throws at runtime (
        <code>MenuGroupContext is missing</code>) unless wrapped in{" "}
        <code>DropdownMenuGroup</code> — TypeScript won&apos;t catch this, only a browser
        console will.
      </p>

      <h2>Working with the ReUI MCP server</h2>
      <p>
        This project is configured with ReUI&apos;s MCP server (
        <code>https://mcp.reui.io</code>), which gives an agent live, scored registry
        search and inline component APIs instead of guessing prop names. If your agent
        supports MCP, connect it — the free tier covers everything installed in this
        repo (the 20 free ReUI components plus every <code>c-*</code> example).
      </p>

      <h2>What to verify before merging an AI-authored change</h2>
      <ul>
        <li>
          <code>npx tsc --noEmit</code>, <code>npm run lint</code>, and{" "}
          <code>npm run build</code> all pass — not just the one that happens to run
          first.
        </li>
        <li>Checked in the actual browser, in both light and dark mode.</li>
        <li>
          Any new color pairing has a real contrast ratio computed, not eyeballed — see{" "}
          <Link href="/docs/tokens">design tokens</Link> for the current verified set.
        </li>
        <li>No raw hex/rgb color slipped in outside <code>globals.css</code>.</li>
      </ul>
    </Prose>
  );
}
