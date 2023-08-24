import Container from "./Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"


const Navbar = () => {
  return (
    <div className="fixed bg-white w-full z-10 shadow-md rounded-b-md">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar