'use client'

import { Datetype } from "@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle"
import Calendar from "../Calendar"
import { Button } from "../ui/button"
import { Dispatch, SetStateAction } from "react"


interface ListingReservationProps {
  onSubmit: () => void
  date: Datetype
  setDate: Dispatch<SetStateAction<Datetype>>
  dDates: Date[]
}

const ListingReservation = ({onSubmit, setDate, date ,dDates}:
   ListingReservationProps) => {
  return (
    <div className="">
      <p className="font-italic text-xl px-5 text-center">Choose day and hour</p>
      <Calendar setDate={setDate}  date={date} disabledDates={dDates}/>
      <div className="pt-4 w-full flex justify-center items-center gap-x-3">
          <Button 
            onClick={onSubmit}
            className="w-full mx-20">Reserve</Button>
      </div>
    </div>
  )
}

export default ListingReservation