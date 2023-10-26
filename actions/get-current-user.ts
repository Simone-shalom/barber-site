import { getServerSession } from "next-auth/next"
import prismadb from "@/lib/prismadb"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redis } from "@/lib/redis"


export async function getSession() {
  return await getServerSession(authOptions) 
}

export default async function getCurrentUser(){

    try {

        const session = await getSession()

        if(!session?.user?.email) {
            return null
        }

        //cached user
        const cachedUser = await redis.get(session.user.email);
        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

       const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email as string
          }
       })

       if(!currentUser){
        return null
       }

        const user = {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
        // Store the data in Redis for future requests
        await redis.set(session.user.email, JSON.stringify(user));

        return user

    }catch(error:any){
        return null
    }

}