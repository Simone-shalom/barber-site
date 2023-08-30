import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request){

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()
    const {price, dateTime, listingId} = body

    if(!listingId || !dateTime  || !price){
        return new NextResponse("Missing fields", {status:400})
    }

    const listingAndReservation = await prismadb.listing.update({
        where: {
            id: listingId
        },
        data: {
          reservations: {
            create: {
                price,
                date: dateTime,
                userId: currentUser.id,
            }
          }
        }
    })

    return NextResponse.json(listingAndReservation)

}