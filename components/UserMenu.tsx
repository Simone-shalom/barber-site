'use client'

import { useRouter } from "next/navigation"
import MenuItem from "./MenuItem"
import { DropdownMenu, DropdownMenuContent,
     DropdownMenuTrigger } from "./ui/dropdown-menu"
import {MenuIcon} from 'lucide-react'
import { signOut } from "next-auth/react"
import { useLoginModal } from "@/hooks/use-login-modal"
import { useRegisterModal } from "@/hooks/use-register-modal"
import { ADMIN_ID } from "@/permissions"
import { safeNotification, safeUser } from "@/types/types"
import { useEffect, useState } from "react"

interface UserMenuProps{
  currentUser?: safeUser | null
  notifications: safeNotification[]
} 

const UserMenu = ({currentUser, notifications}: UserMenuProps) => {

    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
      router.refresh()
    },[router])
  
    if(!mounted){
      return null
    }

   const hasNotif = notifications.length > 0

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center space-x-3
             focus:outline-none px-3 py-2 hover:shadow-lg rounded-xl 
             border-[1px] transition font-semibold">
            <MenuIcon size={20}/>
            <div>
              <p className="text-lg">{currentUser?.name}</p>
            </div> 
        </DropdownMenuTrigger>

        <DropdownMenuContent className="cursor-pointer mt-4 md:mt-0 mr-3 md:mr-0">
        <>
        {/*If there is logged in user*/}
          {currentUser ? (
            <>
            {/*If user is not admin access to*/}
              {currentUser.id !== ADMIN_ID && (
                <>
                 <MenuItem label='My Visits' onClick={() => router.push('/visits')}/>
                </>
              )}
              {/* if user is Admin- can create and manage listings/ reservations*/}
              {currentUser?.id  === ADMIN_ID && (
                <div>
                  <MenuItem label='Notifications' onClick={() => router.push('/notifications')} 
                    alert={hasNotif}/>
                 <MenuItem label='My Reservations' onClick={() => router.push('/myreservations')} />
                 <MenuItem label='Create Listing' onClick={()=> router.push('/create')} />
                 <MenuItem label='Admin Panel' onClick={()=> router.push('/panel')} />
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