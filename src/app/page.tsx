"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/reui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/reui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from "@/components/data-table/base/data-table";
import { ThemeToggle } from "@/components/theme-toggle";

interface Invoice {
  id: string;
  customer: string;
  status: "paid" | "pending" | "overdue";
  amount: number;
}

const invoices: Invoice[] = [
  { id: "INV-1001", customer: "Acme Co.", status: "paid", amount: 420.0 },
  { id: "INV-1002", customer: "Globex", status: "pending", amount: 128.5 },
  { id: "INV-1003", customer: "Initech", status: "overdue", amount: 89.99 },
  { id: "INV-1004", customer: "Umbrella Corp.", status: "paid", amount: 1250.0 },
  { id: "INV-1005", customer: "Soylent Corp.", status: "paid", amount: 75.0 },
  { id: "INV-1006", customer: "Hooli", status: "pending", amount: 340.2 },
  { id: "INV-1007", customer: "Stark Industries", status: "paid", amount: 980.0 },
  { id: "INV-1008", customer: "Wayne Enterprises", status: "overdue", amount: 210.15 },
  { id: "INV-1009", customer: "Wonka Industries", status: "paid", amount: 60.0 },
  { id: "INV-1010", customer: "Cyberdyne", status: "pending", amount: 512.75 },
  { id: "INV-1011", customer: "Aperture Science", status: "paid", amount: 305.4 },
  { id: "INV-1012", customer: "Massive Dynamic", status: "paid", amount: 149.0 },
];

const statusVariant: Record<Invoice["status"], "success" | "warning" | "destructive"> = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
};

const columns: ColumnDef<Invoice>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={statusVariant[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) =>
      row.original.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  },
];

const sections = [
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "alerts", label: "Alerts" },
  { id: "forms", label: "Form controls" },
  { id: "avatars", label: "Avatars" },
  { id: "tabs", label: "Tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "dialog", label: "Dialog" },
  { id: "feedback", label: "Progress & skeleton" },
  { id: "overlays", label: "Menu & tooltip" },
  { id: "data-table", label: "Data table" },
];

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">L2 Design System</h1>
          <p className="text-sm text-muted-foreground">
            Next.js 16 + React 19 + Tailwind v4, built on ReUI
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-6 py-10">
        <nav className="sticky top-10 hidden h-fit w-44 shrink-0 flex-col gap-1 text-sm md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <main className="flex min-w-0 flex-1 flex-col gap-8">
          <Section id="buttons" title="Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Section>

          <Section id="badges" title="Badges">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="invert">Invert</Badge>
            </div>
          </Section>

          <Section id="alerts" title="Alerts">
            <Alert>
              <AlertTitle>Default alert</AlertTitle>
              <AlertDescription>Neutral, informational message.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Double-check this before continuing.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Try again.</AlertDescription>
            </Alert>
          </Section>

          <Section id="forms" title="Form controls">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="showcase-email">Email</Label>
                <Input id="showcase-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="showcase-plan">Plan</Label>
                <Select defaultValue="pro">
                  <SelectTrigger id="showcase-plan" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="showcase-terms" />
              <Label htmlFor="showcase-terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="showcase-notify" defaultChecked />
              <Label htmlFor="showcase-notify">Email notifications</Label>
            </div>
          </Section>

          <Section id="avatars" title="Avatars">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar size="sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>DF</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+3</AvatarGroupCount>
              </AvatarGroup>
            </div>
          </Section>

          <Section id="tabs" title="Tabs">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-3 text-muted-foreground">
                Update your account details and profile information.
              </TabsContent>
              <TabsContent value="password" className="pt-3 text-muted-foreground">
                Change your password and manage two-factor authentication.
              </TabsContent>
              <TabsContent value="team" className="pt-3 text-muted-foreground">
                Invite teammates and manage roles and permissions.
              </TabsContent>
            </Tabs>
          </Section>

          <Section id="accordion" title="Accordion">
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the ReUI registry?</AccordionTrigger>
                <AccordionContent>
                  A component registry installed through the standard shadcn CLI, built on
                  Base UI primitives.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it free to use?</AccordionTrigger>
                <AccordionContent>
                  The numbered example blocks (c-button-1, c-dialog-1, etc.) are free and
                  pull the real primitive into the project.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                <AccordionContent>
                  Yes, via next-themes and OKLCH design tokens defined in globals.css.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Section id="dialog" title="Dialog">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete invoice</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the invoice.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Section id="feedback" title="Progress & skeleton">
            <div className="flex flex-col gap-2">
              <Progress value={40} />
              <Progress value={70} />
              <Progress value={100} />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </Section>

          <Section id="overlays" title="Menu & tooltip">
            <div className="flex flex-wrap items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  Open menu
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>
                  Hover me
                </TooltipTrigger>
                <TooltipContent>Helpful tooltip content</TooltipContent>
              </Tooltip>
            </div>
          </Section>

          <section id="data-table" className="scroll-mt-20">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Data table with sorting and pagination.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={invoices} pageSizeOptions={[5, 10, 20]} />
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
