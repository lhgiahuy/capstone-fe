"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import useSearchParamsHandler from "@/hooks/use-add-search-param";
import useDebounce from "@/hooks/use-debounce";
import { useSearchParams } from "next/navigation";
import MyPagination from "./my-pagination";

interface selectOptions {
  option: {
    name: string;
    value: string;
  }[];
  placeholder: string;
  title: string;
  defaultValue: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hideColumns: string[];
  selectOptions?: selectOptions[];
  totalPages?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hideColumns,
  selectOptions,
  totalPages,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const searchString = searchParams.get("SearchKeyword")?.toString() || "";
  const [searchValue, setSearchValue] = useState(searchString);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });
  useEffect(() => {
    table
      .getAllColumns()
      .filter((column) => hideColumns.includes(column.id))
      .forEach((column) => {
        column.toggleVisibility(false);
      });
  }, []);
  const [addParam, clearParam] = useSearchParamsHandler();
  const handleFilterChange = (value: string, title: string) => {
    addParam({ [title]: value });
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    if (debouncedSearchValue) {
      // Add or update the search parameter if there is a value
      addParam({ SearchKeyword: debouncedSearchValue });
    } else {
      // Clear the search parameter if the value is empty
      clearParam("SearchKeyword");
    }
  }, [debouncedSearchValue, addParam, clearParam]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end gap-4">
        {selectOptions &&
          selectOptions.map((item, index) => {
            const selectedOption =
              item.option.find((option) => option.value === item.defaultValue)
                ?.name || item.placeholder;
            return (
              <Select
                key={index}
                onValueChange={(value) => handleFilterChange(value, item.title)}
                value={item.defaultValue}
              >
                <SelectTrigger className="max-w-[12rem]">
                  {selectedOption || item.placeholder}
                </SelectTrigger>
                <SelectContent>
                  {item.option.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          })}
        <Input
          type="text"
          placeholder="Tìm kiếm"
          className="max-w-[24rem]"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {/* <div className="flex items-center pb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Hiển thị
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      {table && data && (
        <div className="rounded-md border w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.id === "email" ? "" : "capitalize"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có kết quả.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <MyPagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
}
