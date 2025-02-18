import { prisma as db } from "@/prisma";
import { unstable_cache } from "next/cache";
import { cn } from "@/lib/utils";
import GridExample from "./ag-grid";
import GridPattern from "@/components/ui/grid-pattern";

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
    <div className="max-w-screen-md h-[100vh] w-full mx-auto overflow-x-visible pt-16 p-4">
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] z-[-10]",
        )}
      />
      <p className="text-4xl font-spaceGrotesk font-semibold text-red-500 mb-3">
        Leaderboard
      </p>
      <div className="h-[80vh]">
        <GridExample data={leaderBoard} />
      </div>
    </div>
  );
}
