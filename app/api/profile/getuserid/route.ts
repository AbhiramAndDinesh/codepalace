import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const email = body.email;
        console.log(email);
        const user = await prisma.user.findUnique({
            where:{
                email:email,
            },
            select:{
                id:true,
            }
        })
        if(!user){
            return new NextResponse("User not found",{status:404});

        }
        console.log(user,email);
        return NextResponse.json(user)
    }catch(error){
        console.log("Error in getting userid /api/profile/getuserid");
        console.log(error);
        return new NextResponse("Error in getting userid",{status:500});
    }
}