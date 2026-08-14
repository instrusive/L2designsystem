import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "MCP Server",
  description: "Point an AI coding agent at this design system's components, tokens, and guidance directly.",
};

export default function McpPage() {
  return (
    <Prose className="max-w-3xl">
      <h1>MCP Server</h1>
      <p>
        This site hosts a remote{" "}
        <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
          MCP
        </a>{" "}
        server, the same idea as ReUI&rsquo;s own <code>mcp.reui.io</code>. Instead of an AI
        agent reading through this repo&rsquo;s files to figure out what components exist or
        what a color token is for, it can call a tool and get a direct, structured answer.
        No account, no API key. It&rsquo;s read-only data about a design system, not
        anything sensitive.
      </p>

      <h2>Connect</h2>
      <p>
        The endpoint is <code>https://l2-design-system.vercel.app/api/mcp</code>. Most MCP
        clients speak Streamable HTTP directly:
      </p>
      <CodeBlock label="Claude Code">
        {`claude mcp add --transport http l2-design-system https://l2-design-system.vercel.app/api/mcp`}
      </CodeBlock>
      <CodeBlock label="Cursor / Claude Desktop / generic JSON config">
        {`{
  "mcpServers": {
    "l2-design-system": {
      "url": "https://l2-design-system.vercel.app/api/mcp"
    }
  }
}`}
      </CodeBlock>
      <p>
        For a stdio-only client, wrap it with{" "}
        <a href="https://www.npmjs.com/package/mcp-remote" target="_blank" rel="noopener noreferrer">
          mcp-remote
        </a>
        :
      </p>
      <CodeBlock label="stdio-only clients">
        {`{
  "mcpServers": {
    "l2-design-system": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://l2-design-system.vercel.app/api/mcp"]
    }
  }
}`}
      </CodeBlock>

      <h2>Tools</h2>
      <ul>
        <li>
          <code>list_components</code>: every component, optionally filtered by category.
        </li>
        <li>
          <code>get_component</code>: full detail for one component by slug (description,
          source path, import path, live demo URL).
        </li>
        <li>
          <code>list_categories</code>: the category taxonomy (Primitives, Forms, Feedback,
          Overlays, Navigation, Data, Layout).
        </li>
        <li>
          <code>get_design_tokens</code>: colors (OKLCH, light + dark), radius scale,
          spacing scale, typography, or motion. Everything in{" "}
          <Link href="/tokens">Colors</Link>, <Link href="/spacing">Spacing &amp; radius</Link>,{" "}
          <Link href="/typography">Typography</Link>, and <Link href="/motion">Motion</Link>, as
          structured data.
        </li>
        <li>
          <code>get_guidance</code>: terse, actionable rules from{" "}
          <Link href="/principles">Principles</Link>, <Link href="/accessibility">Accessibility</Link>,{" "}
          <Link href="/elevation">Elevation</Link>, <Link href="/motion">Motion</Link>,{" "}
          <Link href="/iconography">Iconography</Link>, and{" "}
          <Link href="/spacing">Spacing &amp; radius</Link>, rephrased for a tool response, not
          scraped prose.
        </li>
        <li>
          <code>search</code>: free-text search across components and guidance, for when
          you don&rsquo;t know the exact slug or topic name.
        </li>
      </ul>

      <h2>Source of truth</h2>
      <p>
        Component data comes from <code>src/lib/component-registry.ts</code>, the same
        registry that powers <Link href="/components">the Components pages</Link>. Tokens and
        guidance come from <code>src/lib/design-tokens.ts</code> and{" "}
        <code>src/lib/agent-guidance.ts</code>, hand-maintained to mirror{" "}
        <code>globals.css</code> and the written docs pages, the same pattern the component
        registry already uses rather than deriving from source at request time.
      </p>
    </Prose>
  );
}
