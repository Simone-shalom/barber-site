import getCurrentUser from "@/actions/get-current-user"
import getFavourites from "@/actions/get-favourites";
import { ADMIN_ID } from "@/permissions";
import { redirect } from "next/navigation";
import FavouriteClient from "./components/FavouriteClient";
import Empty from "@/components/Empty";


const FavouritesPage = async() => {

    const currentUser = await getCurrentUser()

    const favourites = await getFavourites()

    if (!currentUser) {
        return (
          <Empty title="Unathenticated" desc="Please login or signup" 
            login/>
        );
      }
      if(currentUser?.id === ADMIN_ID){
        redirect('/')
      }

      if(favourites?.length === 0){
        return (
              <Empty title="No favourites found" desc="Get one by adding listing" 
                home/>
        )
    }
    

    return (
    <div>
        <FavouriteClient favourites={favourites} currentUser={currentUser}/>
    </div>
  )
}

export default FavouritesPage