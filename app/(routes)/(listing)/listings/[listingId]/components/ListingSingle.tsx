'use client'

import Container from "@/components/Container"
import ListingImage from "@/components/listings/ListingImage"
import ListingInfo from "@/components/listings/ListingInfo"
import { Card } from "@/components/ui/card"
import { useLoginModal } from "@/hooks/use-login-modal"
import { safeListing, safeUser } from "@/types/types"
import { now } from "next-auth/client/_utils"
import Image from "next/image"
import { useState } from "react"


interface ListingSingleProps {
    currentUser:safeUser | null
    listing: safeListing & {
      user: safeUser
    }
}

const ListingSingle = ({currentUser, listing}: ListingSingleProps) => {

  const [isLoading, setIsLoading] =useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const loginModal = useLoginModal()


  const onCreateReservation = () => {

    if(!currentUser){
      return loginModal.onOpen()
    }

    try {
      setIsLoading(true)

      console.log(listing.id, date, time)

    }catch(error){
      console.log(error)
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
          />
        </Card>
      </div>

    </Container>
  )
}

export default ListingSingle