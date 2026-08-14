"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxList, ComboboxEmpty } from "@/components/ui/combobox";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Kbd } from "@/components/ui/kbd";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
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
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/reui/kanban";
import { Tree, TreeItem, TreeItemLabel } from "@/components/reui/tree";
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
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
import { DataTable } from "@/components/data-table/base/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { GripVerticalIcon, SearchIcon } from "lucide-react";

/** Deferred client-only mount, for dnd-kit's SSR hydration-id problem. See /ai-usage. */
function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
}

function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Flat, borderless surface</CardTitle>
        <CardDescription>No shadow, no ring: matches the portfolio&apos;s cards.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Cards use <code>bg-card</code> and the shared radius scale only.
        </p>
      </CardContent>
    </Card>
  );
}

function AvatarDemo() {
  return (
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
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="flex max-w-xs flex-col gap-1.5">
      <Label htmlFor="demo-input">Email</Label>
      <Input id="demo-input" type="email" placeholder="you@example.com" />
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-1.5">
      <Label htmlFor="demo-textarea">Message</Label>
      <Textarea id="demo-textarea" placeholder="Type your message..." />
    </div>
  );
}

function SelectDemo() {
  return (
    <Select defaultValue="pro">
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  );
}

const comboboxFrameworks = ["Next.js", "Remix", "Astro", "SvelteKit"];

function ComboboxDemo() {
  return (
    <Field className="max-w-xs">
      <Combobox items={comboboxFrameworks}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}

function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="demo-checkbox" defaultChecked />
      <Label htmlFor="demo-checkbox">Accept terms and conditions</Label>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="demo-switch" defaultChecked />
      <Label htmlFor="demo-switch">Email notifications</Label>
    </div>
  );
}

function FieldDemo() {
  return (
    <Field data-invalid="true" className="max-w-xs">
      <FieldLabel htmlFor="demo-field">Username</FieldLabel>
      <Input id="demo-field" aria-invalid defaultValue="a" />
      <FieldDescription>Must be at least 3 characters.</FieldDescription>
      <FieldError>Username is too short.</FieldError>
    </Field>
  );
}

function NumberFieldDemo() {
  return (
    <NumberField defaultValue={1} min={0} max={10} className="w-32">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}

function PhoneInputDemo() {
  const [phone, setPhone] = useState("");
  return (
    <PhoneInput
      value={phone}
      onChange={(v) => setPhone(v ?? "")}
      defaultCountry="US"
      placeholder="Enter phone number"
      className="max-w-xs"
    />
  );
}

function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <SearchIcon className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupText>⌘K</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}

function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Status</ButtonGroupText>
      <Button variant="outline" size="sm">Active</Button>
      <Button variant="outline" size="sm">Archived</Button>
    </ButtonGroup>
  );
}

function AlertDemo() {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <Alert>
        <AlertTitle>Default alert</AlertTitle>
        <AlertDescription>Neutral, informational message.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Double-check this before continuing.</AlertDescription>
      </Alert>
    </div>
  );
}

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Show toast
      </Button>
      <Button variant="outline" onClick={() => toast.success("Saved successfully")}>
        Show success toast
      </Button>
    </div>
  );
}

function ProgressDemo() {
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <Progress value={40} />
      <Progress value={70} />
      <Progress value={100} />
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

function EmptyDemo() {
  return (
    <Empty className="max-w-sm">
      <EmptyHeader>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Get started by creating your first project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  );
}

function RatingDemo() {
  const [rating, setRating] = useState(3);
  return <Rating rating={rating} editable onRatingChange={setRating} showValue />;
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete invoice</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
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
  );
}

function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
      <TooltipContent>Helpful tooltip content</TooltipContent>
    </Tooltip>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">
        Update your account details.
      </TabsContent>
      <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">
        Change your password.
      </TabsContent>
    </Tabs>
  );
}

function AccordionDemo() {
  return (
    <Accordion className="max-w-sm">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the ReUI registry?</AccordionTrigger>
        <AccordionContent>
          A component registry installed through the standard shadcn CLI, built on Base UI.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>Yes, via next-themes and OKLCH tokens.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function StepperDemo() {
  return (
    <Stepper defaultValue={1} className="max-w-md">
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
              <StepperTitle>Review</StepperTitle>
              <StepperDescription>Confirm</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
      <StepperPanel className="mt-4 text-sm text-muted-foreground">
        <StepperContent value={1}>Tell us about your account.</StepperContent>
        <StepperContent value={2}>Review and submit.</StepperContent>
      </StepperPanel>
    </Stepper>
  );
}

const filterFields: FilterFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "paid", label: "Paid" },
      { value: "pending", label: "Pending" },
    ],
  },
];

function FiltersDemo() {
  const [filters, setFilters] = useState<Filter[]>(() => [
    createFilter("status", "is_any_of", ["paid"]),
  ]);
  return <Filters filters={filters} fields={filterFields} onChange={setFilters} />;
}

interface DemoInvoice {
  id: string;
  customer: string;
  amount: number;
}

