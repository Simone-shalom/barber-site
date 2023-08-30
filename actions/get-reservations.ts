import prismadb from "@/lib/prismadb"

interface IReservationsParams {
    userId?: string
}


export default async function getReservations(params:IReservationsParams){

    try {

        const {userId} = params

        if(!userId){
          throw new Error("userId is required")
        }

        const reservations = await prismadb.reservation.findMany({
            where: {
                userId: userId
            },
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }) 
        const safeReservations = reservations.map((reservation)=> ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            date: reservation.date.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.createdAt.toISOString()
            }
        }))

        return safeReservations
        
    }catch(error){
        throw new Error('reservation error, action')
    }

}