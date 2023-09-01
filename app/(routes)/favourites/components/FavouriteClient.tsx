'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import ListingCard from "@/components/listings/ListingCard"
import { safeListing, safeUser } from "@/types/types"


interface FavouriteClientProps {
    favourites: safeListing[] | null
    currentUser?: safeUser | null
}

const FavouriteClient = ({favourites ,currentUser}:
   FavouriteClientProps) => {

  return (
 
     <Container>
      <Heading title="Your Favourites" desc="All your favourites listings in one place" />
      <div className="pt-7 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
          {favourites?.map((favourite: any) => (
            <div key={favourite.id}>
              <ListingCard  data={favourite}
               currentUser={currentUser} 
               />
            </div>
          ))}
      </div>
     </Container>
  )
}

export default FavouriteClient