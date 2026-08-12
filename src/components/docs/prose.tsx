import { Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (isValidElement<{ children?: React.ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Assigns stable, server-rendered ids to top-level h2s so TableOfContents
// can link straight to them — done here (not by mutating the DOM client-side
// after mount) so the id is part of the actual markup and hydration matches.
function withHeadingIds(children: React.ReactNode) {
  const used = new Set<string>();
  return Children.map(children, (child) => {
    if (!isValidElement<{ id?: string; children?: React.ReactNode }>(child) || child.type !== "h2") {
      return child;
    }
    if (child.props.id) return child;
    const text = textFromChildren(child.props.children);
    let id = slugify(text);
    let suffix = 2;
    while (used.has(id)) id = `${slugify(text)}-${suffix++}`;
    used.add(id);
    return cloneElement(child, { id });
  });
}

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl text-sm leading-relaxed text-foreground",
        "[&>h1]:mb-2 [&>h1]:text-3xl [&>h1]:font-semibold",
        "[&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:scroll-mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:first:mt-0",
        "[&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-base [&>h3]:font-semibold",
        "[&>p]:mb-4 [&>p]:text-muted-foreground",
        "[&_a:not([data-slot=button],[data-slot=card-link])]:text-primary-text [&_a:not([data-slot=button],[data-slot=card-link])]:underline [&_a:not([data-slot=button],[data-slot=card-link])]:underline-offset-4",
        "[&>ul]:mb-4 [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul]:text-muted-foreground",
        "[&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:space-y-1.5 [&>ol]:pl-5 [&>ol]:text-muted-foreground",
        "[&_code]:rounded-sm [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em]",
        "[&>blockquote]:my-4 [&>blockquote]:border-l-2 [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:text-muted-foreground [&>blockquote]:italic",
        className
      )}
    >
      {withHeadingIds(children)}
    </div>
  );
}
