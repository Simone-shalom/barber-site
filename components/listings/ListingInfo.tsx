'use client'

import { safeListing, safeUser } from "@/types/types"
import ListingDetails from "./ListingDetails"
import ListingReservation from "./ListingReservation"


interface ListingInfoProps {
    listing: safeListing
    currentUser: safeUser | null
    user: safeUser
    onSubmit: () => void
    onChangeDate: (value: any) => void
}

const ListingInfo = ({currentUser, listing, user ,onSubmit,
   onChangeDate }:
   ListingInfoProps) => {
  return (
    <div className="space-y-5 pb-64">
        <ListingDetails listing={listing} user={user}/>
        <ListingReservation onSubmit={onSubmit} onChangeDate={onChangeDate}/>
    </div>
  )
}

export default ListingInfo