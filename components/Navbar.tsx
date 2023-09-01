
import Container from "./Container"
import Logo from "./Logo"
import UserMenu from "./UserMenu"
import Categories from "./Categories"
import { safeUser } from "@/types/types"

interface NavbarProps {
  currentUser?:safeUser | null
}


const Navbar = ({currentUser}:
  NavbarProps) => {


  return (
    <div className="fixed bg-white w-full z-10 shadow-md rounded-b-md">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <p></p>
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar