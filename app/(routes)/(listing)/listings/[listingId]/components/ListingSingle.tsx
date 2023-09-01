'use client'

import Container from "@/components/Container"
import ListingImage from "@/components/listings/ListingImage"
import ListingInfo from "@/components/listings/ListingInfo"
import { Card } from "@/components/ui/card"
import { useLoginModal } from "@/hooks/use-login-modal"
import { safeListing, safeReservation, safeUser } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { toast } from "react-hot-toast"


interface ListingSingleProps {
    currentUser:safeUser | null
    listing: safeListing & {
      user: safeUser
    }
    reservations?: safeReservation[]
}

export interface Datetype {
  justDate: Date | null
  dateTime: Date | null
}

const ListingSingle = ({currentUser, listing ,reservations=[]}:
   ListingSingleProps) => {

  const [isLoading, setIsLoading] =useState(false)
  const [date, setDate] = useState<Datetype>({
    justDate: null, dateTime: null,
  })
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    const dates = reservations.map(reservation => new Date(reservation.date));
    return dates;
  }, [reservations]);

  const dateTime =date.dateTime

  const onCreateReservation = async() => {

    if(!currentUser){
      return loginModal.onOpen()
    }

    try {
      setIsLoading(true)

      await axios.post('/api/reservation', {
         dateTime, price:listing.price, listingId:listing.id
      })
      toast.success('Reservation Created Successfully')
      router.refresh()
      router.push("/visits")

    }catch(error){
        console.log(error)
        toast.error('You have to choose time for reservation')
        
    }finally{
        setIsLoading(false)


    }
  }

  return (
    <Container>
      <div className="py-20  px-4 sm:px-6 lg:px-8 w-full h-full">
        <Card className="md:grid md:grid-cols-2  md:items-start md:gap-x-8 mt-20 ">
         <ListingImage listing={listing} currentUser={currentUser}/>
         <ListingInfo 
          onSubmit={onCreateReservation}
          listing={listing} currentUser={currentUser} user={listing.user}
          date={date} setDate={setDate}
          dDates={disabledDates}
          />
        </Card>
      </div>

    </Container>
  )
}

export default ListingSingle