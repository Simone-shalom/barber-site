import getCurrentUser from "@/actions/get-current-user"
import { ADMIN_ID } from "@/permissions"
import { redirect } from "next/navigation"
import ReservationClient from "./components/ReservationClient"
import getReservations from "@/actions/get-reservations"
import Empty from "@/components/Empty"


const MyReservationPage = async() => {

    const currentUser = await getCurrentUser()
    //get all reservations for admin
    const reservations = await getReservations({})

    if(currentUser?.id !== ADMIN_ID) {
        redirect('/')
    }

    if(reservations.length === 0) {
        return (
           <Empty title="No reservations yet" desc="Wait for your clients to make an reservation"
            home/>
        )
    }

  return (
    <div>
        <ReservationClient reservations={reservations} currentUser={currentUser}/>
    </div>
  )
}

export default MyReservationPage