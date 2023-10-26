import prismadb from "@/lib/prismadb";
import { redis } from "@/lib/redis";

export interface getListingsParams {
    category?: string;
}

export default async function getListings(searchparams: getListingsParams){

    try {

        const {category} = searchparams;

        let query: any = {}
        // cacheKey for redis
        let cacheKey = 'listings';

        if(category){
            query.category = category
            cacheKey += `:${category}`;
        }

          // Check if the data exists in Redis
          const cachedListings = await redis.get(cacheKey);
          if (cachedListings) {
              return JSON.parse(cachedListings);
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

         // Store the data in Redis for future requests
         await redis.set(cacheKey, JSON.stringify(safeListing));


        return safeListing

    }catch(error: any){
        throw new Error(error)
    }
}