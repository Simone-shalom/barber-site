'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import ListingCard from "@/components/listings/ListingCard"
import { Button } from "@/components/ui/button"
import { safeReservation, safeUser } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"


interface VisitClientProps {
    reservations: safeReservation[]
    currentUser?: safeUser | null
}

const VisitClient = ({reservations ,currentUser}: VisitClientProps) => {

  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const [deletedId, setDeletedId] = useState('')

// next caching, so its cached on client side, 
// which means that after changes((canceling reservation by admin)) 
//data will be refresh after 30s when we navigate in site 
// im ommitting it by refeching it on call when user click into page
//using useEffect and router.refresh()
//so client/user have fresh data everytime 
  useEffect(() => {
    setMounted(true)
    router.refresh()
  },[router])

  if(!mounted){
    return null
  }


 const onCancel = ((id: string) => {
    setDeletedId(id)

    axios.delete(`/api/reservation/${id}`)
    .then(() => {
      toast.success('Reservation Cancelled')
      router.refresh()
    })
    .catch(() => {
      toast.error('Error cancelling reservation')
    })
    .finally(() => {
      setDeletedId('')
    })

  })

  return (
 
     <Container>
      <Heading title="Your Visits" desc="You can check your current visits and cancel them if you want" />
      <div className="pt-7 pb-5 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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