import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { componentCategories, componentRegistry } from "@/lib/component-registry";
import {
  colorTokens,
  statusColorRule,
  radiusScale,
  spacingScale,
  typography,
  motion,
  elevationRule,
} from "@/lib/design-tokens";
import { guidance } from "@/lib/agent-guidance";

const tokenTopics = ["colors", "radius", "spacing", "typography", "motion", "elevation", "all"] as const;
const guidanceTopics = ["all", ...guidance.map((g) => g.topic)] as [string, ...string[]];

function sourceToImportPath(source: string) {
  return "@/" + source.replace(/^src\//, "").replace(/\.tsx?$/, "");
}

function jsonContent(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_components",
      {
        title: "List components",
        description:
          "List every component in L2 Design System, optionally filtered by category (Primitives, Forms, Feedback, Overlays, Navigation, Data, Layout).",
        inputSchema: z.object({
          category: z.string().optional().describe("Filter to one category. Omit to list all."),
        }),
      },
      async ({ category }) => {
        const results = category
          ? componentRegistry.filter((c) => c.category.toLowerCase() === category.toLowerCase())
          : componentRegistry;
        return jsonContent(
          results.map((c) => ({ slug: c.slug, name: c.name, category: c.category, description: c.description }))
        );
      }
    );

    server.registerTool(
      "get_component",
      {
        title: "Get component detail",
        description:
          "Get full detail for one component by slug: name, category, description, source path, and the import path to use.",
        inputSchema: z.object({
          slug: z.string().describe("The component's slug, e.g. 'button', 'data-table'. Use list_components to find slugs."),
        }),
      },
      async ({ slug }) => {
        const entry = componentRegistry.find((c) => c.slug === slug);
        if (!entry) {
          return {
            content: [
              {
                type: "text" as const,
                text: `No component with slug "${slug}". Call list_components to see valid slugs.`,
              },
            ],
            isError: true,
          };
        }
        return jsonContent({
          ...entry,
          importPath: sourceToImportPath(entry.source),
          liveDemoUrl: `https://l2-design-system.vercel.app/components/${entry.slug}`,
        });
      }
    );

    server.registerTool(
      "list_categories",
      {
        title: "List component categories",
        description: "List the category taxonomy components are grouped by.",
        inputSchema: z.object({}),
      },
      async () => jsonContent(componentCategories)
    );

    server.registerTool(
      "get_design_tokens",
      {
        title: "Get design tokens",
        description:
          "Get L2 Design System's design tokens: colors (OKLCH, light+dark), radius scale, spacing scale, typography (fonts + type scale), or motion (durations/easing). Use this before hardcoding any color, spacing, radius, or font value.",
        inputSchema: z.object({
          topic: z.enum(tokenTopics).default("all").describe("Which token category to return. 'all' returns everything."),
        }),
      },
      async ({ topic }) => {
        const data: Record<string, unknown> = {};
        if (topic === "colors" || topic === "all") {
          data.colors = { tokens: colorTokens, statusColorRule };
        }
        if (topic === "radius" || topic === "all") {
          data.radius = radiusScale;
        }
        if (topic === "spacing" || topic === "all") {
          data.spacing = spacingScale;
        }
        if (topic === "typography" || topic === "all") {
          data.typography = typography;
        }
        if (topic === "motion" || topic === "all") {
          data.motion = motion;
        }
        if (topic === "elevation" || topic === "all") {
          data.elevation = elevationRule;
        }
        return jsonContent(data);
      }
    );

    server.registerTool(
      "get_guidance",
      {
        title: "Get design guidance",
        description:
          "Get L2 Design System's written guidance and rules — principles, accessibility, elevation, motion, iconography, or spacing/radius conventions. Terse, actionable rules meant for building things that fit this system, not full documentation prose.",
        inputSchema: z.object({
          topic: z.enum(guidanceTopics).default("all").describe("Which guidance topic to return. 'all' returns every topic."),
        }),
      },
      async ({ topic }) => {
        const results = topic === "all" ? guidance : guidance.filter((g) => g.topic === topic);
        return jsonContent(results);
      }
    );

    server.registerTool(
      "search",
      {
        title: "Search components and guidance",
        description:
          "Free-text search across component names/descriptions and guidance topics. Use this when you don't know the exact component slug or guidance topic name.",
        inputSchema: z.object({
          query: z.string().describe("Search text, e.g. 'icon button' or 'focus ring'."),
        }),
      },
      async ({ query }) => {
        const q = query.trim().toLowerCase();
        const components = componentRegistry
          .filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q) ||
              c.category.toLowerCase().includes(q)
          )
          .map((c) => ({ type: "component" as const, slug: c.slug, name: c.name, category: c.category }));
        const guidanceHits = guidance
          .filter(
            (g) =>
              g.topic.includes(q) ||
              g.summary.toLowerCase().includes(q) ||
              g.rules.some((r) => r.toLowerCase().includes(q))
          )
          .map((g) => ({ type: "guidance" as const, topic: g.topic, summary: g.summary }));
        return jsonContent({ components, guidance: guidanceHits });
      }
    );
  },
  {
    serverInfo: { name: "l2-design-system", version: "1.0.0" },
  }
);

export { handler as GET, handler as POST };
