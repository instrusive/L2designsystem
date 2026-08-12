"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { getSearchIndex } from "@/lib/search-index";
import { cn } from "@/lib/utils";

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const index = useMemo(() => getSearchIndex(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index;
    return index.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.subtitle.toLowerCase().includes(q) ||
        entry.group.toLowerCase().includes(q)
    );
  }, [index, query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[activeIndex];
      if (entry) go(entry.href);
    }
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
        setActiveIndex(0);
      }}
    >
      <DialogPrimitive.Trigger
        render={
          <Button
            variant="outline"
            aria-label="Search"
            className="w-8 justify-center px-0 text-muted-foreground sm:w-56 sm:justify-between sm:px-2.5"
          />
        }
      >
        <span className="flex items-center gap-1.5">
          <SearchIcon />
          <span className="hidden sm:inline">Search</span>
        </span>
        <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/20 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          initialFocus={inputRef}
          className="fixed top-24 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 gap-0 overflow-hidden rounded-xl bg-popover text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
            <SearchIcon className="text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search docs and components..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-1.5">
            {results.length === 0 && (
              <p className="px-2.5 py-6 text-center text-muted-foreground">
                No results for &quot;{query}&quot;.
              </p>
            )}
            {results.map((entry, i) => (
              <button
                key={entry.href}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => go(entry.href)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors",
                  i === activeIndex ? "bg-surface-hover text-foreground" : "text-foreground"
                )}
              >
                <span>{entry.title}</span>
                <span className="text-xs text-muted-foreground">{entry.subtitle}</span>
              </button>
            ))}
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
