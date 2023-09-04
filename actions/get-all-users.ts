import prismadb from "@/lib/prismadb"

export default async function getAllUsers(){

    try {
       const allUsers = await prismadb.user.count()

       if(!allUsers){
        return null
       }

    return allUsers

}catch(error){
    throw new Error('All users error')
}

}