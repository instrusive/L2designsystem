import { ThemeToggle } from "@/components/theme-toggle";
import { ExplorerNav } from "@/components/explorer/explorer-nav";
import { SiteNav } from "@/components/site-nav";
import { NavDrawer } from "@/components/site-nav-drawer";
import { SiteSearch } from "@/components/site-search";
import Link from "next/link";

export default function ExplorerLayout({ children }: LayoutProps<"/explorer">) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <NavDrawer>
              <SiteNav>
                <ExplorerNav />
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

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-10 px-6 py-10">
        <aside className="sticky top-10 hidden h-fit max-h-[calc(100vh-6rem)] w-52 shrink-0 overflow-y-auto md:block">
          <SiteNav>
            <ExplorerNav />
          </SiteNav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
