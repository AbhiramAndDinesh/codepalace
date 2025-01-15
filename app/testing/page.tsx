"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import { Button } from "@/components/ui/button";
import { userSolvedIds } from "@/actions/question";
import { getCollectionQuestions } from "@/actions/collection";

const Collections = () => {
  const user_id = "cm3br8oi40000amfjxhppmpfn";
  //  "cm3bpar410000juvn7gbt6v0h";
  // cm3br8oi40000amfjxhppmpfn
  const handleClick = async (user_id: string) => {
    try {
      const problems = await getCollectionQuestions(
        "cm5wtnonl0001s87tmr92b7qt",
        user_id
      );
      console.log(problems);
      const problem_ids = await userSolvedIds(user_id);
      // console.log(problem_ids);
      problem_ids?.map((x) => {
        console.log(x.problem_id);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 overflow-hidden">
      <div className="w-full flex flex-col sm:mt-20 mt-12  gap-4">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] -z-20 h-[300px]"
          )}
        />
        <div className="flex items-center justify-between gap-2 font-bold">
          <h2 className=" text-3xl font-spaceGrotesk text-red-500  ">
            Leetcode 150
          </h2>
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="red"
              onClick={() => {
                handleClick(user_id);
              }}
            >
              Click
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-sm:gap-4"></div>
      </div>
    </div>
  );
};

export default Collections;
