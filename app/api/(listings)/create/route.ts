import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { ADMIN_ID } from "@/permissions";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {

    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.id !== ADMIN_ID) {
        return NextResponse.error()
    }

    const body = await req.json()
    const {title, desc, imageSrc, category, price} = body

    const listing = await prismadb.listing.create({
        data: {
            title: title,
            description: desc,
            imageSrc: imageSrc,
            category: category,
            price: parseInt(price,10),
            userId: currentUser.id
            
        }
    })

    return NextResponse.json(listing)

}