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
      setIsLoading(true);
    
      const response = await axios.post('/api/reservation', {
        dateTime,
        price: listing.price,
        listingId: listing.id,
      });
    
      if (response.status === 200) {
        toast.success('Reservation Created Successfully');
        router.refresh();
        router.push('/visits');
      }
    } catch (error: any) {
      console.error(error);
    
      if (error.response && error.response.status === 422) {
        toast.error('You have to choose day and time:');
      } else if (error.response && error.response.status === 429) {
        toast.error('Too Many Reservations');
      } else {
        // Handle other errors if necessary
        toast.error('An error occurred');
      }
    } finally {
      setIsLoading(false);
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