

import Container from "./Container"
import Logo from "./Logo"
import UserMenu from "./UserMenu"
import Categories from "./Categories"
import { safeUser } from "@/types/types"
import getNotifications from "@/actions/get-notifications"
import NotificationInfo from "./NotificationInfo"
import { ADMIN_ID } from "@/permissions"

interface NavbarProps {
  currentUser?:safeUser | null
}


const Navbar = async({currentUser}:
  NavbarProps) => {

    const notifications = await getNotifications({userId: currentUser?.id})

  return (
    <div className="fixed bg-white w-full z-50 shadow-md rounded-b-md h-24">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <>
              {currentUser?.id === ADMIN_ID && (
                <NotificationInfo notifications={notifications}/>
              )}
             
            </>
            
            <UserMenu currentUser={currentUser} notifications={notifications}/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar