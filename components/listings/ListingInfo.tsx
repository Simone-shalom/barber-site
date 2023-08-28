'use client'

import { safeListing, safeUser } from "@/types/types"
import ListingDetails from "./ListingDetails"
import ListingReservation from "./ListingReservation"


interface ListingInfoProps {
    listing: safeListing
    currentUser: safeUser | null
}

const ListingInfo = ({currentUser, listing}: ListingInfoProps) => {
  return (
    <div className="space-y-10">
        <ListingDetails />
        <ListingReservation />
    </div>
  )
}

export default ListingInfo