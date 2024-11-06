"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MultiSelect } from "@/components/MultiSelect";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Problem = {
  problem_id: number;
  title: string;
  difficulty: string;
  slug: string;
};

export const columns: ColumnDef<Problem>[] = [
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
    header: "fn",
    cell: ({ row }) => {
      return (
        <MultiSelect
          onValueChange={() => {}}
          problem_id={row.original.problem_id}
          placeholder="Select frameworks"
          variant="inverted"
        />
      );
    },
  },
];
