"use server";

import { prisma } from "@/prisma";

export const getUserfromEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where:{
            email:email,
        }
    })
    return user?.id;
}

export const getLeaderboardProfile = async (email: string) => {
    const id = await getUserfromEmail(email);
    const profile = await prisma.leaderboard.findUnique({
        where:{
            user_id:id,
        },
    })
    return profile;
}