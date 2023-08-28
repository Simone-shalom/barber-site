import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/get-current-user";

interface IFavouriteParams {
    listingId?: string;
}

export async function POST(req: Request, {params}: {params: IFavouriteParams}) {

    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("user not found", {status:401})
        }
    
        const {listingId} =params
    
        if(!listingId || typeof listingId !== "string"){
           return new NextResponse('Invalid listing', {status:400})
        }
    
        let favouriteIds = [...(currentUser.favouriteIds || [] )]
    
        favouriteIds.push(listingId)
    
        const updateUser = await prismadb.user.update({
            where : {
                id: currentUser.id
            },
            data: {
                favouriteIds: favouriteIds
            }
        })
    
        return NextResponse.json(updateUser)

    }catch(error){
        return new NextResponse ('Internal Server Error', {status:500})
    }
}


export async function DELETE(req: Request, {params}: {params: IFavouriteParams}){

    try {
        
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return new NextResponse("user not found", {status:401})
        }

        const {listingId} = params

        if(!listingId || typeof listingId !== "string"){
            return new NextResponse('Invalid listing', {status:400})
         }

        let favouriteIds = [...(currentUser.favouriteIds || [])]

        favouriteIds = favouriteIds.filter((id) => id !== listingId)

        const updateUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favouriteIds: favouriteIds
            }
        })

        return NextResponse.json(updateUser)

    }catch(error){
        return new NextResponse ('Internal Server Error', {status:500})
    }

}

