"use client";

import { useState } from "react";
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

export function ButtonPlayground() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default");
  const [size, setSize] = useState<(typeof sizes)[number]>("default");
  const [disabled, setDisabled] = useState(false);

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
        <Button variant="outline" size="sm" onClick={() => setDisabled((d) => !d)}>
          {disabled ? "Enable" : "Disable"}
        </Button>
      </div>

      <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8">
        <Button variant={variant} size={size} disabled={disabled}>
          {size === "icon" ? "＋" : "Click me"}
        </Button>
      </div>

      <CodeBlock label="tsx">
        {`<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}>
  Click me
</Button>`}
      </CodeBlock>
    </div>
  );
}
