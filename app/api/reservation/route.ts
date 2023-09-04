import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { ratelimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";


export async function POST(request: Request){

    try {

        const currentUser = await getCurrentUser()

        if(!currentUser){
            return NextResponse.error()
        }

        const body = await request.json()
        const {price, dateTime, listingId} = body

        if(!listingId || !dateTime  || !price){
            return new NextResponse("Missing fields", {status:422})
        }

         //rate limit part 
         const identifier = request.url + '-' + currentUser.id
         const {success} = await ratelimit(identifier)
 
         if(!success){
             return new NextResponse("To many Reservations created",{status:429})
         }
         //
 

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
                    userName: currentUser.name
                }
            }
            }
        })

        //notifications part

        try {

           await prismadb.notification.create({
            data: {
                body: 'User Created Reservation',
                userId: currentUser.id,
                userName: currentUser.name
            }
           })

           await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                hasNotification: false
            }
           })

        }catch(error){
            console.log('NOTIF RESERVATION ERROR', error)
            return new NextResponse("Notification unavailable")
        }



        return NextResponse.json(listingAndReservation)
    
    }catch(error){
        console.log('POST RESERVATION_ERROR', error)
        return new NextResponse ('Internal Server Error', {status:500})
    }

}