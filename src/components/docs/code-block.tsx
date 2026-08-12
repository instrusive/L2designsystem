"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  children,
  className,
  label,
}: {
  children: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const code = children.trim();

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={cn("mb-4 overflow-hidden rounded-lg border border-border", className)}>
      {label && (
        <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
          {label}
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 hover-only:hover:text-foreground [&_svg]:size-3"
          >
            {copied ? (
              <>
                <CheckIcon /> Copied
              </>
            ) : (
              <>
                <CopyIcon /> Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto bg-card p-3 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
