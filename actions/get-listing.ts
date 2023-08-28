import prismadb from "@/lib/prismadb";

export interface getListingsParams {
    category?: string;
}

export default async function getListings(searchparams: getListingsParams){

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

    return listings
}