'use client'

import { safeListing, safeUser } from "@/types/types"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingImageProps {
  listing: safeListing
  currentUser: safeUser| null
}

const ListingImage = ({listing, currentUser}: ListingImageProps) => {
  return (
    <div className="relative w-full h-[400px] md:h-[700px] lg:h-[700px]">
       <Image src={listing.imageSrc} alt="" fill
            className="object-cover rounded-lg"/>
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={listing.id} currentUser={currentUser} />
        </div>
    </div>
  )
}

export default ListingImage