import { cn } from "@/lib/utils";

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
        "[&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:first:mt-0",
        "[&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-base [&>h3]:font-semibold",
        "[&>p]:mb-4 [&>p]:text-muted-foreground",
        "[&_a:not([data-slot=button])]:text-primary-text [&_a:not([data-slot=button])]:underline [&_a:not([data-slot=button])]:underline-offset-4",
        "[&>ul]:mb-4 [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul]:text-muted-foreground",
        "[&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:space-y-1.5 [&>ol]:pl-5 [&>ol]:text-muted-foreground",
        "[&_code]:rounded-sm [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em]",
        "[&>blockquote]:my-4 [&>blockquote]:border-l-2 [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:text-muted-foreground [&>blockquote]:italic",
        className
      )}
    >
      {children}
    </div>
  );
}
