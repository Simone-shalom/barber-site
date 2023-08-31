import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import VisitClient from "./components/VisitClient";
import { ADMIN_ID } from "@/permissions";
import { redirect } from "next/navigation";
import Categories from "@/components/Categories";

const VisitsPage = async() => {


    const currentUser= await getCurrentUser()
    //get reservations only for current user
    const reservations = await getReservations({userId: currentUser?.id})


    if (!currentUser) {
      return (
        <div className="pt-48">
          Unauthenticated
        </div>
      );
    }
    if(currentUser?.id === ADMIN_ID){
      redirect('/')
    }
  

    if(reservations.length=== 0){
      return (
          <div className="pt-48">
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