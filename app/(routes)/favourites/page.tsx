import getCurrentUser from "@/actions/get-current-user"
import getFavourites from "@/actions/get-favourites";
import { ADMIN_ID } from "@/permissions";
import { redirect } from "next/navigation";
import FavouriteClient from "./components/FavouriteClient";


const FavouritesPage = async() => {

    const currentUser = await getCurrentUser()

    const favourites = await getFavourites()

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

      if(favourites?.length === 0){
        return (
            <div>
                adad
            </div>
        )
    }
    

    return (
    <div>
        <FavouriteClient favourites={favourites} currentUser={currentUser}/>
    </div>
  )
}

export default FavouritesPage