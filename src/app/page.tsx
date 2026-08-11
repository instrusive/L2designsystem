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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from "@/components/data-table/base/data-table";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Filters,
  createFilter,
  type Filter,
  type FilterFieldConfig,
} from "@/components/reui/filters";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tree, TreeItem, TreeItemLabel } from "@/components/reui/tree";
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/reui/kanban";
import { Rating } from "@/components/reui/rating";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/reui/number-field";
import { PhoneInput } from "@/components/reui/phone-input";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/reui/sortable";
import { GripVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

const invoiceFilterFields: FilterFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "paid", label: "Paid" },
      { value: "pending", label: "Pending" },
      { value: "overdue", label: "Overdue" },
    ],
  },
  {
    key: "customer",
    label: "Customer",
    type: "text",
    placeholder: "Search customer...",
  },
];

const customers = [
  "Acme Co.",
  "Globex",
  "Initech",
  "Umbrella Corp.",
  "Soylent Corp.",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
  "Wonka Industries",
  "Cyberdyne",
  "Aperture Science",
  "Massive Dynamic",
];
const statuses: Invoice["status"][] = ["paid", "pending", "overdue"];

const manyInvoices: Invoice[] = Array.from({ length: 2000 }, (_, i) => ({
  id: `INV-${2000 + i}`,
  customer: customers[i % customers.length],
  status: statuses[i % statuses.length],
  amount: Math.round(((i * 37) % 2000) + 19.99),
}));

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
  { id: "data-table-virtualized", label: "Virtualized table" },
  { id: "filters", label: "Filters" },
  { id: "stepper", label: "Stepper" },
  { id: "empty", label: "Empty state" },
  { id: "toast", label: "Toast" },
  { id: "tree", label: "Tree" },
  { id: "kanban", label: "Kanban" },
  { id: "rating", label: "Rating" },
  { id: "number-field", label: "Number field" },
  { id: "phone-input", label: "Phone input" },
  { id: "sortable", label: "Sortable" },
];

interface TreeNode {
  name: string;
  children?: string[];
}

const treeItems: Record<string, TreeNode> = {
  root: { name: "components", children: ["ui", "reui", "data-table"] },
  ui: { name: "ui", children: ["button.tsx", "card.tsx", "input.tsx"] },
  reui: { name: "reui", children: ["badge.tsx", "filters.tsx", "kanban.tsx"] },
  "data-table": { name: "data-table", children: ["data-table.tsx"] },
  "button.tsx": { name: "button.tsx" },
  "card.tsx": { name: "card.tsx" },
  "input.tsx": { name: "input.tsx" },
  "badge.tsx": { name: "badge.tsx" },
  "filters.tsx": { name: "filters.tsx" },
  "kanban.tsx": { name: "kanban.tsx" },
  "data-table.tsx": { name: "data-table.tsx" },
};

interface KanbanTask {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
}

const kanbanColumnTitles: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In progress",
  done: "Done",
};

const initialKanbanColumns: Record<string, KanbanTask[]> = {
  backlog: [
    { id: "1", title: "Install Gantt chart", priority: "low" },
    { id: "2", title: "Add dark-mode chart colors", priority: "medium" },
  ],
  inProgress: [{ id: "3", title: "Fix badge contrast", priority: "high" }],
  done: [
    { id: "4", title: "Reskin to match portfolio", priority: "high" },
    { id: "5", title: "Add row selection to data table", priority: "medium" },
  ],
};

const kanbanPriorityVariant: Record<
  KanbanTask["priority"],
  "destructive-light" | "primary-light" | "warning-light"
> = {
  high: "destructive-light",
  medium: "primary-light",
  low: "warning-light",
};

interface SortableTask {
  id: string;
  title: string;
}

const initialSortableTasks: SortableTask[] = [
  { id: "1", title: "Ship the portfolio reskin" },
  { id: "2", title: "Run the WCAG contrast pass" },
  { id: "3", title: "Fill out the component catalog" },
];

const filterFields: FilterFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "paid", label: "Paid" },
      { value: "pending", label: "Pending" },
      { value: "overdue", label: "Overdue" },
    ],
  },
  {
    key: "customer",
    label: "Customer",
    type: "text",
    placeholder: "Search customer...",
  },
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

function KanbanTaskCard({ task }: { task: KanbanTask }) {
  return (
    <KanbanItem value={task.id}>
      <KanbanItemHandle>
        <Card>
          <CardContent className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
            <Badge variant={kanbanPriorityVariant[task.priority]} className="capitalize">
              {task.priority}
            </Badge>
          </CardContent>
        </Card>
      </KanbanItemHandle>
    </KanbanItem>
  );
}

function KanbanTaskColumn({ value, tasks }: { value: string; tasks: KanbanTask[] }) {
  return (
    <KanbanColumn value={value}>
      <Card className="mb-2.5">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">{kanbanColumnTitles[value]}</span>
            <Badge variant="outline">{tasks.length}</Badge>
          </div>
          <KanbanColumnHandle
            render={(props) => (
              <Button {...props} size="icon-xs" variant="ghost">
                <GripVerticalIcon />
              </Button>
            )}
          />
        </CardHeader>
        <CardContent>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <KanbanTaskCard key={task.id} task={task} />
            ))}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  );
}

