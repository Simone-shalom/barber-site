'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import { PageWrapper } from "@/components/animations/pageWrapper"
import HeroHeading from "@/components/hero/HeroHeading"
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

const VisitClient =  ({reservations ,currentUser}: VisitClientProps) => {

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

  const onPay = async (id:string) =>{

    try{
      const response = await axios.post(`/api/checkout/${id}`)

      window.location.assign(response.data.url)

    }catch(err){
      toast.error('Checkout unavailable')
    }

  }

  return (
 
     <Container>
      <Heading title="Your Visits" desc="You can check your current visits and cancel them if you want"/>
      <div className="pt-7 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 2xl:grid-cols-4">
          {reservations.map((reservation: any) => (
            <PageWrapper key={reservation.id}>
            <div key={reservation.id}>
              <ListingCard reservation={reservation} data={reservation.listing}
               actionId={reservation.id} onAction={onCancel} onPay={onPay}
               currentUser={currentUser} actionLabel="Cancel Reservation"
               />
            </div>
            </PageWrapper>
          ))}
      </div>
     </Container>
  )
}

export default VisitClient