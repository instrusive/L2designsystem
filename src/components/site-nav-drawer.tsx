"use client";

import { useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        render={<Button variant="ghost" size="icon" aria-label="Open navigation" />}
      >
        <MenuIcon />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/20 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          className="fixed inset-y-0 left-0 z-50 h-full w-72 max-w-[85vw] overflow-y-auto bg-card p-4 shadow-lg outline-none duration-150 data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <div className="mb-4 flex items-center justify-end">
            <DialogPrimitive.Close
              render={<Button variant="ghost" size="icon-sm" aria-label="Close navigation" />}
            >
              <XIcon />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
