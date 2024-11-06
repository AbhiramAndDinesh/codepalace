"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { deleteProblemFromCollection } from "@/actions/collection";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Problem = {
  problem_id: number;
  title: string;
  difficulty: string;
  slug: string;
  collection_id: string;
};

export const columns_owner: ColumnDef<Problem>[] = [
  {
    accessorKey: "problem_id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/problems/${row.original.slug}`}
          className="hover:text-blue-400"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const value = row.original.difficulty;
      let background = "bg-green-400/80";
      if (value === "Medium") background = "bg-orange-400";
      if (value === "Hard") background = "bg-red-400";
      return (
        <div className={`${background} px-2 py-1 text-sm rounded-sm inline`}>
          {value}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Button
              onClick={() => {
                deleteProblemFromCollection(
                  row.original.collection_id,
                  row.original.problem_id,
                );
              }}
            >
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
