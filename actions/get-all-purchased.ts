import prismadb from "@/lib/prismadb"



export default async function getPurchased(){

    try {

        const purchased = await prismadb.payment.findMany({
            include: {
                reservation: true
            }
        })
        const safePurchased = purchased.map((purchase)=> ({
            ...purchase,
            createdAt: purchase.createdAt.toISOString(),
            updatedAt: purchase.updatedAt.toISOString(),
            reservation: {
                ...purchase.reservation,
                createdAt: purchase.reservation.createdAt.toISOString(),
                date: purchase.reservation.date.toISOString(),
            }
        }))

        return safePurchased
        
    }catch(error){
        throw new Error('reservation error, action')
    }

}