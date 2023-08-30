'use client'

import Container from "@/components/Container"
import ListingCard from "@/components/listings/ListingCard"
import { safeReservation } from "@/types/types"


interface VisitClientProps {
    reservations: safeReservation[]
}

const VisitClient = ({reservations}: VisitClientProps) => {


  return (
 
     <Container>
      {reservations.map((reservation :any) => (
        <ListingCard reservation={reservation} data={reservation.listing}/>
      ))}
     </Container>
  )
}

export default VisitClient