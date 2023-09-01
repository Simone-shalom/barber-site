
import { redirect, useRouter } from "next/navigation"
import CreateListingForm from "./components/CreateListingForm"
import getCurrentUser from "@/actions/get-current-user"
import { ADMIN_ID } from "@/permissions"

const CreateListingPage = async() => {

    const currentUser = await getCurrentUser()

    if(currentUser?.id !== ADMIN_ID) {
        redirect('/')
    }
 
  return (
    (
       <CreateListingForm/>
    )
  )
}

export default CreateListingPage