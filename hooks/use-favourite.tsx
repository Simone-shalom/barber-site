import { safeListing, safeUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { useLoginModal } from "./use-login-modal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface useFavouriteProps {
    listingId: string;
    currentUser?: safeUser | null
}

const useFavourite = ({listingId, currentUser}: useFavouriteProps) => {

    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFav = useMemo(() => {
        
        const favs = currentUser?.favouriteIds || []

        return favs.includes(listingId)
    },[currentUser, listingId])


    const toggleFav = useCallback(async(e: React.MouseEvent<HTMLDivElement>) => {

        e.stopPropagation()

        if(!currentUser){
            return loginModal.onOpen
        }

        try {

            let request 

            if(hasFav) {
                request = () => axios.delete(`/api/favourite/${listingId}`)
            }else {

               request = () => axios.post(`/api/favourite/${listingId}`)
            }  

            await request()
            router.refresh()
            toast.success('Success')

        }catch(error:any){
            console.log(error)
            toast.error('Something went wrong')
        }

    },[currentUser, listingId, router, loginModal, hasFav])

    return {hasFav, toggleFav}
}

export default useFavourite