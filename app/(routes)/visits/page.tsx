import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import VisitClient from "./components/VisitClient";
import { ADMIN_ID } from "@/permissions";
import { redirect } from "next/navigation";


const VisitsPage = async() => {


    const currentUser= await getCurrentUser()
    const reservations = await getReservations({userId: currentUser?.id})


    if (!currentUser) {
      return (
        <div>
          Unauthenticated
        </div>
      );
    }
    if(currentUser?.id === ADMIN_ID){
      redirect('/mylistings')
    }
  

    if(!reservations){
      return (
          <div>
          No listings found
          </div>
      )
  }

  return (
    <div>
        <VisitClient reservations={reservations} currentUser={currentUser}/>
    </div>
  )
}

export default VisitsPage