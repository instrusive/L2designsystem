import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export default function InstallationPage() {
  return (
    <Prose>
      <h1>Installation</h1>
      <p>
        This isn&apos;t published as an npm package — it&apos;s a working Next.js app you fork or
        clone, then copy the pieces you need from. That&apos;s deliberate: a design system
        this specific to one visual identity is more useful as a starting point you own
        than a black-box dependency.
      </p>

      <h2>Option 1 — fork and run it as-is</h2>
      <p>
        Best if you&apos;re starting a new project from scratch and want the tokens, fonts,
        and texture already wired up.
      </p>
      <CodeBlock label="terminal">
        {`git clone https://github.com/instrusive/L2designsystem.git my-project
cd my-project
npm install
npm run dev`}
      </CodeBlock>

      <h2>Option 2 — copy components into an existing project</h2>
      <p>Three things travel together — skipping one breaks theming or types:</p>
      <ol>
        <li>
          <strong>Tokens.</strong> Copy the <code>:root</code>/<code>.dark</code>/
          <code>@theme inline</code> blocks from <code>src/app/globals.css</code>. Every
          component reads color via a token (<code>bg-card</code>,{" "}
          <code>text-warning-foreground</code>) — none of them hardcode a hex value.
        </li>
        <li>
          <strong>Fonts.</strong> The <code>JetBrains_Mono</code>/
          <code>Instrument_Serif</code> setup in <code>src/app/layout.tsx</code>, mapped
          to <code>--font-sans</code>/<code>--font-serif</code> in <code>globals.css</code>.
        </li>
        <li>
          <strong>The component + its dependencies.</strong> Most components import
          other components (<code>Filters</code> pulls in <code>button</code>,{" "}
          <code>input-group</code>, <code>dropdown-menu</code>, and more). Check the
          top-of-file imports and bring those along too, or reinstall via the ReUI
          registry (below) which resolves this for you.
        </li>
      </ol>

      <h2>Adding more components later</h2>
      <p>
        This project uses the ReUI registry through the standard{" "}
        <code>shadcn</code> CLI — not a ReUI-specific tool. Bare primitive names are
        paywalled; the free path is the numbered example blocks:
      </p>
      <CodeBlock label="terminal">{`npx shadcn@latest add @reui/c-tooltip-1`}</CodeBlock>
      <p>
        This installs the real primitive into <code>src/components/ui/</code> and drops
        a small usage example in <code>src/components/examples/</code> — read it for the
        correct composition, then delete it. Full detail on this workflow, including a
        real gotcha with duplicated CSS token blocks, is in{" "}
        <a
          href="https://github.com/instrusive/L2designsystem/blob/master/AGENTS.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          AGENTS.md
        </a>
        .
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 20+</li>
        <li>Next.js 16 (App Router) and React 19 — this repo tracks recent, sometimes pre-release, versions</li>
        <li>Tailwind CSS v4 (CSS-variable-driven theming; no <code>tailwind.config.js</code>)</li>
      </ul>
    </Prose>
  );
}
