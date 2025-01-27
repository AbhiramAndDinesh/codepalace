import { columns } from "@/components/datatable";
import { DataTable } from "@/components/datatable";
import { prisma as db } from "@/prisma";
import { unstable_cache } from "next/cache";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";

const getLeaderboard = unstable_cache(
  async () => {
    const leaderboad = await db.leaderboard.findMany({
      select: {
        user_id: true,
        username: true,
        codechefRating: true,
        codechefProblemsSolved: true,
        codechefContestsAttended: true,
        codeforcesRating: true,
        codeforcesContestsAttended: true,
        leetcodeRating: true,
        leetcodeProblemsSolved: true,
        leetcodeContestsAttended: true,
      },
    });
    return leaderboad;
  },
  ["leaderboardData"],
  { revalidate: 10000, tags: ["leaderboardData"] },
);
export default async function Home() {
  const leaderBoard = await getLeaderboard();
  return (
    <div className="max-w-screen-md min-h-screen w-full mx-auto overflow-clip pt-24 p-4">
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] z-[-10]",
        )}
      />
      {/* <DotPattern
        className={cn(
          "[mask-image:linear-gradient(to_bottom,gray,transparent,transparent)]",
          "fill-red-500 z-[-100]",
        )}
      /> */}
      <p className="text-5xl font-spaceGrotesk font-semibold text-red-500">
        Leader Board
      </p>
      <DataTable columns={columns} data={leaderBoard} />
    </div>
  );
}
