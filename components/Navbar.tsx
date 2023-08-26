import { User } from "@prisma/client"
import Container from "./Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface NavbarProps {
  currentUser?:User | null
}


const Navbar = ({currentUser}:
  NavbarProps) => {

console.log(currentUser)

  return (
    <div className="fixed bg-white w-full z-10 shadow-md rounded-b-md">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar