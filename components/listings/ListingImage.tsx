'use client'

import { safeListing } from "@/types/types"
import Image from "next/image"

interface ListingImageProps {
  listing: safeListing
}

const ListingImage = ({listing}: ListingImageProps) => {
  return (
    <div className="relative w-full h-[400px] md:h-[700px] lg:h-[700px]">
       <Image src={listing.imageSrc} alt="" fill
            className="object-cover rounded-lg"/>
    </div>
  )
}

export default ListingImage