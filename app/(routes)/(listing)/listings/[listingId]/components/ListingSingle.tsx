'use client'

import Container from "@/components/Container"
import ListingImage from "@/components/listings/ListingImage"
import ListingInfo from "@/components/listings/ListingInfo"
import { Card } from "@/components/ui/card"
import { useLoginModal } from "@/hooks/use-login-modal"
import { safeListing, safeUser } from "@/types/types"
import { Reservation } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { toast } from "react-hot-toast"


interface ListingSingleProps {
    currentUser:safeUser | null
    listing: safeListing & {
      user: safeUser
    }
    reservations?: Reservation[]
}

const initialDate = new Date()

const ListingSingle = ({currentUser, listing ,reservations=[]}: ListingSingleProps) => {

  const [isLoading, setIsLoading] =useState(false)
  const [date, setDate] = useState(initialDate)
  const loginModal = useLoginModal()
  const router = useRouter()


  const disabledDates = useMemo(() => {
    let dates : Date[] = []

    reservations.forEach((reservation) => {
      const reservationDate = reservation.date
   
     dates = [...dates,reservationDate]
    })
    return dates
  },[reservations])



  const onCreateReservation = async() => {

    if(!currentUser){
      return loginModal.onOpen()
    }

    try {
      setIsLoading(true)

      await axios.post('/api/reservation', {
        date, price:listing.price, listingId:listing.id
      })
      toast.success('Reservation Created Successfully')
      console.log(date)
      router.push("/visits")

    }catch(error){
        console.log(error)
        toast.error('Reservation Failed')
        
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
          onChangeDate={(value) => setDate(value)} 
          />
        </Card>
      </div>

    </Container>
  )
}

export default ListingSingle