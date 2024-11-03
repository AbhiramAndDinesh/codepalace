"use server";

import { prisma } from "@/prisma";

export const getUserfromEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user?.id;
};

export const getLeaderboardProfile = async (email: string) => {
  const id = await getUserfromEmail(email);
  const profile = await prisma.leaderboard.findUnique({
    where: {
      user_id: id,
    },
  });
  return profile;
};

export const checkUserProfile = async ({
  username,
  codechefusername,
  leetcodeusername,
  codeforcesusername,
}: {
  username: string;
  codeforcesusername: string;
  leetcodeusername: string;
  codechefusername: string;
}) => {
  try {
    const exusername = await prisma.leaderboard.findUnique({
      where: {
        username,
      },
    });
    const excodechefusername = await prisma.leaderboard.findUnique({
      where: {
        codechefusername,
      },
    });
    const excodeforcesusername = await prisma.leaderboard.findUnique({
      where: {
        codeforcesusername,
      },
    });
    const exleetcodeusername = await prisma.leaderboard.findUnique({
      where: {
        leetcodeusername,
      },
    });

    const obj: {
      username: boolean;
      leetcodeusername: boolean;
      codeforcesusername: boolean;
      codechefusername: boolean;
    } = {
      username: false,
      leetcodeusername: false,
      codechefusername: false,
      codeforcesusername: false,
    };
    if (exusername) obj.username = true;
    if (exleetcodeusername) obj.leetcodeusername = true;
    if (excodeforcesusername) obj.codeforcesusername = true;
    if (excodechefusername) obj.codechefusername = true;

    return obj;
  } catch (error) {
    console.log("Error actions/user.ts > checkUserProfile", error);
  }
};

export const createProfile = async ({
  user_id,
  username,
  codechefusername,
  leetcodeusername,
  codeforcesusername,
}: {
  user_id: string;
  username: string;
  codechefusername: string;
  leetcodeusername: string;
  codeforcesusername: string;
}) => {
  try {
    await prisma.leaderboard.create({
      data: {
        user_id,
        username,
        codechefusername,
        codeforcesusername,
        leetcodeusername,
      },
    });
  } catch (error) {
    console.log("Error actions/user.ts > createProfile", error);
  }
};
