'use client'

import { DateTimeSelection } from "../DateTimeSelection"
import { Button } from "../ui/button"


interface ListingReservationProps {
  onSubmit: () => void
  onChangeDate: (value: any) => void
}

const ListingReservation = ({onSubmit ,onChangeDate}:
   ListingReservationProps) => {
  return (
    <div className="">
      <DateTimeSelection  onChange={(value) => onChangeDate(value)}
      />
      <div className="pt-5 w-full flex justify-center items-center gap-x-3">
          <Button 
            onClick={onSubmit}
            className="w-full mx-20">Reserve</Button>
      </div>
    </div>
  )
}

export default ListingReservation