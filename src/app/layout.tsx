import type { Metadata } from "next";
import { JetBrains_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { DocsNav } from "@/components/docs/docs-nav";
import { NavDrawer } from "@/components/site-nav-drawer";
import { SiteSearch } from "@/components/site-search";
import { TableOfContents } from "@/components/docs/table-of-contents";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    template: "%s · L2 Design System",
    default: "L2 Design System",
  },
  description: "Design system scaffold built on ReUI",
};

function SidebarNav() {
  return (
    <nav className="flex flex-col gap-6 text-sm">
      <DocsNav />
      <a
        href="https://github.com/instrusive/L2designsystem"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-r-md border-l-2 border-transparent px-2.5 py-1.5 text-muted-foreground transition-colors hover-only:hover:bg-surface-hover hover-only:hover:text-foreground"
      >
        GitHub
      </a>
    </nav>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex flex-1 flex-col bg-background">
              <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="md:hidden">
                    <NavDrawer>
                      <SidebarNav />
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

              <div className="flex flex-1">
                <aside className="sticky top-0 hidden h-fit max-h-screen w-56 shrink-0 overflow-y-auto border-r border-border p-6 md:block">
                  <SidebarNav />
                </aside>
                <div className="mx-auto flex w-full max-w-4xl flex-1 gap-10 px-6 py-10">
                  <main className="min-w-0 flex-1">{children}</main>
                  <TableOfContents />
                </div>
              </div>
            </div>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
