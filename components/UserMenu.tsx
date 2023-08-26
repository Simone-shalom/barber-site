'use client'

import { useRouter } from "next/navigation"
import MenuItem from "./MenuItem"
import { DropdownMenu, DropdownMenuContent,
     DropdownMenuTrigger } from "./ui/dropdown-menu"
import {MenuIcon} from 'lucide-react'
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"

interface UserMenuProps{
  currentUser?: User | null
} 

const UserMenu = ({currentUser}: UserMenuProps) => {

    const router = useRouter()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center space-x-3
             focus:outline-none px-3 py-2 hover:shadow-lg rounded-xl 
             border-[1px] transition font-semibold">
            <MenuIcon size={20}/>
            <div></div> 
        </DropdownMenuTrigger>

        <DropdownMenuContent className="cursor-pointer mt-4 md:mt-0">
        <>
            <MenuItem label='My Visits' onClick={() => router.push('/trips')} />
            <MenuItem label='My Favourites' onClick={() => router.push('/favourites')} />
            <MenuItem label='My Reservations' onClick={() => router.push('/reservations')} />
            <MenuItem label='My properties' onClick={() => router.push('/properties')} />
            <MenuItem label='My Home' onClick={()=>{}} />
            <MenuItem label='Logout' onClick={()=>signOut()} />
        </>
        </DropdownMenuContent> 
      </DropdownMenu>
    </div>
  )
}

export default UserMenu