import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const id = body.id;
        const profile = await prisma.leaderboard.findUnique({
            where:{
                user_id:id,
            },
        })
        if(!profile){
            return new NextResponse("Profile not found",{status:404});
        }
        console.log(profile,id);
        return NextResponse.json(profile)
    } catch (error) {
        console.log("Error in getting profile /api/profile/getprofile");
        console.log(error);
        return new NextResponse("Error in getting profile", { status: 500 });
    }
}