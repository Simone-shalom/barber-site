'use client'

import { Listing, User } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import HeartButton from "../HeartButton"
import { safeUser } from "@/types/types"
import { ADMIN_ID } from "@/permissions"


interface ListingCardProps {
    data: Listing
    currentUser?: safeUser | null
}

const ListingCard = ({data, currentUser}:ListingCardProps) => {

    const router = useRouter()

  return (
    <div 
        onClick={()=> router.push(`/listings/${data.id}`)}
        className='col-span-1 cursor-pointer'>
        <div className='flex flex-col gap-2 w-full'>
            <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
                <Image src={data.imageSrc} alt="Image url" fill  
                    className='object-cover h-full w-full hover:scale-110 transition ease-in '/>
                    { currentUser?.id !== ADMIN_ID && (
                        <div className='absolute top-3 right-6'>
                            <HeartButton listingId={data.id} currentUser={currentUser}/>
                        </div>
                    )}
            </div>
            <div className='text-xl font-semibold'>
                 {data.title}
            </div>
            <div className='text-sm'>
                 {data.category}
            </div>
            <div className='flex items-center gap-1'>
                <div className='font-semibold'>
                    $ {data.price}
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default ListingCard