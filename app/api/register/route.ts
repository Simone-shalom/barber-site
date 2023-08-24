import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const body = await req.json()
        const {email, password, name} = body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prismadb.user.create({
            data: {
                email: email,
                hashedPassword: hashedPassword,
                name: name
            }
        })

        return NextResponse.json(user);

    }catch(error){
        return new NextResponse("Internal Server Error", {status:500})
    }
}