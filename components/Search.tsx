'use client'

import { useLoginModal } from "@/hooks/use-login-modal"
import { SearchIcon } from "lucide-react"
import { useMemo } from "react"

const Search = () => {

    const durationLabel = useMemo(() => {

    },[])

    const loginModal = useLoginModal()

  return (
    <div 
    className='border-[1px] w-full md:w-[300px] lg:w-[400px] xl:w-[500px] 
    py-2 rounded-full shadow-sm hover:shadow-md 
    transition cursor-pointer'>
    
    <div className='flex items-center w-full justify-between' onClick={loginModal.onOpen}>
        <div className='hidden sm:block text-sm font-semibold px-3 lg:px-5 
             border-x-[1px] text-center'>
            duration label
        </div>
        <div 
            className='text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3'>
            <div className='p-2 bg-gray-900 rounded-full text-white'>
                <SearchIcon size={20} />
            </div>
        </div>
    </div>

</div>
  )
}

export default Search