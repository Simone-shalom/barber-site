'use client'

import { DateTimeSelection } from "../DateTimeSelection"
import { Button } from "../ui/button"


interface ListingReservationProps {
  onSubmit: () => void
}

const ListingReservation = ({onSubmit}:
   ListingReservationProps) => {
  return (
    <div className="">
      <DateTimeSelection />
      <div className="pt-10 w-full flex justify-center items-center gap-x-3">
          <Button 
            onClick={onSubmit}
            className="w-full mx-20">Reserve</Button>
      </div>
    </div>
  )
}

export default ListingReservation