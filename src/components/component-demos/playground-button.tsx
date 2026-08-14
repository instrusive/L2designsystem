"use client";

import { useState } from "react";
import { PlusIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/docs/code-block";

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
const sizes = ["xs", "sm", "default", "lg", "icon"] as const;
const iconPositions = ["none", "leading", "trailing"] as const;

export function ButtonPlayground() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default");
  const [size, setSize] = useState<(typeof sizes)[number]>("default");
  const [iconPosition, setIconPosition] = useState<(typeof iconPositions)[number]>("none");
  const [disabled, setDisabled] = useState(false);
  const isIconOnly = size === "icon";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Variant</Label>
          <Select value={variant} onValueChange={(v) => setVariant(v as typeof variant)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variants.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Size</Label>
          <Select value={size} onValueChange={(v) => setSize(v as typeof size)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Icon</Label>
          <Select
            value={isIconOnly ? "none" : iconPosition}
            onValueChange={(v) => setIconPosition(v as typeof iconPosition)}
            disabled={isIconOnly}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconPositions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={() => setDisabled((d) => !d)}>
          {disabled ? "Enable" : "Disable"}
        </Button>
      </div>
      {isIconOnly && (
        <p className="text-xs text-muted-foreground">
          Icon-only buttons (size=&quot;icon&quot;) always show a single centered icon.
          Leading/trailing placement doesn&apos;t apply.
        </p>
      )}

      <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8">
        <Button variant={variant} size={size} disabled={disabled}>
          {isIconOnly ? (
            <PlusIcon />
          ) : (
            <>
              {iconPosition === "leading" && <PlusIcon data-icon="inline-start" />}
              Click me
              {iconPosition === "trailing" && <ArrowRightIcon data-icon="inline-end" />}
            </>
          )}
        </Button>
      </div>

      <CodeBlock label="tsx">
        {isIconOnly
          ? `<Button variant="${variant}" size="icon"${disabled ? " disabled" : ""}>
  <PlusIcon />
</Button>`
          : iconPosition === "leading"
            ? `<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}>
  <PlusIcon data-icon="inline-start" />
  Click me
</Button>`
            : iconPosition === "trailing"
              ? `<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}>
  Click me
  <ArrowRightIcon data-icon="inline-end" />
</Button>`
              : `<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}>
  Click me
</Button>`}
      </CodeBlock>
    </div>
  );
}
