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
  { revalidate: 10, tags: ["leaderboardData"] }
);
export default async function Home() {
  const leaderBoard = await getLeaderboard();
  return (
    <div className="min-h-screen w-full flex  flex-col items-center justify-center">
      <p className="text-3xl p-2">Leader Board</p>
      <DataTable columns={columns} data={leaderBoard} />
    </div>
  );
}
