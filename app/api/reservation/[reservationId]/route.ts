import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Iparams {
    reservationId: string;
}

export async function DELETE(req:Request, {params}: {params: Iparams}){


    const {reservationId} = params

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return new NextResponse("Unauthenticated", {status:403})
    }

    if(!reservationId){
        return new NextResponse("Invalid reservation ID", {status:400})
    }

    const reservation = await prismadb.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},
                {listing: {userId: currentUser.id}}
            ]
        }
    })

    return NextResponse.json(reservation)
}