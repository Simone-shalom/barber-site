import prismadb from "@/lib/prismadb";

interface listingParams {
    listingId?: string;
}

export default async function getListingById(params: listingParams){

    const {listingId} = params;

    try {
        const listing = await prismadb.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        if(!listing){
            return null
        }

        return {...listing,
            createdAt: listing.createdAt.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
                emailVerified: 
                  listing.user.emailVerified?.toString() || null,
            }
        }


    }catch(error){
        throw new Error('listing error, action')
    }

}   