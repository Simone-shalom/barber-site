'use client'

import { useRouter } from "next/navigation"
import MenuItem from "./MenuItem"
import { DropdownMenu, DropdownMenuContent,
     DropdownMenuTrigger } from "./ui/dropdown-menu"
import {MenuIcon} from 'lucide-react'
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useLoginModal } from "@/hooks/use-login-modal"
import { useRegisterModal } from "@/hooks/use-register-modal"
import Image from "next/image"
import { ADMIN_ID } from "@/permissions"
import { useListingModal } from "@/hooks/use-listing-modal"

interface UserMenuProps{
  currentUser?: User | null
} 

const UserMenu = ({currentUser}: UserMenuProps) => {

    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const listingModal = useListingModal()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center space-x-3
             focus:outline-none px-3 py-2 hover:shadow-lg rounded-xl 
             border-[1px] transition font-semibold">
            <MenuIcon size={20}/>
            <div>
              <p className="text-sm">{currentUser?.name}</p>
            </div> 
        </DropdownMenuTrigger>

        <DropdownMenuContent className="cursor-pointer mt-4 md:mt-0">
        <>
          {currentUser ? (
            <>
              <MenuItem label='My Visits' onClick={() => router.push('/trips')} />
              <MenuItem label='My Favourites' onClick={() => router.push('/favourites')} />
              <MenuItem label='My Reservations' onClick={() => router.push('/reservations')} />
              {/*Admin only listings*/}
              {currentUser?.id  === ADMIN_ID && (
                <div>
                 <MenuItem label='My Listings' onClick={() => router.push('/listings')} />
                 <MenuItem label='Create listing' onClick={listingModal.onOpen} />
                </div>
              )}
            
              <MenuItem label='Logout' onClick={()=>signOut()} />
            </>
          ): (
            <div>
              <MenuItem label='Login' onClick={loginModal.onOpen} />
              <MenuItem label='Register' onClick={registerModal.onOpen} />
            </div>
          )}
        </>
        </DropdownMenuContent> 
      </DropdownMenu>
    </div>
  )
}

export default UserMenu