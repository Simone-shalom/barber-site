'use client'

import { Listing, User } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import HeartButton from "../HeartButton"
import { safeListing, safeReservation, safeUser } from "@/types/types"
import { ADMIN_ID } from "@/permissions"
import { Button } from "../ui/button"
import { useCallback, useMemo } from "react"
import { format } from "date-fns"


interface ListingCardProps {
    data: safeListing
    currentUser?: safeUser | null
    reservation?: safeReservation
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    admin?: boolean
}

const ListingCard = ({data, currentUser, reservation,
     onAction, disabled, actionLabel, actionId='', admin}:
    ListingCardProps) => {

    const router = useRouter()

    const handleCancel = useCallback((e:
         React.MouseEvent<HTMLButtonElement>) => {
        //overwrite the onclick on parent div element
        e.stopPropagation()

        if(disabled){
            return 
        }
        onAction?.(actionId)
    },[disabled, onAction, actionId])


    const ReservatoionDate = useMemo(() => {
        if(!reservation){
            return null
        }

        const date = new Date(reservation.date)

        return `${format(date, 'HH:mm PP')}`
    },[reservation])


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
            {onAction && actionLabel && (
                <div>
                    <p className="text-lg ">
                        {ReservatoionDate}
                    </p>
                    {admin && (
                        <p className="text-lg pb-2 text-muted-foreground">
                            ClientName:   
                            <span className="text-xl capitalize  text-black pl-2 ">  
                            {reservation?.userName}
                            </span>
                        </p>
                    )}
                    <Button disabled={disabled}  onClick={handleCancel}>
                        {actionLabel}  
                    </Button>
                </div>
            )}
        </div>
    </div>
  )
}

export default ListingCard