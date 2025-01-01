"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  BookLock,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  Plus,
  SquareLibrary,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
const Collections = () => {
  const [startIndex, setStartIndex] = useState(0);
  const privateCollections = [
    {
      name: "Hello",
      slug: "hello",
    },
    {
      name: "Hello World",
      slug: "hello-world",
    },
    {
      name: "Hello World 1",
      slug: "hello-world-1",
    },
    {
      name: "Hello2",
      slug: "hello2",
    },
    {
      name: "Hello World2",
      slug: "hello-world2",
    },
    {
      name: "Hello World 2",
      slug: "hello-world-2",
    },
  ];
  const arraylength = privateCollections.length;
  const nextClick = () => {
    if (startIndex + 3 < arraylength) {
      setStartIndex(startIndex + 1);
      // console.log(startIndex);
    }
  };
  const previousClick = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };
  return (
    <div className="p-5">
      <div className="w-full flex flex-col sm:mt-20 mt-12  gap-4">
        <div className="flex items-center gap-2 font-bold">
          <h2 className=" text-3xl font-spaceGrotesk text-red-500 ">
            Collections
          </h2>
          <SquareLibrary
            size={20}
            className="bg-red-500 rounded-sm text-background p-0.5 sm:w-[25px]  sm:h-[25px]"
          />
        </div>
        <div className="flex flex-col gap-3 max-sm:gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 font-spaceGrotesk font-semibold">
              <h2 className="text-2xl text-gray-300">Private</h2>
              <BookLock size={20} color="#d1d5db" />
            </div>
            <Button
              variant={"red"}
              className="text-sm px-2 py-1 h-8 flex gap-0"
              // className=" text-sm border border-red-500/80 bg-red-500/20 text-red-500 hover:bg-red-500/20"
            >
              New
              <Plus size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3  max-mobile:flex max-mobile:flex-col max-mobile:gap-4 max-mobile:justify-center max-sm:pr-1  gap-4 ">
            {privateCollections
              .slice(startIndex, startIndex + 3)
              .map((values, index) => (
                <Link href={`collections/${values.slug}`} key={index}>
                  <div className="relative bg-red-500 rounded">
                    <div
                      className="inset-0 bg-background transition-all text-gray-300 p-3 z-10 max-sm:translate-x-1 max-sm:-translate-y-1
              hover:cursor-pointer sm:hover:translate-x-1 sm:hover:-translate-y-1 truncate rounded-[4px] border sm:border-gray-500/80 border-red-500  sm:hover:border-red-500 flex justify-center  items-center"
                    >
                      <p className="truncate">{values.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="flex items-center justify-end gap-1">
            <Button
              variant={"red"}
              disabled={startIndex - 1 < 0}
              onClick={previousClick}
              className={cn("p-2 h-6 w-6", arraylength < 4 && "hidden")}
            >
              <ChevronLeft size={1} />
              {/* {startIndex} */}
            </Button>
            <Button
              variant={"red"}
              disabled={startIndex + 3 >= arraylength}
              onClick={nextClick}
              className={cn("p-2 h-6 w-6", arraylength < 4 && "hidden")}
            >
              <ChevronRight size={100} />
              {/* {startIndex} */}
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col gap-3 max-sm:gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 font-spaceGrotesk font-semibold">
              <h2 className="text-2xl text-gray-300">Saved</h2>
              <BookMarked size={20} color="#d1d5db" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3  max-mobile:flex max-mobile:flex-col max-mobile:gap-4 max-mobile:justify-center max-sm:pr-1  gap-4 ">
            {privateCollections.slice(startIndex, startIndex + 3).map((values, index) => (
              <Link href={`collections/${values.slug}`} key={index}>
                <div className="relative bg-red-500 rounded">
                  <div
                    className="inset-0 bg-background transition-all text-gray-300 p-3 z-10 max-sm:translate-x-1 max-sm:-translate-y-1
              hover:cursor-pointer sm:hover:translate-x-1 sm:hover:-translate-y-1 truncate rounded-[4px] border sm:border-gray-500/80 border-red-500  sm:hover:border-red-500 flex justify-center  items-center"
                  >
                    <p className="truncate">{values.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-1">
            <Button
              variant={"red"}
              disabled={startIndex - 1 < 0}
              onClick={previousClick}
              className={cn("p-2 h-6 w-6", arraylength < 4 && "hidden")}
            >
              <ChevronLeft size={1} />
            </Button>
            <Button
              variant={"red"}
              disabled={startIndex + 3 >= arraylength}
              onClick={nextClick}
              className={cn("p-2 h-6 w-6", arraylength < 4 && "hidden")}
            >
              <ChevronRight size={100} />
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Collections;
