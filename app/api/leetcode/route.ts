import { NextResponse } from "next/server";
import { prisma as db } from "@/prisma";
import axios from "axios";
async function leetcodeScrape(params: {
  user_id: string;
  leetcodeusername: string;
}) {
  try {
    const url = "https://leetcode.com/graphql";
    const query = `query userProblemsSolvedd($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
      }
    }`;
    const { user_id, leetcodeusername } = params;
    const response = await axios.post(
      url,
      { query: query, variables: { username: leetcodeusername } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Response from leetcode graphql", response.status);
    console.log(response.data);
    if (response.status !== 200) {
      console.log("Error in leetcode graphql");
      return {
        user_id,
        leetcodeRating: 0,
        leetcodeProblemsSolved: 0,
        leetcodeContestsAttended: 0,
      };
    }
    if (response.data.errors) {
      return {
        user_id,
        leetcodeRating: 0,
        leetcodeProblemsSolved: 0,
        leetcodeContestsAttended: 0,
      };
    }
    const data = response.data.data;
    const leetcodeContestsAttended =
      data.userContestRanking === null
        ? 0
        : data.userContestRanking.attendedContestsCount;
    const leetcodeRating =
      data.userContestRanking === null ? 0 : data.userContestRanking.rating;
    const leetcodeProblemsSolved =
      data.matchedUser.submitStatsGlobal.acSubmissionNum[0].count;
    console.log(
      `Leetcode Problems Solved:${leetcodeProblemsSolved},Rating:${leetcodeRating},ContestsAttended:${leetcodeContestsAttended}`,
    );
    return {
      user_id,
      leetcodeRating,
      leetcodeProblemsSolved,
      leetcodeContestsAttended,
    };
  } catch (error) {
    console.log("Error in leetcode qraphql", error);
  }
}

async function leedcodeUpdate(params: {
  user_id: string;
  leetcodeRating: number;
  leetcodeProblemsSolved: number;
  leetcodeContestsAttended: number;
}) {
  try {
    const {
      user_id,
      leetcodeRating,
      leetcodeProblemsSolved,
      leetcodeContestsAttended,
    } = params;
    await db.leaderboard.update({
      where: {
        user_id: user_id,
      },
      data: {
        leetcodeRating: leetcodeRating,
        leetcodeProblemsSolved: leetcodeProblemsSolved,
        leetcodeContestsAttended: leetcodeContestsAttended,
      },
    });
  } catch (error) {
    console.log("Error occured in updating the leetcode values", error);
  }
}

async function leetcodemain() {
  try {
    const users = await db.leaderboard.findMany({
      select: {
        user_id: true,
        leetcodeusername: true,
      },
    });
    console.log(users);

    const leetcodeData = users.map(
      async ({
        user_id,
        leetcodeusername,
      }: {
        user_id: string;
        leetcodeusername: string | undefined | null;
      }) => {
        if (leetcodeusername === undefined || leetcodeusername === null) {
          return {
            user_id,
            leetcodeRating: 0,
            leetcodeProblemsSolved: 0,
            leetcodeContestsAttended: 0,
          };
        }
        const data = await leetcodeScrape({ user_id, leetcodeusername });
        return data;
      },
    );

    const leetcodeDataArray = await Promise.all(leetcodeData);
    console.log(leetcodeDataArray, "scrapedvalues");

    const leetcodeupdatePromise = leetcodeDataArray
      .filter((values) => values !== undefined)
      .map(
        async (values: {
          user_id: string;
          leetcodeRating: number;
          leetcodeProblemsSolved: number;
          leetcodeContestsAttended: number;
        }) => {
          await leedcodeUpdate(values);
        },
      );

    await Promise.all(leetcodeupdatePromise);
    console.log("successfully updated");
    return new NextResponse("Successfully updated", { status: 200 });
  } catch (error) {
    console.log("Error occured in leetcodemain", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

export async function POST() {
  try {
    console.log("Leetcode Api called");
    const res = await leetcodemain();
    if (res.status === 200) {
      console.log("Succesfully executed Leetcode Api");
      return new NextResponse("Succesfully executed Leetcode Api", {
        status: 200,
      });
    } else {
      console.log("Error in leetcode api");
      return new NextResponse("Error in leetcode api", { status: 500 });
    }
  } catch (error) {
    console.log("Error in leetcode api", error);
    return new NextResponse("Error in leetcode api", { status: 500 });
  }
}
