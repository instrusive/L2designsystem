import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { DocsNav } from "@/components/docs/docs-nav";
import { SiteNav } from "@/components/site-nav";
import { NavDrawer } from "@/components/site-nav-drawer";
import { SiteSearch } from "@/components/site-search";
import { TableOfContents } from "@/components/docs/table-of-contents";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <NavDrawer>
              <SiteNav>
                <DocsNav />
              </SiteNav>
            </NavDrawer>
          </div>
          <Link href="/" className="text-lg font-semibold">
            L2 <em className="font-serif text-[1.15em] italic">Design System</em>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <SiteSearch />
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-6 py-10">
        <aside className="sticky top-10 hidden h-fit w-48 shrink-0 md:block">
          <SiteNav>
            <DocsNav />
          </SiteNav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
        <TableOfContents />
      </div>
    </div>
  );
}
