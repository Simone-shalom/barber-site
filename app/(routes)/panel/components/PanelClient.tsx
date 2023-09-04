'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import { Button } from "@/components/ui/button"
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
}

const PanelClient = ({ currentUser, reservationsCount,
     pastReservations, newestReservation}:
     PanelClientProps) => {

      
  const router = useRouter()

  const [loading, setLoading] = useState(false)

   
  let totalIncome = 0;

  pastReservations.forEach(reservation => {
    totalIncome += reservation.price;
});

  return (
    <Container>
    <Heading title="Admin Panel" desc="Your daily dashboard" />
    <div className="pt-7 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
         xl:grid-cols-3 2xl:grid-cols- ">
          <Card>
            <CardContent>
            {totalIncome} $
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              {reservationsCount}
            </CardContent>
          </Card>

          <Card className="flex flex-col space-y-2">
            <CardContent className="flex flex-col space-y-2">
              {newestReservation ? (
                <div>
                  <div> {newestReservation.price}</div>
                  <div>{newestReservation.date}</div>
                  <div>
                    {newestReservation.userName}
                  </div>
                
                  <div>
                    {newestReservation.createdAt}
                  </div>
                </div>
              ): (
                <div className="text-xl font-semibold">
                  No reservations incoming                  
                </div>
              )}
            </CardContent>
          </Card>

     
    </div>
    <div className="flex flex-col gap-4 items-center justify-center pb-5 ">
        <Button  className="text-lg">
          Clear all
        </Button>
        <Button onClick={()=>router.push('/myreservations')}
          variant='cancel' className="text-lg">
          Check reservations
        </Button>
      </div>
   </Container>
  )
}

export default PanelClient