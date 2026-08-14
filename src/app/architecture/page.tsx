import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Architecture",
  description: "How the doc site, MCP server, and Figma plugin all read from the same source-of-truth files.",
};

const NODE_RECT = "fill-background stroke-border";
const SOURCE_BAND = "fill-primary/8 stroke-primary/35";
const SOURCE_PILL = "fill-card stroke-primary/35";
const SIDE_RECT = "fill-card stroke-border";
const FLOW_LINE = "stroke-foreground";
const SIDE_LINE = "stroke-muted-foreground";
const BOX_TITLE = "fill-foreground text-[14px] font-semibold";
const BOX_SUB = "fill-muted-foreground text-[11px]";
const PILL_LABEL = "fill-foreground text-[12.5px] font-medium";
const BAND_LABEL = "fill-primary-text text-[11px] font-semibold tracking-[0.08em]";
const ARROW_LABEL = "fill-muted-foreground text-[10.5px]";
const SECTION_EYEBROW = "fill-muted-foreground text-[10.5px] font-semibold tracking-[0.1em]";

export default function ArchitecturePage() {
  return (
    <Prose className="max-w-3xl">
      <h1>Architecture</h1>
      <p>
        Three hand-maintained files in <code>src/lib/</code>, mirroring{" "}
        <code>globals.css</code> and this repo&rsquo;s docs pages by hand rather than parsed
        from them, are the only place this design system&rsquo;s tokens and component list
        actually live. Everything downstream reads <strong>from</strong> them; nothing
        downstream is a second copy that can drift on its own. Below is where each of the
        three consumers actually goes: the doc site you&rsquo;re reading right now, the MCP
        server AI agents call, and the Figma plugin that builds a real Figma library from
        the same data.
      </p>

      <figure className="my-6">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="overflow-x-auto bg-card p-4">
            <svg
              viewBox="0 0 1440 760"
              className="block h-auto w-full min-w-[900px]"
              role="img"
              aria-label="Diagram showing design-tokens.ts, component-registry.ts, and agent-guidance.ts as the single source of truth, read by three separate consumers (the Next.js doc site, the MCP server, and the Figma plugin), with a separate dashed diagnostic path where Claude Code uses a Figma personal access token to read the live Figma file's REST API for debugging."
            >
              <defs>
                <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
                </marker>
                <marker id="arch-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
                </marker>
              </defs>

              {/* Source of truth band */}
              <rect className={SOURCE_BAND} x="40" y="40" width="1360" height="110" rx="6" strokeWidth="1.25" />
              <text className={BAND_LABEL} x="64" y="64">SOURCE OF TRUTH: src/</text>
              <rect className={SOURCE_PILL} x="64" y="84" width="308" height="42" rx="4" strokeWidth="1" />
              <text className={PILL_LABEL} x="218" y="110" textAnchor="middle">globals.css</text>
              <rect className={SOURCE_PILL} x="390" y="84" width="308" height="42" rx="4" strokeWidth="1" />
              <text className={PILL_LABEL} x="544" y="110" textAnchor="middle">design-tokens.ts</text>
              <rect className={SOURCE_PILL} x="716" y="84" width="308" height="42" rx="4" strokeWidth="1" />
              <text className={PILL_LABEL} x="870" y="110" textAnchor="middle">component-registry.ts</text>
              <rect className={SOURCE_PILL} x="1042" y="84" width="308" height="42" rx="4" strokeWidth="1" />
              <text className={PILL_LABEL} x="1196" y="110" textAnchor="middle">agent-guidance.ts</text>

              {/* Fan-out arrows: source -> mechanism (split around the label) */}
              <line className={FLOW_LINE} x1="253" y1="150" x2="253" y2="157" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="253" y1="193" x2="253" y2="207" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="253" y="170" textAnchor="middle">imports design-tokens.ts</text>
              <text className={ARROW_LABEL} x="253" y="184" textAnchor="middle">+ component-registry.ts</text>

              <line className={FLOW_LINE} x1="719" y1="150" x2="719" y2="157" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="719" y1="193" x2="719" y2="207" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="719" y="170" textAnchor="middle">imports all three</text>
              <text className={ARROW_LABEL} x="719" y="184" textAnchor="middle">.ts files</text>

              <line className={FLOW_LINE} x1="1185" y1="150" x2="1185" y2="157" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="1185" y1="193" x2="1185" y2="207" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="1185" y="170" textAnchor="middle">imports design-tokens.ts</text>
              <text className={ARROW_LABEL} x="1185" y="184" textAnchor="middle">+ component-registry.ts</text>

              {/* Mechanism row */}
              <rect className={NODE_RECT} x="40" y="210" width="426" height="90" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="253" y="248" textAnchor="middle">Next.js App Router</text>
              <text className={BOX_SUB} x="253" y="270" textAnchor="middle">src/app/**</text>

              <rect className={NODE_RECT} x="506" y="210" width="426" height="90" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="719" y="248" textAnchor="middle">/api/mcp route</text>
              <text className={BOX_SUB} x="719" y="270" textAnchor="middle">route.ts</text>

              <rect className={NODE_RECT} x="972" y="210" width="426" height="90" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="1185" y="238" textAnchor="middle">code.ts → esbuild bundle</text>
              <text className={BOX_SUB} x="1185" y="260" textAnchor="middle">+ component-specs.ts (hand-authored)</text>
              <text className={BOX_SUB} x="1185" y="276" textAnchor="middle">+ icons.json → lucide-static</text>

              {/* Arrows: mechanism -> surface (split around the label) */}
              <line className={FLOW_LINE} x1="253" y1="300" x2="253" y2="318" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="253" y1="334" x2="253" y2="347" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="253" y="328" textAnchor="middle">SSR / SSG render</text>

              <line className={FLOW_LINE} x1="719" y1="300" x2="719" y2="318" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="719" y1="334" x2="719" y2="347" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="719" y="328" textAnchor="middle">registers 6 tools</text>

              <line className={FLOW_LINE} x1="1185" y1="300" x2="1185" y2="318" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="1185" y1="334" x2="1185" y2="347" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="1185" y="328" textAnchor="middle">manual run, Plugin API</text>

              {/* Surface row */}
              <rect className={NODE_RECT} x="40" y="350" width="426" height="90" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="253" y="388" textAnchor="middle">Docs pages render</text>
              <text className={BOX_SUB} x="253" y="410" textAnchor="middle">/, /tokens, /components, ...</text>

              <rect className={NODE_RECT} x="506" y="350" width="426" height="90" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="719" y="388" textAnchor="middle">6 MCP tools live</text>
              <text className={BOX_SUB} x="719" y="410" textAnchor="middle">list_components, get_component, ...</text>

              <rect className={NODE_RECT} x="972" y="350" width="426" height="90" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="1185" y="388" textAnchor="middle">code.js runs inside Figma</text>
              <text className={BOX_SUB} x="1185" y="410" textAnchor="middle">designer clicks &quot;Sync design system&quot;</text>

              {/* Arrows: surface -> destination (split around the label) */}
              <line className={FLOW_LINE} x1="253" y1="440" x2="253" y2="458" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="253" y1="474" x2="253" y2="487" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="253" y="468" textAnchor="middle">browser loads page</text>

              <line className={FLOW_LINE} x1="719" y1="440" x2="719" y2="458" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="719" y1="474" x2="719" y2="487" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="719" y="468" textAnchor="middle">Streamable HTTP</text>

              <line className={FLOW_LINE} x1="1185" y1="440" x2="1185" y2="458" strokeWidth="1.4" />
              <line className={FLOW_LINE} x1="1185" y1="474" x2="1185" y2="487" strokeWidth="1.4" markerEnd="url(#arch-arrow)" />
              <text className={ARROW_LABEL} x="1185" y="468" textAnchor="middle">syncs into file</text>

              {/* Destination row */}
              <rect className={NODE_RECT} x="40" y="490" width="426" height="104" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="253" y="524" textAnchor="middle">Browser</text>
              <text className={BOX_SUB} x="253" y="546" textAnchor="middle">designer / developer</text>
              <text className={BOX_SUB} x="253" y="562" textAnchor="middle">reads the docs</text>

              <rect className={NODE_RECT} x="506" y="490" width="426" height="104" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="719" y="524" textAnchor="middle">AI agent</text>
              <text className={BOX_SUB} x="719" y="546" textAnchor="middle">Claude Code, Cursor, ...</text>
              <text className={BOX_SUB} x="719" y="562" textAnchor="middle">connects via MCP</text>

              <rect className={NODE_RECT} x="972" y="490" width="426" height="104" rx="4" strokeWidth="1.25" />
              <text className={BOX_TITLE} x="1185" y="524" textAnchor="middle">Figma file</text>
              <text className={BOX_SUB} x="1185" y="546" textAnchor="middle">Variables (Light/Dark) · Text Styles</text>
              <text className={BOX_SUB} x="1185" y="562" textAnchor="middle">Icon set · Component sets</text>

              {/* Diagnostic side channel */}
              <text className={SECTION_EYEBROW} x="40" y="638">DIAGNOSTIC PATH: MANUAL, OCCASIONAL</text>

              <rect className={SIDE_RECT} x="200" y="654" width="240" height="66" rx="4" strokeWidth="1" strokeDasharray="3 3" />
              <text className={BOX_TITLE} x="320" y="692" textAnchor="middle" style={{ fontSize: "13px" }}>Claude Code</text>

              <line className={SIDE_LINE} x1="440" y1="687" x2="500" y2="687" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arch-arrow-muted)" />

              <rect className={SIDE_RECT} x="500" y="654" width="290" height="66" rx="4" strokeWidth="1" strokeDasharray="3 3" />
              <text className={BOX_TITLE} x="645" y="684" textAnchor="middle" style={{ fontSize: "13px" }}>curl +</text>
              <text className={BOX_SUB} x="645" y="702" textAnchor="middle">Figma personal access token</text>

              <line className={SIDE_LINE} x1="790" y1="687" x2="850" y2="687" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arch-arrow-muted)" />

              <rect className={SIDE_RECT} x="850" y="654" width="300" height="66" rx="4" strokeWidth="1" strokeDasharray="3 3" />
              <text className={BOX_TITLE} x="1000" y="684" textAnchor="middle" style={{ fontSize: "13px" }}>Figma REST API</text>
              <text className={BOX_SUB} x="1000" y="702" textAnchor="middle">GET /v1/files (read-only)</text>

              <path className={SIDE_LINE} d="M1000,654 L1000,616 L1185,616 L1185,598" strokeWidth="1.2" strokeDasharray="4 4" fill="none" markerEnd="url(#arch-arrow-muted)" />
              <text className={ARROW_LABEL} x="1170" y="605" style={{ textAnchor: "end" }}>read-only · not the sync loop</text>
            </svg>
          </div>
        </div>
        <figcaption className="mt-3 max-w-3xl text-xs text-muted-foreground">
          One shared source, three independent readers. The doc site and MCP server read
          the <code>.ts</code> files directly at request time; the Figma plugin reads them
          at build time via esbuild, then runs separately inside Figma itself, since only
          the Figma Plugin API (not Figma&rsquo;s REST API) can create Variables, Text
          Styles, and Components from nothing. The dashed path at the bottom is unrelated
          to that sync: it&rsquo;s how a live Figma file actually got debugged, by reading
          its real JSON back out over the REST API with a personal access token.
        </figcaption>
      </figure>

      <h2>Reference: where each piece actually lives</h2>
      <ul>
        <li>
          <strong>Source of truth</strong>: <code>src/lib/design-tokens.ts</code>,{" "}
          <code>src/lib/component-registry.ts</code>, <code>src/lib/agent-guidance.ts</code>
        </li>
        <li>
          <strong>Doc site</strong>: <code>src/app/**</code>, the unified docs site rooted
          at <code>/</code>
        </li>
        <li>
          <strong>MCP server</strong>: <code>src/app/api/mcp/route.ts</code>, documented at{" "}
          <a href="/mcp">/mcp</a>
        </li>
        <li>
          <strong>Figma plugin</strong>. <code>figma-plugin/</code>: <code>src/code.ts</code>,{" "}
          <code>variables.ts</code>, <code>text-styles.ts</code>, <code>icons.ts</code>,{" "}
          <code>components.ts</code>, plus its own <code>component-specs.ts</code> and{" "}
          <code>icons.json</code>; documented at <a href="/figma">/figma</a>
        </li>
        <li>
          <strong>Diagnostic path</strong>: the Figma REST API (
          <code>api.figma.com/v1/files/...</code>) via a personal access token; see{" "}
          <code>figma-plugin/TROUBLESHOOTING.md</code>
        </li>
      </ul>
    </Prose>
  );
}
