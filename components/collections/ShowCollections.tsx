"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  BookLock,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  SquareLibrary,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CreateCollectionModel from "./CreateCollectionModel";
import GridPattern from "../ui/grid-pattern";
interface Collection {
  collection_id: string;
  name: string;
  isPublic: boolean;
  saved: number;
  owner_id: string;
  slug: string;
}
interface ShowCollectionsProps {
  privateCollections: Collection[];
  publicCollections: Collection[];
  user_id: string;
}

const ShowCollections = ({
  privateCollections,
  publicCollections,
  user_id,
}: ShowCollectionsProps) => {
  const [privatestartIndex, setprivateStartIndex] = useState(0);
  const [publicstartIndex, setpublicStartIndex] = useState(0);
  const privatearraylength = privateCollections.length;
  const publicarraylength = publicCollections.length;
  const nextClick = (x: string) => {
    if (x === "private") {
      if (privatestartIndex + 3 < privatearraylength) {
        setprivateStartIndex(privatestartIndex + 1);
        // console.log(privatestartIndex);
      }
    }
    if (x === "public") {
      if (publicstartIndex + 3 < publicarraylength) {
        setpublicStartIndex(publicstartIndex + 1);
      }
    }
  };
  const previousClick = (x: string) => {
    if (x === "private") {
      if (privatestartIndex - 1 >= 0) {
        setprivateStartIndex(privatestartIndex - 1);
      }
    }
    if (x === "public") {
      if (publicstartIndex - 1 >= 0) {
        setpublicStartIndex(publicstartIndex - 1);
      }
    }
  };
  return (
    <div className="p-5">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] -z-20 h-[300px]"
        )}
      />
      <div className="w-full flex flex-col sm:mt-20 mt-12  gap-4">
        <div className="flex items-center gap-2 font-bold">
          <h2 className=" text-3xl font-spaceGrotesk text-red-500 ">
            Collections
          </h2>
          <SquareLibrary
            size={20}
            className="bg-red-500 rounded-sm  p-0.5 sm:w-[25px]  sm:h-[25px]"
          />
        </div>
        <div className="flex flex-col gap-3 max-sm:gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 font-spaceGrotesk font-semibold">
              <h2 className="text-2xl text-gray-300">Private</h2>
              <BookLock size={20} color="#d1d5db" />
            </div>
            <CreateCollectionModel user_id={user_id} />
            
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3  max-mobile:flex max-mobile:flex-col max-mobile:gap-4 max-mobile:justify-center max-sm:pr-1  gap-4 ">
            {privateCollections
              .slice(privatestartIndex, privatestartIndex + 3)
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
              disabled={privatestartIndex - 1 < 0}
              onClick={() => {
                previousClick("private");
              }}
              className={cn("p-2 h-6 w-6", privatearraylength < 4 && "hidden")}
            >
              <ChevronLeft size={1} />
              {/* {privatestartIndex} */}
            </Button>
            <Button
              variant={"red"}
              disabled={privatestartIndex + 3 >= privatearraylength}
              onClick={() => {
                nextClick("private");
              }}
              className={cn("p-2 h-6 w-6", privatearraylength < 4 && "hidden")}
            >
              <ChevronRight size={100} />
              {/* {privatestartIndex} */}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-sm:gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 font-spaceGrotesk font-semibold">
              <h2 className="text-2xl text-gray-300">Public</h2>
              <BookMarked size={20} color="#d1d5db" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3  max-mobile:flex max-mobile:flex-col max-mobile:gap-4 max-mobile:justify-center max-sm:pr-1  gap-4 ">
            {publicCollections
              .slice(publicstartIndex, publicstartIndex + 3)
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
              disabled={publicstartIndex - 1 < 0}
              onClick={() => previousClick("public")}
              className={cn("p-2 h-6 w-6", publicarraylength < 4 && "hidden")}
            >
              <ChevronLeft size={1} />
            </Button>
            <Button
              variant={"red"}
              disabled={publicstartIndex + 3 >= publicarraylength}
              onClick={() => nextClick("public")}
              className={cn("p-2 h-6 w-6", publicarraylength < 4 && "hidden")}
            >
              <ChevronRight size={100} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCollections;
