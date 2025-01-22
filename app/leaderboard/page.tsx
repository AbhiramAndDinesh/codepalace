import { columns } from "@/components/datatable";
import { DataTable } from "@/components/datatable";
import { prisma as db } from "@/prisma";
import { unstable_cache } from "next/cache";

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
    <div className="max-w-screen-md min-h-screen w-full mx-auto overflow-clip pt-24">
      <p className="text-4xl font-spaceGrotesk font-semibold text-red-500">
        Leader Board
      </p>
      <DataTable columns={columns} data={leaderBoard} />
    </div>
  );
}
