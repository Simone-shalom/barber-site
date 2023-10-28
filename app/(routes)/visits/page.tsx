import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import VisitClient from "./components/VisitClient";
import { ADMIN_ID } from "@/permissions";
import { redirect } from "next/navigation";
import Empty from "@/components/Empty";

const VisitsPage = async() => {


    const currentUser= await getCurrentUser()
    
    //get reservations only for current user
    const reservations = await getReservations({userId: currentUser?.id})


    if (!currentUser) {
      return (
        <Empty title="Unathenticated" desc="Please login or signup" 
          login/>
      );
    }
    if(currentUser?.id === ADMIN_ID){
      redirect('/')
    }
  

    if(reservations.length=== 0){
      return (
        <Empty title="No Visits yet" desc="Make a reservation first"  
          home/>
      )
  }

  return (
    <div>
        <VisitClient reservations={reservations} currentUser={currentUser}/>
    </div>
  )
}

export default VisitsPage