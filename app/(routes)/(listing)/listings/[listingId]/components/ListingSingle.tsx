'use client'

import Container from "@/components/Container"
import ListingImage from "@/components/listings/ListingImage"
import ListingInfo from "@/components/listings/ListingInfo"
import { Card } from "@/components/ui/card"
import { safeListing, safeUser } from "@/types/types"
import Image from "next/image"


interface ListingSingleProps {
    currentUser:safeUser | null
    listing: safeListing 
}

const ListingSingle = ({currentUser, listing}: ListingSingleProps) => {
  return (
    <Container>
      <div className="py-20  px-4 sm:px-6 lg:px-8 w-full h-full">
        <Card className="md:grid md:grid-cols-2  md:items-start md:gap-x-8 mt-20 ">
         <ListingImage listing={listing} currentUser={currentUser}/>
         <ListingInfo listing={listing} currentUser={currentUser}/>
        </Card>
      </div>

    </Container>
  )
}

export default ListingSingle