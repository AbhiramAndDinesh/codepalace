import { NextResponse } from "next/server";
import { prisma as db } from "@/prisma";
import axios from "axios";
import * as cheerio from "cheerio";
async function codechefScrape(params: {
  user_id: string;
  codechefusername: string;
}) {
  try {
    const { user_id, codechefusername } = params;
    const data = await axios.get(
      `https://codechef.com/users/${codechefusername}`
    );
    console.log(data.status);
    const $ = cheerio.load(data.data);
    const rating = $(".rating-number").text().trim();
    const contests = $(".contest-participated-count b").text().trim();
    const problems = $(".rating-data-section.problems-solved h3")
      .last()
      .text()
      .trim()
      .split(" ")
      .pop();
    const problemsSolved = problems === "Solved:" ? 0 : problems;
    return {
      user_id: user_id || "",
      codechefRating: Number(rating) || 0,
      codechefContestsAttended: Number(contests) || 0,
      codechefProblemsSolved: Number(problemsSolved) || 0,
    };
  } catch (error) {
    console.log("Error occured in codechefScrape", error);
  }
}
async function codechefUpdate(params: {
  user_id: string;
  codechefRating: number;
  codechefContestsAttended: number;
  codechefProblemsSolved: number;
}) {
  try {
    if (!params || !params.user_id) {
      console.log("Invaluser_id parameters passed to codechefUpdate", params);
      return; // Early return if params or user_id is missing
    }
    const {
      user_id,
      codechefRating,
      codechefContestsAttended,
      codechefProblemsSolved,
    } = params;
    // console.log(user_id,data.codechefContestsAttended,data.codechefRating);
    await db.leaderboard.update({
      where: {
        user_id: user_id,
      },
      data: {
        codechefRating: codechefRating,
        codechefContestsAttended: codechefContestsAttended,
        codechefProblemsSolved: codechefProblemsSolved,
      },
    });
  } catch (error) {
    console.log("Error occured in codechefUpdate", error);
  }
}
async function ccmain() {
  try {
    const users = await db.leaderboard.findMany({
      select: {
        user_id: true,
        codechefusername: true,
      },
    });

    const codechefData = users.map(
      async ({
        user_id,
        codechefusername,
      }: {
        user_id: string;
        codechefusername: string | null;
      }) => {
        if (codechefusername === null) {
          return {
            user_id,
            codechefRating: 0,
            codechefContestsAttended: 0,
            codechefProblemsSolved: 0,
          };
        }
        const data = await codechefScrape({
          user_id,
          codechefusername: codechefusername,
        });
        return data;
      }
    );

    const codechefDataArray = await Promise.all(codechefData);
    console.log(codechefDataArray, "abc");

    const updatePromise = codechefDataArray
      .filter((values) => values !== undefined)
      .map(async (values) => {
        await codechefUpdate(values);
      });
    await Promise.all(updatePromise);
    // console.log(users);
    return new NextResponse("Successfully updated", { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error occurred in scripts/codechef.ts", error.message);
    } else {
      console.log("Unknown error occurred in codechefapi", error);
    }
  } finally {
    await db.$disconnect();
  }
}
export async function POST() {
  try {
    console.log("Hello from codechef");
    await ccmain();
    return new NextResponse("Successfully updated", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
