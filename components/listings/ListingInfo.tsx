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
    onChangeDate: (value: any) => void
    setDate: Dispatch<SetStateAction<Datetype>>
    date: Datetype
}

const ListingInfo = ({currentUser, listing, user ,onSubmit,
   onChangeDate, setDate, date }:
   ListingInfoProps) => {
  return (
    <div className="space-y-1 ">
        <ListingDetails listing={listing} user={user}/>
        <ListingReservation onSubmit={onSubmit} onChangeDate={onChangeDate}
          setDate={setDate} date={date}/>
    </div>
  )
}

export default ListingInfo