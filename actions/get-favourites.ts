import prismadb from "@/lib/prismadb";
import getCurrentUser from "./get-current-user";

export default async function getFavourites () {

    try {

        const currentUser = await getCurrentUser()

        if(!currentUser){
            return null
        }

        const favourites = await prismadb.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds)]
                }
            }
        })

        const safeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createdAt: favourite.createdAt.toISOString()
        }))

        return safeFavourites
    } catch (err: any) {
        throw new Error(err)
    }

}