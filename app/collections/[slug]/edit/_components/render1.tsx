"use client";

import { Questionsdata } from "@/app/problems/page";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Editgrid from "./edit-grid";
import {
  addQuestionstoCollection,
  getAddtoCollectionQuestions,
} from "@/actions/collection";
import { toast } from "sonner";
import { Plus } from "lucide-react";
export default function Render1({
  title,
  user_id,
  collection_id,
}: {
  title: string;
  user_id: string;
  collection_id: string;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [problems, setProblems] = useState<Questionsdata[]>([]);
  const [count, setCount] = useState(0);
  const handleAdd = async () => {
    try {
      const res = await addQuestionstoCollection(collection_id, selected);
      if (res.status === 200) {
        toast.success("Added questions to Collection");
        setProblems((prev) =>
          prev.filter((item) => !selected.includes(item.problem_id))
        );
      }
    } catch (error) {
      toast.error("Failed to add questions");
      console.log(error);
    } finally {
      setSelected([]);
    }
  };
  const handleCheck = (value: number, isChecked: boolean) => {
    // console.log(isChecked);
    if (isChecked) {
      setSelected((prev) => [...prev, value]);
      setCount((prev) => prev + 1);
    } else {
      setSelected(selected.filter((item) => item !== value));
      setCount((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const getProblem_ = async () => {
      try {
        const res = await getAddtoCollectionQuestions(collection_id, user_id);
        setProblems(res);
      } catch (error) {
        console.log("Error in fetching the questions", error);
      }
    };
    getProblem_();
  }, []);

  return (
    <div className="w-full flex flex-col sm:mt-20 mt-12  gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className=" text-4xl font-semibold font-spaceGrotesk text-red-500  ">
          {title}
        </h2>
        <div className="flex items-center justify-end gap-2">
          <Button
            className="h-10 w-10 hover:cursor-pointer"
            variant={"red"}
            disabled={count == 0}
            onClick={() => {
              handleAdd();
              console.log("Adding");
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="h-[75vh]">
        <Editgrid data={problems || []} handleSelect={handleCheck} />
      </div>
    </div>
  );
}
