"use client";

import { BookmarkX, Circle, CircleCheckBig } from "lucide-react";
import { deleteProblemFromCollection } from "@/actions/collection";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Problem = {
  problem_id: number;
  title: string;
  difficulty: string;
  slug: string;
  collection_id: string;
  solved: boolean;
};
const deleteProblem = async (collection_id: string, problem_id: number) => {
  try {
    const res = await deleteProblemFromCollection(collection_id, problem_id);
    if (!res) {
      toast.error("Failed to remove problem from collection");
    }
    if (res?.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
};
export const columns_owner: ColumnDef<Problem>[] = [
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
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end pr-4">
          <BookmarkX
            className="hover:cursor-pointer text-gray-500 hover:text-red-500"
            size={20}
            onClick={() =>
              deleteProblem(row.original.collection_id, row.original.problem_id)
            }
          />
        </div>
      );
    },
  },
];
