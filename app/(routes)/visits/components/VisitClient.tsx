'use client'

import Container from "@/components/Container"
import ListingCard from "@/components/listings/ListingCard"
import ListingInfo from "@/components/listings/ListingInfo"
import { Card } from "@/components/ui/card"
import { safeReservation, safeUser } from "@/types/types"
import { useState } from "react"
import { toast } from "react-hot-toast"


interface VisitClientProps {
    reservations: safeReservation[]
    currentUser: safeUser
}

const VisitClient = ({reservations ,currentUser}: VisitClientProps) => {

  const [deletedId, setDeletedId] = useState('')

 const onCancel = ((id: string) => {
    setDeletedId(id)
    toast.success('Reservation canceled')
  })

  return (
 
     <Container>
      <div className="pt-48 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
          {reservations.map((reservation: any) => (
            <div key={reservation.id}>
              <ListingCard reservation={reservation} data={reservation.listing}
               actionId={reservation.id} onAction={onCancel} 
               currentUser={currentUser} actionLabel="Cancel Reservation"
               />
            </div>
          ))}
      </div>
     </Container>
  )
}

export default VisitClient