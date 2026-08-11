"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filters,
  type Filter,
  type FilterFieldConfig,
} from "@/components/reui/filters";
import { cn } from "@/lib/utils";

// Column filters are driven by the ReUI `Filters` bar, which only knows
// select/multiselect/text fields. Operators map onto TanStack filter values;
// anything outside this set (custom/separator fields) isn't wired here.
function matchesOperator(
  cellValue: unknown,
  operator: string,
  values: unknown[]
): boolean {
  if (operator === "empty") return cellValue == null || cellValue === "";
  if (operator === "not_empty") return !(cellValue == null || cellValue === "");
  if (values.length === 0) return true;

  const cell = String(cellValue ?? "").toLowerCase();
  const vals = values.map((v) => String(v).toLowerCase());

  switch (operator) {
    case "is":
      return vals.includes(cell);
    case "is_not":
      return !vals.includes(cell);
    case "is_any_of":
      return vals.includes(cell);
    case "is_not_any_of":
      return !vals.includes(cell);
    case "contains":
      return vals.some((v) => cell.includes(v));
    case "not_contains":
      return !vals.some((v) => cell.includes(v));
    case "starts_with":
      return vals.some((v) => cell.startsWith(v));
    case "ends_with":
      return vals.some((v) => cell.endsWith(v));
    default:
      return vals.includes(cell);
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSizeOptions?: number[];
  className?: string;

  // Global search across all columns.
  enableGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;

  // Per-column filtering, rendered with the ReUI `Filters` bar. Each field's
  // `key` must match a column id.
  filterFields?: FilterFieldConfig[];

  // Checkbox column + selection state.
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;

  // "Columns" dropdown to show/hide any hideable column.
  enableColumnVisibility?: boolean;

  // Renders all filtered/sorted rows in a fixed-height scroll container
  // instead of paginating. Pagination controls are hidden in this mode.
  virtualize?: boolean;
  estimateRowHeight?: number;
  maxHeight?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSizeOptions = [10, 20, 50],
  className,
  enableGlobalFilter = false,
  globalFilterPlaceholder = "Search...",
  filterFields,
  enableRowSelection = false,
  onRowSelectionChange,
  enableColumnVisibility = false,
  virtualize = false,
  estimateRowHeight = 40,
  maxHeight = "480px",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const fieldsByKey = useMemo(() => {
    const map = new Map<string, FilterFieldConfig>();
    for (const field of filterFields ?? []) {
      if (field.key) map.set(field.key, field);
    }
    return map;
  }, [filterFields]);

  const columnFilters: ColumnFiltersState = useMemo(
    () =>
      filters
        .filter((f) => f.operator === "empty" || f.operator === "not_empty" || f.values.length > 0)
        .map((f) => ({ id: f.field, value: { operator: f.operator, values: f.values } })),
    [filters]
  );

  const resolvedColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    const withFilterFns = filterFields
      ? columns.map((column) => {
          const id = "accessorKey" in column ? String(column.accessorKey) : column.id;
          const field = id ? fieldsByKey.get(id) : undefined;
          if (!field) return column;
          return {
            ...column,
            filterFn: (
              row: Row<TData>,
              columnId: string,
              filterValue: { operator: string; values: unknown[] }
            ) =>
              matchesOperator(row.getValue(columnId), filterValue.operator, filterValue.values),
          };
        })
      : columns;

    if (!enableRowSelection) return withFilterFns;

    const selectColumn: ColumnDef<TData, TValue> = {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      size: 36,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          aria-label="Select row"
        />
      ),
    };

    return [selectColumn, ...withFilterFns];
  }, [columns, enableRowSelection, filterFields, fieldsByKey]);

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: virtualize ? undefined : getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection,
    state: { sorting, globalFilter, columnFilters, rowSelection, columnVisibility },
    initialState: { pagination: { pageSize: pageSizeOptions[0] } },
  });

  useEffect(() => {
    if (!onRowSelectionChange) return;
    onRowSelectionChange(table.getFilteredSelectedRowModel().rows.map((r) => r.original));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  const { rows } = table.getRowModel();

  const scrollRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 10,
    enabled: virtualize,
  });

  const hasToolbar = enableGlobalFilter || filterFields || enableColumnVisibility;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-3">
          {enableGlobalFilter && (
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={globalFilterPlaceholder}
              className="w-56"
            />
          )}
          {filterFields && (
            <Filters filters={filters} fields={filterFields} onChange={setFilters} />
          )}
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                <Columns3 />
                Columns
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllLeafColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
                        closeOnClick={false}
                        className="capitalize"
                      >
                        {typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {enableRowSelection && (
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {virtualize ? (
          <div
            ref={scrollRef}
            role="table"
            className="min-h-0 overflow-auto"
            style={{ height: maxHeight }}
          >
            <div
              role="rowgroup"
              className="sticky top-0 z-10 flex border-b border-border bg-muted/40"
            >
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => {
                  const sortable = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  return (
                    <div
                      key={header.id}
                      role="columnheader"
                      className="flex h-10 shrink-0 items-center px-4 text-left align-middle text-sm font-medium text-muted-foreground"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : sortable ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1.5 select-none no-highlight hover-only:hover:text-foreground"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortDirection === "asc" ? (
                            <ArrowUp className="size-3.5" />
                          ) : sortDirection === "desc" ? (
                            <ArrowDown className="size-3.5" />
                          ) : (
                            <ArrowUpDown className="size-3.5 opacity-40" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div
              role="rowgroup"
              className="relative"
              style={{ height: virtualizer.getTotalSize() }}
            >
              {rows.length ? (
                virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <div
                      key={row.id}
                      role="row"
                      aria-rowindex={virtualRow.index + 1}
                      data-state={row.getIsSelected() && "selected"}
                      className="absolute top-0 left-0 flex w-full border-b border-border transition-colors hover-only:hover:bg-muted/40"
                      style={{
                        height: virtualRow.size,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <div
                          key={cell.id}
                          role="cell"
                          className="flex shrink-0 items-center overflow-hidden px-4 py-2.5 align-middle"
                          style={{ width: cell.column.getSize() }}
                        >
                          <span className="truncate">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
                  No results.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const sortable = header.column.getCanSort();
                      const sortDirection = header.column.getIsSorted();

                      return (
                        <th
                          key={header.id}
                          className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
                        >
                          {header.isPlaceholder ? null : sortable ? (
                            <button
                              type="button"
                              onClick={header.column.getToggleSortingHandler()}
                              className="inline-flex items-center gap-1.5 select-none no-highlight hover-only:hover:text-foreground"
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {sortDirection === "asc" ? (
                                <ArrowUp className="size-3.5" />
                              ) : sortDirection === "desc" ? (
                                <ArrowDown className="size-3.5" />
                              ) : (
                                <ArrowUpDown className="size-3.5 opacity-40" />
                              )}
                            </button>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b border-border last:border-0 transition-colors hover-only:hover:bg-muted/40"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2.5 align-middle">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={resolvedColumns.length}
                      className="h-24 px-4 text-center text-muted-foreground"
                    >
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!virtualize && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger size="sm" className="w-[72px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      )}

      {virtualize && (
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s)
        </div>
      )}
    </div>
  );
}
