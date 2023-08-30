import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import VisitClient from "./components/VisitClient";


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
  

    if(!reservations){
      return (
          <div>
          No listings found
          </div>
      )
  }

  return (
    <div>
        <VisitClient reservations={reservations}/>
    </div>
  )
}

export default VisitsPage