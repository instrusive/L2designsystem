import {
  SearchIcon,
  SettingsIcon,
  HeartIcon,
  StarIcon,
  CheckIcon,
  XIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  ChevronRightIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Iconography",
  description: "lucide-react sizing, stroke, and color rules for icons in this system.",
};

const DEMO_ICONS = [
  SearchIcon,
  SettingsIcon,
  HeartIcon,
  StarIcon,
  CheckIcon,
  XIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  ChevronRightIcon,
];

function SizeRow({ size, label, px }: { size: string; label: string; px: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-border py-4 first:pt-0 last:border-b-0">
      <div className="flex w-8 justify-center">
        <SettingsIcon className={cn("text-foreground", size)} />
      </div>
      <div className="flex flex-1 items-baseline gap-3 text-xs text-muted-foreground">
        <span>{label}</span>
        <code>{size}</code>
        <span>{px}</span>
      </div>
    </div>
  );
}

export default function IconographyPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Iconography</h1>
      <p>
        Icons come from{" "}
        <a
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          lucide-react
        </a>
        , no other icon set is used in this system. They&apos;re imported by name (
        <code>SearchIcon</code>, not a generic <code>Icon</code> wrapper) so unused icons
        get tree-shaken automatically. The same icons (the set shown below, plus every
        icon a real component imports) are also available as real vector nodes in the{" "}
        <a href="/figma">Figma library</a>, bound to the same color tokens.
      </p>

      <h2>Sizes</h2>
      <p>
        Three sizes cover nearly every use. There&apos;s no <code>size-6</code> or larger in
        active use. Icons stay small and let type carry the hierarchy.
      </p>
      <div className="flex flex-col">
        <SizeRow size="size-3.5" label="Dense UI (chips, inline badges)" px="14px" />
        <SizeRow size="size-4" label="Default (buttons, inputs, menu items)" px="16px" />
        <SizeRow size="size-5" label="Larger targets (empty states, standalone)" px="20px" />
      </div>

      <h2>Stroke &amp; color</h2>
      <p>
        Default stroke width (2) is left untouched. Don&apos;t override{" "}
        <code>strokeWidth</code> per instance, it breaks visual consistency with every
        other icon on the page. Icons never carry their own color; they inherit{" "}
        <code>currentColor</code> from the surrounding text class.
      </p>
      <ul>
        <li>
          <code>text-muted-foreground</code>: default, for icons paired with secondary
          text (input adornments, disclosure chevrons).
        </li>
        <li>
          <code>text-foreground</code>: icons that should read at the same weight as
          primary text (button icons, active nav state).
        </li>
        <li>
          <code>text-primary-text</code>: accent use only, sparingly (a selected/active
          indicator), matching the accent-color rule in{" "}
          <a href="/tokens">Colors</a>.
        </li>
      </ul>

      <h2>A few in use</h2>
      <div className="grid grid-cols-5 gap-4 sm:grid-cols-10">
        {DEMO_ICONS.map((Icon, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-lg border border-border text-foreground"
          >
            <Icon className="size-4" />
          </div>
        ))}
      </div>

      <h2>Usage</h2>
      <CodeBlock label="tsx">
        {`import { SearchIcon } from "lucide-react";

// Default: 16px, inherits text color
<SearchIcon className="size-4 text-muted-foreground" />

// Inside a button: sits at the button's own text color, no override needed
<Button><SearchIcon className="size-4" /> Search</Button>`}
      </CodeBlock>
    </Prose>
  );
}
