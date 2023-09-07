'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import Statistics from "@/components/Statistics"
import ListingCard from "@/components/listings/ListingCard"
import { Card, CardContent } from "@/components/ui/card"
import { safePastReservation, safeReservation, safeUser } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface PanelClientProps {
    currentUser: safeUser
    reservationsCount: number
    pastReservations: safePastReservation[] 
    newestReservation: safeReservation | null
    allUsers: number
    reservations: safeReservation[]
}

const PanelClient = ({ currentUser, reservationsCount,
     pastReservations, newestReservation, allUsers, reservations }:
     PanelClientProps) => {

      
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [deletedId, setDeletedId] = useState('')

  let totalIncome = 0;

  pastReservations.forEach(reservation => {
    totalIncome += reservation.price;
});

// logic for getting the hours of reservations for current day
const currentDate = new Date();

const filteredReservations = reservations.filter((reservation) => {
  const date = new Date(reservation.date);
  return (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
});

const takenTimes = filteredReservations.map((reservation) => {
  const date = new Date(reservation.date);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});
// current date
const current = new Date();
const currentDayName = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  

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
          <Card className="flex flex-col space-y-2 col-span-1 py-2 border-black/5
                hover:shadow-2xl shadow-xl  transition cursor-pointer w-full">
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
    
          <Card className="px-2  py-2 border-black/5
                hover:shadow-2xl shadow-xl  transition cursor-pointer w-full">
            <CardContent>
             <Statistics allUsers={allUsers} reservationsCount={reservationsCount}
              totalIncome={totalIncome} takenTimes={takenTimes} 
              currentDayName={currentDayName} currentUser={currentUser}/>
            </CardContent>
          </Card>

          <Card className="px-2  py-2 border-black/5
                hover:shadow-2xl shadow-xl  transition cursor-pointer w-full">
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