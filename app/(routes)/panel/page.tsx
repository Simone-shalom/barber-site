import getCurrentUser from "@/actions/get-current-user"
import Empty from "@/components/Empty"
import { ADMIN_ID } from "@/permissions"
import { redirect } from "next/navigation"
import PanelClient from "./components/PanelClient"
import prismadb from "@/lib/prismadb"
import getReservations from "@/actions/get-reservations"
import getPastReservations from "@/actions/get-past-reservations"
import getPurchased from "@/actions/get-all-purchased"


const PanelPage = async() => {
    const currentUser = await getCurrentUser()

    const reservationsCount = await prismadb.reservation.count()

    const reservations = await getReservations({})

    const newestReservation = reservations.length > 0 ? reservations[0] : null

    const pastReservations = await getPastReservations()

    const allUsers = await prismadb.user.count()

    const purchased = await getPurchased()

    if(currentUser?.id !==ADMIN_ID) {
      redirect('/')
    }
    
    if(!currentUser){
      return redirect('/')
    }
    
    if(reservationsCount === 0){
      return (
        <Empty title="No Reservations yet" desc="Wait and see"  
          home/>
      )
  }

  if(allUsers === 0){
    return (
      <Empty title="No users yet" desc=""/>
    )
  }

  return (
    <div>
      <PanelClient currentUser={currentUser} 
        reservationsCount={reservationsCount}
        pastReservations={pastReservations}
        newestReservation={newestReservation}
        purchased={purchased}
         allUsers={allUsers} reservations={reservations}/>
    </div>
  )
}


export default PanelPage