"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

export type Leaderboard = {
  user_id: string;
  username: string;
  leetcodeProblemsSolved: number | null;
  leetcodeRating: number | null;
  leetcodeContestsAttended: number | null;
  //   lc_score: number;
  codechefProblemsSolved: number | null;
  codechefRating: number | null;
  codechefContestsAttended: number | null;
  //   cc_score: number;
  codeforcesRating: number | null;
  codeforcesContestsAttended: number | null;
  //   cf_score: number;
};

export const columns: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: "user_id",
    header: () => {
      return <div className="w-[100px]">Rank</div>;
    },
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Username
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "leetcodeProblemsSolved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Leetcode Solved
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "leetcodeRating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          LeetCode Rating
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "leetcodeContestsAttended",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Leetcode Contests
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "codechefProblemsSolved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Codechef Solved
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "codechefRating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Codechef Rating
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "codechefContestsAttended",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Codechef Contests
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "codeforcesRating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Codeforces Rating
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "codeforcesContestsAttended",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-400"
        >
          Codeforces Contests
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
];
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "username", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      username: true,
      leetcodeProblemsSolved: false,
      leetcodeRating: true,
      leetcodeContestsAttended: true,
      codechefProblemsSolved: false,
      codechefRating: true,
      codechefContestsAttended: true,
      codeforcesRating: true,
      codeforcesContestsAttended: true,
    });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      rowPinning: {
        top: [],
      },
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search User"
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-2 focus:outline-none text-gray-400 border-gray-500 bg-background"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto mr-2 text-gray-400 border-gray-500 hover:bg-gray-500 hover:text-background"
            >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="bg-background text-gray-400 border border-gray-500"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-center hover:bg-green-500 hover:text-background"
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
      </div>
      <div className="rounded-md border border-gray-500 overflow-clip">
        {table.getRowModel().rows?.length ? (
          <Table className="scroll">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className=" border-gray-500 font-spaceGrotesk"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="py-3 text-center text-gray-400  bg-background font-medium font-spaceGrotesk"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-red-500 text-gray-400 bg-background"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" text-center py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full flex justify-center items-center font-space font-spaceGrotesk font-medium bg-background text-red-500 py-12">
            No Results
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 mr-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`text-gray-400 ${!table.getCanPreviousPage() && "hover:bg-gray-500 hover:text-background"}`}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`text-gray-400 ${!table.getCanPreviousPage() && "hover:bg-gray-500 hover:text-background"}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
