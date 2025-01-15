"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MultiSelect } from "@/components/MultiSelect";
import { CircleCheckBig, Circle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Problem = {
  problem_id: number;
  title: string;
  difficulty: string;
  slug: string;
  solved: boolean;
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "solved",
    header: () => <div className="">Solved</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-start pl-4">
          {row.original.solved ? (
            <CircleCheckBig size={20} className="text-gray-500 " />
          ) : (
            <Circle size={20} className="text-gray-500 " />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="md:w-[300px]">Problem</div>,
    cell: ({ row }) => {
      return (
        <Link
          href={`/problems/${row.original.slug}`}
          className="hover:text-blue-400 text-gray-300 pl-5"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: () => <div className="text-center">Difficulty</div>,
    cell: ({ row }) => {
      const value = row.original.difficulty;
      let background = "text-green-400";
      if (value === "Medium") background = "text-orange-400";
      if (value === "Hard") background = "text-red-400";
      return (
        <div className={`${background} px-2 py-1 text-sm rounded-sm inline`}>
          <p className="text-right">{value}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end pr-4">
          <MultiSelect
            onValueChange={() => {}}
            problem_id={row.original.problem_id}
            placeholder="Select frameworks"
          />
        </div>
      );
    },
  },
];
