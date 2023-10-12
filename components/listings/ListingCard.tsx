'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import HeartButton from "../HeartButton"
import { safeListing, safeReservation, safeUser } from "@/types/types"
import { ADMIN_ID } from "@/permissions"
import { Button } from "../ui/button"
import { useCallback, useMemo } from "react"
import { format } from "date-fns"
import { toast } from "react-hot-toast"
import { Card } from "../ui/card"
import { ArrowRight } from "lucide-react"


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

    const payNow =((e:
        React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
        toast.error('payments available soon')
    })


  return (
    <div
        onClick={()=> router.push(`/listings/${data.id}`)}
        className='col-span-1 cursor-pointer'>
        <Card className='flex flex-col gap-2 w-full rounded-b-lg pb-2'>
            <div className='aspect-video w-full relative overflow-hidden rounded-t-xl'>
                <Image src={data.imageSrc} alt="Image url" fill  
                    className='object-cover h-full w-full hover:scale-125 transition ease-in duration-300 '/>
                     { currentUser?.id !== ADMIN_ID && (
                        <div className='absolute top-3 right-6'>
                            <HeartButton listingId={data.id} currentUser={currentUser}/>
                        </div>
                    )}
            </div>
            <div className="px-3">
            <div className='text-xl font-semibold'>
                 {data.title}
            </div>
            <div className='text-sm'>
                 {data.category}
            </div>
            <div className='flex items-center justify-between gap-1'>
                <div className='font-semibold'>
                    $ {data.price}
                </div>
                <div className="flex justify-end ">
                <ArrowRight size={24}/>
            </div>
            </div>
          
            {onAction && actionLabel && (
                <div className="text-center">
                    <p className="text-lg pb-1 text-start">
                        {ReservatoionDate}
                    </p>
                    {admin && (
                        <div className="text-lg pb-2 text-muted-foreground text-start">
                            <p >
                            ClientName
                            </p>   
                            <span className="text-xl capitalize  text-black ">  
                            {reservation?.userName}
                            </span>
                        </div>
                    )}
                    {currentUser?.id === ADMIN_ID ? (
                        <Button
                            disabled={disabled}  onClick={handleCancel}>
                            {actionLabel}  
                        </Button>
                    ): (
                        <div className="flex flex-col space-y-2">
                            <Button 
                                variant='cancel'
                                disabled={disabled}  onClick={handleCancel}>
                                {actionLabel}  
                            </Button>
                            <Button 
                                variant='outline'
                                disabled={disabled} onClick={payNow}>
                                Pay now  
                            </Button>
                        </div>
                      
                    )}
                </div>
            )}
            </div>
        </Card>
    </div>
  )
}

export default ListingCard