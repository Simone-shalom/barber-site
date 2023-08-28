'use client'

import useFavourite from "@/hooks/use-favourite";
import { safeUser } from "@/types/types";
import { HeartIcon, HeartOffIcon } from "lucide-react";


interface HeartButtonProps {
    listingId: string;
    currentUser?: safeUser | null;
}

const HeartButton = ({listingId, currentUser}:
    HeartButtonProps) => {

    const {toggleFav ,hasFav} = useFavourite({listingId, currentUser});

    return (
        <div onClick={toggleFav}
            className='relative hover:opacity-80 transition cursor-pointer'>
            <HeartIcon size={32} className={ hasFav ? 'fill-red-500': 'text-white/80'}/>
        </div>
      )
}

export default HeartButton