const demoInvoices: DemoInvoice[] = [
  { id: "INV-1001", customer: "Acme Co.", amount: 420 },
  { id: "INV-1002", customer: "Globex", amount: 128.5 },
  { id: "INV-1003", customer: "Initech", amount: 89.99 },
];

const demoColumns: ColumnDef<DemoInvoice>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => row.original.amount.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
];

function DataTableDemo() {
  return <DataTable columns={demoColumns} data={demoInvoices} pageSizeOptions={[5, 10]} />;
}

function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-1001</TableCell>
          <TableCell>Acme Co.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

interface TreeNode {
  name: string;
  children?: string[];
}

const treeItems: Record<string, TreeNode> = {
  root: { name: "src", children: ["components", "app.tsx"] },
  components: { name: "components", children: ["button.tsx", "card.tsx"] },
  "button.tsx": { name: "button.tsx" },
  "card.tsx": { name: "card.tsx" },
  "app.tsx": { name: "app.tsx" },
};

function TreeDemo() {
  const tree = useTree<TreeNode>({
    initialState: { expandedItems: ["root", "components"] },
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

  return (
    <div className="w-full max-w-xs">
      <Tree indent={20} tree={tree}>
        {tree.getItems().map((item) => (
          <TreeItem key={item.getId()} item={item}>
            <TreeItemLabel />
          </TreeItem>
        ))}
      </Tree>
    </div>
  );
}

function KanbanDemo() {
  const mounted = useClientMounted();
  const [columns, setColumns] = useState<Record<string, { id: string; title: string }[]>>({
    todo: [{ id: "1", title: "Design the hero section" }],
    done: [{ id: "2", title: "Ship the landing page" }],
  });

  if (!mounted) return <Skeleton className="h-40 w-full max-w-xl" />;

  return (
    <Kanban value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
      <KanbanBoard className="grid max-w-xl grid-cols-2 gap-4">
        {Object.entries(columns).map(([col, tasks]) => (
          <KanbanColumn key={col} value={col}>
            <Card className="mb-2.5">
              <CardHeader>
                <span className="text-sm font-semibold capitalize">{col}</span>
              </CardHeader>
              <CardContent>
                <KanbanColumnContent value={col} className="flex flex-col gap-2">
                  {tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <KanbanItemHandle>
                        <Card>
                          <CardContent className="text-sm">{task.title}</CardContent>
                        </Card>
                      </KanbanItemHandle>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </CardContent>
            </Card>
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <KanbanOverlay className="rounded-md border-2 border-dashed bg-muted/10" />
    </Kanban>
  );
}

function SortableDemo() {
  const mounted = useClientMounted();
  const [tasks, setTasks] = useState([
    { id: "1", title: "First priority" },
    { id: "2", title: "Second priority" },
    { id: "3", title: "Third priority" },
  ]);

  if (!mounted) return <Skeleton className="h-32 w-full max-w-md" />;

  return (
    <Sortable
      value={tasks}
      onValueChange={setTasks}
      getItemValue={(item) => item.id}
      strategy="vertical"
      className="max-w-md space-y-2"
    >
      {tasks.map((task) => (
        <SortableItem key={task.id} value={task.id}>
          <div className="flex items-center gap-3 rounded-md border border-border bg-background p-3">
            <SortableItemHandle className="text-muted-foreground">
              <GripVerticalIcon className="size-4" />
            </SortableItemHandle>
            <span className="text-sm font-medium">{task.title}</span>
          </div>
        </SortableItem>
      ))}
    </Sortable>
  );
}

function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-40 w-64 rounded-md border border-border">
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="text-sm text-muted-foreground">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function SeparatorDemo() {
  return (
    <div className="flex max-w-xs flex-col gap-4">
      <div className="text-sm">Above</div>
      <Separator />
      <div className="text-sm">Below</div>
    </div>
  );
}

function KbdDemo() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  );
}

function LabelDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="demo-label" />
      <Label htmlFor="demo-label">Subscribe to newsletter</Label>
    </div>
  );
}

export const componentDemos: Record<string, React.ComponentType> = {
  card: CardDemo,
  avatar: AvatarDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  combobox: ComboboxDemo,
  checkbox: CheckboxDemo,
  switch: SwitchDemo,
  field: FieldDemo,
  "number-field": NumberFieldDemo,
  "phone-input": PhoneInputDemo,
  "input-group": InputGroupDemo,
  "button-group": ButtonGroupDemo,
  alert: AlertDemo,
  toast: ToastDemo,
  progress: ProgressDemo,
  skeleton: SkeletonDemo,
  empty: EmptyDemo,
  rating: RatingDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  tooltip: TooltipDemo,
  tabs: TabsDemo,
  accordion: AccordionDemo,
  stepper: StepperDemo,
  filters: FiltersDemo,
  "data-table": DataTableDemo,
  table: TableDemo,
  tree: TreeDemo,
  kanban: KanbanDemo,
  sortable: SortableDemo,
  "scroll-area": ScrollAreaDemo,
  separator: SeparatorDemo,
  kbd: KbdDemo,
  label: LabelDemo,
};
