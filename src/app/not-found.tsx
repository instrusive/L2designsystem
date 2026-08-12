import type { Metadata } from "next";
import Link from "next/link";
import { CompassIcon } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-20">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CompassIcon />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            Whatever you were looking for isn&rsquo;t at this address — it may have moved, or
            the link might be off.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-3">
            <Button render={<Link href="/" />} nativeButton={false}>
              Home
            </Button>
            <Button variant="outline" render={<Link href="/docs" />} nativeButton={false}>
              Docs
            </Button>
            <Button variant="outline" render={<Link href="/explorer" />} nativeButton={false}>
              Explorer
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