export default function Home() {
  const [filters, setFilters] = useState<Filter[]>(() => [
    createFilter("status", "is_any_of", ["paid", "pending"]),
  ]);

  const tree = useTree<TreeNode>({
    initialState: { expandedItems: ["root", "ui", "reui"] },
    indent: 20,
    rootItemId: "root",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => treeItems[itemId],
      getChildren: (itemId) => treeItems[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  });

  const [kanbanColumns, setKanbanColumns] = useState(initialKanbanColumns);
  const [rating, setRating] = useState(3);
  const [phone, setPhone] = useState("");
  const [sortableTasks, setSortableTasks] = useState(initialSortableTasks);

  // dnd-kit's DndContext generates its a11y description id from an
  // incrementing counter that isn't stable between server and client
  // render, so Kanban/Sortable (both DndContext-based) only mount client-side.
  const [dndReady, setDndReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setDndReady(true), []);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold">
            L2 <em className="font-serif text-[1.15em] italic">Design System</em>
          </h1>
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
              <Badge variant="primary-outline">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success-outline">Success</Badge>
              <Badge variant="warning-outline">Warning</Badge>
              <Badge variant="destructive-outline">Destructive</Badge>
              <Badge variant="info-outline">Info</Badge>
              <Badge variant="invert-outline">Invert</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Solid (higher emphasis):</span>
              <Badge>Default</Badge>
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
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
                  </DropdownMenuGroup>
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
                <CardDescription>
                  Sorting, pagination, global search, column filters, row selection, and column
                  visibility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={invoices}
                  pageSizeOptions={[5, 10, 20]}
                  enableGlobalFilter
                  globalFilterPlaceholder="Search invoices..."
                  filterFields={invoiceFilterFields}
                  enableRowSelection
                  onRowSelectionChange={(rows) => {
                    if (rows.length > 0) {
                      toast(`${rows.length} invoice(s) selected`);
                    }
                  }}
                  enableColumnVisibility
                />
              </CardContent>
            </Card>
          </section>

          <section id="data-table-virtualized" className="scroll-mt-20">
            <Card>
              <CardHeader>
                <CardTitle>Virtualized table</CardTitle>
                <CardDescription>
                  {manyInvoices.length.toLocaleString()} rows rendered in a fixed-height scroll
                  container instead of paginating.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={manyInvoices}
                  enableGlobalFilter
                  globalFilterPlaceholder="Search invoices..."
                  virtualize
                  maxHeight="400px"
                />
              </CardContent>
            </Card>
          </section>

          <Section id="filters" title="Filters" description="Free ReUI component, pairs with data-grid.">
            <Filters filters={filters} fields={filterFields} onChange={setFilters} />
          </Section>

          <Section id="stepper" title="Stepper">
            <Stepper defaultValue={1}>
              <StepperNav>
                <StepperItem step={1}>
                  <StepperTrigger>
                    <StepperIndicator>1</StepperIndicator>
                    <div className="flex flex-col items-start">
                      <StepperTitle>Account</StepperTitle>
                      <StepperDescription>Basic info</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>
                <StepperItem step={2}>
                  <StepperTrigger>
                    <StepperIndicator>2</StepperIndicator>
                    <div className="flex flex-col items-start">
                      <StepperTitle>Details</StepperTitle>
                      <StepperDescription>Company details</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>
                <StepperItem step={3}>
                  <StepperTrigger>
                    <StepperIndicator>3</StepperIndicator>
                    <div className="flex flex-col items-start">
                      <StepperTitle>Review</StepperTitle>
                      <StepperDescription>Confirm and submit</StepperDescription>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              </StepperNav>
              <StepperPanel className="mt-4 text-sm text-muted-foreground">
                <StepperContent value={1}>Tell us about your account.</StepperContent>
                <StepperContent value={2}>Add your company details.</StepperContent>
                <StepperContent value={3}>Review everything and submit.</StepperContent>
              </StepperPanel>
            </Stepper>
          </Section>

          <Section id="empty" title="Empty state">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t created any projects yet. Get started by creating your
                  first project.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex gap-2">
                  <Button>Create project</Button>
                  <Button variant="outline">Import project</Button>
                </div>
              </EmptyContent>
            </Empty>
          </Section>

          <Section id="toast" title="Toast">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => toast("Event has been created")}>
                Show toast
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.success("Invoice INV-1001 marked as paid")
                }
              >
                Show success toast
              </Button>
            </div>
          </Section>

          <Section id="tree" title="Tree">
            <div className="w-full max-w-xs">
              <Tree indent={20} tree={tree}>
                {tree.getItems().map((item) => (
                  <TreeItem key={item.getId()} item={item}>
                    <TreeItemLabel />
                  </TreeItem>
                ))}
              </Tree>
            </div>
          </Section>

          <Section id="kanban" title="Kanban">
            {dndReady ? (
              <Kanban
                value={kanbanColumns}
                onValueChange={setKanbanColumns}
                getItemValue={(item) => item.id}
              >
                <KanbanBoard className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-3">
                  {Object.entries(kanbanColumns).map(([columnValue, tasks]) => (
                    <KanbanTaskColumn key={columnValue} value={columnValue} tasks={tasks} />
                  ))}
                </KanbanBoard>
                <KanbanOverlay className="rounded-md border-2 border-dashed bg-muted/10" />
              </Kanban>
            ) : (
              <Skeleton className="h-48 w-full" />
            )}
          </Section>

          <Section id="rating" title="Rating">
            <Rating rating={rating} editable onRatingChange={setRating} showValue />
          </Section>

          <Section id="number-field" title="Number field">
            <NumberField defaultValue={1} min={0} max={10} className="w-32">
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          </Section>

          <Section id="phone-input" title="Phone input">
            <PhoneInput
              value={phone}
              onChange={(value) => setPhone(value ?? "")}
              defaultCountry="US"
              placeholder="Enter phone number"
              className="max-w-xs"
            />
          </Section>

          <Section id="sortable" title="Sortable">
            {dndReady ? (
              <Sortable
                value={sortableTasks}
                onValueChange={setSortableTasks}
                getItemValue={(item) => item.id}
                strategy="vertical"
                className="max-w-md space-y-2"
              >
                {sortableTasks.map((task) => (
                  <SortableItem key={task.id} value={task.id}>
                    <div className="flex items-center gap-3 rounded-md border border-border bg-background p-3 transition-colors hover-only:hover:bg-muted/40">
                      <SortableItemHandle className="text-muted-foreground hover-only:hover:text-foreground">
                        <GripVerticalIcon className="size-4" />
                      </SortableItemHandle>
                      <span className="text-sm font-medium">{task.title}</span>
                    </div>
                  </SortableItem>
                ))}
              </Sortable>
            ) : (
              <Skeleton className="h-40 w-full max-w-md" />
            )}
          </Section>
        </main>
      </div>
    </div>
  );
}
