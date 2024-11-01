/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma as db } from "@/prisma";
import axios from "axios";

// const { NextResponse } = require("Next/server");
// const axios = require("axios");
// const { PrismaClient } = require("@prisma/client");
// const db = new PrismaClient();
async function codeforcesScrape(params: {
  user_id: string;
  codeforcesusername: string | undefined | null;
}) {
  try {
    if (
      params.codeforcesusername === undefined ||
      params.codeforcesusername === null
    ) {
      return {
        user_id: params.user_id,
        codeforcesRating: 0,
        codeforcesContestsAttended: 0,
      };
    }
    const { user_id, codeforcesusername } = params;
    console.log("checking codeforces api");
    const response = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${codeforcesusername}`
    );

    // if (response.status === 400) {
    //   return {
    //     user_id: params.user_id,
    //     codeforcesRating: 0,
    //     codeforcesContestsAttended: 0,
    //   };
    // }
    const contests = response.data.result;
    const contestsAttended = contests.length;
    const codeforcesRating =
      contestsAttended> 0 ? contests.pop().newRating : 0;
    console.log("Codeforces:", codeforcesRating, contestsAttended);
    return {
      user_id: user_id,
      codeforcesRating: codeforcesRating,
      codeforcesContestsAttended: contestsAttended,
    };
  } catch (error) {
    console.log("error in scraping codefroces api(mostly user not found so kept default values 0");
    return {
      user_id: params.user_id,
      codeforcesRating: 0,
      codeforcesContestsAttended: 0,
    };
  }
}
async function codeforcesUpdate(params: {
  user_id: string;
  codeforcesRating: number;
  codeforcesContestsAttended: number;
}) {
  try {
    const { user_id, codeforcesRating, codeforcesContestsAttended } = params;

    await db.leaderboard.update({
      where: {
        user_id: user_id,
      },
      data: {
        codeforcesRating: codeforcesRating,
        codeforcesContestsAttended: codeforcesContestsAttended,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Error occured during updating the codeforces values...");
  }
}
// const params = { user_id: "1", codeforcesusername: "dineshkrishna04" };
// codeforcesScrape(params);
async function codeforcesMain() {
  try {
    const users = await db.leaderboard.findMany({
      select: {
        user_id: true,
        codeforcesusername: true,
      },
    });

    console.log(users);
    const codeforcesData = users.map(
      async ({
        user_id,
        codeforcesusername,
      }: {
        user_id: string;
        codeforcesusername: string | undefined | null;
      }) => {
        if (codeforcesusername === undefined || codeforcesusername === null) {
          return {
            user_id: user_id,
            codeforcesRating: 0,
            codeforcesContestsAttended: 0,
          };
        }
        const data = await codeforcesScrape({ user_id, codeforcesusername });
        return data;
      }
    );

    const codeforcesDataArray = await Promise.all(codeforcesData);
    const codeforcesUpdatePromise = codeforcesDataArray
      .filter((values) => values != undefined)
      .map(async (values) => {
        await codeforcesUpdate(values);
      });

    await Promise.all(codeforcesUpdatePromise);
    console.log("successfully updated");
    return new NextResponse("Successfully updated", { status: 200 });
  } catch (error) {
    console.log("Error in codeforces api...");
    return new NextResponse("Error in codeforces api...", { status: 500 });
  } finally {
    db.$disconnect();
  }
}

export async function POST(){
    try{
        console.log("Codeforces API called");
        const res = await codeforcesMain();
        if(res.status===200){
            return new NextResponse("Successfully executed codeforces API", { status: 200 });
        }
        else{
            console.log("Error in executing codeforces API");
            return new NextResponse("Error in executing codeforces API", { status: 500 });
        }
    }catch(error){
        console.log("Caught an error in codeforces api");
        return new NextResponse("Caught an error in codeforces api", { status: 500 });
    }
}

