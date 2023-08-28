'use client'

import { safeListing, safeUser } from "@/types/types"
import ListingDetails from "./ListingDetails"
import ListingReservation from "./ListingReservation"


interface ListingInfoProps {
    listing: safeListing
    currentUser: safeUser | null
    user: safeUser
    onSubmit: () => void
}

const ListingInfo = ({currentUser, listing, user ,onSubmit }:
   ListingInfoProps) => {
  return (
    <div className="space-y-5 pb-64">
        <ListingDetails listing={listing} user={user}/>
        <ListingReservation onSubmit={onSubmit} />
    </div>
  )
}

export default ListingInfo