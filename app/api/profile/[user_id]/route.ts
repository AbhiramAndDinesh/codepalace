import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
export async function PATCH(
    req:Request,
    {params}:{params:{user_id:string}}
){
    try{
        const {user_id} = await params;
        const res = await req.json();
        console.log(res);
        await prisma.leaderboard.update({
            where:{
                user_id
            },
            data:{
                ...res
            }
        })
        console.log("I am in the profile route");
        return new NextResponse("Updated",{status:200});
    }catch(err){
        console.log("Error in profile route");
        return new NextResponse("UnSuccessfull",{status:500});
    }
    
}