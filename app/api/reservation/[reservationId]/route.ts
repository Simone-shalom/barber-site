import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { ADMIN_ID } from "@/permissions";
import { NextResponse } from "next/server";

interface Iparams {
    reservationId: string;
}

export async function DELETE(req:Request, {params}: {params: Iparams}){

    try {


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

         //notifications part

         try {

            if(currentUser.id !== ADMIN_ID){
                await prismadb.notification.create({
                    data: {
                        body: 'User Deleted a Reservation',
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
            }
         }catch(error){
            console.log('NOTIF RESERVATION ERROR', error)
            return new NextResponse("Notification unavailable")
         }


        return NextResponse.json(reservation)
    
    }catch(error){
        console.log('DELETE RESERVATION_ERROR', error)
        return new NextResponse ('Internal Server Error', {status:500})
    }
}