import prismadb from "@/lib/prismadb";

export default async function getListings(){

    const listings = await prismadb.listing.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return listings
}