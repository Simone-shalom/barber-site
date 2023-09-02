import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    userId: string;
}

export async function POST(request: Request, {params}: {params: IParams}){

    try {

        const {userId} = params

        if(!userId || typeof userId !== "string"){
            return new NextResponse("invalid userId", {status:400})
        }

        const notifications = await prismadb.notification.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

         return NextResponse.json(notifications)

    } catch(error){
        console.log('POST NOTIFICATION_ERROR' , error)
        return new NextResponse("Internal Server Error", {status:500})
    }
}

export async function DELETE(request: Request, {params}: {params: IParams}){

    try {

        const {userId} = params

        if(!userId || typeof userId !== "string"){
            return new NextResponse("invalid userId", {status:400})
        }

        const notifications = await prismadb.notification.deleteMany({
        })

         return NextResponse.json(notifications)

    } catch(error){
        console.log('DELETE NOTIFICATION_ERROR' , error)
        return new NextResponse("Internal Server Error", {status:500})
    }
}


