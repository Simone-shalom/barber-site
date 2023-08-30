'use client'

import { safeListing, safeUser } from "@/types/types"

interface ListingDetailsProps {
  listing : safeListing
  user: safeUser
 
}

const ListingDetails = ({listing, user}: ListingDetailsProps) => {
  return (
    <div className="p-4 flex flex-col ">
       <h1 className="text-4xl font-bold text-gray-900">
        {listing.title}
       </h1>
       <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl text-gray-900 font-semibold ">
           {listing.price} $
        </p>
       </div>
       <p className="text-xl font-semibold pt-6">
              {listing.category}
        </p>
       <hr className="my-6"/>
       <div className="flex flex-col gap-y-2">
            <div className="flex flex-col  gap-x-10 space-y-3">
                <h3 className="font-semibold text-lg text-black">
                  {listing.description} </h3>
            </div>
        </div>
        <p className="text-lg pt-12 text-muted-foreground font-bold">
                    Barber - @<span className="text-black font-bold text-xl capitalize">
                      {user.name}</span>
                  </p>
    </div>
  )
}

export default ListingDetails