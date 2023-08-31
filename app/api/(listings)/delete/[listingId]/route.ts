import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { ADMIN_ID } from "@/permissions";
import { NextResponse } from "next/server";


interface Iparams {
    listingId: string;
}

export async function DELETE(req: Request, {params}: {params: Iparams}){

    const {listingId} = params

    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.id !==ADMIN_ID){
        return new NextResponse("Unathenticated", {status: 403})
    }

    if(!listingId || typeof listingId !== 'string'){
        return new NextResponse("Listing id is required", {status:400})
    }

    const listing = await prismadb.listing.delete({
        where: {
            id: listingId
        }   
    })

    return NextResponse.json(listing)

}