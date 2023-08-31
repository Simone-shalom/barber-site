import prismadb from "@/lib/prismadb";

export interface getListingsParams {
    category?: string;
}

export default async function getListings(searchparams: getListingsParams){

    try {

        const {category} = searchparams;

        let query: any = {}

        if(category){
            query.category = category
        }

        const listings = await prismadb.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListing = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))

        return safeListing

    }catch(error: any){
        throw new Error(error)
    }
}