'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
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

      const onCancel = ((id: string) => {
        setDeletedId(id)
    
        axios.delete(`/api/delete/${id}`)
        .then(() => {
          toast.success('Listing deleted')
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
    <Heading title="All your Listings" desc="You can manage them, by deleting when necessary" />
    <div className="pt-7 pb-5 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {listings.map((listing: any) => (
          <div key={listing.id}>
            <ListingCard  data={listing}
             actionId={listing.id} onAction={onCancel} 
             currentUser={currentUser} actionLabel="Delete the listing"
             />
          </div>
        ))}
    </div>
   </Container>
  )
}

export default ListingClient