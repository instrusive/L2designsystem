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
  return (
    <div className={cn("mb-4 overflow-hidden rounded-lg border border-border", className)}>
      {label && (
        <div className="border-b border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto bg-card p-3 text-xs leading-relaxed">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}
