"use client";

import { useState } from "react";
import { Badge } from "@/components/reui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/docs/code-block";

const variants = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "destructive",
  "info",
  "invert",
  "primary-outline",
  "warning-outline",
  "success-outline",
  "destructive-outline",
  "info-outline",
] as const;
const radii = ["default", "full"] as const;

export function BadgePlayground() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default");
  const [radius, setRadius] = useState<(typeof radii)[number]>("full");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Variant</Label>
          <Select value={variant} onValueChange={(v) => setVariant(v as typeof variant)}>
            <SelectTrigger className="w-44">
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
          <Label>Radius</Label>
          <Select value={radius} onValueChange={(v) => setRadius(v as typeof radius)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {radii.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8">
        <Badge variant={variant} radius={radius}>
          Badge
        </Badge>
      </div>

      <CodeBlock label="tsx">
        {`<Badge variant="${variant}" radius="${radius}">Badge</Badge>`}
      </CodeBlock>
    </div>
  );
}
