'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import { PageWrapper } from "@/components/animations/pageWrapper"
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
      <div className="pt-7 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 2xl:grid-cols-4 ">
          {favourites?.map((favourite: any) => (
            <PageWrapper key={favourite.id}>
            <div key={favourite.id}>
              <ListingCard  data={favourite}
               currentUser={currentUser} 
               />
            </div>
            </PageWrapper>
          ))}
      </div>
     </Container>
  )
}

export default FavouriteClient