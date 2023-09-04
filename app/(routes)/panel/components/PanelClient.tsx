'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import ListingCard from "@/components/listings/ListingCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { safePastReservation, safeReservation, safeUser } from "@/types/types"
import axios from "axios"
import { BanknoteIcon, HomeIcon, Pencil } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface PanelClientProps {
    currentUser: safeUser
    reservationsCount: number
    pastReservations: safePastReservation[] 
    newestReservation: safeReservation | null
    allUsers: number
}

const PanelClient = ({ currentUser, reservationsCount,
     pastReservations, newestReservation, allUsers }:
     PanelClientProps) => {

      
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [deletedId, setDeletedId] = useState('')

  let totalIncome = 0;

  pastReservations.forEach(reservation => {
    totalIncome += reservation.price;
});


  const onCancel = ((id: string) => {
    setLoading(true)
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
      setLoading(false)
    })

  })



  return (
    <Container>
      <div className="flex items-center">
      <Heading title="Admin Panel" desc="Your daily dashboard"/>
      </div>
    <div className="pt-7 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
         xl:grid-cols-3 2xl:grid-cols-4  ">
          <Card className="flex flex-col space-y-2 col-span-1">
            <CardContent >
            <h1 className="text-3xl font-semibold text-center pt-2 pb-5">
              Incoming Reservation
            </h1>
              {newestReservation ? (
               <div>
                <ListingCard data={newestReservation.listing} 
                reservation={newestReservation} actionLabel="Cancel Reservation"
                  onAction={onCancel} admin currentUser={currentUser}
                  actionId={newestReservation.id}
                  />
               </div>
              ): (
                <div className="text-xl font-semibold">
                  No reservations incoming                  
                </div>
              )}
            </CardContent>
          </Card>
    
          <Card>
            <CardContent>
              <h1 className="text-3xl pb-10 pt-3 text-center font-semibold">
                Your statistics
              </h1>
              <div className="space-y-6">
                <div>
                  <BanknoteIcon size={32}/>
                  <p className="text-2xl">
                    Total Income
                    <span className="font-bold ml-2">{totalIncome} $</span>
                  </p>
                </div>
                
                <div>
                  <Pencil size={32}/>
                  <p className="text-2xl">
                    Reservations Count
                    <span className="font-bold ml-2">{reservationsCount}</span>
                  </p>
                </div>

                <div>
                  <HomeIcon size={32}/>
                  <p className="text-2xl">
                    Users Count
                    <span className="font-bold ml-2">{allUsers}</span>
                  </p>
                </div>

                <div className=" flex flex-col pt-5 items-center justify-center">
                  <Image src='/images/pexels-photo-2608582.jpeg' 
                    alt="Cover image"
                    width={100} height={100} className="object-cover rounded-md"/>
                  <p className="text-xl pt-5">Free times from calendar soon for that day</p>
                </div>

              </div>
             
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-10">
              <h1 className="text-3xl font-semibold py-3 text-center">
                Payments
              </h1>
              <h2 className="text-muted-foreground text-2xl">
                Coming soon ...
              </h2>
            </CardContent>
          </Card>

    </div>
   </Container>
  )
}

export default PanelClient