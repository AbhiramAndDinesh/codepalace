import { makeStreakZero } from "@/actions/streak";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await makeStreakZero();
    return new NextResponse("Succesfully executed Leetcode Api", {
      status: 200,
    });
  } catch (error) {
    console.log("Error in leetcode api", error);
    return new NextResponse("Error in leetcode api", { status: 500 });
  }
}
