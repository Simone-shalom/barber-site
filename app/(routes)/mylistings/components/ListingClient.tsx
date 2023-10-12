'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import { PageWrapper } from "@/components/animations/pageWrapper"
import ListingCard from "@/components/listings/ListingCard"
import { safeListing, safeUser } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface ListingClientProps {
    listings: safeListing[]
    currentUser: safeUser
}

const ListingClient = ({listings, currentUser}:
     ListingClientProps) => {

      
  const router = useRouter()
  const [deletedId, setDeletedId] = useState('')

      // const onCancel = ((id: string) => {
        // setDeletedId(id)
    
        // axios.delete(`/api/delete/${id}`)
        // .then(() => {
          // toast.success('Listing deleted')
          // router.refresh()
        // })
        // .catch(() => {
          // toast.error('Error cancelling reservation')
        // })
        // .finally(() => {
          // setDeletedId('')
        // })
    // 
      // })

      const onCancel = ((id: string) => {
        toast.error("I've commented out the deleted functionality, so i got listings on my site,  it is fully working :3")
      })

  return (
    <Container>
    <Heading title="All your Listings" desc="You can manage them, by deleting when necessary" />
    <div className="pt-7 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 2xl:grid-cols-4 ">
        {listings.map((listing: any) => (
          <>
          <PageWrapper key={listing.id}>
          <div key={listing.id}>
            <ListingCard  data={listing}
             actionId={listing.id} onAction={onCancel} 
             currentUser={currentUser} actionLabel="Delete the listing"
             />
          </div>
          </PageWrapper>
          </>
        ))}
    </div>
   </Container>
  )
}

export default ListingClient