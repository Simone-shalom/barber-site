import prismadb from "@/lib/prismadb"


export default async function getPastReservations(){
    
    try {

        const pastReservations = await prismadb.reservation.findMany({
            include: {
                listing: true
            },
            orderBy: {
                date: 'asc'
            }
        })

        // filtering reservations if date is in past/ its outdated
        const currentDate= new Date()

        const filteredPastReservations = pastReservations.filter(reservation => {
            const reservationDate = new Date(reservation.date)
            return reservationDate <= currentDate
        })

        const safePastReservations = filteredPastReservations.map((reservation)=> ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            date: reservation.date.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.createdAt.toISOString()
            }
        }))

        return safePastReservations
        
    }catch(error){
        throw new Error('reservation error, action')
    }

}