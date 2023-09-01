'use client'

import { safeListing, safeUser } from "@/types/types"
import ListingDetails from "./ListingDetails"
import ListingReservation from "./ListingReservation"
import { Datetype } from "@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle"
import { Dispatch, SetStateAction } from "react"


interface ListingInfoProps {
    listing: safeListing
    currentUser: safeUser | null
    user: safeUser
    onSubmit: () => void
    setDate: Dispatch<SetStateAction<Datetype>>
    date: Datetype
    dDates: Date[]
}

const ListingInfo = ({currentUser, listing, user ,onSubmit,
     setDate, date, dDates }:
   ListingInfoProps) => {
  return (
    <div className="space-y-1 ">
        <ListingDetails listing={listing} user={user}/>
        <ListingReservation onSubmit={onSubmit}
          setDate={setDate} date={date} dDates={dDates}/>
    </div>
  )
}

export default ListingInfo