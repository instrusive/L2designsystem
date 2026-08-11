import { ThemeToggle } from "@/components/theme-toggle";
import { ExplorerNav } from "@/components/explorer/explorer-nav";
import Link from "next/link";

export default function ExplorerLayout({ children }: LayoutProps<"/explorer">) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold">
            L2 <em className="font-serif text-[1.15em] italic">Design System</em>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/docs" className="hover-only:hover:text-foreground">
              Docs
            </Link>
            <Link href="/explorer" className="hover-only:hover:text-foreground">
              Explorer
            </Link>
            <Link href="/" className="hover-only:hover:text-foreground">
              Showcase
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-10 px-6 py-10">
        <aside className="sticky top-10 hidden h-fit max-h-[calc(100vh-6rem)] w-52 shrink-0 overflow-y-auto md:block">
          <ExplorerNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
