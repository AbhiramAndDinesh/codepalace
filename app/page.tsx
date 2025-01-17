// import Image from "next/image";
// import { signIn } from "@/auth";
// import { useSession } from "next-auth/react";
// import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import {
  Crown,
  SquareLibrary,
  ChartNoAxesCombined,
  Shapes,
} from "lucide-react";
import Link from "next/link";

const HoverCard = ({
  href,
  heading,
  des,
}: {
  href: string;
  heading: string;
  des: string;
}) => {
  return (
    <div className="relative sm:aspect-square aspect-[1/.75] sm:rounded-md rounded-2xl mb-5">
      <Link
        href={href}
        className="group min-w-full transition-all hover:text-red-500 text-background font-medium font-spaceGrotesk bg-red-500 min-h-full grow hover:bg-background hover:translate-x-3 hover:translate-y-[-12px] border sm:rounded-md rounded-xl border-red-500 p-3 max-sm:p-6 duration-400 block"
      >
        <div className="flex gap-2 items-center text-lg max-sm:text-2xl font-semibold">
          <p>{heading}</p>
          {heading === "Leaderboard" && (
            <ChartNoAxesCombined
              size={20}
              className="bg-red-500 rounded-sm text-background max-sm:w-[30px] max-sm:h-[30px] p-0.5"
            />
          )}
          {heading === "Collections" && (
            <SquareLibrary
              size={20}
              className="bg-red-500 rounded-sm text-background p-0.5 max-sm:w-[30px] max-sm:h-[30px]"
            />
          )}
          {heading === "Courses" && (
            <Shapes
              size={20}
              className="bg-red-500 rounded-sm text-background p-0.5 max-sm:w-[30px] max-sm:h-[30px]"
            />
          )}
        </div>
        <p className="font-gabarito mt-5 max-sm:text-xl text-background transition-all duration-400 group-hover:text-gray-400">
          {des}
        </p>
      </Link>
      <DotPattern
        height={6}
        width={6}
        className="z-[-10] fill-red-400/50 rounded-md max-sm:hidden"
      />
    </div>
  );
};

const HoverCardReverse = ({
  href,
  heading,
  des,
}: {
  href: string;
  heading: string;
  des: string;
}) => {
  return (
    <div className="relative sm:aspect-square aspect-[1/.75] sm:rounded-md rounded-2xl mb-5">
      <Link
        href={href}
        className="group min-w-full transition-all hover:text-red-500 text-background font-medium font-spaceGrotesk bg-gray-400 min-h-full grow hover:bg-background hover:translate-x-3 hover:translate-y-[-12px] border sm:rounded-md border-gray-400 hover:border-red-500 rounded-xl p-3 max-sm:p-6 duration-400 block"
      >
        <div className="flex gap-2 items-center text-lg max-sm:text-2xl font-semibold">
          <p>{heading}</p>
          {heading === "Leaderboard" && (
            <ChartNoAxesCombined
              size={20}
              className="group-hover:bg-red-500 duration-400 transition-colors rounded-sm text-background p-0.5 max-sm:w-[30px] max-sm:h-[30px]"
            />
          )}
          {heading === "Collections" && (
            <SquareLibrary
              size={20}
              className="group-hover:bg-red-500 duration-400 transition-colors rounded-sm text-background p-0.5 max-sm:w-[30px] max-sm:h-[30px]"
            />
          )}
          {heading === "Courses" && (
            <Shapes
              size={20}
              className="group-hover:bg-red-500 duration-400 transition-colors rounded-sm text-background p-0.5 max-sm:w-[30px] max-sm:h-[30px]"
            />
          )}
        </div>
        <p className="font-gabarito max-sm:text-xl mt-5 text-background transition-all duration-400 group-hover:text-gray-400">
          {des}
        </p>
      </Link>
      <DotPattern
        height={6}
        width={6}
        className="z-[-10] fill-red-400/50 rounded-md max-sm:hidden"
      />
    </div>
  );
};

export default function Home() {
  // const { data: session } = useSession();
  // const userId = session?.user;
  return (
    <div className="p-5 max-w-screen-md m-auto">
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] z-[-10]",
        )}
      />

      <div className="w-full mt-32  flex flex-col">
        <div className="flex items-center gap-2">
          <Crown
            size={30}
            className="text-background bg-red-500 rounded-sm p-1"
          />
          <h2 className="text-3xl font-spaceGrotesk text-red-500 font-semibold">
            CodePalace
          </h2>
        </div>

        <h1 className="text-5xl font-spaceGrotesk font-semibold text-gray-300 mt-5">
          Learn. Solve. Conquer
        </h1>
        <p className="text-lg text-gray-400 mt-5 sm:pr-28 pr-12 font-gabarito">
          Explore a platform where you can solve coding questions, build and
          share collections, and compete to reign at the top of the leaderboard.
        </p>
        <Link href={"/problems"} className="mt-7">
          <InteractiveHoverButton
            text="Explore Problems"
            className="bg-gray-300 w-[220px]"
          />
        </Link>
      </div>

      {/* Content Cards */}
      <div className="mt-16 sm:grid sm:grid-cols-3 gap-7">
        <HoverCard
          href={"/"}
          heading="Leaderboard"
          des="See where you stand in the community and challenge yourself to climb higher."
        />
        <HoverCardReverse
          href={"/"}
          heading="Collections"
          des="Create, share, and explore sets of problems—private for personal practice or public for collaboration."
        />
        <HoverCard
          href={"/"}
          heading="Courses"
          des="Learn Java and Python with beginner-friendly courses—more languages coming soon!"
        />
      </div>
    </div>
  );
}
