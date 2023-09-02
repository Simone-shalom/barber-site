import prismadb from "@/lib/prismadb"

interface IReservationsParams {
    userId?: string
    listingId?: string
}


export default async function getReservations(params:IReservationsParams){

    try {

        const {userId, listingId} = params

        const query:any = {}

        if(listingId){
            query.listingId = listingId
        }

        if(userId){
            query.userId = userId
        }
       

        const reservations = await prismadb.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                date: 'asc'
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