import getCurrentUser from "@/actions/get-current-user"
import { ADMIN_ID } from "@/permissions"
import { redirect } from "next/navigation"
import ListingClient from "./components/ListingClient"
import getListings from "@/actions/get-listing"


const MyListings = async() => {

  const currentUser = await getCurrentUser()
  // get all listings for admin
  const lisitngs = await getListings({})

  if(currentUser?.id !== ADMIN_ID) {
      redirect('/')
  }


  return (
    <div>
      <ListingClient listings={lisitngs} currentUser={currentUser}/>
    </div>
  )
}

export default MyListings